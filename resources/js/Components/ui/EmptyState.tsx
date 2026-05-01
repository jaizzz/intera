import React from "react";
import { FaSearch } from "react-icons/fa";
import Button from "@/Components/ui/button/Button";

interface EmptyStateProps {
    title?: string;
    description?: string;
}

export default function EmptyState({ 
    title = "Tidak Ada Hasil",
    description = "Maaf, kami tidak menemukan data yang sesuai dengan kriteria filter Anda. Silakan coba kriteria lain."
}: EmptyStateProps) {
    return (
        <div className="bg-white rounded-3xl p-16 md:p-24 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-gray-300 text-3xl" />
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {title}
            </h3>

            <p className="text-gray-500 max-w-sm mx-auto mb-10 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
