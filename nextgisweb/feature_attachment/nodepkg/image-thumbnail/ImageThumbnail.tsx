import { useState } from "react";

import { Image } from "@nextgisweb/gui/antd";
import i18n from "@nextgisweb/pyramid/i18n";

import { GetFeatureImage } from "./util/GetFeatureImage";

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

    const { url } = GetFeatureImage({
        featureId,
        resourceId,
        attachment,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="image-thumbnail-container"
            style={{
                margin: "8px",
                width: width,
                height: "auto",
                display: "flex",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
                if (onClick) onClick(attachment);
            }}
        >
            <img
                className="image-thumbnail"
                width="100%"
                height="auto"
                src={`${url}?size=${previewSize}`}
                draggable={false}
            />
            <div
                style={{
                    height: "auto",
                    width: "inherit ",
                    position: "absolute",
                    textAlign: "center",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    className="image-thumbnail-preview-text"
                    style={{
                        position: "absolute",
                        textAlign: "center",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <span> </span> {i18n.gettext("Preview")}
                </div>
            </div>
        </div>
    );
};
