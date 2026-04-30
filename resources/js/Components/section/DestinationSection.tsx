import { useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import { FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaRegCalendar, FaRegClock, FaTicketAlt, FaCheck } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Button from "@/Components/ui/button/Button";

import { DESTINATIONS } from "@/data/destination";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";


export default function DestinationSection() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState<typeof DESTINATIONS[0] | null>(null);

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const handleViewDetails = (destination: typeof DESTINATIONS[0]) => {
        setSelectedDestination(destination);
    };

    return (
        <section className="py-20 px-4 lg:px-12 bg-white overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        <span className="text-primary">Explore</span> Popular Destinations
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 max-w-xl">
                        Discover breathtaking destinations from Japan and Indonesia,
                        curated for unforgettable travel experiences.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Custom Nav Arrows */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        disabled={isBeginning}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all
                            ${isBeginning
                                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                                : "border-gray-300 text-gray-600 hover:bg-primary hover:border-primary hover:text-white"
                            }`}
                        aria-label="Previous slide"
                    >
                        <FaChevronLeft className="text-xs" />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        disabled={isEnd}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all
                            ${isEnd
                                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                                : "border-gray-300 text-gray-600 hover:bg-primary hover:border-primary hover:text-white"
                            }`}
                        aria-label="Next slide"
                    >
                        <FaChevronRight className="text-xs" />
                    </button>

                    <button className="text-sm px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
                        Explore All
                    </button>
                </div>
            </div>

            {/* Swiper Carousel */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onSlideChange={handleSlideChange}
                slidesPerView={1}
                spaceBetween={24}
                autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                pagination={{
                    clickable: true,
                    el: ".destination-pagination",
                    bulletClass: "destination-bullet",
                    bulletActiveClass: "destination-bullet-active",
                }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="!overflow-visible"
            >
                {DESTINATIONS.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Image */}
                            <div className="relative aspect-4/3 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Tag Badge */}
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                    {item.tag}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                    <FaMapMarkerAlt className="text-primary shrink-0" />
                                    {item.country}
                                </div>
                                <Button className="mt-5 w-full" onClick={() => handleViewDetails(item)}>
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination Dots */}
            <div className="destination-pagination flex justify-center gap-2 mt-8 [&_.destination-bullet]:w-2 [&_.destination-bullet]:h-2 [&_.destination-bullet]:rounded-full [&_.destination-bullet]:bg-gray-300 [&_.destination-bullet]:cursor-pointer [&_.destination-bullet]:transition-all [&_.destination-bullet-active]:w-6 [&_.destination-bullet-active]:bg-primary" />

            {/* Slide counter */}
            <p className="text-center text-xs text-gray-400 mt-3">
                {activeIndex + 1} / {DESTINATIONS.length}
            </p>

            {/* Detail Section Modal / Full Screen Overlay */}
            {selectedDestination && (
                <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
                    {/* Header bar with back button */}
                    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-4 lg:px-12 flex items-center">
                        <button 
                            onClick={() => setSelectedDestination(null)}
                            className="flex items-center text-gray-700 hover:text-primary transition-colors font-semibold"
                        >
                            <FaChevronLeft className="mr-2" />
                            Kembali
                        </button>
                        <div className="font-bold text-gray-900 border-l-2 pl-4 border-gray-300 ml-4 hidden sm:block">
                            {selectedDestination.title}
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto py-8 px-4 lg:px-12">
                        {/* Detail Image */}
                        <div className="w-full h-[400px] md:h-[500px] overflow-hidden mb-8">
                            <img 
                                src={selectedDestination.image} 
                                alt={selectedDestination.title} 
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>

                        {/* Title and Location */}
                        <div className="mb-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{selectedDestination.title}</h2>
                            <div className="flex items-center text-primary font-medium">
                                <FaMapMarkerAlt className="mr-2" />
                                {selectedDestination.country}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-10 text-gray-700 leading-relaxed text-lg">
                            <p>{selectedDestination.description}</p>
                            <a href={selectedDestination.routeUrl} className="inline-block mt-4 text-green-600 font-semibold hover:text-green-700 transition">
                                Lihat rute
                            </a>
                        </div>

                        {/* Info Wisata & Checklist container*/}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Info Wisata Card */}
                            <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Informasi Wisata</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <FaRegCalendar className="text-green-600 text-xl shrink-0 mt-1" />
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">Operasional</p>
                                            <p className="text-gray-600 text-sm mt-1">{selectedDestination.info.operasional}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <FaRegClock className="text-green-600 text-xl shrink-0 mt-1" />
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">Jam</p>
                                            <p className="text-gray-600 text-sm mt-1">{selectedDestination.info.jam}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <FaTicketAlt className="text-green-600 text-xl shrink-0 mt-1" />
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">Harga Tiket Masuk</p>
                                            <p className="text-gray-600 text-sm mt-1">{selectedDestination.info.hargaTiket}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Facilities and Map Area */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3 border-gray-100">Apa aja yang ada disini?</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedDestination.facilities.map((fac, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <FaCheck className="text-green-600 shrink-0" />
                                                <span className="text-gray-700 font-medium">{fac}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3 border-gray-100">Kamu bakal ada di sini</h3>
                                    <div className="w-full h-[300px] bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                                        <iframe 
                                            title={`Peta lokasi ${selectedDestination.title}`}
                                            src={selectedDestination.mapUrl} 
                                            width="100%" 
                                            height="100%" 
                                            style={{ border: 0 }} 
                                            allowFullScreen={false} 
                                            loading="lazy" 
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
