'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

function getLuminance(hex: string) {
  const rgb = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map(c => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function getContrastRatio(c1: string, c2: string) {
  const l1 = getLuminance(c1), l2 = getLuminance(c2);
  const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export default function ContrastCheckerPage() {
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');

  const ratio = getContrastRatio(fg, bg);
  const aaLarge = ratio >= 3;
  const aaNormal = ratio >= 4.5;
  const aaaLarge = ratio >= 4.5;
  const aaaNormal = ratio >= 7;

  const Badge = ({ pass }: { pass: boolean }) => (
    <span className={`px-2 py-0.5 rounded text-xs font-bold ${pass ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{pass ? 'PASS' : 'FAIL'}</span>
  );

  return (
    <ToolLayout title="Contrast Checker" description="Check color contrast ratio for WCAG accessibility compliance.">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Foreground (Text)</label><div className="flex gap-2"><input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-12 h-10 rounded" /><input type="text" value={fg} onChange={e => setFg(e.target.value)} className="tool-input font-mono flex-1" /></div></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Background</label><div className="flex gap-2"><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-12 h-10 rounded" /><input type="text" value={bg} onChange={e => setBg(e.target.value)} className="tool-input font-mono flex-1" /></div></div>
      </div>
      <div className="rounded-xl p-8 mb-6 text-center" style={{ backgroundColor: bg, color: fg }}>
        <div className="text-3xl font-bold mb-2">Sample Text</div>
        <div className="text-lg mb-1">The quick brown fox jumps over the lazy dog.</div>
        <div className="text-sm">Small text for testing readability.</div>
      </div>
      <div className="rounded-xl bg-gray-50 p-6 text-center mb-6">
        <div className="text-sm text-gray-500 mb-1">Contrast Ratio</div>
        <div className={`text-4xl font-bold ${ratio >= 4.5 ? 'text-emerald-600' : ratio >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>{ratio.toFixed(2)}:1</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 text-center"><div className="text-xs text-gray-500 mb-1">AA Normal</div><Badge pass={aaNormal} /><div className="text-xs text-gray-400 mt-1">≥ 4.5:1</div></div>
        <div className="rounded-lg bg-gray-50 p-3 text-center"><div className="text-xs text-gray-500 mb-1">AA Large</div><Badge pass={aaLarge} /><div className="text-xs text-gray-400 mt-1">≥ 3:1</div></div>
        <div className="rounded-lg bg-gray-50 p-3 text-center"><div className="text-xs text-gray-500 mb-1">AAA Normal</div><Badge pass={aaaNormal} /><div className="text-xs text-gray-400 mt-1">≥ 7:1</div></div>
        <div className="rounded-lg bg-gray-50 p-3 text-center"><div className="text-xs text-gray-500 mb-1">AAA Large</div><Badge pass={aaaLarge} /><div className="text-xs text-gray-400 mt-1">≥ 4.5:1</div></div>
      </div>
    </ToolLayout>
  );
}
