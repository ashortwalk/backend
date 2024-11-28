"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gmail = void 0;
const nodemailer = require("nodemailer");
class Gmail {
    constructor(toEmail, subject, text) {
        this.toEmail = toEmail;
        this.subject = subject;
        this.text = text;
    }
    async send() {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            host: 'smtp.gmail.com',
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: this.toEmail,
            subject: this.subject,
            text: this.text,
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            return true;
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}
exports.Gmail = Gmail;
//# sourceMappingURL=mail.js.map