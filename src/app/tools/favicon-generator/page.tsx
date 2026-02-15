'use client';

import { useState, useRef, useEffect } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

const SIZES = [16, 32, 48, 64, 128, 256];

export default function FaviconGeneratorPage() {
  const [text, setText] = useState('A');
  const [bg, setBg] = useState('#4F46E5');
  const [fg, setFg] = useState('#FFFFFF');
  const [shape, setShape] = useState<'square' | 'circle'>('square');
  const [previews, setPreviews] = useState<Record<number, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const render = (size: number) => {
    if (typeof document === 'undefined') return '';
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = bg;
    if (shape === 'circle') {
      ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); ctx.fill();
    } else {
      const r = size * 0.15;
      ctx.beginPath(); ctx.roundRect(0, 0, size, size, r); ctx.fill();
    }
    ctx.fillStyle = fg;
    ctx.font = `bold ${size * 0.55}px sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text.slice(0, 2), size / 2, size / 2 + size * 0.04);
    return canvas.toDataURL('image/png');
  };

  useEffect(() => {
    const p: Record<number, string> = {};
    SIZES.forEach(s => { p[s] = render(s); });
    setPreviews(p);
  }, [text, bg, fg, shape]);

  const download = (size: number) => {
    const a = document.createElement('a');
    a.href = render(size); a.download = `favicon-${size}x${size}.png`; a.click();
  };

  const downloadAll = () => SIZES.forEach(s => download(s));

  return (
    <ToolLayout title="Favicon Generator" description="Create favicons from text. Download multiple sizes.">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Text (1-2 chars)</label><input type="text" maxLength={2} value={text} onChange={e => setText(e.target.value)} className="tool-input text-center text-2xl font-bold" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Background</label><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="tool-input !p-1 !h-10" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label><input type="color" value={fg} onChange={e => setFg(e.target.value)} className="tool-input !p-1 !h-10" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Shape</label><select value={shape} onChange={e => setShape(e.target.value as any)} className="tool-input">{['square', 'circle'].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
      </div>
      <div className="flex flex-wrap items-end gap-4 mb-6">
        {SIZES.map(s => (
          <div key={s} className="text-center cursor-pointer" onClick={() => download(s)}>
            {previews[s] && <img src={previews[s]} alt={`${s}x${s}`} className="mx-auto mb-1 border border-gray-200 rounded" style={{ width: Math.max(s, 32), height: Math.max(s, 32), imageRendering: s < 32 ? 'pixelated' : 'auto' }} />}
            <div className="text-xs text-gray-500">{s}×{s}</div>
          </div>
        ))}
      </div>
      <button onClick={downloadAll} className="tool-btn">Download All Sizes</button>
      <canvas ref={canvasRef} className="hidden" />
    </ToolLayout>
  );
}
