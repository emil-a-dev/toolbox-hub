'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

const ROMAN_MAP: [number, string][] = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];

function toRoman(num: number): string {
  if (num <= 0 || num > 3999) return 'Out of range (1-3999)';
  let result = '';
  for (const [value, symbol] of ROMAN_MAP) {
    while (num >= value) { result += symbol; num -= value; }
  }
  return result;
}

function fromRoman(s: string): number {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;
  const upper = s.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    const curr = map[upper[i]] || 0;
    const next = map[upper[i + 1]] || 0;
    if (curr < next) result -= curr;
    else result += curr;
  }
  return result;
}

export default function RomanNumeralPage() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'toRoman' | 'fromRoman'>('toRoman');

  const result = mode === 'toRoman' ? toRoman(Number(input)) : String(fromRoman(input));

  return (
    <ToolLayout title="Roman Numeral Converter" description="Convert between decimal numbers and Roman numerals.">
      <div className="flex gap-2 mb-4">
        {[{ m: 'toRoman' as const, l: 'Number → Roman' }, { m: 'fromRoman' as const, l: 'Roman → Number' }].map(({ m, l }) => (
          <button key={m} onClick={() => { setMode(m); setInput(''); }} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === m ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{l}</button>
        ))}
      </div>
      <input type={mode === 'toRoman' ? 'number' : 'text'} value={input} onChange={e => setInput(e.target.value)} className="tool-input text-lg font-mono" placeholder={mode === 'toRoman' ? '2024' : 'MMXXIV'} />
      {input && (
        <div className="mt-6 rounded-xl bg-primary-50 border border-primary-200 p-6 text-center">
          <div className="text-sm text-primary-600 mb-1">{mode === 'toRoman' ? 'Roman Numeral' : 'Decimal Number'}</div>
          <div className="text-4xl font-bold text-primary-800 font-mono">{result}</div>
          <div className="mt-2"><CopyButton text={result} /></div>
        </div>
      )}
      <div className="mt-6 grid grid-cols-4 sm:grid-cols-7 gap-2">
        {ROMAN_MAP.map(([n, r]) => (
          <div key={r} className="rounded-lg bg-gray-50 p-2 text-center"><div className="text-sm font-bold text-gray-800">{r}</div><div className="text-xs text-gray-500">{n}</div></div>
        ))}
      </div>
    </ToolLayout>
  );
}
