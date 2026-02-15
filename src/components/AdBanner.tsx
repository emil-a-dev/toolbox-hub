'use client';

import { useEffect, useRef } from 'react';

// ============================================================
// ⚙️  Яндекс РСЯ — замени YANDEX_BLOCK_IDS на реальные значения
// ============================================================
const YANDEX_RTB_ENABLED = true;
const YANDEX_BLOCK_IDS: Record<string, string> = {
  top:     'R-A-18733662-1',
  bottom:  'R-A-18733662-1',
  sidebar: 'R-A-18733662-1',
};
// ============================================================

export function AdBanner({ slot }: { slot: 'top' | 'bottom' | 'sidebar' }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!YANDEX_RTB_ENABLED || !containerRef.current) return;
    try {
      const w = window as any;
      w.yaContextCb = w.yaContextCb || [];
      w.yaContextCb.push(() => {
        (window as any).Ya.Context.AdvManager.render({
          blockId: YANDEX_BLOCK_IDS[slot] || YANDEX_BLOCK_IDS.top,
          renderTo: containerRef.current!.id,
          type: slot === 'sidebar' ? 'floorAd' : 'feed',
        });
      });
    } catch {
      // ad blocked or not loaded
    }
  }, [slot]);

  if (!YANDEX_RTB_ENABLED) {
    return (
      <div className="my-3 sm:my-6">
        <div
          className="mx-auto rounded-xl border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-gray-400"
          style={{ minHeight: slot === 'sidebar' ? 250 : 90 }}
        >
          Яндекс РСЯ ({slot})
        </div>
      </div>
    );
  }

  const containerId = `yandex-rtb-${slot}-${YANDEX_BLOCK_IDS[slot]}`;

  return (
    <div className="my-3 sm:my-6 relative z-0 overflow-hidden">
      <div id={containerId} ref={containerRef} />
    </div>
  );
}
