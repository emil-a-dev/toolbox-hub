'use client';

import { useState, useEffect, useRef } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { Download } from 'lucide-react';

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState('https://toolboxhub.vercel.app');
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrLoaded, setQrLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function generateQR() {
      if (!text || !canvasRef.current) return;
      try {
        const QRCode = (await import('qrcode')).default;
        if (!cancelled) {
          await QRCode.toCanvas(canvasRef.current, text, {
            width: size,
            margin: 2,
            color: { dark: '#000000', light: '#ffffff' },
          });
          setQrLoaded(true);
        }
      } catch (err) {
        console.error('QR generation error:', err);
      }
    }
    generateQR();
    return () => { cancelled = true; };
  }, [text, size]);

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes for any text, URL, or data. Download as PNG."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter URL or text..."
            className="tool-textarea"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Size: {size}px</label>
            <input
              type="range"
              min={128}
              max={512}
              step={64}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 inline-block">
            <canvas ref={canvasRef} />
          </div>
          {qrLoaded && (
            <button onClick={download} className="tool-btn">
              <Download size={16} /> Download PNG
            </button>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
