import { useState } from "react";
import { FloatButton, Carousel } from "@nextgisweb/gui/antd";

import i18n from "@nextgisweb/pyramid/i18n";
import PhotosphereIcon from "@nextgisweb/icon/material/panorama";
import ArrowBack from "@nextgisweb/icon/material/arrow_back";
import ArrowForward from "@nextgisweb/icon/material/arrow_forward";
import { ImagePreview } from "./ImagePreview";

import type { DataSource } from "../../attachment-editor/type";
import type { FeatureAttachment } from "../../type";

// import "@splidejs/react-splide/css";
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
    // based on https://github.com/akiran/react-slick/issues/1195#issuecomment-1746192879
    const SlickButtonFix = (
        props: {
            children: JSX.Element;
        } & object
    ) => {
        const { children, ...otherProps } = props;
        return <span {...otherProps}>{children}</span>;
    };

    const [togglePanorama, setTogglePanorama] = useState(false);
    const imageList = data.filter((d) => {
        if ("is_image" in d) {
            return d.is_image;
        }
        return false;
    });
    const [start] = useState(() =>
        imageList.findIndex((l: FeatureAttachment) => l.id === attachment.id)
    );
    return (
        <div className="carousel-container">
            <FloatButton
                type={togglePanorama ? "primary" : "default"}
                tooltip={i18n.gettext("Panorama mode")}
                icon={<PhotosphereIcon />}
                onClick={() => {
                    setTogglePanorama(!togglePanorama);
                }}
            />
            <Carousel
                initialSlide={start}
                arrows={true}
                dots={true}
                nextArrow={
                    <SlickButtonFix>
                        <ArrowForward
                            className="arrow-forward"
                            style={{
                                position: "absolute",
                                right: "32px",
                                fontSize: "32px",
                                color: "white",
                                zIndex: "100",
                                backgroundColor: "#00000073",
                                borderRadius: "100%",
                            }}
                        />
                    </SlickButtonFix>
                }
                prevArrow={
                    <SlickButtonFix>
                        <ArrowBack
                            className="arrow-backward"
                            style={{
                                position: "absolute",
                                left: "32px",
                                fontSize: "32px",
                                color: "white",
                                zIndex: "100",
                                backgroundColor: "#00000073",
                                borderRadius: "100%",
                            }}
                        />
                    </SlickButtonFix>
                }
            >
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
