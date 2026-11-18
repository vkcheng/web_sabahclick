"use client"

import { ArrowUpRight, Mail, MessageCircle } from "lucide-react"
import { useState, type FormEvent } from "react"
import { sendContactEmail } from "@/app/actions/contact"
import { useLanguage } from "@/lib/i18n/language-context"
import { contactEmail, whatsAppUrl } from "@/lib/site"

export function Contact() {
    const { t } = useLanguage()
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const isSending = status === "loading"

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (isSending) return

        const form = event.currentTarget
        const fields = new FormData(form)
        setStatus("loading")

        try {
            const emailResult = await sendContactEmail(fields)
            if (emailResult.error) {
                setStatus("error")
                return
            }
        } catch {
            setStatus("error")
            return
        }

        try {
            const { supabase } = await import("@/lib/supabase")
            const { error } = await supabase.from("contacts").insert([{
                name: fields.get("name"),
                email: fields.get("email"),
                tel: fields.get("tel"),
                message: fields.get("message"),
                created_at: new Date().toISOString(),
            }])
            if (error) console.error("Could not save contact enquiry:", error.message)
        } catch (error) {
            console.error("Could not save contact enquiry:", error)
        }

        form.reset()
        setStatus("success")
    }

    return (
        <section id="contact" className="site-section tinted-section" aria-labelledby="contact-title">
            <div className="site-wrap section-split">
                <div className="section-intro">
                    <h2 id="contact-title" className="section-title">{t.contact.title}</h2>
                    <p className="section-lead">{t.contact.description}</p>
                    <div className="contact-links">
                        <a className="text-link" href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={17} aria-hidden="true" /> {t.contact.whatsapp}
                            <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                        <a className="text-link" href={`mailto:${contactEmail}`}>
                            <Mail size={17} aria-hidden="true" /> {t.contact.emailLink}
                        </a>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="contact-form" aria-busy={isSending}>
                    <div className="contact-fields">
                        <label htmlFor="contact-name">{t.contact.name}
                            <input id="contact-name" name="name" required type="text" autoComplete="name" />
                        </label>
                        <label htmlFor="contact-tel">{t.contact.tel}
                            <input id="contact-tel" name="tel" required type="tel" autoComplete="tel" />
                        </label>
                    </div>
                    <label htmlFor="contact-email">{t.contact.email}
                        <input id="contact-email" name="email" required type="email" autoComplete="email" />
                    </label>
                    <label htmlFor="contact-message">{t.contact.message}
                        <textarea id="contact-message" name="message" required rows={4} />
                    </label>
                    <button type="submit" className="site-button button-primary" disabled={isSending}>
                        {isSending ? t.contact.sending : t.contact.submit}
                        <ArrowUpRight size={17} aria-hidden="true" />
                    </button>
                    <div className="form-status" role="status" data-state={status}>
                        {status === "success" && t.contact.success}
                        {status === "error" && t.contact.error}
                    </div>
                </form>
            </div>
        </section>
    )
}
