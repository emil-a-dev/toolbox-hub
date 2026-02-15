'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function LoremPicsumPage() {
  const [w, setW] = useState(800);
  const [h, setH] = useState(600);
  const [grayscale, setGrayscale] = useState(false);
  const [blur, setBlur] = useState(0);
  const [seed, setSeed] = useState('');

  const params = [grayscale && 'grayscale', blur > 0 && `blur=${blur}`].filter(Boolean).join('&');
  const base = seed ? `https://picsum.photos/seed/${seed}/${w}/${h}` : `https://picsum.photos/${w}/${h}`;
  const url = params ? `${base}?${params}` : base;

  const imgTag = `<img src="${url}" alt="Placeholder" width="${w}" height="${h}" />`;
  const css = `background-image: url('${url}');`;

  return (
    <ToolLayout title="Lorem Picsum — Placeholder Images" description="Generate placeholder images with custom dimensions.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Width</label><input type="number" value={w} onChange={e => setW(Number(e.target.value))} className="tool-input" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Height</label><input type="number" value={h} onChange={e => setH(Number(e.target.value))} className="tool-input" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Seed (optional)</label><input type="text" value={seed} onChange={e => setSeed(e.target.value)} className="tool-input" placeholder="random" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Blur (0-10)</label><input type="number" min={0} max={10} value={blur} onChange={e => setBlur(Number(e.target.value))} className="tool-input" /></div>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600 mb-6"><input type="checkbox" checked={grayscale} onChange={e => setGrayscale(e.target.checked)} /> Grayscale</label>
      <div className="rounded-xl overflow-hidden border border-gray-200 mb-6">
        <img src={url} alt="Placeholder" className="w-full max-h-96 object-cover" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"><code className="text-xs text-gray-700 break-all flex-1">{url}</code><CopyButton text={url} /></div>
        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"><code className="text-xs text-gray-700 break-all flex-1">{imgTag}</code><CopyButton text={imgTag} /></div>
        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"><code className="text-xs text-gray-700 break-all flex-1">{css}</code><CopyButton text={css} /></div>
      </div>
    </ToolLayout>
  );
}
