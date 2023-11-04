import { observer } from "mobx-react-lite";
import { ImageModal } from "@nextgisweb/gui/image-modal";

import type { ImageModalProps } from "@nextgisweb/gui/image-modal";

export const ImageModalWrapper = observer(
    ({ url, projection, previewSize }: ImageModalProps) => {
        return <ImageModal {...{ url, projection, previewSize }} />;
    }
);
