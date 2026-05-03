import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Cursor } from '@/components/Cursor';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nabilahmed.dev',
  ),
  title: {
    default: 'Nabil Ahmed — Software Engineer',
    template: '%s | Nabil Ahmed',
  },
  description:
    'Building fast, scalable web apps. React, TypeScript, Node.js, AWS, Python.',
  keywords: ['software engineer', 'full-stack', 'React', 'TypeScript', 'Node.js', 'AWS'],
  authors: [{ name: 'Nabil Ahmed', url: 'https://github.com/Nabil-Ahmed-Sheikh' }],
  openGraph: {
    siteName: 'Nabil Ahmed',
    title: 'Nabil Ahmed — Software Engineer',
    description: 'Building fast, scalable web apps. React, TypeScript, Node.js, AWS, Python.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nabil Ahmed — Software Engineer',
    description: 'Building fast, scalable web apps. React, TypeScript, Node.js, AWS, Python.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
        <ThemeProvider>
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
