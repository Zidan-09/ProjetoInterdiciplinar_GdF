import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head />
      <body className="bg-white text-gray-800 font-sans">{children}</body>
    </html>
  );
}
