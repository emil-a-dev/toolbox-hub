'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function GradientPage() {
  const [c1, setC1] = useState('#667eea');
  const [c2, setC2] = useState('#764ba2');
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<'linear' | 'radial'>('linear');

  const css = type === 'linear' ? `background: linear-gradient(${angle}deg, ${c1}, ${c2});` : `background: radial-gradient(circle, ${c1}, ${c2});`;

  const presets = [
    ['#667eea', '#764ba2'], ['#f093fb', '#f5576c'], ['#4facfe', '#00f2fe'], ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'], ['#a18cd1', '#fbc2eb'], ['#ffecd2', '#fcb69f'], ['#ff9a9e', '#fad0c4'],
    ['#1a2a6c', '#b21f1f'], ['#0f0c29', '#302b63'], ['#11998e', '#38ef7d'], ['#ee0979', '#ff6a00'],
  ];

  return (
    <ToolLayout title="Gradient Generator" description="Create beautiful CSS gradients with live preview.">
      <div className="rounded-2xl h-48 w-full mb-6 shadow-inner" style={{ background: type === 'linear' ? `linear-gradient(${angle}deg, ${c1}, ${c2})` : `radial-gradient(circle, ${c1}, ${c2})` }} />
      <div className="flex flex-wrap gap-4 mb-4">
        <div><label className="block text-xs text-gray-500 mb-1">Color 1</label><input type="color" value={c1} onChange={e => setC1(e.target.value)} className="w-12 h-10 rounded cursor-pointer" /></div>
        <div><label className="block text-xs text-gray-500 mb-1">Color 2</label><input type="color" value={c2} onChange={e => setC2(e.target.value)} className="w-12 h-10 rounded cursor-pointer" /></div>
        <div><label className="block text-xs text-gray-500 mb-1">Type</label><select value={type} onChange={e => setType(e.target.value as any)} className="tool-input !w-28">{['linear', 'radial'].map(t => <option key={t}>{t}</option>)}</select></div>
        {type === 'linear' && <div className="flex-1 min-w-[120px]"><label className="block text-xs text-gray-500 mb-1">Angle: {angle}°</label><input type="range" min={0} max={360} value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full" /></div>}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {presets.map(([a, b], i) => (
          <button key={i} onClick={() => { setC1(a); setC2(b); }} className="w-10 h-10 rounded-lg border border-gray-200 hover:scale-110 transition-transform" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }} />
        ))}
      </div>
      <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">CSS</h3><CopyButton text={css} /></div>
      <pre className="result-box">{css}</pre>
    </ToolLayout>
  );
}
