import { useEffect, useRef, Suspense } from "react";

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
                size: { height: "inherit", width: "inherit" },
            });
        }

        return () => {
            if (viewer) {
                viewer.destroy();
            }
        };
    }, [photosphereWrapper, url]);

    return (
        <Suspense>
            <div
                style={{ height: "100%", width: "100%" }}
                ref={photosphereWrapper}
            />
        </Suspense>
    );
}
