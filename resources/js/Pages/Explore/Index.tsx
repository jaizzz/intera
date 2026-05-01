import { useState, useMemo, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";

import { DESTINATIONS } from "@/data/destination";
import AppLayout from "@/Layouts/AppLayout";
import AppFooter from "@/Components/app/AppFooter";
import FloatingChat from "@/Components/ui/FloatingChat";
import Button from "@/Components/ui/button/Button";
import FilterBar from "@/Components/filter/FilterBar";

import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import EmptyState from "@/Components/ui/EmptyState";

export default function Index() {
    const [search, setSearch] = useState("");
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const qSearch = params.get("search");
        const qCountry = params.get("country");
        const qTag = params.get("tag");

        if (qSearch) setSearch(qSearch);
        if (qCountry) setSelectedCountries([qCountry]);
        if (qTag) setSelectedTags([qTag]);
    }, []);

    const countries = useMemo(() => {
        const set = new Set<string>();
        DESTINATIONS.forEach((d) => {
            const parts = d.country.split(", ");
            set.add(parts[parts.length - 1]);
        });
        return Array.from(set)
            .sort()
            .map((c) => ({ value: c, label: c }));
    }, []);

    const tags = useMemo(() => {
        return Array.from(new Set(DESTINATIONS.map((d) => d.tag)))
            .sort()
            .map((t) => ({ value: t, label: t }));
    }, []);

    const filteredDestinations = useMemo(() => {
        return DESTINATIONS.filter((d) => {
            const matchesSearch =
                d.title.toLowerCase().includes(search.toLowerCase()) ||
                d.country.toLowerCase().includes(search.toLowerCase());

            const country = d.country.split(", ").pop();
            const matchesCountry =
                selectedCountries.length === 0 ||
                selectedCountries.includes(country!);

            const matchesTag =
                selectedTags.length === 0 || selectedTags.includes(d.tag);

            return matchesSearch && matchesCountry && matchesTag;
        });
    }, [search, selectedCountries, selectedTags]);

    const totalActiveFilters =
        selectedCountries.length + selectedTags.length + (search ? 1 : 0);

    return (
        <AppLayout>
            <Head title="Explore Destinations - Intera Travel" />

            <div className="bg-gray-50 min-h-screen pt-32 lg:pt-36 pb-20">
                <div className="w-full mx-auto px-4 lg:px-12">

                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-6 w-1 bg-primary rounded-full"></div>
                            <span className="text-primary font-semibold uppercase tracking-widest text-xs">
                                Discover
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Explore Destinations
                        </h1>

                        <p className="text-gray-500 mt-3">
                            Temukan destinasi terbaik dari seluruh dunia yang sudah kami kurasi untuk pengalaman terbaik.
                        </p>
                    </div>

                    {/* 🔥 STICKY FILTER BAR */}
                    <div className="sticky top-24 z-40 bg-gray-50 pb-4">
                        <div className="flex flex-col gap-4">

                            <FilterBar
                                search={{
                                    value: search,
                                    onChange: setSearch,
                                    placeholder: "Cari destinasi...",
                                }}
                                filters={[
                                    {
                                        label: "Negara",
                                        value: selectedCountries,
                                        options: countries,
                                        onChange: setSelectedCountries,
                                    },
                                    {
                                        label: "Kategori",
                                        value: selectedTags,
                                        options: tags,
                                        onChange: setSelectedTags,
                                    },
                                ]}
                                className="w-full"
                            />

                            {/* 🔥 ACTIVE FILTER INFO */}
                            {totalActiveFilters > 0 && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm text-gray-500">
                                        Filter aktif:
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

                                    {selectedTags.map((t) => (
                                        <div
                                            key={t}
                                            className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                                        >
                                            {t}
                                            <button
                                                onClick={() =>
                                                    setSelectedTags((prev) =>
                                                        prev.filter((v) => v !== t)
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
                                            setSelectedTags([]);
                                            setSearch("");
                                        }}
                                        className="ml-2 text-xs font-semibold text-gray-500 hover:text-primary"
                                    >
                                        Reset
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Result Info */}
                    <div className="flex items-center justify-between mt-6 mb-8">
                        <p className="text-sm text-gray-500">
                            Menampilkan{" "}
                            <span className="font-semibold text-gray-900">
                                {filteredDestinations.length}
                            </span>{" "}
                            destinasi
                        </p>
                    </div>

                    {/* Grid */}
                    {filteredDestinations.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredDestinations.map((item) => (
                                <div
                                    key={item.id}
                                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                                >
                                    <div className="relative aspect-4/3 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                            {item.tag}
                                        </span>
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                            {item.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <FaMapMarkerAlt className="text-primary shrink-0" />
                                            <span className="line-clamp-1">
                                                {item.country}
                                            </span>
                                        </div>

                                        <div className="mt-auto">
                                            <Link href={`/destination/${item.id}`}>
                                                <Button className="w-full mt-4">
                                                    View Details
                                                </Button>
                                            </Link>
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