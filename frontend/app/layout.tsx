import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sistema GDF',
  description: 'Gerenciamento de filas em Pronto-Socorro',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/Gemini_Generated_Image_9357q79357q79357w.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
