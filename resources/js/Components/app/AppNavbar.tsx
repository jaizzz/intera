import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import Button from "@/Components/ui/button/Button";
import { HiMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";

import LogoColor from "../../../assets/svg/logo-color.svg";

const LANGUAGES = [
    { code: "id", label: "Indonesia" },
    { code: "en", label: "English" },
    { code: "jp", label: "日本語" },
];

const Navbar = () => {
    const { url } = usePage();
    const [openMenu, setOpenMenu] = useState(false);
    const [openLang, setOpenLang] = useState(false);
    const [language, setLanguage] = useState("en");
    const [activeSection, setActiveSection] = useState("");

    const selectedLang = LANGUAGES.find(l => l.code === language);

    const isHomeActive = url === "/" || url === "/#";
    const isExploreActive = url.startsWith("/explore") || url.startsWith("/destination");
    const isTravelActive = url.startsWith("/travel");

    useEffect(() => {
        const handleScroll = () => {
            if (window.location.pathname !== "/") {
                setActiveSection("");
                return;
            }

            if (window.scrollY < 100) {
                setActiveSection("");
                return;
            }

            const sections = ["testimonial", "faq"];
            let currentSection = "";

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const absoluteTop = rect.top + window.scrollY;
                    const offsetTop = absoluteTop - 200;
                    const height = element.offsetHeight;
                    
                    if (window.scrollY >= offsetTop && window.scrollY < offsetTop + height) {
                        currentSection = section;
                    }
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [url]);

    return (
        <nav className="fixed top-4 lg:top-6 left-0 w-full z-50">
            <div className="mx-auto px-4 lg:px-12">
                {/* Navbar Container */}
                <div className="flex items-center justify-between bg-white rounded-full shadow-md px-5 py-3">

                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img src={LogoColor} alt="VoyageGo" className="w-28 lg:w-36" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
                        <Link href="/" className={`hover:text-primary transition-colors ${isHomeActive && !activeSection ? "text-primary font-bold" : ""}`}>Home</Link>
                        <Link href="/explore" className={`hover:text-primary transition-colors ${isExploreActive ? "text-primary font-bold" : ""}`}>Explore</Link>
                        <Link href="/travel" className={`hover:text-primary transition-colors ${isTravelActive ? "text-primary font-bold" : ""}`}>Travel</Link>
                        <Link href="/#faq" className={`hover:text-primary transition-colors ${activeSection === "faq" ? "text-primary font-bold" : ""}`}>FAQ</Link>
                        <Link href="/#testimonial" className={`hover:text-primary transition-colors ${activeSection === "testimonial" ? "text-primary font-bold" : ""}`}>Testimonial</Link>
                    </div>

                    {/* Desktop Right */}
                    <div className="hidden lg:flex items-center gap-4 relative">
                        <button
                            onClick={() => setOpenLang(!openLang)}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary"
                        >
                            {selectedLang?.label}
                            <HiChevronDown />
                        </button>

                        {openLang && (
                            <div className="absolute right-24 top-12 bg-white rounded-xl shadow-lg py-2 w-36 text-sm">
                                {LANGUAGES.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setOpenLang(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${language === lang.code
                                                ? "font-semibold text-primary"
                                                : ""
                                            }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        <Link href="/get-started">
                            <Button>
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-2xl text-gray-700"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        {openMenu ? <HiX /> : <HiMenuAlt3 />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {openMenu && (
                    <div className="lg:hidden mt-3 bg-white rounded-2xl shadow-xl overflow-hidden">

                        {/* Mobile Language Dropdown */}
                        <div className="px-5 py-4 border-b relative">
                            <p className="text-xs text-gray-400 mb-2">Language</p>

                            <button
                                onClick={() => setOpenLang(!openLang)}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-sm bg-gray-100 text-sm"
                            >
                                {selectedLang?.label}
                                <HiChevronDown
                                    className={`transition-transform ${openLang ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {openLang && (
                                <div className="mt-2 bg-white rounded-xl shadow-md overflow-hidden">
                                    {LANGUAGES.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setOpenLang(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 ${language === lang.code
                                                    ? "font-semibold text-primary"
                                                    : ""
                                                }`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Menu Links */}
                        <div className="flex flex-col px-5 py-4 space-y-3 text-sm">
                            {[
                                { href: "/", label: "Home", active: isHomeActive && !activeSection },
                                { href: "/explore", label: "Explore", active: isExploreActive },
                                { href: "/travel", label: "Travel", active: isTravelActive },
                                { href: "/#faq", label: "FAQ", active: activeSection === "faq" },
                                { href: "/#testimonial", label: "Testimonial", active: activeSection === "testimonial" },
                            ].map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpenMenu(false)}
                                    className={`px-4 py-3 rounded-lg transition-colors ${
                                        item.active 
                                        ? "bg-primary/10 text-primary font-bold" 
                                        : "hover:bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <Link href="/get-started" onClick={() => setOpenMenu(false)}>
                                <Button className="w-full mt-2">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
