// WIP for new files
export function getFileImage(file: File) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = function () {
            if (typeof fr.result === "string") {
                resolve(fr.result);
            } else {
                reject(new Error("unreachable"));
            }
        };
    });
}
