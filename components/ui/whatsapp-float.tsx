"use client"

export function WhatsAppFloat() {
    return (
        <a
            href="https://wa.me/60128131441"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-6 right-6 z-50 group"
        >
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 hover:scale-110 transition-transform duration-300">
                {/* WhatsApp SVG icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="white"
                    className="w-7 h-7"
                >
                    <path d="M16.003 2.667C8.639 2.667 2.667 8.639 2.667 16c0 2.344.634 4.544 1.74 6.44L2.667 29.333l7.13-1.715A13.28 13.28 0 0 0 16.003 29.333c7.364 0 13.336-5.972 13.336-13.333S23.367 2.667 16.003 2.667Zm7.563 18.63c-.314.882-1.843 1.687-2.524 1.742-.682.054-1.317.323-4.43-.923-3.765-1.497-6.18-5.338-6.367-5.588-.186-.25-1.52-2.02-1.52-3.853s.962-2.73 1.303-3.102c.341-.373.744-.466.992-.466.248 0 .496.002.713.013.229.012.536-.087.838.639.314.745 1.066 2.578 1.16 2.763.093.186.155.403.031.65-.125.248-.187.403-.373.621-.186.217-.392.485-.56.651-.186.186-.38.388-.163.761.217.373.963 1.587 2.067 2.571 1.42 1.266 2.618 1.658 2.991 1.844.373.186.59.155.807-.093.218-.248.931-1.086 1.18-1.459.248-.373.497-.311.838-.187.341.124 2.168 1.022 2.541 1.208.373.186.622.279.714.434.093.155.093.9-.221 1.773Z" />
                </svg>
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
            </div>
            {/* Tooltip */}
            <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10 backdrop-blur-sm">
                Chat with us on WhatsApp
            </span>
        </a>
    )
}
