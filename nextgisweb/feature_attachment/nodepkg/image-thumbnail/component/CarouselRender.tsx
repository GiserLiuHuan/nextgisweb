import { Suspense, lazy, useState } from "react";
import type { CSSProperties } from "react";

import { Carousel, FloatButton, Image, Spin } from "@nextgisweb/gui/antd";
import i18n from "@nextgisweb/pyramid/i18n";

import type { DataSource } from "../../attachment-editor/type";
import type { FeatureAttachment } from "../../type";
import { GetFeatureImage } from "../util/GetFeatureImage";

import { LoadingOutlined } from "@ant-design/icons";
import ArrowBack from "@nextgisweb/icon/material/arrow_back";
import ArrowForward from "@nextgisweb/icon/material/arrow_forward";
import PhotosphereIcon from "@nextgisweb/icon/material/panorama";

// import "@splidejs/react-splide/css";
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

    const urlPanoramas = imageList.map((d) => {
        const a = d as FeatureAttachment;
        return GetFeatureImage({
            attachment: a,
            resourceId,
            featureId,
        });
    });
    const [visibility, setVisibility] = useState<CSSProperties>(() => {
        return urlPanoramas[start].isPanorama
            ? { visibility: "visible" }
            : { visibility: "hidden" };
    });
    return (
        <div className="ngw-feature-attachment-carousel-container">
            <FloatButton
                type={togglePanorama ? "primary" : "default"}
                style={visibility}
                tooltip={
                    togglePanorama
                        ? i18n.gettext("Exit panorama mode")
                        : i18n.gettext("Panorama mode")
                }
                icon={<PhotosphereIcon />}
                onClick={() => {
                    setTogglePanorama(!togglePanorama);
                }}
            />
            <Carousel
                initialSlide={start}
                arrows={true}
                dots={true}
                lazyLoad="progressive"
                afterChange={(currentSlide) => {
                    setVisibility(
                        urlPanoramas[currentSlide].isPanorama
                            ? { visibility: "visible" }
                            : { visibility: "hidden" }
                    );
                }}
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
                                pointerEvents: "all",
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
                                pointerEvents: "all",
                            }}
                        />
                    </SlickButtonFix>
                }
            >
                {urlPanoramas.map(({ url, isPanorama }, index) => {
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
                                                    style={{ fontSize: 24 }}
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
