"use client"

import React, { createContext, useContext, useState } from 'react';
import { translations, Language, Translation } from './translations';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translation;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => {
        if (typeof window === 'undefined') {
            return 'en';
        }

        const saved = window.localStorage.getItem('language') as Language;
        if (saved && (saved === 'en' || saved === 'cn' || saved === 'bm')) {
            return saved;
        }

        return 'en';
    });

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        window.localStorage.setItem('language', lang);
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
