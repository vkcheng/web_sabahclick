"use client"

import { useLanguage } from "@/lib/i18n/language-context"

export function Contact() {
    const { t } = useLanguage()

    return (
        <section id="contact" className="py-24 bg-secondary/20 relative">
            <div className="container px-6">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                        {t.contact.title}
                    </h2>
                </div>

                <div className="max-w-md mx-auto bg-card border border-white/5 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
                    <form className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">{t.contact.name}</label>
                            <input
                                type="text"
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-neon-cyan transition-colors"
                                placeholder={t.contact.name}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">{t.contact.email}</label>
                            <input
                                type="email"
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-neon-cyan transition-colors"
                                placeholder="hello@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">{t.contact.message}</label>
                            <textarea
                                rows={4}
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                                placeholder={t.contact.message}
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full py-4 bg-neon-cyan text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
                        >
                            {t.contact.submit}
                        </button>
                    </form>
                </div>

                <footer className="mt-24 text-center text-muted-foreground text-sm">
                    <p>© 2026 SabahClick. All rights reserved.</p>
                </footer>
            </div>
        </section>
    )
}
