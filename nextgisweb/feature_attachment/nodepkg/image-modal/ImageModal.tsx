import { Image } from "@nextgisweb/gui/antd";

import { CarouselRender } from "./component/CarouselRender";
import { useFeatureImage } from "./hook/useFeatureImage";

import type { DataSource } from "../attachment-editor/type";
import type { FeatureAttachment } from "../type";

export type ImageModalProps = {
    attachment: FeatureAttachment;
    resourceId: number;
    featureId: number;
    previewSize?: string;
    width?: number;
    data?: DataSource[];
};

export const ImageModal = ({
    data,
    width = 80,
    featureId,
    resourceId,
    attachment,
    previewSize,
}: ImageModalProps) => {
    previewSize = previewSize ?? `${width}x${width}`;

    const { url } = useFeatureImage({
        featureId,
        resourceId,
        attachment,
    });

    return (
        <Image
            width={width}
            src={`${url}?size=${previewSize}`}
            preview={{
                imageRender: () => (
                    <CarouselRender
                        attachment={attachment}
                        data={data || []}
                        resourceId={resourceId}
                        featureId={featureId}
                    />
                ),
                toolbarRender: () => null,
            }}
        ></Image>
    );
};
