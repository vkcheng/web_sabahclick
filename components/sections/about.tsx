"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { motion } from "framer-motion"

export function About() {
    const { t } = useLanguage()

    return (
        <section id="about" className="py-24 bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-display text-3xl md:text-5xl font-bold mb-8 leading-tight">
                            {t.aboutSection.headline}
                        </h2>

                        <div className="space-y-6 text-muted-foreground text-lg md:text-xl leading-relaxed">
                            <p>
                                {t.aboutSection.body1}
                            </p>
                            <p>
                                {t.aboutSection.body2}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
