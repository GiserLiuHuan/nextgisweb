import { Suspense, lazy } from "react";

import { Image, Spin } from "@nextgisweb/gui/antd";

import type { FeatureAttachment } from "../../type";
import { useFeatureImage } from "../hook/useFeatureImage";

import { LoadingOutlined } from "@ant-design/icons";

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
        return (
            <Suspense
                fallback={
                    <Spin
                        indicator={
                            <LoadingOutlined
                                style={{ fontSize: 24 }}
                                spin={true}
                            />
                        }
                    />
                }
            >
                <PhotospherePreview url={url} />;
            </Suspense>
        );
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={url} preview={false} style={{ maxHeight: "100vh" }} />
        </div>
    );
}
