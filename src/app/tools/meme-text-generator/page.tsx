'use client';

import { useState, useRef, useEffect } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

const FONTS = [
  'Impact', 'Arial Black', 'Comic Sans MS', 'Anton', 'Bangers',
];

export default function MemeTextPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState('TOP TEXT');
  const [bottomText, setBottomText] = useState('BOTTOM TEXT');
  const [fontSize, setFontSize] = useState(48);
  const [font, setFont] = useState('Impact');

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.font = `bold ${fontSize}px ${font}`;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize / 12;
      ctx.textAlign = 'center';
      ctx.lineJoin = 'round';
      // Top
      const topLines = topText.toUpperCase().split('\n');
      topLines.forEach((line, i) => {
        const y = fontSize + 10 + i * (fontSize + 4);
        ctx.strokeText(line, canvas.width / 2, y);
        ctx.fillText(line, canvas.width / 2, y);
      });
      // Bottom
      const botLines = bottomText.toUpperCase().split('\n');
      botLines.reverse().forEach((line, i) => {
        const y = canvas.height - 20 - i * (fontSize + 4);
        ctx.strokeText(line, canvas.width / 2, y);
        ctx.fillText(line, canvas.width / 2, y);
      });
    };
    img.src = image;
  }, [image, topText, bottomText, fontSize, font]);

  const download = () => {
    if (!canvasRef.current) return;
    const a = document.createElement('a');
    a.href = canvasRef.current.toDataURL('image/png');
    a.download = 'meme.png';
    a.click();
  };

  return (
    <ToolLayout title="Meme Text Generator" description="Add meme text to images. Classic Impact font style.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label><input type="file" accept="image/*" onChange={handleImage} className="tool-input" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Top Text</label><input type="text" value={topText} onChange={e => setTopText(e.target.value)} className="tool-input" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Bottom Text</label><input type="text" value={bottomText} onChange={e => setBottomText(e.target.value)} className="tool-input" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label><input type="range" min={16} max={96} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full" /><span className="text-xs text-gray-400">{fontSize}px</span></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Font</label><select value={font} onChange={e => setFont(e.target.value)} className="tool-input">{FONTS.map(f => <option key={f} value={f}>{f}</option>)}</select></div>
          </div>
          {image && <button onClick={download} className="tool-btn w-full">📥 Download Meme</button>}
        </div>
        <div className="flex items-center justify-center">
          <div className={`rounded-xl overflow-hidden border-2 border-gray-200 ${image ? '' : 'bg-gray-50 min-h-[300px] flex items-center justify-center text-gray-400'}`}>
            <canvas ref={canvasRef} className={`max-w-full h-auto ${image ? '' : 'hidden'}`} />
            {!image && <span>Upload an image to start</span>}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
