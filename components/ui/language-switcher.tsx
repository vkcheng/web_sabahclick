"use client"

import { Globe } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { languageTags, type Language } from "@/lib/i18n/translations"

const languages = { en: "English", cn: "中文", bm: "Melayu" } satisfies Record<Language, string>

export function LanguageSwitcher() {
    const { language, setLanguage, t } = useLanguage()

    return (
        <label className="language-picker">
            <Globe size={16} aria-hidden="true" />
            <span className="sr-only">{t.nav.language}</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
                {(Object.keys(languages) as Language[]).map((value) => (
                    <option key={value} value={value} lang={languageTags[value]}>{languages[value]}</option>
                ))}
            </select>
        </label>
    )
}
