import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function TestimonialSection() {
    const { t } = useTranslation();
    const testimonialData = t('testimonial.items', { returnObjects: true }) as { name: string, role: string, message: string }[];

    // Images mapping (since they are external URLs, we can keep them or map them)
    const images = [
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/65.jpg",
    ];

    return (
        <section id="testimonial" className="py-20 px-6 lg:px-20 bg-white">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        {t('testimonial.title_prefix')} <span className="text-primary">{t('testimonial.title_suffix')}</span>
                    </h2>
                    <p className="mt-3 text-sm text-gray-500">
                        {t('testimonial.subtitle')}
                    </p>
                </div>

                {/* Testimonials */}
                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {Array.isArray(testimonialData) && testimonialData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            {/* Rating */}
                            <div className="flex items-center gap-1 text-orange-400">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>

                            {/* Message */}
                            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                                “{item.message}”
                            </p>

                            {/* User */}
                            <div className="mt-6 flex items-center gap-4">
                                <img
                                    src={images[index]}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
