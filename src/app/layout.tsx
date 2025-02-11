import { Providers } from '@/app/Providers';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Workout Manager',
  description: 'logging your workout',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-zinc-50 antialiased`}>
        <Providers>
          <div className="mx-auto min-h-dvh max-w-3xl bg-background shadow-[0_0_15px_0_rgb(0,0,0,0.05)]">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
