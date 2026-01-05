"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import { supabase } from "@/lib/supabase"
import { sendContactEmail } from "@/app/actions/contact"

export function Contact() {
    const { t } = useLanguage()
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = React.useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            tel: formData.get('tel'),
            message: formData.get('message'),
            created_at: new Date().toISOString(),
        }

        // Imports moved to top level for better stability
        // const { supabase } = await import('@/lib/supabase')
        // const { sendContactEmail } = await import('@/app/actions/contact')

        try {
            // 1. Send email via Resend
            const emailResult = await sendContactEmail(formData)
            if (emailResult.error) {
                console.error('Email sending error:', emailResult.error)
                throw new Error(`Email Error: ${emailResult.error}`)
            }

            // 2. Save to Supabase (keeping existing logic)
            const { error } = await supabase
                .from('contacts')
                .insert([data])

            if (error) {
                console.error('Supabase error:', error)
                throw new Error(`Database Error: ${error.message}`)
            }

            setStatus('success')
            // Reset form
            e.currentTarget.reset()
        } catch (error) {
            console.error('Error submitting form:', error)
            setStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred')
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
                            <label className="block text-sm font-medium mb-2">{t.contact.tel}</label>
                            <input
                                name="tel"
                                required
                                type="tel"
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-neon-cyan transition-colors"
                                placeholder={t.contact.tel}
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
                        {status === 'error' && (
                            <div className="text-red-500 text-sm text-center">
                                <p>Failed to send message.</p>
                                <p className="text-xs mt-1 opacity-80">{errorMessage}</p>
                            </div>
                        )}
                    </form>
                </div>

                <footer className="mt-24 text-center text-muted-foreground text-sm">
                    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-8">
                        <a href="mailto:sabahclick.my@gmail.com" className="hover:text-neon-cyan transition-colors">
                            Email: sabahclick.my@gmail.com
                        </a>
                        <a href="https://wa.me/60128131441" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors">
                            WhatsApp: 012-813 1441 (Text Only)
                        </a>
                    </div>
                    <p>© 2026 SabahClick. All rights reserved.</p>
                </footer>
            </div>
        </section>
    )
}
