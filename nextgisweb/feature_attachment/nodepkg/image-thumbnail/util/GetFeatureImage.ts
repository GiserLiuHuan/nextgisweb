import { useMemo } from "react";

import { routeURL } from "@nextgisweb/pyramid/api";

import type { FeatureAttachment } from "../../type";

interface GetFeatureImageProps {
    resourceId: number;
    featureId: number;
    attachment: FeatureAttachment;
    height?: number;
    width?: number;
}

export function GetFeatureImage({
    resourceId,
    featureId,
    attachment,
    height,
    width,
}: GetFeatureImageProps) {
    let url = useMemo(() => {
        return routeURL("feature_attachment.image", {
            id: resourceId,
            fid: featureId,
            aid: attachment.id,
        });
    }, [resourceId, featureId, attachment]);

    let projection: string | null = null;
    if ("file_meta" in attachment) {
        try {
            projection = attachment.file_meta.panorama.ProjectionType;
        } catch (error) {
            // pass
        }
    }
    let isPanorama = false;
    if (projection === "equirectangular") {
        isPanorama = true;
    }
    if (height && width) {
        url = url + `?size=${width}x${height}`;
    }

    return { url, isPanorama };
}
