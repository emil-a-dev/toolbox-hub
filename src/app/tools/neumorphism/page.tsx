'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function NeumorphismPage() {
  const [bg, setBg] = useState('#e0e5ec');
  const [size, setSize] = useState(20);
  const [intensity, setIntensity] = useState(15);
  const [radius, setRadius] = useState(16);
  const [shape, setShape] = useState<'flat' | 'concave' | 'convex' | 'pressed'>('flat');

  const adjustColor = (hex: string, amount: number) => {
    const r = Math.min(255, Math.max(0, parseInt(hex.slice(1, 3), 16) + amount));
    const g = Math.min(255, Math.max(0, parseInt(hex.slice(3, 5), 16) + amount));
    const b = Math.min(255, Math.max(0, parseInt(hex.slice(5, 7), 16) + amount));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const light = adjustColor(bg, intensity * 3);
  const dark = adjustColor(bg, -intensity * 3);

  const shadows: Record<string, string> = {
    flat: `${size}px ${size}px ${size * 2}px ${dark}, -${size}px -${size}px ${size * 2}px ${light}`,
    concave: `inset ${size}px ${size}px ${size * 2}px ${dark}, inset -${size}px -${size}px ${size * 2}px ${light}`,
    convex: `${size}px ${size}px ${size * 2}px ${dark}, -${size}px -${size}px ${size * 2}px ${light}`,
    pressed: `inset ${size / 2}px ${size / 2}px ${size}px ${dark}, inset -${size / 2}px -${size / 2}px ${size}px ${light}`,
  };

  const bgGradients: Record<string, string> = {
    flat: bg,
    concave: `linear-gradient(145deg, ${adjustColor(bg, -10)}, ${adjustColor(bg, 10)})`,
    convex: `linear-gradient(145deg, ${adjustColor(bg, 10)}, ${adjustColor(bg, -10)})`,
    pressed: bg,
  };

  const css = `.neumorphic {
  background: ${bgGradients[shape]};
  box-shadow: ${shadows[shape]};
  border-radius: ${radius}px;
}`;

  return (
    <ToolLayout title="Neumorphism Generator" description="Create soft UI (neumorphic) CSS effects with live preview.">
      <div className="rounded-2xl p-12 mb-6 flex items-center justify-center" style={{ background: bg }}>
        <div className="w-48 h-48 flex items-center justify-center" style={{ background: bgGradients[shape], boxShadow: shadows[shape], borderRadius: `${radius}px` }}>
          <span className="text-gray-500 text-sm font-medium">Neumorphism</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {(['flat', 'concave', 'convex', 'pressed'] as const).map(s => (
          <button key={s} onClick={() => setShape(s)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${shape === s ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
        ))}
      </div>
      <div className="space-y-3 mb-4">
        {[{ label: 'Size', value: size, set: setSize, min: 1, max: 50 }, { label: 'Intensity', value: intensity, set: setIntensity, min: 1, max: 30 }, { label: 'Radius', value: radius, set: setRadius, min: 0, max: 100 }].map(c => (
          <div key={c.label} className="flex items-center gap-3"><span className="text-sm text-gray-600 w-20">{c.label}</span><input type="range" min={c.min} max={c.max} value={c.value} onChange={e => c.set(Number(e.target.value))} className="flex-1" /><span className="text-sm font-mono w-10 text-right">{c.value}</span></div>
        ))}
        <div className="flex items-center gap-3"><span className="text-sm text-gray-600 w-20">Color</span><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-10 h-8 rounded" /></div>
      </div>
      <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">CSS</h3><CopyButton text={css} /></div>
      <pre className="result-box !text-sm">{css}</pre>
    </ToolLayout>
  );
}
