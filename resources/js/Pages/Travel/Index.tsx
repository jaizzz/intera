import { useState, useMemo, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

import { TRAVELS } from "@/data/travel";
import AppLayout from "@/Layouts/AppLayout";
import AppFooter from "@/Components/app/AppFooter";
import FloatingChat from "@/Components/ui/FloatingChat";
import Button from "@/Components/ui/button/Button";
import FilterBar from "@/Components/filter/FilterBar";

import { FaMapMarkerAlt, FaTimes, FaPhone } from "react-icons/fa";
import EmptyState from "@/Components/ui/EmptyState";

export default function Index() {
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const qSearch = params.get("search");
        const qCountry = params.get("country");

        if (qSearch) setSearch(qSearch);
        if (qCountry) setSelectedCountries([qCountry]);
    }, []);

    const countries = useMemo(() => {
        const set = new Set<string>();
        TRAVELS.forEach((t) => {
            const parts = t.country.split(", ");
            set.add(parts[parts.length - 1]);
        });

        return Array.from(set)
            .sort()
            .map((c) => ({ value: c, label: c }));
    }, []);

    const filteredTravels = useMemo(() => {
        return TRAVELS.filter((t) => {
            const matchesSearch =
                t.name.toLowerCase().includes(search.toLowerCase()) ||
                t.country.toLowerCase().includes(search.toLowerCase());

            const country = t.country.split(", ").pop();
            const matchesCountry =
                selectedCountries.length === 0 ||
                selectedCountries.includes(country!);

            return matchesSearch && matchesCountry;
        });
    }, [search, selectedCountries]);

    const totalActiveFilters =
        selectedCountries.length + (search ? 1 : 0);

    return (
        <AppLayout>
            <Head title={`${t('travel_page.title')} - Intera Travel`} />

            <div className="bg-gray-50 min-h-screen pt-32 lg:pt-36 pb-20">
                <div className="w-full mx-auto px-4 lg:px-12">

                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-6 w-1 bg-primary rounded-full"></div>
                            <span className="text-primary font-semibold uppercase tracking-widest text-xs">
                                {t('travel_page.agency')}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            {t('travel_page.title')}
                        </h1>

                        <p className="text-gray-500 mt-3">
                            {t('travel_page.subtitle')}
                        </p>
                    </div>

                    {/* FILTER */}
                    <div className="sticky top-24 z-40 bg-gray-50 pb-4">
                        <div className="flex flex-col gap-4">

                            <FilterBar
                                search={{
                                    value: search,
                                    onChange: setSearch,
                                    placeholder: t('travel_page.search_placeholder'),
                                }}
                                filters={[
                                    {
                                        label: t('hero.country_label'),
                                        value: selectedCountries,
                                        options: countries,
                                        onChange: setSelectedCountries,
                                    },
                                ]}
                                className="w-full"
                            />

                            {/* ACTIVE FILTER */}
                            {totalActiveFilters > 0 && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm text-gray-500">
                                        {t('explore.active_filters')}
                                    </span>

                                    {search && (
                                        <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                            {search}
                                            <button onClick={() => setSearch("")}>
                                                <FaTimes />
                                            </button>
                                        </div>
                                    )}

                                    {selectedCountries.map((c) => (
                                        <div
                                            key={c}
                                            className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                                        >
                                            {c}
                                            <button
                                                onClick={() =>
                                                    setSelectedCountries((prev) =>
                                                        prev.filter((v) => v !== c)
                                                    )
                                                }
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => {
                                            setSelectedCountries([]);
                                            setSearch("");
                                        }}
                                        className="ml-2 text-xs font-semibold text-gray-500 hover:text-primary"
                                    >
                                        {t('explore.reset')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RESULT */}
                    <div className="flex items-center justify-between mt-6 mb-8">
                        <p className="text-sm text-gray-500">
                            {t('travel_page.showing')}{" "}
                            <span className="font-semibold text-gray-900">
                                {filteredTravels.length}
                            </span>{" "}
                            {t('travel_page.services')}
                        </p>
                    </div>

                    {/* GRID */}
                    {filteredTravels.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredTravels.map((item) => (
                                <div
                                    key={item.id}
                                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                                >
                                    <div className="relative aspect-4/3 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                            {item.name}
                                        </h3>

                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <FaMapMarkerAlt className="text-primary shrink-0" />
                                            <span className="line-clamp-1">
                                                {item.country}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                            {item.address}
                                        </p>

                                        <div className="mt-auto">
                                            <a href={`tel:${item.contact}`}>
                                                <Button className="w-full mt-4 flex items-center justify-center gap-2">
                                                    <FaPhone />
                                                    {t('travel_page.contact')}
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </div>

            <AppFooter />
            <FloatingChat isAuthenticated={true} />
        </AppLayout>
    );
}