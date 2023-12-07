import { useState, useEffect } from "react";

import i18n from "@nextgisweb/pyramid/i18n";

import type { DataSource, FileMetaToUpload } from "../attachment-editor/type";
import type { FeatureAttachment } from "../type";

import { getFeatureImage } from "./util/getFeatureImage";
import { getFileImage } from "./util/getFileImage";

import { EyeOutlined } from "@ant-design/icons";
import "./ImageThumbnail.less";

export type ImageThumbnailProps = {
    attachment: DataSource;
    resourceId: number;
    featureId: number;
    previewSize?: string;
    width?: number;
    height?: number;
    newFile?: boolean;
    onClick?: (attachment: DataSource) => void;
};

export const ImageThumbnail = ({
    onClick,
    width = 80,
    height,
    featureId,
    resourceId,
    newFile = false,
    attachment,
}: ImageThumbnailProps) => {
    const [url, setUrl] = useState<string>(null);
    useEffect(() => {
        async function fetchImage() {
            if (newFile) {
                const newAttachment = attachment as FileMetaToUpload;
                const file_ = newAttachment._file as File;
                const url_ = await getFileImage(file_);
                setUrl(url_);
            } else {
                const attachment_ = attachment as FeatureAttachment;
                const { url: url_ } = getFeatureImage({
                    featureId,
                    resourceId,
                    attachment: attachment_,
                    height: height,
                    width: width,
                });
                setUrl(url_);
            }
        }
        fetchImage();
    }, []);

    console.log("success!")

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
                src={url}
                draggable={false}
            />
        </div>
    );
};
