import { Head, Link } from "@inertiajs/react";
import { DESTINATIONS } from "@/data/destination";

import AppLayout from "@/Layouts/AppLayout";
import AppFooter from "@/Components/app/AppFooter";
import FloatingChat from "@/Components/ui/FloatingChat";
import Button from "@/Components/ui/button/Button";

import {
    FaMapMarkerAlt,
    FaChevronLeft,
    FaRegCalendar,
    FaRegClock,
    FaCheck,
} from "react-icons/fa";

interface Props {
    id: string | number;
}

export default function Show({ id }: Props) {
    const destination = DESTINATIONS.find(
        (d) => d.id.toString() === id.toString(),
    );

    if (!destination) {
        return (
            <AppLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Destination Not Found
                        </h1>
                        <Link
                            href="/"
                            className="mt-4 text-primary hover:underline inline-block"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title={`${destination.title} - Intera`} />

            <div className="bg-gray-50 min-h-screen pt-24 md:pt-28 lg:pt-32 pb-12">
                <div className="mx-auto px-4 lg:px-12">
                    {/* Breadcrumbs / Back button */}
                    <div className="mb-8">
                        <Link
                            href="/explore"
                            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors font-semibold group"
                        >
                            <FaChevronLeft className="mr-2 text-sm transition-transform group-hover:-translate-x-1" />
                            Kembali ke Jelajah
                        </Link>
                    </div>

                    <div className="md:bg-white rounded-3xl md:shadow-sm md:border md:border-gray-100 overflow-hidden">
                        {/* Hero Image Section */}
                        <div className="relative h-[400px] md:h-[600px] w-full">
                            <img
                                src={destination.image}
                                alt={destination.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-4 right-4 lg:left-8 lg:right-8 text-white">
                                <div className="inline-block bg-white/40 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                                    {destination.tag}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                    {destination.title}
                                </h1>
                                <div className="flex items-center text-white/90">
                                    <FaMapMarkerAlt className="mr-2" />
                                    {destination.country}
                                </div>
                            </div>
                        </div>

                        <div className="py-6 md:p-4 lg:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                {/* Left Column: Description and Facilities */}
                                <div className="lg:col-span-2">
                                    <section className="mb-12">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                                            Tentang Destinasi
                                        </h2>
                                        <div className="text-gray-600 leading-relaxed">
                                            <p>{destination.description}</p>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                                            Fasilitas yang Tersedia
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {destination.facilities.map(
                                                (fac, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                            <FaCheck className="text-primary text-xs" />
                                                        </div>
                                                        <span className="text-gray-700 font-medium">
                                                            {fac}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </section>
                                </div>

                                {/* Right Column: Info Wisata and Map */}
                                <div className="space-y-8">
                                    {/* Info Wisata Card */}
                                    <div className="lg:bg-white lg:rounded-3xl lg:p-8 lg:border lg:border-gray-100 lg:shadow-xl lg:shadow-gray-200/50">
                                        <h3 className="text-xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
                                            Informasi Wisata
                                        </h3>
                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                                    <FaRegCalendar className="text-primary text-lg" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">
                                                        Operasional
                                                    </p>
                                                    <p className="text-gray-600 text-sm mt-1">
                                                        {destination.info.operasional}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                                    <FaRegClock className="text-primary text-lg" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">
                                                        Jam Buka
                                                    </p>
                                                    <p className="text-gray-600 text-sm mt-1">
                                                        {destination.info.jam}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            size="md"
                                            className="w-full mt-6"
                                        >
                                            Pesan Sekarang
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Map Card */}
                            <div className="mt-12">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">
                                    Lokasi
                                </h3>

                                <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                                    <iframe
                                        title={`Peta lokasi ${destination.title}`}
                                        src={destination.mapUrl}
                                        className="w-full h-full"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AppFooter />
            <FloatingChat isAuthenticated={true} />
        </AppLayout>
    );
}
