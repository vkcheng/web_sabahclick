"use client"

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react"
import { languageTags, translations, type Language, type Translation } from "./translations"

type LanguageContextType = {
    language: Language
    setLanguage: (language: Language) => void
    t: Translation
}

const LanguageContext = createContext<LanguageContextType | null>(null)
const languageChange = "sabahclick-language-change"

function getLanguage(): Language {
    const saved = window.localStorage.getItem("language")
    return saved === "cn" || saved === "bm" ? saved : "en"
}

function subscribe(callback: () => void) {
    window.addEventListener("storage", callback)
    window.addEventListener(languageChange, callback)
    return () => {
        window.removeEventListener("storage", callback)
        window.removeEventListener(languageChange, callback)
    }
}

function setLanguage(language: Language) {
    window.localStorage.setItem("language", language)
    window.dispatchEvent(new Event(languageChange))
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const language = useSyncExternalStore(subscribe, getLanguage, (): Language => "en")

    useEffect(() => {
        document.documentElement.lang = languageTags[language]
    }, [language])

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider")
    return context
}
