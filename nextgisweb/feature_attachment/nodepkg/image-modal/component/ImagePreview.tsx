import { lazy } from "react";

import type { FeatureAttachment } from "../../type";
import { useFeatureImage } from "../hook/useFeatureImage";
const PhotospherePreview = lazy(() => import("./PhotospherePreview"));

interface ImagePreviewProps {
    attachment: FeatureAttachment;
    resourceId: number;
    featureId: number;
    togglePanorama: boolean;
}

export function ImagePreview({
    attachment,
    resourceId,
    featureId,
    togglePanorama,
}: ImagePreviewProps) {
    const { url, projection } = useFeatureImage({
        attachment,
        resourceId,
        featureId,
    });

    if (projection && togglePanorama) {
        return <PhotospherePreview url={url} />;
    }

    return (
        <div>
            <img src={url} style={{ maxHeight: "100vh" }} />
        </div>
    );
}
