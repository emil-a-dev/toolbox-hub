'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function RandomNumberPage() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const nums: number[] = [];
    if (unique && count > max - min + 1) { setResults([]); return; }
    const pool = new Set<number>();
    while (nums.length < count) {
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      if (unique) { if (!pool.has(n)) { pool.add(n); nums.push(n); } }
      else nums.push(n);
    }
    setResults(nums);
  };

  return (
    <ToolLayout title="Random Number Generator" description="Generate random numbers within a custom range.">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Min</label><input type="number" value={min} onChange={e => setMin(Number(e.target.value))} className="tool-input" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Max</label><input type="number" value={max} onChange={e => setMax(Number(e.target.value))} className="tool-input" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Count</label><input type="number" min={1} max={1000} value={count} onChange={e => setCount(Number(e.target.value))} className="tool-input" /></div>
        <div className="flex items-end"><label className="flex items-center gap-2 text-sm text-gray-600 pb-2.5"><input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)} /> Unique</label></div>
      </div>
      <button onClick={generate} className="tool-btn mb-6">Generate</button>
      {results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium text-gray-700">Results</span><CopyButton text={results.join(', ')} /></div>
          <div className="flex flex-wrap gap-2">{results.map((n, i) => <span key={i} className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 font-mono font-semibold text-sm">{n}</span>)}</div>
        </div>
      )}
    </ToolLayout>
  );
}
