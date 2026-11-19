"use client"

import { useState, type FormEvent } from "react"
import { sendContactEmail } from "@/app/actions/contact"
import { useLanguage } from "@/lib/i18n/language-context"

export function ContactForm() {
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

    return <>
        <noscript><style>{"#enquiryForm{display:none}"}</style><a className="btn-ghost" href="mailto:sabahclick.my@gmail.com">{t.contact.emailLink} ↗</a></noscript>
        <form method="post" className="cyber-form reveal" id="enquiryForm" onSubmit={handleSubmit} aria-busy={isSending}>
            <div className="form-row">
                <div className="field"><label htmlFor="f-name">{t.contact.name} *</label>
                    <input id="f-name" name="name" autoComplete="name" required /></div>
                <div className="field"><label htmlFor="f-phone">{t.contact.tel} / WhatsApp *</label>
                    <input id="f-phone" name="tel" type="tel" autoComplete="tel" required /></div>
            </div>
            <div className="field"><label htmlFor="f-email">{t.contact.email} *</label>
                <input id="f-email" name="email" type="email" autoComplete="email" placeholder="you@company.com.my" required /></div>
            <div className="field"><label htmlFor="f-msg">{t.contact.message} *</label>
                <textarea id="f-msg" name="message" rows={4} required /></div>
            <button className="btn-primary send-button" type="submit" disabled={isSending}>
                {isSending ? t.contact.sending : t.contact.submit} ↗
            </button>
            <div className="form-feedback" id="formFeedback" role="status" data-state={status}>
                {status === "success" && t.contact.success}
                {status === "error" && t.contact.error}
            </div>
        </form>
    </>
}
