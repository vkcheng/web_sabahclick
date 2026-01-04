"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Layout, Globe, Search } from "lucide-react"

export function Services() {
    const { t } = useLanguage()

    const services = [
        {
            icon: <Layout className="w-8 h-8 text-neon-cyan" />,
            title: t.services.webDesign,
            desc: t.services.webDesignDesc,
        },
        {
            icon: <Globe className="w-8 h-8 text-neon-purple" />,
            title: t.services.landingPage,
            desc: t.services.landingPageDesc,
        },
        {
            icon: <Search className="w-8 h-8 text-neon-cyan" />,
            title: t.services.seo,
            desc: t.services.seoDesc,
        },
    ]

    return (
        <section id="services" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-16 text-center">
                    {t.services.title}
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-2xl bg-secondary/50 border border-white/5 hover:border-neon-cyan/50 transition-all duration-300 group hover:bg-secondary/80 backdrop-blur-sm"
                        >
                            <div className="mb-6 p-4 rounded-xl bg-background/50 w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-neon-cyan/5">
                                {service.icon}
                            </div>
                            <h3 className="font-display text-xl font-bold mb-4">{service.title}</h3>
                            <p className="text-muted-foreground">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
