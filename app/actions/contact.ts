'use server'

import { Resend } from 'resend'

export async function sendContactEmail(formData: FormData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const tel = formData.get('tel')
    const message = formData.get('message')

    if (typeof name !== 'string' || typeof email !== 'string' || typeof tel !== 'string' || typeof message !== 'string'
        || !name.trim() || !email.trim() || !message.trim()) {
        return { error: 'Missing required fields' }
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) return { error: 'Email service unavailable' }

    try {
        const resend = new Resend(apiKey)
        const { data, error } = await resend.emails.send({
            from: 'SabahClick Contact <onboarding@resend.dev>',
            to: ['vkcheng@gmail.com'],
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nTel: ${tel}\n\nMessage:\n${message}`,
        })

        if (error) {
            console.error('Resend error:', error)
            return { error: error.message }
        }

        return { success: true, data }
    } catch (error) {
        console.error('Server action error:', error)
        return { error: 'Failed to send email' }
    }
}
