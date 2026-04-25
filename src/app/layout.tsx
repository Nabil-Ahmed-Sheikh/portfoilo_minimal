import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
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
  title: 'Nabil Ahmed — Software Engineer',
  description: 'Building fast, scalable web apps. React, TypeScript, Node.js, AWS, Python.',
  openGraph: {
    title: 'Nabil Ahmed — Software Engineer',
    description: 'Building fast, scalable web apps.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
