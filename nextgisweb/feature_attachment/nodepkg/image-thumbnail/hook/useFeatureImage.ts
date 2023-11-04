import { useMemo } from "react";

import { routeURL } from "@nextgisweb/pyramid/api";

import type { FeatureAttachment } from "../../type";

interface UseFeatureImageProps {
    resourceId: number;
    featureId: number;
    attachment: FeatureAttachment;
}

export function useFeatureImage({
    resourceId,
    featureId,
    attachment,
}: UseFeatureImageProps) {
    const url = routeURL("feature_attachment.image", {
        id: resourceId,
        fid: featureId,
        aid: attachment.id,
    });

    let projection: string | null = null;
    if ("file_meta" in attachment) {
        try {
            projection = attachment.file_meta.panorama.ProjectionType;
        } catch (error) {
            // pass
        }
    }

    return { url, projection };
}
