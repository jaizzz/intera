import { useState } from "react";
import { HiPlus, HiX } from "react-icons/hi";

export default function FAQSection() {
    const faqs = [
        {
            question: "Apa itu Intera?",
            answer:
                "International Tourism Exchange Application (INTERA) adalah platform eksplorasi destinasi wisata yang membantu Anda menemukan tempat-tempat terbaik di Indonesia dan Jepang, serta menghubungkan Anda dengan agensi travel terpercaya.",
        },
        {
            question: "Bagaimana cara mencari destinasi tertentu?",
            answer:
                "Anda dapat menggunakan halaman 'Explore' untuk mencari destinasi. Gunakan fitur filter untuk menyaring hasil berdasarkan negara atau kategori seperti Nature, Heritage, Volcanic, dan lainnya.",
        },
        {
            question: "Bagaimana cara memesan layanan travel?",
            answer:
                "Di halaman 'Travel', Anda dapat melihat daftar agensi partner kami. Klik tombol 'Contact' untuk menghubungi mereka secara langsung melalui telepon untuk informasi pemesanan lebih lanjut.",
        },
        {
            question: "Apakah Intera memungut biaya dari pengguna?",
            answer:
                "Tidak, Intera adalah platform kurasi dan eksplorasi yang dapat digunakan secara gratis oleh wisatawan untuk mencari inspirasi perjalanan dan informasi agensi.",
        },
        {
            question: "Apakah informasi destinasi akurat?",
            answer:
                "Kami melakukan kurasi mendalam terhadap setiap destinasi dan agensi yang terdaftar. Namun, kami menyarankan untuk selalu mengonfirmasi detail operasional langsung dengan penyedia layanan.",
        },
        {
            question: "Bagaimana jika saya ingin mendaftarkan agensi saya?",
            answer:
                "Kami sangat terbuka untuk kemitraan baru. Anda dapat menghubungi tim dukungan kami melalui fitur chat untuk informasi mengenai pendaftaran agensi travel Anda di platform kami.",
        },
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-20 px-4 lg:px-12 bg-gray-50">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <p className="text-sm text-gray-400 mb-2">Frequently Asked Questions</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                    Common Questions About{" "}
                    <span className="text-primary">Intera</span>
                </h2>
            </div>

            {/* FAQ List */}
            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((item, index) => {
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
