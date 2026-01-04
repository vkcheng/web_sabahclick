"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n/language-context"

export function Contact() {
    const { t } = useLanguage()
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('loading')

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            created_at: new Date().toISOString(),
        }

        // Dynamic import to avoid build errors if env vars are missing during build time
        const { supabase } = await import('@/lib/supabase')

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([data])

            if (error) throw error

            setStatus('success')
            // Reset form
            e.currentTarget.reset()
        } catch (error) {
            console.error('Error submitting form:', error)
            setStatus('error')
        } finally {
            // Reset loading state after 3 seconds
            if (status !== 'error') {
                setTimeout(() => setStatus('idle'), 3000)
            }
        }
    }

    return (
        <section id="contact" className="py-24 bg-secondary/20 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                        {t.contact.title}
                    </h2>
                </div>

                <div className="max-w-md mx-auto bg-card border border-white/5 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">{t.contact.name}</label>
                            <input
                                name="name"
                                required
                                type="text"
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-neon-cyan transition-colors"
                                placeholder={t.contact.name}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">{t.contact.email}</label>
                            <input
                                name="email"
                                required
                                type="email"
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-neon-cyan transition-colors"
                                placeholder="hello@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">{t.contact.message}</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                                placeholder={t.contact.message}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="mt-4 w-full py-4 bg-neon-cyan text-black font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : status === 'error' ? 'Failed' : t.contact.submit}
                        </button>
                        {status === 'success' && <p className="text-green-500 text-sm text-center">Message sent successfully!</p>}
                        {status === 'error' && <p className="text-red-500 text-sm text-center">Failed to send message. Please try again.</p>}
                    </form>
                </div>

                <footer className="mt-24 text-center text-muted-foreground text-sm">
                    <p>© 2026 SabahClick. All rights reserved.</p>
                </footer>
            </div>
        </section>
    )
}
