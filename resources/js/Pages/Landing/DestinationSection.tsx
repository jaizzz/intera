import { useRef, useState, useMemo } from "react";
import { Link } from "@inertiajs/react";
import { FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaRegCalendar, FaRegClock, FaTicketAlt, FaCheck } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Button from "@/Components/ui/button/Button";
import { useTranslation } from "react-i18next";

import { DESTINATIONS } from "@/data/destination";

import "swiper/css";
import "swiper/css/pagination";


export default function DestinationSection() {
    const { t } = useTranslation();
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    // ... (rest of randomized logic)
    const randomDestinations = useMemo(() => {
        const indonesia = DESTINATIONS.filter(d =>
            d.country.toLowerCase().includes("indonesia")
        );
        const japan = DESTINATIONS.filter(d =>
            d.country.toLowerCase().includes("japan") || d.country.toLowerCase().includes("jepang")
        );

        const getRandom = (arr: any[], n: number) => {
            return [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
        };

        const selected = [...getRandom(indonesia, 3), ...getRandom(japan, 3)];
        return selected.sort(() => 0.5 - Math.random());
    }, []);

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    return (
        <section className="py-20 px-4 lg:px-12 bg-white overflow-hidden">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        <span className="text-primary">{t('destination.title_prefix')}</span> {t('destination.title_suffix')}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 max-w-xl">
                        {t('destination.subtitle')}
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

                    <Link href="/explore">
                        <button className="text-sm px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
                            {t('destination.explore_all')}
                        </button>
                    </Link>
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
                className="overflow-visible!"
            >
                {randomDestinations.map((item, index) => (
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
                                    {t(`destinations.${item.id}.tag`, { defaultValue: item.tag })}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                    {t(`destinations.${item.id}.title`, { defaultValue: item.title })}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                    <FaMapMarkerAlt className="text-primary shrink-0" />
                                    <span className="line-clamp-1">
                                        {t(`destinations.${item.id}.country`, { defaultValue: item.country })}
                                    </span>
                                </div>
                                <Link href={`/destination/${item.id}`} className="w-full">
                                    <Button className="w-full mt-5">
                                        {t('destination.view_details')}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination Dots */}
            <div className="destination-pagination flex justify-center gap-2 mt-8 [&_.destination-bullet]:w-2 [&_.destination-bullet]:h-2 [&_.destination-bullet]:rounded-full [&_.destination-bullet]:bg-gray-300 [&_.destination-bullet]:cursor-pointer [&_.destination-bullet]:transition-all [&_.destination-bullet-active]:w-6 [&_.destination-bullet-active]:bg-primary" />

            {/* Slide counter */}
            <p className="text-center text-xs text-gray-400 mt-3">
                {activeIndex + 1} / {randomDestinations.length}
            </p>
        </section>
    );
}
