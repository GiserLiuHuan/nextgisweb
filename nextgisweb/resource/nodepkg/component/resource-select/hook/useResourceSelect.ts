import { useEffect, useState } from "react";

import { route } from "@nextgisweb/pyramid/api";
import { useAbortController } from "@nextgisweb/pyramid/hook/useAbortController";
import type { CompositeRead } from "@nextgisweb/resource/type/api";

import type { SelectValue } from "../../resource-picker/type";
import type { ResourceSelectProps } from "../type";

export function useResourceSelect<V extends SelectValue = SelectValue>({
    value,
}: ResourceSelectProps<V>) {
    const { makeSignal, abort } = useAbortController();

    const [resource, setResource] = useState<CompositeRead | null>(null);
    const [isLoading, setIsLoading] = useState(typeof value === "number");
    const [error, setError] = useState<NonNullable<unknown> | null>(null);

    useEffect(() => {
        const loadResource = async () => {
            abort();
            if (typeof value === "number") {
                try {
                    setIsLoading(true);
                    const res = await route("resource.item", value).get({
                        cache: true,
                        signal: makeSignal(),
                    });
                    setResource(res);
                } catch (err) {
                    setError(err!);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        loadResource();
    }, [abort, makeSignal, value]);

    return { resource, isLoading, error };
}
