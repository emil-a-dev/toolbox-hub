'use client';

import Script from 'next/script';

// =============================================
// Яндекс Метрика
// 1. Замени YM_COUNTER_ID на ID счётчика из https://metrika.yandex.ru
// 2. Установи ENABLED = true когда будет готов
// =============================================

const YM_COUNTER_ID = '00000000';           // ← Замени на ID счётчика
const ENABLED = false;                      // ← true чтобы включить

export function Analytics() {
  if (!ENABLED) return null;

  return (
    <>
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
