import { useEffect, useState, useRef, useMemo } from "react";
import debounce from "lodash/debounce";

import { Input, AutoComplete } from "@nextgisweb/gui/antd";
import { route, routeURL } from "@nextgisweb/pyramid/api";
import { useAbortController } from "@nextgisweb/pyramid/hook/useAbortController";
import i18n from "@nextgisweb/pyramid/i18n";

import type { ParamsOf } from "@nextgisweb/gui/type";
import type { ResourceItem, ResourceClass } from "../type/Resource";

import "./ResourcesFilter.less";

type AutoProps = ParamsOf<typeof AutoComplete>;

interface ResourcesFilterProps extends AutoProps {
    onChange?: AutoProps["onSelect"];
    cls?: ResourceClass;
}

const resourcesToOptions = (resourcesInfo: ResourceItem[]) => {
    return resourcesInfo.map((resInfo) => {
        const { resource } = resInfo;
        const resourceUrl = routeURL("resource.show", {
            id: resource.id,
        });

        return {
            value: `${resource.display_name}`,
            key: `${resource.id}`,
            url: resourceUrl,
            label: (
                <div
                    className="item"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                    }}
                >
                    <svg className="icon">
                        <use xlinkHref={`#icon-rescls-${resource.cls}`} />
                    </svg>
                    <span className="title" title={resource.display_name}>
                        {resource.display_name}
                    </span>
                </div>
            ),
        };
    });
};

export function ResourcesFilter({
    onChange,
    cls,
    ...rest
}: ResourcesFilterProps) {
    const { makeSignal, abort } = useAbortController();
    const [options, setOptions] = useState<AutoProps["options"]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [acStatus, setAcSatus] = useState<AutoProps["status"]>("");

    const makeQuery = useMemo(() => {
        if (search && search.length > 2) {
            const q = "";
            if (search) {
                const query: Record<string, string> = {
                    display_name__ilike: `%${search}%`,
                };
                if (cls) {
                    query.cls = cls;
                }
                return query;
            }
            return q;
        }
        return null;
    }, [search, cls]);

    const makeSearchRequest = useRef(
        debounce(async ({ query: q }) => {
            setLoading(true);
            try {
                abort();
                const resources = await route("resource.search").get<
                    ResourceItem[]
                >({ query: q, signal: makeSignal() });
                const options = resourcesToOptions(resources);
                setOptions(options);
                setAcSatus("");
            } catch (er) {
                setAcSatus("error");
            } finally {
                setLoading(false);
            }
        }, 1000)
    );

    useEffect(() => {
        if (makeQuery) {
            makeSearchRequest.current({ query: makeQuery });
        } else {
            setOptions([]);
        }
    }, [makeQuery]);

    const onSelect: AutoProps["onSelect"] = (v, opt) => {
        if (onChange) {
            onChange(v, opt);
        }
    };

    return (
        <AutoComplete
            popupClassName="ngw-resource-resource-filter-dropdown"
            dropdownMatchSelectWidth={290}
            style={{ width: "100%" }}
            onSelect={onSelect}
            options={options}
            status={acStatus}
            notFoundContent={i18n.gettext("Resources not found")}
            {...rest}
        >
            <Input.Search
                size="middle"
                placeholder={i18n.gettext("Search resources")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                loading={loading}
                autoComplete="one-time-code"
            />
        </AutoComplete>
    );
}