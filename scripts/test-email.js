
const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
} else {
    console.error('.env.local file not found at:', envPath);
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
    console.log('Testing Resend with API Key:', process.env.RESEND_API_KEY ? 'Found (starts with ' + process.env.RESEND_API_KEY.substring(0, 5) + '...)' : 'Missing');

    try {
        const { data, error } = await resend.emails.send({
            from: 'SabahClick Test <onboarding@resend.dev>',
            to: ['vkcheng@gmail.com'], // User's email
            subject: 'Resend Test Email',
            html: '<p>If you see this, the API key works!</p>'
        });

        if (error) {
            console.error('ERROR Sending Email:', error);
        } else {
            console.log('SUCCESS Email Sent:', data);
        }
    } catch (err) {
        console.error('EXCEPTION:', err);
    }
}

sendTestEmail();
