'use client';

import { useState, useRef } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function ImageToBase64Page() {
  const [result, setResult] = useState('');
  const [preview, setPreview] = useState('');
  const [fileName, setFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handle = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreview(base64);
      setResult(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <ToolLayout title="Image to Base64" description="Convert any image to a Base64 encoded string.">
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 mb-6 hover:border-primary-400 transition-colors cursor-pointer" onClick={() => fileRef.current?.click()} onDrop={e => { e.preventDefault(); handle(e.dataTransfer.files[0]); }} onDragOver={e => e.preventDefault()}>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handle(e.target.files[0])} />
        <div className="text-4xl mb-2">🖼️</div>
        <div className="text-sm text-gray-500">{fileName || 'Click or drag an image here'}</div>
      </div>
      {preview && <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-4" />}
      {result && (<>
        <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">Base64 String ({(result.length / 1024).toFixed(1)} KB)</h3><CopyButton text={result} /></div>
        <textarea readOnly value={result} className="result-box !h-40 resize-none" />
      </>)}
    </ToolLayout>
  );
}
