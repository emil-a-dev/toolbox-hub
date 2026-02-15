'use client';

import { useState, useRef } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function SvgToPngPage() {
  const [svg, setSvg] = useState('');
  const [scale, setScale] = useState(2);
  const [preview, setPreview] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const convert = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setPreview(canvas.toDataURL('image/png'));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const download = () => {
    if (!preview) return;
    const a = document.createElement('a');
    a.href = preview; a.download = 'converted.png'; a.click();
  };

  return (
    <ToolLayout title="SVG to PNG Converter" description="Convert SVG code to a downloadable PNG image with custom scale.">
      <textarea value={svg} onChange={e => setSvg(e.target.value)} placeholder='<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">...</svg>' className="tool-textarea h-40" />
      <div className="flex items-center gap-4 mt-4">
        <label className="text-sm text-gray-600">Scale: {scale}x</label>
        <input type="range" min={1} max={8} value={scale} onChange={e => setScale(Number(e.target.value))} className="flex-1" />
        <button onClick={convert} className="tool-btn" disabled={!svg.trim()}>Convert</button>
      </div>
      <canvas ref={canvasRef} className="hidden" />
      {preview && (
        <div className="mt-6 text-center">
          <img src={preview} alt="PNG" className="max-h-64 mx-auto rounded-lg border border-gray-200 mb-4" />
          <button onClick={download} className="tool-btn">Download PNG</button>
        </div>
      )}
    </ToolLayout>
  );
}
