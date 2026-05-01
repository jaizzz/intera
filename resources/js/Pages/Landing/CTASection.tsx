import Button from "@/Components/ui/button/Button";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import CTA1 from "../../../assets/img/cta/cta-1.jpg";
import CTA2 from "../../../assets/img/cta/cta-2.jpg";
import CTA3 from "../../../assets/img/cta/cta-3.jpg";
import CTA4 from "../../../assets/img/cta/cta-4.jpg";

export default function CTASection() {
    const { t } = useTranslation();
    const whatsappNumber = "6281234567890";
    const message = t('cta.whatsapp_message');

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
    )}`;

    return (
        <section className="py-20 px-6 lg:px-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Image Polaroid Stack */}
                <div className="relative w-full max-w-md mx-auto h-105">

                    {/* Image 1 */}
                    <div className="absolute top-0 left-6 rotate-[-4deg] z-10">
                        <div className="bg-white p-3 rounded-lg shadow-lg w-44 sm:w-52">
                            <img
                                src={CTA3}
                                alt="Destination 1"
                                className="w-full h-56 object-cover rounded-md"
                            />
                        </div>
                    </div>

                    {/* Image 2 */}
                    <div className="absolute top-4 right-4 rotate-3 z-20">
                        <div className="bg-white p-3 rounded-lg shadow-lg w-44 sm:w-52">
                            <img
                                src={CTA4}
                                alt="Destination 2"
                                className="w-full h-56 object-cover rounded-md"
                            />
                        </div>
                    </div>

                    {/* Image 3 */}
                    <div className="absolute bottom-0 left-0 rotate-2 z-30">
                        <div className="bg-white p-3 rounded-lg shadow-lg w-48 sm:w-56">
                            <img
                                src={CTA1}
                                alt="Destination 3"
                                className="w-full h-60 object-cover rounded-md"
                            />
                        </div>
                    </div>

                    {/* Image 4 */}
                    <div className="absolute bottom-6 right-8 -rotate-2 z-40">
                        <div className="bg-white p-3 rounded-lg shadow-lg w-40 sm:w-48">
                            <img
                                src={CTA2}
                                alt="Destination 4"
                                className="w-full h-52 object-cover rounded-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div>
                    <p className="text-sm text-gray-400 mb-2">
                        {t('cta.tagline')}
                    </p>

                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        {t('cta.title')}
                    </h2>

                    <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-lg">
                        {t('cta.subtitle')}
                    </p>

                    {/* CTA */}
                    <div className="mt-8">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full">
                                <FaWhatsapp className="text-lg" />
                                {t('cta.button')}
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
