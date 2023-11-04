import { useEffect, useRef} from "react";

import { Viewer } from "@photo-sphere-viewer/core";

import "@photo-sphere-viewer/core/index.css";

interface PhotospherePreviewProps {
    url: string;
}

export default function PhotospherePreview({ url }: PhotospherePreviewProps) {
    const photosphereWrapper = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let viewer: Viewer | undefined;
        if (photosphereWrapper.current) {
            viewer = new Viewer({
                container: photosphereWrapper.current,
                panorama: url,
                size: { height: "100vh", width: "100vw" },
            });
        }

        return () => {
            if (viewer) {
                viewer.destroy();
            }
        };
    }, [photosphereWrapper, url]);

    return (
        <div
            style={{ height: "100vh", width: "100vw" }}
            ref={photosphereWrapper}
        />
    );
}
