import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "./context/AuthContext"; // ✅ IMPORTANTE

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema GdF",
  description: "Sistema de Gerenciamento de Filas em Pronto-Socorro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <AuthProvider> {/* ✅ Aqui está a solução */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
