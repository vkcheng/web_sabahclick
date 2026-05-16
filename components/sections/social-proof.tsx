"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
    {
        name: "Seng Yong Dim Sum",
        business: "F&B / Restaurant, Kota Kinabalu",
        text: "We never expected a website could bring in so many new customers. SabahClick built us a clean, responsive page that loads fast and looks great on mobile. Our regulars love sharing it, and we even get calls from people who found us through Google. High quality work, very professional team!",
        initials: "SY",
        color: "from-neon-cyan/20 to-neon-purple/10",
        border: "border-neon-cyan/20 hover:border-neon-cyan/50",
    },
    {
        name: "Ezzy HomeStay",
        business: "Hospitality / Homestay, Sabah",
        text: "SabahClick delivered beyond our expectations. The website is beautifully designed, fully responsive, and our guests always compliment how easy it is to browse and book. We love how it represents our brand — it feels premium without being over the top. Highly recommended for any Sabah business!",
        initials: "EH",
        color: "from-neon-purple/20 to-neon-cyan/10",
        border: "border-neon-purple/20 hover:border-neon-purple/50",
    },
]



export function SocialProof() {
    return (
        <section id="social-proof" className="py-24 bg-secondary/10 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-center">
                        What Our Clients Say
                    </h2>
                    <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
                        Real businesses across Sabah trust SabahClick to build their digital presence.
                    </p>
                </motion.div>

                {/* Testimonial Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className={`relative p-8 rounded-2xl bg-gradient-to-br ${t.color} border ${t.border} transition-all duration-300 backdrop-blur-sm`}
                        >
                            <Quote className="w-8 h-8 text-neon-cyan/40 absolute top-6 right-6" />
                            <p className="text-muted-foreground italic mb-6 leading-relaxed">
                                &ldquo;{t.text}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center font-mono text-xs font-bold text-neon-cyan">
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.business}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    )
}
