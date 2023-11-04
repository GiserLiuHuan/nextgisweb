import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { useState, useRef, useLayoutEffect } from "react";
import { FloatButton } from "antd";

import i18n from "@nextgisweb/pyramid/i18n";
import PhotosphereIcon from "@nextgisweb/icon/material/panorama";

import type { DataSource } from "../../attachment-editor/type";
import type { FeatureAttachment } from "../../type";
import { ImagePreview } from "./ImagePreview";

import "@splidejs/react-splide/css";
import "./CarouselRender.less";

interface CarouselRenderProps {
    attachment: FeatureAttachment;
    data: DataSource[];
    resourceId: number;
    featureId: number;
}

export function CarouselRender({
    data,
    attachment,
    resourceId,
    featureId,
}: CarouselRenderProps) {
    const [togglePanorama, setTogglePanorama] = useState(false);
    const imageList = data.filter((d) => {
        if ("is_image" in d) {
            return d.is_image;
        }
        return false;
    });
    const startSlide = imageList.indexOf(attachment);
    console.log(startSlide);
    const splider = useRef(null);
    useLayoutEffect(() => {
        if (splider.current) {
            console.log(splider.current.getBoundingClientRect().width);
            splider.current.splide.go(startSlide);
        }
    });
    return (
        <div className="SliderContainer">
            <FloatButton
                type={togglePanorama ? "primary" : "default"}
                tooltip={i18n.gettext("Panorama mode")}
                icon={<PhotosphereIcon />}
                onClick={() => {
                    setTogglePanorama(!togglePanorama);
                }}
            />

            <Splide
                ref={splider}
                options={{
                    type: "slide",
                    width: "100vw",
                    height: "100vh",
                    pagination: true,
                    drag: false,
                    perPage: 1,
                    perMove: 1,
                }}
                hasTrack={false}
            >
                <div className="splider-wrapper">
                    <SplideTrack>
                        {imageList.map((d, index) => {
                            const a = d as FeatureAttachment;
                            return (
                                <SplideSlide
                                    key={index}
                                    style={{ justifyContent: "center" }}
                                >
                                    <ImagePreview
                                        attachment={a}
                                        featureId={featureId}
                                        resourceId={resourceId}
                                        togglePanorama={togglePanorama}
                                    />
                                </SplideSlide>
                            );
                        })}
                    </SplideTrack>
                    <div
                        className="splide__arrows"
                        style={{ width: "100vw" }}
                    />
                </div>
            </Splide>
        </div>
    );
}
