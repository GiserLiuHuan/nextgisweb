import { Image } from "@nextgisweb/gui/antd";
import { Viewer } from "@photo-sphere-viewer/core";
import { useEffect, useRef } from "react";

import "@photo-sphere-viewer/core/index.css";

export type ImageModalProps = {
    url: string;
    projection: string | null;
    previewSize?: string;
    width?: number;
};

export const ImageModal = ({
    url,
    width = 80,
    previewSize,
}: ImageModalProps) => {
    const photosphereWrapper = useRef<HTMLDivElement | null>(null);

    previewSize = previewSize ?? `${width}x${width}`;

    useEffect(() => {
        let viewer: Viewer | undefined;
        if (photosphereWrapper.current) {
            viewer = new Viewer({
                container: photosphereWrapper.current,
                panorama: url,
                size: { height: "inherit", width: "inherit" },
            });
        }

        return () => {
            if (viewer) {
                viewer.destroy();
            }
        };
    }, [photosphereWrapper, url]);

    return (
        <Image
            width={width}
            src={`${url}?size=${previewSize}`}
            preview={{
                imageRender: () => (
                    <div
                        style={{ height: "100%", width: "100%" }}
                        ref={photosphereWrapper}
                    />
                ),
                toolbarRender: () => null,
            }}
        ></Image>
    );
};
