import { action, computed, observable, observe } from "mobx";

import type { FocusTableStore } from "@nextgisweb/gui/focus-table";
import type * as apitype from "@nextgisweb/ogcfserver/type/api";
import type { CompositeStore } from "@nextgisweb/resource/composite";
import type {
    EditorStore,
    EditorStoreOptions,
} from "@nextgisweb/resource/type";

import { Collection } from "./Collection";

export interface Value {
    collections: apitype.OGCFServerCollection[];
}

export class ServiceStore
    implements EditorStore<Value>, FocusTableStore<Collection>
{
    readonly identity = "ogcfserver_service";
    readonly composite: CompositeStore;

    readonly collections = observable.array<Collection>([]);

    @observable.ref accessor dirty = false;
    @observable.ref accessor validate = false;

    constructor({ composite }: EditorStoreOptions) {
        this.composite = composite;
        observe(this.collections, () => this.markDirty());
    }

    @action
    load({ collections }: Value) {
        this.collections.replace(
            collections.map((v) => new Collection(this, v))
        );
        this.dirty = false;
    }

    dump() {
        if (!this.dirty) return undefined;
        return { collections: this.collections.map((i) => i.json()) };
    }

    @action
    markDirty() {
        this.dirty = true;
    }

    @computed
    get isValid(): boolean {
        return this.collections.every((i) => i.error === false);
    }

    @computed
    get counter() {
        return this.collections.length;
    }

    // FocusTableStore

    getItemChildren(item: Collection | null) {
        return item === null ? this.collections : undefined;
    }

    getItemContainer(item: Collection) {
        return item && this.collections;
    }

    getItemParent() {
        return null;
    }

    getItemError(item: Collection) {
        return item.error;
    }
}
