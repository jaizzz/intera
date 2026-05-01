import { useState, useEffect, useRef, useMemo } from "react";
import { router } from "@inertiajs/react";
import { HiChevronDown, HiLocationMarker } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import Hero1 from '../../../assets/img/hero/hero-1.jpg';
import Hero2 from '../../../assets/img/hero/hero-2.jpg';
import Hero3 from '../../../assets/img/hero/hero-3.png';

import { DESTINATIONS } from "@/data/destination";

export default function HeroSection() {
    const [openCountry, setOpenCountry] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);

    const [country, setCountry] = useState("Country");
    const [category, setCategory] = useState("Category");
    
    const countries = useMemo(() => {
        const set = new Set<string>();
        DESTINATIONS.forEach(d => {
            const part = d.country.split(", ").pop();
            if (part) set.add(part);
        });
        return Array.from(set).sort().map(c => ({ label: c, value: c }));
    }, []);

    const categories = useMemo(() => {
        return Array.from(new Set(DESTINATIONS.map(d => d.tag))).sort();
    }, []);

    const countryRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);

    const [displayText, setDisplayText] = useState("");
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const sentences = [
        "WHERE EVERY TRIP HAS A STORY",
        "EXPLORE DESTINATIONS BEYOND LIMITS",
        "CRAFTING MEMORIES THAT LAST FOREVER"
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
                setOpenCountry(false);
            }
            if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
                setOpenCategory(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const currentSentence = sentences[sentenceIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        
        const timeout = setTimeout(() => {
            if (!isDeleting && displayText === currentSentence) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setSentenceIndex((prev) => (prev + 1) % sentences.length);
            } else {
                const nextText = isDeleting 
                    ? currentSentence.substring(0, displayText.length - 1)
                    : currentSentence.substring(0, displayText.length + 1);
                setDisplayText(nextText);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, sentenceIndex]);

    const heroImages = [
        Hero1,
        Hero2,
        Hero3,
        "/images/destination/kaizumi.webp"
    ];

    const handleSearch = () => {
        const query: any = {};
        if (country !== "Country") query.country = country;
        if (category !== "Category") query.tag = category;
        
        router.get("/explore", query);
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Slider */}
            <div className="absolute inset-0">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={1000}
                    className="h-full w-full"
                >
                    {heroImages.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Overlays */}
                <div className="absolute inset-0 bg-black/50 z-1" />
                <div className="absolute inset-0 bg-linear-gradient-to-t from-black/70 via-black/40 to-transparent z-1" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl px-6 text-center text-white">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight min-h-[3em] flex items-center justify-center">
                    <span className="relative">
                        {displayText}
                    </span>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-white/90 max-w-2xl mx-auto">
                    Explore destinations shaped by rich culture, breathtaking landscapes, and thoughtfully crafted experiences designed to leave a lasting impression long after your journey ends.
                </p>

                {/* Search Bar */}
                <div
                    className="
                        relative mt-10 mx-auto
                        bg-white shadow-lg
                        flex items-center
                        rounded-full
                        h-12 sm:h-14
                        px-2
                        text-gray-700
                        max-w-md sm:max-w-2xl
                    "
                >
                    {/* Country */}
                    <div className="relative flex-1" ref={countryRef}>
                        <button
                            onClick={() => {
                                setOpenCountry(!openCountry);
                                setOpenCategory(false);
                            }}
                            className="
                                w-full h-full
                                flex items-center justify-between
                                px-3 sm:px-4
                                text-xs sm:text-sm
                            "
                        >
                            <div className="flex items-center gap-1 sm:gap-2">
                                <HiLocationMarker className="text-gray-400 text-sm" />
                                <span className="truncate">{country}</span>
                            </div>
                            <HiChevronDown className="text-sm" />
                        </button>

                        {openCountry && (
                            <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg z-20 overflow-hidden text-left">
                                {countries.map(item => (
                                    <button
                                        key={item.value}
                                        onClick={() => {
                                            setCountry(item.label);
                                            setOpenCountry(false);
                                        }}
                                        className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="h-6 w-px bg-gray-200 hidden sm:block" />

                    {/* Category */}
                    <div className="relative flex-1" ref={categoryRef}>
                        <button
                            onClick={() => {
                                setOpenCategory(!openCategory);
                                setOpenCountry(false);
                            }}
                            className="
                                w-full h-full
                                flex items-center justify-between
                                px-3 sm:px-4
                                text-xs sm:text-sm
                            "
                        >
                            <span className="truncate">{category}</span>
                            <HiChevronDown className="text-sm" />
                        </button>

                        {openCategory && (
                            <div className="absolute left-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg z-20 overflow-hidden text-left">
                                {categories.map(item => (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            setCategory(item);
                                            setOpenCategory(false);
                                        }}
                                        className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* CTA */}
                    <button
                        onClick={handleSearch}
                        className="
                            bg-primary hover:bg-primary/90 text-white
                            h-10 sm:h-12
                            px-4 sm:px-6
                            rounded-full
                            text-xs sm:text-sm font-medium
                            transition
                            ml-1
                        "
                    >
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
}
