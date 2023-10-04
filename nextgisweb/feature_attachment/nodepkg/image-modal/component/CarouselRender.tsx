import { useState } from "react";
import { FloatButton, Carousel } from "@nextgisweb/gui/antd";

import i18n from "@nextgisweb/pyramid/i18n";
import PhotosphereIcon from "@nextgisweb/icon/material/panorama";
import { ImagePreview } from "./ImagePreview";

import type { DataSource } from "../../attachment-editor/type";
import type { FeatureAttachment } from "../../type";

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
    const [start] = useState(() =>
        imageList.findIndex((l) => l.id === attachment.id)
    );
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
            <Carousel initialSlide={start}>
                {imageList.map((d, index) => {
                    const a = d as FeatureAttachment;
                    return (
                        <ImagePreview
                            key={index}
                            attachment={a}
                            featureId={featureId}
                            resourceId={resourceId}
                            togglePanorama={togglePanorama}
                        />
                    );
                })}
            </Carousel>
        </div>
    );
}
