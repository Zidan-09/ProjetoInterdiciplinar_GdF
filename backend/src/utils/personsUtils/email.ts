import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

export const sendEmail = {
    async auth(email: string, token: string) {
        const link = `http://localhost:3333/employee/activateAccount?token=${token}`;
    
        const html = `
        <p> Olá! <p>
        <p> Você foi cadastrado no Sistema de Gerenciamento de Filas (SGdF)
        <p> Acesse o link a seguir para ativar sua conta <p>
        <a href="${link}">${link}</a>
        <p> Este link expira em 72 horas! <p>
        `;
    
        try {
            await transporter.sendMail({
                from: `"Sistema Hospitalar" <${EMAIL_USER}>`,
                to: email,
                subject: 'Ativação de conta - Sistema Hospitalar GdF',
                html: html
            });
            return email;

        } catch (error) {
            console.error(error);
            return undefined;
        }
    },

    async forgot(email: string, token: string) {
        const link = `http://localhost:3333/employee/forgot?token=${token}`;

        const html = `
        <p> Olá! <p>
        <p> Alguém está tentando acessar a sua conta e alterar a senha de login
        <p> Se for você, acesse o link a seguir para alterar a senha <p>
        <a href="${link}">${link}</a>
        `;

        try {
            await transporter.sendMail({
                from: `"Sistema Hospitalar" <${EMAIL_USER}>`,
                to: email,
                subject: 'Alterar senha - Sistema Hospitalar GdF',
                html: html
            })
            return email;

        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}