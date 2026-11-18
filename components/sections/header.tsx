"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useRef, useState } from "react"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useLanguage } from "@/lib/i18n/language-context"

export function Header() {
    const { t } = useLanguage()
    const pathname = usePathname()
    const [openForPath, setOpenForPath] = useState<string | null>(null)
    const toggle = useRef<HTMLButtonElement>(null)
    const isOpen = openForPath === pathname

    const links = [
        { label: t.nav.services, href: "/#services" },
        { label: t.nav.about, href: "/#about" },
        { label: t.nav.web, href: "/web-design" },
        { label: t.nav.apps, href: "/apps" },
    ]

    return (
        <header
            className="site-header"
            onKeyDown={(event) => {
                if (event.key === "Escape" && isOpen) {
                    setOpenForPath(null)
                    toggle.current?.focus()
                }
            }}
        >
            <a className="skip-link" href="#main">{t.nav.skip}</a>
            <div className="site-wrap header-inner">
                <Link href="/" className="wordmark" aria-label={`SabahClick · ${t.nav.home}`} onClick={() => setOpenForPath(null)}>
                    SABAH<span>CLICK</span>
                </Link>
                <button
                    type="button"
                    ref={toggle}
                    className="icon-button menu-toggle"
                    aria-label={isOpen ? t.nav.closeMenu : t.nav.menu}
                    aria-expanded={isOpen}
                    aria-controls="site-navigation"
                    onClick={() => setOpenForPath(isOpen ? null : pathname)}
                >
                    {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
                </button>
                <nav id="site-navigation" className="site-navigation" data-open={isOpen} aria-label={t.nav.navigation}>
                    <div className="nav-links">
                        {links.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                aria-current={pathname === href ? "page" : undefined}
                                onClick={() => setOpenForPath(null)}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                    <div className="nav-actions">
                        <LanguageSwitcher />
                        <ThemeToggle />
                        <Link href="/#contact" className="site-button button-primary nav-cta" onClick={() => setOpenForPath(null)}>
                            {t.nav.contact}
                            <ArrowUpRight size={15} aria-hidden="true" />
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
