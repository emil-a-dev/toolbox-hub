'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }

export default function AspectRatioPage() {
  const [w, setW] = useState(1920);
  const [h, setH] = useState(1080);
  const [newW, setNewW] = useState('');
  const [newH, setNewH] = useState('');

  const g = gcd(w, h);
  const ratioW = w / g, ratioH = h / g;

  const calculate = (target: 'w' | 'h') => {
    if (target === 'h' && newW) setNewH(String(Math.round(Number(newW) * ratioH / ratioW)));
    if (target === 'w' && newH) setNewW(String(Math.round(Number(newH) * ratioW / ratioH)));
  };

  const presets = [
    { name: '16:9 (HD)', w: 1920, h: 1080 },
    { name: '4:3 (Standard)', w: 1024, h: 768 },
    { name: '1:1 (Square)', w: 1080, h: 1080 },
    { name: '9:16 (Story)', w: 1080, h: 1920 },
    { name: '21:9 (Ultra-wide)', w: 2560, h: 1080 },
    { name: '3:2 (Photo)', w: 1500, h: 1000 },
  ];

  return (
    <ToolLayout title="Aspect Ratio Calculator" description="Calculate aspect ratios and resize dimensions proportionally.">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Width</label><input type="number" value={w} onChange={e => setW(Number(e.target.value))} className="tool-input" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Height</label><input type="number" value={h} onChange={e => setH(Number(e.target.value))} className="tool-input" /></div>
      </div>
      <div className="rounded-xl bg-primary-50 border border-primary-200 p-6 text-center mb-6">
        <div className="text-sm text-primary-600 mb-1">Aspect Ratio</div>
        <div className="text-3xl font-bold text-primary-700">{ratioW}:{ratioH}</div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {presets.map(p => (
          <button key={p.name} onClick={() => { setW(p.w); setH(p.h); }} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">{p.name}</button>
        ))}
      </div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Resize Calculator</h3>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm text-gray-600 mb-1">New Width</label><input type="number" value={newW} onChange={e => setNewW(e.target.value)} onBlur={() => calculate('h')} className="tool-input" placeholder="Enter width" /></div>
        <div><label className="block text-sm text-gray-600 mb-1">New Height</label><input type="number" value={newH} onChange={e => setNewH(e.target.value)} onBlur={() => calculate('w')} className="tool-input" placeholder="Enter height" /></div>
      </div>
    </ToolLayout>
  );
}
