import { useState } from "react";
import { HiPlus, HiX } from "react-icons/hi";
import { useTranslation } from "react-i18next";

export default function FAQSection() {
    const { t } = useTranslation();
    const faqs = t('faq.items', { returnObjects: true }) as { question: string, answer: string }[];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-20 px-4 lg:px-12 bg-gray-50">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <p className="text-sm text-gray-400 mb-2">{t('faq.title')}</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {t('faq.subtitle')}
                </h2>
            </div>

            {/* FAQ List */}
            <div className="max-w-3xl mx-auto space-y-4">
                {Array.isArray(faqs) && faqs.map((item, index) => {
                    const isOpen = activeIndex === index;

                    return (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border border-gray-100"
                        >
                            <button
                                onClick={() =>
                                    setActiveIndex(isOpen ? null : index)
                                }
                                className="w-full flex items-center justify-between px-6 py-5 text-left"
                            >
                                <span className="font-medium text-gray-900">
                                    {item.question}
                                </span>
                                <span className="text-xl text-gray-500">
                                    {isOpen ? <HiX /> : <HiPlus />}
                                </span>
                            </button>

                            {isOpen && (
                                <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
