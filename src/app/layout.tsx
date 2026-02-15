import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Analytics } from '@/components/Analytics';
import { LanguageProvider } from '@/components/LanguageProvider';

export const metadata: Metadata = {
  title: {
    default: 'ToolBox Hub — Free Online Tools',
    template: '%s | ToolBox Hub',
  },
  description:
    'Free online tools for developers and everyone. Text tools, JSON formatter, password generator, QR codes, and more. No registration, works in your browser.',
  keywords: [
    'online tools', 'free tools', 'developer tools', 'text tools',
    'json formatter', 'password generator', 'qr code generator',
    'base64 encoder', 'hash generator', 'color picker',
  ],
  authors: [{ name: 'ToolBox Hub' }],
  creator: 'ToolBox Hub',
  metadataBase: new URL('https://toolboxhub.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toolboxhub.vercel.app',
    siteName: 'ToolBox Hub',
    title: 'ToolBox Hub — Free Online Tools',
    description: 'Free online tools that work right in your browser. No registration needed.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolBox Hub — Free Online Tools',
    description: 'Free online tools that work right in your browser.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        {/* HilltopAds verification */}
        <meta name="e1bf44561b85e910d4706681f7b810b318d5f243" content="e1bf44561b85e910d4706681f7b810b318d5f243" />
        {/* HilltopAds ad zone #6803605 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(rmitp){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = rmitp || {};
s.src = "//zany-aside.com/bNX.Vks/d/GTls0qY/W/ch/ce/mt9/ueZfUClMkdP/T/Yl4GMUDuM-2CMPDoUOtlNvj/g/w/MzzAYgw/OyQt";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})`
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Header />
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
