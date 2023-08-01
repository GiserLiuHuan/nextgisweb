import { route } from "@nextgisweb/pyramid/api";

import { KEY_FIELD_KEYNAME } from "../constant";

interface FeatureLayerQuery {
    offset?: number;
    limit?: number;
    geom?: "yes" | "no";
    extensions?: string;
    dt_format?: "iso";
    fields?: string[];
    order_by?: string;
    like?: string;
    ilike?: string;
}

interface FetchFeaturesOptions {
    resourceId: number;
    orderBy?: string[];
    signal?: AbortSignal;
    fields?: string[];
    offset?: number;
    limit?: number;
    cache?: boolean;
    like?: string;
    ilike?: string;
}

export function fetchFeatures({
    resourceId,
    orderBy,
    signal,
    fields,
    offset,
    limit,
    cache,
    like,
    ilike,
}: FetchFeaturesOptions) {
    const query: FeatureLayerQuery = {
        offset,
        limit,
        geom: "no",
        extensions: "",
        dt_format: "iso",
        fields,
    };
    if (orderBy && orderBy[1]) {
        query.order_by = `${orderBy[1] === "desc" ? "-" : ""}${orderBy[0]}`;
    }
    if (like) {
        query.like = like;
    } else if (ilike) {
        query.ilike = ilike;
    }

    return route("feature_layer.feature.collection", resourceId)
        .get({
            query,
            signal,
            cache,
        })
        .then((items) => {
            return items.map((item) => ({
                ...item.fields,
                [KEY_FIELD_KEYNAME]: item.id,
            }));
        });
}