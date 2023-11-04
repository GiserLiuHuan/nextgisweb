import { useState } from "react";

import { Image } from "@nextgisweb/gui/antd";
import i18n from "@nextgisweb/pyramid/i18n";

import { useFeatureImage } from "./hook/useFeatureImage";

import type { FeatureAttachment } from "../type";

import "./ImageThumbnail.less";

export type ImageThumbnailProps = {
    attachment: FeatureAttachment;
    resourceId: number;
    featureId: number;
    previewSize?: string;
    width?: number;
    onClick?: (attachment: FeatureAttachment) => void;
};

export const ImageThumbnail = ({
    onClick,
    width = 80,
    featureId,
    resourceId,
    attachment,
    previewSize,
}: ImageThumbnailProps) => {
    previewSize = previewSize ?? `${width}x${width}`;

    const { url } = useFeatureImage({
        featureId,
        resourceId,
        attachment,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Image
                className="image-thumbnail"
                preview={false}
                width={width}
                src={`${url}?size=${previewSize}`}
                onClick={() => {
                    if (onClick) onClick(attachment);
                }}
            ></Image>
            <span
                className="image-thumbnail-preview-text"
                style={{
                    position: "absolute",
                    textAlign: "center",
                    top: "50%",
                    left: "50%",
                }}
            >
                {i18n.gettext("Preview")}
            </span>
        </div>
    );
};
