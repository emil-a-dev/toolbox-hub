'use client';

import { useState, useRef } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function ImageCompressorPage() {
  const [original, setOriginal] = useState<{ url: string; size: number; name: string } | null>(null);
  const [quality, setQuality] = useState(70);
  const [compressed, setCompressed] = useState<{ url: string; size: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handle = (file: File) => {
    setOriginal({ url: URL.createObjectURL(file), size: file.size, name: file.name });
    setCompressed(null);
  };

  const compress = () => {
    if (!original) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width; canvas.height = img.height;
      canvas.getContext('2d')!.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        if (blob) setCompressed({ url: URL.createObjectURL(blob), size: blob.size });
      }, 'image/jpeg', quality / 100);
    };
    img.src = original.url;
  };

  const download = () => {
    if (!compressed) return;
    const a = document.createElement('a');
    a.href = compressed.url; a.download = `compressed_${original?.name || 'image'}.jpg`; a.click();
  };

  const fmt = (b: number) => b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${(b / 1024).toFixed(1)} KB`;

  return (
    <ToolLayout title="Image Compressor" description="Compress images by adjusting JPEG quality. Client-side — no upload needed.">
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 mb-6 cursor-pointer hover:border-primary-400 transition-colors" onClick={() => fileRef.current?.click()} onDrop={e => { e.preventDefault(); handle(e.dataTransfer.files[0]); }} onDragOver={e => e.preventDefault()}>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handle(e.target.files[0])} />
        <div className="text-4xl mb-2">📦</div>
        <div className="text-sm text-gray-500">{original?.name || 'Click or drag an image here'}</div>
      </div>
      {original && (
        <>
          <div className="flex items-center gap-4 mb-4">
            <label className="text-sm text-gray-600">Quality: {quality}%</label>
            <input type="range" min={5} max={100} value={quality} onChange={e => setQuality(Number(e.target.value))} className="flex-1" />
            <button onClick={compress} className="tool-btn">Compress</button>
          </div>
          {compressed && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg bg-gray-50 p-4 text-center"><div className="text-sm text-gray-500 mb-1">Original</div><div className="text-lg font-bold">{fmt(original.size)}</div></div>
              <div className="rounded-lg bg-emerald-50 p-4 text-center"><div className="text-sm text-emerald-600 mb-1">Compressed</div><div className="text-lg font-bold text-emerald-700">{fmt(compressed.size)}</div><div className="text-xs text-emerald-500 mt-1">{((1 - compressed.size / original.size) * 100).toFixed(0)}% smaller</div></div>
            </div>
          )}
          {compressed && <div className="text-center mt-4"><button onClick={download} className="tool-btn">Download Compressed</button></div>}
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </ToolLayout>
  );
}
