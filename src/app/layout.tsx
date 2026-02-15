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
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Header />
          <div className="flex-1 flex w-full max-w-[1400px] mx-auto">
            <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
              {children}
            </main>
            {/* Desktop sidebar ad — fixed, visible only on lg+ */}
            <aside className="hidden lg:block w-[180px] shrink-0 relative">
              <div className="fixed top-20 w-[160px]" id="desktop-ad-container">
                <script
                  dangerouslySetInnerHTML={{
                    __html: `(function(bu){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = bu || {};
s.src = "//zany-aside.com/b/XvVNs.dMGjlG0gYiWrcj/XeXmi9ZubZrUZl/kdPzT/Yu4-MEDtMK2CN/DOkXt_NnjvgCw/MNzAY/1NMvwo";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})`
                  }}
                />
              </div>
            </aside>
          </div>
          <Footer />
        </LanguageProvider>
        {/* Mobile fixed bottom ad container */}
        <div id="mobile-ad-container" className="lg:hidden"></div>
        {/* Mobile ad loader + observer */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  if(window.innerWidth >= 1024) return;
  // Load HilltopAds mobile script
  (function(qjgk){
    var d = document, s = d.createElement('script'),
        l = d.scripts[d.scripts.length - 1];
    s.settings = qjgk || {};
    s.src = "//zany-aside.com/bLXBVcsBd.G-lJ0pY/WYcW/pe/m/9ZuLZrUJlGkjPtTiYK4iMVDzMT2qM/zqc/tpN/j/gdwgMUzqYH0/MXQc";
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';
    l.parentNode.insertBefore(s, l);
  })({});
  // Observe body for injected ad elements and force them into our fixed container
  var container = document.getElementById('mobile-ad-container');
  var captured = false;
  function captureAd(el){
    if(captured) return;
    container.appendChild(el);
    captured = true;
  }
  var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(m){
      m.addedNodes.forEach(function(node){
        if(node.nodeType !== 1) return;
        // Capture iframes or divs injected with fixed/absolute positioning
        var tag = node.tagName;
        if(tag === 'IFRAME' || tag === 'DIV'){
          var s = node.getAttribute('style') || '';
          if(s.indexOf('fixed') !== -1 || s.indexOf('absolute') !== -1 || s.indexOf('z-index') !== -1){
            setTimeout(function(){ captureAd(node); }, 50);
          }
        }
      });
    });
  });
  observer.observe(document.body, {childList: true});
  // Also check every 2s for 30s in case ads load late
  var checks = 0;
  var interval = setInterval(function(){
    if(++checks > 15){ clearInterval(interval); return; }
    var els = document.body.children;
    for(var i = 0; i < els.length; i++){
      var el = els[i];
      if(el.id === 'mobile-ad-container' || el.id === '__next' || el.tagName === 'SCRIPT' || el.tagName === 'LINK' || el.tagName === 'STYLE') continue;
      var cs = window.getComputedStyle(el);
      if(cs.position === 'fixed' || cs.position === 'absolute'){
        captureAd(el);
        clearInterval(interval);
        break;
      }
    }
  }, 2000);
})()`
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
