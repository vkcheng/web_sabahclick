"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"
import { ArrowRight } from "lucide-react"

export function Hero() {
    const { t } = useLanguage()

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            <div className="container px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-6 backdrop-blur-sm">
                        EST. 2026 // KOTA KINABALU
                    </span>
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
                        {t.hero.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light">
                        {t.hero.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 bg-foreground text-background font-bold rounded-lg hover:bg-neon-cyan hover:text-black transition-all duration-300 flex items-center gap-2 group">
                            {t.hero.cta}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 border border-white/10 hover:border-neon-cyan hover:bg-neon-cyan/5 rounded-lg transition-all duration-300 backdrop-blur-sm">
                            {t.nav.showcase}
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
            >
                <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-current rounded-full" />
                </div>
            </motion.div>
        </section>
    )
}
