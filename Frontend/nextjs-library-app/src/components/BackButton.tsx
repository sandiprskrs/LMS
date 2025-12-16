"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    const router = useRouter();
    const pathname = usePathname();

    // Hide on homepage
    if (pathname === "/") return null;

    return (
        <button
            onClick={() => router.back()}
            className="fixed top-10 right-6 p-3 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-all z-50 flex items-center gap-2"
            aria-label="Go Back"
        >
            <ArrowLeft className="w-5 h-5" />
            <span className="sr-only">Back</span>
        </button>
    );
}
