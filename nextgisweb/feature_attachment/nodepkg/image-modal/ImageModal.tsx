import { Image } from "@nextgisweb/gui/antd";

import { useFeatureImage } from "./hook/useFeatureImage";

import type { FeatureAttachment } from "../type";

export type ImageModalProps = {
    attachment: FeatureAttachment;
    resourceId: number;
    featureId: number;
    previewSize?: string;
    width?: number;
    onClick?: (attachment: FeatureAttachment) => void;
};

export const ImageModal = ({
    onClick,
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
        <div>
            <Image
                width={width}
                src={`${url}?size=${previewSize}`}
                preview={false}
                onClick={() => {
                    if (onClick) onClick(attachment);
                }}
            ></Image>
        </div>
    );
};
