
import type {Metadata} from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/providers/LanguageProvider';

export const metadata: Metadata = {
  title: 'Égypte 2026 — Alliance Travel',
  description: 'Découvrez les Pyramides et la Mer Rouge avec Alliance Travel.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Noto+Sans+Arabic:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <LanguageProvider>
          <div className="fixed inset-0 z-[-1] luxury-gradient-bg pointer-events-none" />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
