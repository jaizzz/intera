import { useState } from "react";
import { Link } from "@inertiajs/react";
import Button from "@/Components/ui/button/Button";
import { useTranslation } from "react-i18next";

import Travel1 from "../../../assets/img/travel/travel-indo-1.jpg"
import Travel2 from "../../../assets/img/travel/travel-indo-2.jpg"
import Travel3 from "../../../assets/img/travel/travel-indo-3.jpg"
import Travel4 from "../../../assets/img/travel/travel-japan-1.jpg"
import Travel5 from "../../../assets/img/travel/travel-japan-2.jpg"
import Travel6 from "../../../assets/img/travel/travel-japan-3.jpg"

export default function DestinationPackageSection() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<"indonesia" | "japan">(
        "indonesia",
    );

    const images = {
        indonesia: [Travel1, Travel2, Travel3],
        japan: [Travel4, Travel5, Travel6],
    };

    return (
        <section className="py-20 px-6 lg:px-20 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                {/* Image Stack */}
                <div className="relative w-full max-w-xl mx-auto">
                    {/* Main Image */}
                    <div className="aspect-16/10 rounded-3xl overflow-hidden shadow-lg">
                        <img
                            src={images[activeTab][0]}
                            alt="Destination Package"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    {/* Bottom Left Image */}
                    <div className="absolute -bottom-10 -left-10 w-44 sm:w-56 aspect-16/10 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={images[activeTab][1]}
                            alt="Travel Experience"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    {/* Top Right Image */}
                    <div className="absolute -top-10 -right-10 w-44 sm:w-56 aspect-16/10 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={images[activeTab][2]}
                            alt="Tour Destination"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Content */}
                <div>
                    <p className="text-sm text-gray-400 mt-4 sm:mt-0 mb-2">
                        {t('travel.subtitle')}
                    </p>

                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        {t('travel.title')}
                    </h2>

                    {/* Tabs */}
                    <div className="flex items-center gap-6 mt-6 border-b border-gray-200">
                        {(["indonesia", "japan"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-sm font-medium capitalize transition ${
                                    activeTab === tab
                                        ? "text-primary border-b-2 border-primary"
                                        : "text-gray-400 hover:text-gray-600"
                                }`}
                            >
                                {t(`travel.${tab}.label`)}
                            </button>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="mt-6 text-sm text-gray-600 leading-relaxed max-w-lg">
                        {t(`travel.${activeTab}.description`)}
                    </p>

                    {/* CTA */}
                    <Link href={"/travel"}>
                        <Button className="mt-8">{t('travel.view_all')}</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
