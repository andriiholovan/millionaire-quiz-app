import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
