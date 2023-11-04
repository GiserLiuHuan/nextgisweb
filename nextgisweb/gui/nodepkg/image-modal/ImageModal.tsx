import { Image, Modal } from "@nextgisweb/gui/antd";
import { Viewer } from "@photo-sphere-viewer/core";
import { lazy, Suspense, useLayoutEffect, useState, useEffect, useRef, ReactNode, MutableRefObject } from "react"
import { ReactComponentLike } from "prop-types"

import "@photo-sphere-viewer/core/index.css"
import { observable } from "mobx";

export type ImageModalProps = {
    url: string,
    projection: string | null;
    previewSize: string;
}



export const ImageModal = ({ url, projection, previewSize }: ImageModalProps) => {
    const photosphereWrapper = useRef<HTMLDivElement | null>(null);
    // const viewerSaved = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        console.log("rendering");
        let viewer: Viewer | undefined;
        console.log(url, projection)
        if (photosphereWrapper.current) {
            viewer = new Viewer({
                container: photosphereWrapper.current,
                panorama: url,
                size: { height: "inherit", width: "inherit" },
            });

        }

        return () => {
            if (viewer) {
                viewer.destroy()
            }

        };
    }, [photosphereWrapper]);

    // const ImagePreview = ({ ...props}) => {

    // }


    return (
        <Image
            width={80}
            src={`${url}?size=${previewSize}`}
            preview={{
                imageRender: () => (
                    <div
                        id="photosphereContainer"
                        style={{ height: '100%', width: '100%' }}
                        ref={photosphereWrapper} />

                ),
                toolbarRender: () => null
            }}
        >

        </Image>
    )
}