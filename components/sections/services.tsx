"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Layout, Globe, Search, CheckCircle2 } from "lucide-react"

export function Services() {
    const { t } = useLanguage()

    const services = [
        {
            icon: <Layout className="w-8 h-8 text-neon-cyan" />,
            title: t.services.webDesign,
            desc: t.services.webDesignDesc,
            price: "From RM 599",
            deliverables: [
                "Responsive multi-page website",
                "Custom design tailored to your brand",
                "Contact form & Google Maps integration",
                "Mobile-optimized & fast-loading",
            ],
        },
        {
            icon: <Globe className="w-8 h-8 text-neon-purple" />,
            title: t.services.landingPage,
            desc: t.services.landingPageDesc,
            price: "From RM 299",
            deliverables: [
                "Single-page conversion-focused design",
                "WhatsApp & call-to-action buttons",
                "Showcase your products or services",
                "Delivered within 5 business days",
            ],
        },
        {
            icon: <Search className="w-8 h-8 text-neon-cyan" />,
            title: t.services.seo,
            desc: t.services.seoDesc,
            price: "From RM 399/month",
            deliverables: [
                "Google Business Profile optimisation",
                "Monthly keyword ranking reports",
                "On-page & technical SEO fixes",
                "Local Sabah search visibility boost",
            ],
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
                            className="p-8 rounded-2xl bg-secondary/50 border border-white/5 hover:border-neon-cyan/50 transition-all duration-300 group hover:bg-secondary/80 backdrop-blur-sm flex flex-col"
                        >
                            <div className="mb-6 p-4 rounded-xl bg-background/50 w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-neon-cyan/5">
                                {service.icon}
                            </div>
                            <h3 className="font-display text-xl font-bold mb-2">{service.title}</h3>
                            {/* Starting Price Badge */}
                            <span className="inline-block mb-4 text-xs font-mono font-bold py-1 px-3 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan w-fit">
                                {service.price}
                            </span>
                            <p className="text-muted-foreground mb-5">{service.desc}</p>
                            {/* Deliverables */}
                            <ul className="flex flex-col gap-2 mt-auto">
                                {service.deliverables.map((item, j) => (
                                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
