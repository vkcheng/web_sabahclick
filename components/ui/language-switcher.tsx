"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()

    const toggleLanguage = () => {
        if (language === 'en') setLanguage('cn')
        else if (language === 'cn') setLanguage('bm')
        else setLanguage('en')
    }

    const label = {
        en: "EN",
        cn: "中",
        bm: "BM"
    }

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors border border-transparent hover:border-accent group"
        >
            <Globe className="h-4 w-4 text-foreground group-hover:text-neon-cyan" />
            <span className="text-sm font-display font-medium text-foreground group-hover:text-neon-cyan min-w-[1.5rem] text-center">
                {label[language]}
            </span>
        </button>
    )
}
