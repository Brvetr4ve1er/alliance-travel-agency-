
import type {Metadata} from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { FirebaseClientProvider } from '@/firebase';
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Arabic } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-headline',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

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
    <html lang="fr" className={`dark ${cormorant.variable} ${dmSans.variable} ${notoArabic.variable}`}>
      <body className="font-body antialiased bg-background text-foreground">
        <FirebaseClientProvider>
          <LanguageProvider>
            <div className="fixed inset-0 z-[-1] luxury-gradient-bg pointer-events-none" />
            {children}
          </LanguageProvider>
        </FirebaseClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
