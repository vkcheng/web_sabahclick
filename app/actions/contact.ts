'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const tel = formData.get('tel') as string
    const message = formData.get('message') as string

    if (!name || !email || !message) {
        return { error: 'Missing required fields' }
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'SabahClick Contact <onboarding@resend.dev>', // Default for testing, user might need to change this if they have a domain
            to: ['vkcheng@gmail.com'],
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Tel: ${tel}

Message:
${message}
      `,
            // basic html version
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tel:</strong> ${tel}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `
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
