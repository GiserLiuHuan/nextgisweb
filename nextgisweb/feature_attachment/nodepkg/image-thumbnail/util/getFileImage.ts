// WIP for new files

export function getFileImage(file: File) {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function () {
        if (typeof fr.result === "string") {
            return fr.result;
        } else {
            throw new Error("unreachable");
        }
    };

}
