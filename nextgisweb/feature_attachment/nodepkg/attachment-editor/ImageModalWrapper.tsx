import { observer } from "mobx-react-lite";
import { ImageModal } from "../../../gui/nodepkg/image-modal";

import  { ImageModalProps } from "../../../gui/nodepkg/image-modal";

export const ImageModalWrapper = observer(({ url, projection, previewSize }: ImageModalProps) => {
    return <ImageModal
        {...{ url, projection, previewSize }}
    />
})