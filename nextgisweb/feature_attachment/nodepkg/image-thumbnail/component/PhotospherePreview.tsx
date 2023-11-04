import { Viewer } from "@photo-sphere-viewer/core";
import { useEffect, useRef } from "react";

import "@photo-sphere-viewer/core/index.css";
import "./PhotospherePreview.less";

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
                navbar: ["zoom", "fullscreen"],
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
            style={{ height: "100vh", width: "100vw", pointerEvents: "auto" }}
            ref={photosphereWrapper}
        />
    );
}
