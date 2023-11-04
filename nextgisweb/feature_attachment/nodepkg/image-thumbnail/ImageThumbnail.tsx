import i18n from "@nextgisweb/pyramid/i18n";

import type { FeatureAttachment } from "../type";

import { GetFeatureImage } from "./util/GetFeatureImage";

import { EyeOutlined } from "@ant-design/icons";

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
    return (
        <div
            className="ngw-feature-attachment-image-thumbnail-container"
            style={{
                margin: "8px",
                width: width,
                height: "auto",
                display: "flex",
            }}
            onClick={() => {
                if (onClick) onClick(attachment);
            }}
        >
            <div
                className="ngw-feature-attachment-image-thumbnail-text-container"
                style={{
                    position: "absolute",
                    color: "white",
                    display: "flex",
                    inset: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "16px",
                }}
            >
                <div>
                    <div
                        className="ngw-feature-attachment-image-thumbnail-text"
                        style={{
                            color: "white",
                        }}
                    >
                        <span>
                            <EyeOutlined />
                        </span>
                        {i18n.gettext(" Preview")}
                    </div>
                </div>
            </div>
            <img
                className="ngw-feature-attachment-image-thumbnail"
                width="100%"
                height="auto"
                src={`${url}?size=${previewSize}`}
                draggable={false}
            />
        </div>
    );
};
