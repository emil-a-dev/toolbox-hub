'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function BoxShadowPage() {
  const [x, setX] = useState(5);
  const [y, setY] = useState(5);
  const [blur, setBlur] = useState(15);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(20);
  const [inset, setInset] = useState(false);

  const hexToRgba = (hex: string, a: number) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${a / 100})`;
  };

  const shadow = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
  const css = `box-shadow: ${shadow};`;

  const presets = [
    { name: 'Subtle', v: '0 1px 3px rgba(0,0,0,0.12)' },
    { name: 'Elevated', v: '0 10px 40px rgba(0,0,0,0.15)' },
    { name: 'Sharp', v: '5px 5px 0 rgba(0,0,0,1)' },
    { name: 'Dreamy', v: '0 20px 60px rgba(0,0,0,0.1)' },
    { name: 'Layered', v: '0 1px 1px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.12)' },
  ];

  const controls = [
    { label: 'X Offset', value: x, set: setX, min: -50, max: 50 },
    { label: 'Y Offset', value: y, set: setY, min: -50, max: 50 },
    { label: 'Blur', value: blur, set: setBlur, min: 0, max: 100 },
    { label: 'Spread', value: spread, set: setSpread, min: -50, max: 50 },
    { label: 'Opacity', value: opacity, set: setOpacity, min: 0, max: 100 },
  ];

  return (
    <ToolLayout title="Box Shadow Generator" description="Create CSS box shadows with a visual editor.">
      <div className="flex items-center justify-center py-16 mb-6 rounded-xl bg-gray-50">
        <div className="w-40 h-40 bg-white rounded-xl" style={{ boxShadow: shadow }} />
      </div>
      <div className="space-y-3 mb-4">
        {controls.map(c => (
          <div key={c.label} className="flex items-center gap-3"><span className="text-sm text-gray-600 w-20">{c.label}</span><input type="range" min={c.min} max={c.max} value={c.value} onChange={e => c.set(Number(e.target.value))} className="flex-1" /><span className="text-sm font-mono text-gray-800 w-10 text-right">{c.value}</span></div>
        ))}
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div><label className="block text-xs text-gray-500 mb-1">Color</label><input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-8 rounded" /></div>
        <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={inset} onChange={e => setInset(e.target.checked)} /> Inset</label>
      </div>
      <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">CSS</h3><CopyButton text={css} /></div>
      <pre className="result-box">{css}</pre>
    </ToolLayout>
  );
}
