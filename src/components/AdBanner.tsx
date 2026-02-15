'use client';

import { useEffect } from 'react';

// ============================================================
// ⚙️  CONFIGURATION — replace with your real AdSense values
// ============================================================
const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX';   // your publisher ID
const SLOT_IDS: Record<string, string> = {
  top: '1111111111',
  bottom: '2222222222',
  sidebar: '3333333333',
};
// Set to true once your AdSense account is approved and the
// script is verified. While false, a placeholder is shown.
const ADSENSE_ENABLED = false;
// ============================================================

export function AdBanner({ slot }: { slot: 'top' | 'bottom' | 'sidebar' }) {
  useEffect(() => {
    if (ADSENSE_ENABLED) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {
        // ad blocked or not loaded
      }
    }
  }, []);

  if (!ADSENSE_ENABLED) {
    return (
      <div className="my-6">
        <div
          className="mx-auto rounded-xl border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-gray-400"
          style={{ minHeight: slot === 'sidebar' ? 250 : 90 }}
        >
          Ad Space ({slot})
        </div>
      </div>
    );
  }

  return (
    <div className="my-6">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={SLOT_IDS[slot] || SLOT_IDS.top}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
