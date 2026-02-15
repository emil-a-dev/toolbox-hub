'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function PlagiarismHashPage() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const hash = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text.trim().toLowerCase().replace(/\s+/g, ' '));
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const [h1, setH1] = useState('');
  const [h2, setH2] = useState('');

  const compare = async () => {
    const a = await hash(text1);
    const b = await hash(text2);
    setH1(a); setH2(b);
  };

  const similarity = (() => {
    if (!text1 || !text2) return null;
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    const intersection = Array.from(words1).filter(w => words2.has(w)).length;
    const union = new Set(Array.from(words1).concat(Array.from(words2))).size;
    return union ? Math.round((intersection / union) * 100) : 0;
  })();

  return (
    <ToolLayout title="Plagiarism Hash Checker" description="Compare two texts using hash fingerprinting and word similarity.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Text 1</label><textarea value={text1} onChange={e => setText1(e.target.value)} className="tool-textarea h-40" placeholder="Paste first text..." /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Text 2</label><textarea value={text2} onChange={e => setText2(e.target.value)} className="tool-textarea h-40" placeholder="Paste second text..." /></div>
      </div>
      <button onClick={compare} className="tool-btn mt-4">Compare</button>
      {(h1 || similarity !== null) && (
        <div className="mt-6 space-y-4">
          {similarity !== null && (
            <div className={`rounded-xl p-6 text-center ${similarity > 70 ? 'bg-red-50 border border-red-200' : similarity > 40 ? 'bg-yellow-50 border border-yellow-200' : 'bg-emerald-50 border border-emerald-200'}`}>
              <div className="text-sm text-gray-600 mb-1">Word Similarity</div>
              <div className={`text-4xl font-bold ${similarity > 70 ? 'text-red-600' : similarity > 40 ? 'text-yellow-600' : 'text-emerald-600'}`}>{similarity}%</div>
              <div className="text-sm text-gray-500 mt-1">{similarity > 70 ? 'High similarity detected' : similarity > 40 ? 'Moderate similarity' : 'Low similarity'}</div>
            </div>
          )}
          {h1 && (
            <div className="space-y-2">
              <div className="rounded-lg bg-gray-50 px-4 py-3"><span className="text-xs text-gray-500">Hash 1:</span><div className="font-mono text-xs text-gray-700 break-all">{h1}</div></div>
              <div className="rounded-lg bg-gray-50 px-4 py-3"><span className="text-xs text-gray-500">Hash 2:</span><div className="font-mono text-xs text-gray-700 break-all">{h2}</div></div>
              <div className={`text-sm font-semibold ${h1 === h2 ? 'text-red-600' : 'text-emerald-600'}`}>{h1 === h2 ? '⚠️ Hashes match — texts are identical (after normalization)' : '✅ Hashes differ — texts are not identical'}</div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}
