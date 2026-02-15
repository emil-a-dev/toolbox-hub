'use client';

import Script from 'next/script';

// =============================================
// INSTRUCTIONS:
// 1. Replace GA_MEASUREMENT_ID with your Google Analytics 4 ID (e.g. G-XXXXXXXXXX)
//    Get it at: https://analytics.google.com → Admin → Data Streams → Web → Measurement ID
//
// 2. Replace YM_COUNTER_ID with your Yandex Metrika counter ID (e.g. 12345678)
//    Get it at: https://metrika.yandex.ru → Add counter → copy the counter number
//
// 3. Set ENABLED to true when you're ready to activate tracking
// =============================================

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';   // ← Replace with your GA4 ID
const YM_COUNTER_ID = '00000000';           // ← Replace with your Yandex Metrika ID
const ENABLED = false;                      // ← Set to true to enable tracking

export function Analytics() {
  if (!ENABLED) return null;

  return (
    <>
      {/* ========== Google Analytics 4 ========== */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
        `}
      </Script>

      {/* ========== Yandex Metrika ========== */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${YM_COUNTER_ID}, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            trackHash: true,
          });
        `}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${YM_COUNTER_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
