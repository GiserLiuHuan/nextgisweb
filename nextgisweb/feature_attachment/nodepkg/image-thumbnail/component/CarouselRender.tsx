import { Suspense, lazy, useState, CSSProperties } from "react";

import { Carousel, FloatButton, Image, Spin } from "@nextgisweb/gui/antd";
import { gettext } from "@nextgisweb/pyramid/i18n";

import type { DataSource } from "../../attachment-editor/type";
import type { FeatureAttachment } from "../../type";
import { getFeatureImage } from "../util/getFeatureImage";

import { LoadingOutlined } from "@ant-design/icons";
import ArrowBack from "@nextgisweb/icon/material/arrow_back";
import ArrowForward from "@nextgisweb/icon/material/arrow_forward";
import PhotosphereIcon from "@nextgisweb/icon/material/panorama";
1
import "./CarouselRender.less";

const PhotospherePreview = lazy(() => import("./PhotospherePreview"));

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
            currentSlide?: number;
            slideCount?: number;
        } & object
    ) => {
        const { children, ...otherProps } = props;
        delete otherProps.currentSlide;
        delete otherProps.slideCount;

        return <div {...otherProps}>{children}</div>;
    };

    const arrowStyle: CSSProperties = {
        position: "absolute",
        fontSize: "32px",
        color: "white",
        zIndex: "100",
        backgroundColor: "#00000073",
        borderRadius: "100%",
        pointerEvents: "all",
    };

    const [togglePanorama, setTogglePanorama] = useState(false);

    const imageList = data.filter((d) => {
        if ("is_image" in d) {
            return d.is_image;
        }
        return false;
    });
    const [start] = useState(() =>
        imageList.findIndex((d) => {
            const image = d as FeatureAttachment;
            return image.id === attachment.id;
        })
    );

    const imageUrlIsPanorama = imageList.map((d) => {
        const a = d as FeatureAttachment;
        return getFeatureImage({
            attachment: a,
            resourceId,
            featureId,
        });
    });
    const [visibility, setVisibility] = useState<boolean>(() => {
        return imageUrlIsPanorama[start].isPanorama;
    });
    const tooltipToggled = gettext("Exit panorama mode");
    const tooltipNotToggled = gettext("Panorama mode");
    return (
        <div className="ngw-feature-attachment-carousel-container">
            {visibility ? (
                <FloatButton
                    type={togglePanorama ? "primary" : "default"}
                    tooltip={
                        togglePanorama ? tooltipToggled : tooltipNotToggled
                    }
                    icon={<PhotosphereIcon />}
                    onClick={() => {
                        setTogglePanorama(!togglePanorama);
                    }}
                />
            ) : null}

            <Carousel
                initialSlide={start}
                arrows={true}
                dots={true}
                lazyLoad="progressive"
                beforeChange={(oldSlide, currentSlide) => {
                    setVisibility(imageUrlIsPanorama[currentSlide].isPanorama);
                }}
                nextArrow={
                    <SlickButtonFix>
                        <ArrowForward
                            className="arrow-forward"
                            style={{ ...arrowStyle, right: "32px" }}
                        />
                    </SlickButtonFix>
                }
                prevArrow={
                    <SlickButtonFix>
                        <ArrowBack
                            className="arrow-backward"
                            style={{ ...arrowStyle, left: "32px" }}
                        />
                    </SlickButtonFix>
                }
            >
                {imageUrlIsPanorama.map(({ url, isPanorama }, index) => {
                    return (
                        <div
                            className={"ngw-feature-attachment-carousel-slide"}
                            key={index}
                            style={{ height: "100vh", width: "100vw" }}
                        >
                            {togglePanorama && isPanorama ? (
                                <Suspense
                                    fallback={
                                        <Spin
                                            indicator={
                                                <LoadingOutlined
                                                    style={{
                                                        fontSize: 24,
                                                        color: "white",
                                                    }}
                                                    spin={true}
                                                />
                                            }
                                        />
                                    }
                                >
                                    <PhotospherePreview url={url} />;
                                </Suspense>
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        pointerEvents: "auto",
                                    }}
                                >
                                    <Image
                                        src={url}
                                        preview={false}
                                        style={{ maxHeight: "100vh" }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
}
