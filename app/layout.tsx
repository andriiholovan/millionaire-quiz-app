import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { VercelToolbar } from '@vercel/toolbar/next';
import '@/app/_styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Who wants to be a millionaire?',
  description: 'Developed by https://github.com/andriiholovan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldInjectToolbar: boolean = process.env.NODE_ENV === 'development';
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        {shouldInjectToolbar && <VercelToolbar />}
      </body>
    </html>
  );
}
