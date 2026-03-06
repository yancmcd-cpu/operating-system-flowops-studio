import type { Metadata } from 'next';
import { LanguageProvider } from '@/components/LanguageContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'FlowOps Studio OS',
  description: 'A modular AI-powered agency operating system.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <main className="container">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
