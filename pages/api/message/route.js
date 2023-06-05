import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';

const nodemailer = require('nodemailer');
export async function POST(req) {
    const body = await req.json();
    try {
        const transport = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            secure: false,
            auth: {
                user: '216ea753e1624e',
                pass: 'bf0834df57881b',
            },
        });
        const mailOptions = {
            from: '<admin@example.com>',
            to: body.email,
            subject: 'Contact from the website',
            html: `<p>Dear Admin,</p><p>A user has reached out to you through website with the following information:</p><div><table><tr><th align='left'>Name</th><td>: ${body.name}</td></tr><tr><tr><th align='left'>Email</th><td>: ${body.email}</td></tr><tr><th align='left'>Message</th><td>: ${body.message}</td></tr></table></div><p>Best regards</p>`,
        };
        transport.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false });
    }
}
