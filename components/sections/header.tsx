"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"
import { Menu, X } from "lucide-react"

export function Header() {
    const { t } = useLanguage()
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { name: t.nav.services, href: "#services" },
        { name: t.nav.showcase, href: "#showcase" },
        { name: t.nav.about, href: "#about" },
        { name: t.nav.contact, href: "#contact" },
    ]

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-white/10 shadow-lg py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Logo Placeholder - Sci-Fi Font */}
                    <a href="#" className="font-display text-2xl font-bold tracking-widest text-foreground hover:text-neon-cyan transition-colors">
                        SABAH<span className="text-neon-cyan">CLICK</span>
                    </a>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium hover:text-neon-cyan transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
                >
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-lg font-medium hover:text-neon-cyan transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>
                </motion.div>
            )}
        </header>
    )
}
