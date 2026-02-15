'use client';

import { useState, useRef } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function PdfPageCountPage() {
  const [count, setCount] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handle = async (file: File) => {
    setName(file.name);
    setSize(`${(file.size / 1024).toFixed(1)} KB`);
    const buffer = await file.arrayBuffer();
    const text = new TextDecoder('latin1').decode(buffer);
    // Count /Type /Page (not /Pages) occurrences — rough but works for most PDFs
    const matches = text.match(/\/Type\s*\/Page[^s]/g);
    setCount(matches ? matches.length : 0);
  };

  return (
    <ToolLayout title="PDF Page Counter" description="Count the number of pages in a PDF file. Client-side — no upload.">
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-12 cursor-pointer hover:border-primary-400 transition-colors" onClick={() => fileRef.current?.click()} onDrop={e => { e.preventDefault(); handle(e.dataTransfer.files[0]); }} onDragOver={e => e.preventDefault()}>
        <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => e.target.files?.[0] && handle(e.target.files[0])} />
        <div className="text-5xl mb-3">📄</div>
        <div className="text-sm text-gray-500">{name || 'Click or drag a PDF file here'}</div>
      </div>
      {count !== null && (
        <div className="mt-6 rounded-xl bg-primary-50 border border-primary-200 p-8 text-center">
          <div className="text-sm text-primary-600 mb-1">{name} ({size})</div>
          <div className="text-5xl font-bold text-primary-700 my-2">{count}</div>
          <div className="text-sm text-primary-600">page{count !== 1 ? 's' : ''}</div>
        </div>
      )}
    </ToolLayout>
  );
}
