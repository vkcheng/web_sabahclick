"use client"

import { useLanguage } from "@/lib/i18n/language-context"

export function Showcase() {
    const { t } = useLanguage()

    const projects = [1, 2, 3] // Placeholders

    return (
        <section id="showcase" className="py-24 bg-background relative">
            <div className="container px-6">
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-16 text-center">
                    {t.nav.showcase}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((item) => (
                        <div
                            key={item}
                            className="aspect-video bg-secondary/30 rounded-xl overflow-hidden border border-white/5 relative group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <div>
                                    <h3 className="font-display font-bold text-lg text-white">Project {item}</h3>
                                    <p className="text-sm text-gray-300">Web Design / Development</p>
                                </div>
                            </div>

                            {/* Sci-fi overlay */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-cyan/50 rounded-xl transition-colors duration-300 pointer-events-none" />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-neon-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_#00f0ff]" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
