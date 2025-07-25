import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// import { configDotenv } from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

export async function sendEmail(subject, message) {
    await transporter.sendMail({
        from: "kafinahmad17@gmail.com",
        to: 'kafinahmad@gmail.com',
        subject,
        text: message,
    });
}