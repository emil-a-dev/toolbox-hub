'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

function computeStats(numbers: number[]) {
  const n = numbers.length;
  if (n === 0) return null;
  const sorted = [...numbers].sort((a, b) => a - b);
  const sum = numbers.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const variance = numbers.reduce((a, v) => a + (v - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);
  const sampleVariance = n > 1 ? numbers.reduce((a, v) => a + (v - mean) ** 2, 0) / (n - 1) : 0;
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
  const freq = new Map<number, number>();
  numbers.forEach(v => freq.set(v, (freq.get(v) || 0) + 1));
  let maxFreq = 0; let modes: number[] = [];
  freq.forEach((count, val) => {
    if (count > maxFreq) { maxFreq = count; modes = [val]; }
    else if (count === maxFreq) modes.push(val);
  });
  const mode = modes.length === n ? 'None' : modes.join(', ');
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  const range = sorted[n - 1] - sorted[0];

  return {
    count: n, sum: sum.toFixed(4), mean: mean.toFixed(4), median: median.toFixed(4), mode,
    min: sorted[0].toFixed(4), max: sorted[n - 1].toFixed(4), range: range.toFixed(4),
    variance: variance.toFixed(4), stdDev: stdDev.toFixed(4), sampleVariance: sampleVariance.toFixed(4),
    sampleStdDev: Math.sqrt(sampleVariance).toFixed(4), q1: q1?.toFixed(4), q3: q3?.toFixed(4),
  };
}

export default function StatisticsPage() {
  const [input, setInput] = useState('');
  const numbers = input.split(/[,\s\n]+/).map(Number).filter(n => !isNaN(n));
  const stats = computeStats(numbers);

  return (
    <ToolLayout title="Statistics Calculator" description="Calculate mean, median, mode, standard deviation, and more.">
      <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-textarea h-24 font-mono" placeholder="Enter numbers separated by commas, spaces, or new lines..." />
      <div className="text-sm text-gray-500 mt-1">{numbers.length} number(s) detected</div>
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
          {Object.entries(stats).map(([key, val]) => (
            <div key={key} className="rounded-lg bg-gray-50 p-3"><div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div><div className="text-lg font-bold text-gray-800">{val}</div></div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
