import type { ResourceItem as ResourceItemBase } from "@nextgisweb/resource/type/Resource";

declare module "@nextgisweb/resource/type/Resource" {
    export interface ResourceItem extends import("@nextgisweb/resource/type/Resource").ResourceItem {
        vector_layer?: { geometry_type: import("@nextgisweb/feature-layer/type/GeometryType").GeometryType; srs: { id: number } };
    }
}