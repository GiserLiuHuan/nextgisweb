import type { ShowModalOptions } from "package/nextgisweb/nextgisweb/gui/nodepkg/showModal";

import { Modal } from "@nextgisweb/gui/antd";

import type { DataSource } from "../../attachment-editor/type";
import type { FeatureAttachment } from "../../type";

import { CarouselRender } from "./CarouselRender";

import Close from "@nextgisweb/icon/material/close";

interface CarouselModalOptions extends ShowModalOptions {
    dataSource: DataSource[];
    attachment: FeatureAttachment;
    featureId: number;
    resourceId: number;
}

export const CarouselModal = ({
    open,
    close,
    dataSource,
    attachment,
    featureId,
    resourceId,
}: CarouselModalOptions) => {
    return (
        <Modal
            className="ngw-feature-attachment-carousel-modal"
            open={open}
            destroyOnClose
            footer={null}
            mask={true}
            maskClosable={true}
            closeIcon={
                <Close
                    style={{
                        fontSize: "32px",
                        color: "white",
                        backgroundColor: "#00000073",
                        borderRadius: "100%",
                    }}
                />
            }
            onCancel={close}
        >
            <CarouselRender
                data={dataSource}
                attachment={attachment}
                resourceId={resourceId}
                featureId={featureId}
            ></CarouselRender>
        </Modal>
    );
};
