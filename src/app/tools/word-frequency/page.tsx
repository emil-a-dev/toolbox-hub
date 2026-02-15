'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function WordFreqPage() {
  const [text, setText] = useState('');
  const [minLen, setMinLen] = useState(2);
  const [showCount, setShowCount] = useState(50);

  const words = text.toLowerCase().replace(/[^a-zа-яё0-9\s'-]/gi, '').split(/\s+/).filter(w => w.length >= minLen);
  const freq = new Map<string, number>();
  words.forEach(w => freq.set(w, (freq.get(w) || 0) + 1));
  const sorted = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).slice(0, showCount);
  const maxFreq = sorted[0]?.[1] || 1;

  return (
    <ToolLayout title="Word Frequency Counter" description="Count word frequency and find the most common words in your text.">
      <textarea value={text} onChange={e => setText(e.target.value)} className="tool-textarea h-32" placeholder="Paste your text here..." />
      <div className="flex items-center gap-4 mt-3">
        <label className="text-sm text-gray-600">Min word length: <input type="number" min={1} max={10} value={minLen} onChange={e => setMinLen(Number(e.target.value))} className="tool-input !w-16 !inline" /></label>
        <label className="text-sm text-gray-600">Show top: <input type="number" min={10} max={200} value={showCount} onChange={e => setShowCount(Number(e.target.value))} className="tool-input !w-16 !inline" /></label>
        <span className="text-sm text-gray-500 ml-auto">{freq.size} unique words, {words.length} total</span>
      </div>
      {sorted.length > 0 && (
        <div className="mt-6 space-y-1">
          <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">Top Words</h3><CopyButton text={sorted.map(([w, c]) => `${w}: ${c}`).join('\n')} /></div>
          {sorted.map(([word, count], i) => (
            <div key={word} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-6 text-right">{i + 1}</span>
              <span className="text-sm font-medium text-gray-800 w-32 truncate">{word}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden"><div className="bg-primary-500 h-full rounded-full transition-all" style={{ width: `${(count / maxFreq) * 100}%` }} /></div>
              <span className="text-sm font-mono text-gray-600 w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
