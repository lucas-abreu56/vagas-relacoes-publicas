import type { Metadata } from 'next';
import { Syncopate, Manrope } from 'next/font/google';
import './globals.css';

const syncopate = Syncopate({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-syncopate',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Dashboard: Vagas RP Porto Alegre',
  description: 'Análise de dados interativa das vagas locais.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${syncopate.variable} ${manrope.variable} antialiased min-h-screen relative`}>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
