"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/i18n/language-context"

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const { t } = useLanguage()

    return (
        <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="icon-button"
            aria-label={t.nav.theme}
        >
            <Moon className="dark:hidden" size={17} aria-hidden="true" />
            <Sun className="hidden dark:block" size={17} aria-hidden="true" />
        </button>
    )
}
