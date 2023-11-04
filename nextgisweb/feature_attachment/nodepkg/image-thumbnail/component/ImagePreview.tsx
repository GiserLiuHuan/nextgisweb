import { lazy } from "react";

import { Image } from "@nextgisweb/gui/antd";

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
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={url} preview={false} style={{ maxHeight: "100vh" }} />
        </div>
    );
}
