import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

export async function sendEmail(email: string, token: string) {
    const link = `http://localhost:3333/employee/activateAccount=${token}`;

    const html = `
    <p> Olá! <p>
    <p> Você foi cadastrado no Sistema de Gerenciamento de Filas (SGdF)
    <p> Acesse o link a seguir para ativar sua conta <p>
    <a href="${link}">${link}</a>
    <p> Este link expira em 72 horas! <p>
    `;

    await transporter.sendMail({
        from: `"Sistema Hospitalar" <${EMAIL_USER}>`,
        to: email,
        subject: 'Ativação de conta - Sistema Hospitalar GdF'
    });
};