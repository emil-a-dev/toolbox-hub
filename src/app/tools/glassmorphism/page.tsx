'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function GlassmorphismPage() {
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(20);
  const [saturation, setSaturation] = useState(180);
  const [borderOpacity, setBorderOpacity] = useState(30);
  const [bg, setBg] = useState('#ffffff');

  const hexToRgba = (hex: string, a: number) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${a / 100})`;
  };

  const css = `.glass {
  background: ${hexToRgba(bg, opacity)};
  backdrop-filter: blur(${blur}px) saturate(${saturation}%);
  -webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
  border: 1px solid ${hexToRgba(bg, borderOpacity)};
  border-radius: 16px;
}`;

  return (
    <ToolLayout title="Glassmorphism Generator" description="Create frosted glass CSS effects with live preview.">
      <div className="rounded-2xl p-8 mb-6" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)' }}>
        <div className="flex items-center justify-center py-8">
          <div className="w-72 h-48 rounded-2xl p-6 flex items-center justify-center" style={{ background: hexToRgba(bg, opacity), backdropFilter: `blur(${blur}px) saturate(${saturation}%)`, border: `1px solid ${hexToRgba(bg, borderOpacity)}` }}>
            <div className="text-center text-white"><div className="text-xl font-bold mb-1">Glass Card</div><div className="text-sm opacity-80">Beautiful frosted glass effect</div></div>
          </div>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        {[{ label: 'Blur', value: blur, set: setBlur, min: 0, max: 30, unit: 'px' }, { label: 'Opacity', value: opacity, set: setOpacity, min: 0, max: 100, unit: '%' }, { label: 'Saturation', value: saturation, set: setSaturation, min: 100, max: 300, unit: '%' }, { label: 'Border Opacity', value: borderOpacity, set: setBorderOpacity, min: 0, max: 100, unit: '%' }].map(c => (
          <div key={c.label} className="flex items-center gap-3"><span className="text-sm text-gray-600 w-28">{c.label}</span><input type="range" min={c.min} max={c.max} value={c.value} onChange={e => c.set(Number(e.target.value))} className="flex-1" /><span className="text-sm font-mono text-gray-800 w-12 text-right">{c.value}{c.unit}</span></div>
        ))}
        <div className="flex items-center gap-3"><span className="text-sm text-gray-600 w-28">Color</span><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-10 h-8 rounded" /></div>
      </div>
      <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">CSS</h3><CopyButton text={css} /></div>
      <pre className="result-box !text-sm">{css}</pre>
    </ToolLayout>
  );
}
