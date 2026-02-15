'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

const bases = [
  { name: 'Decimal', base: 10, prefix: '' },
  { name: 'Binary', base: 2, prefix: '0b' },
  { name: 'Octal', base: 8, prefix: '0o' },
  { name: 'Hexadecimal', base: 16, prefix: '0x' },
];

export default function NumberBasePage() {
  const [input, setInput] = useState('255');
  const [fromBase, setFromBase] = useState(10);

  const decimal = parseInt(input, fromBase);
  const isValid = !isNaN(decimal);

  return (
    <ToolLayout title="Number Base Converter" description="Convert numbers between decimal, binary, octal, and hexadecimal.">
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Input</label>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="tool-input font-mono text-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Base</label>
          <select value={fromBase} onChange={(e) => setFromBase(Number(e.target.value))} className="tool-input !w-40">
            {bases.map(b => <option key={b.base} value={b.base}>{b.name} ({b.base})</option>)}
          </select>
        </div>
      </div>
      {!isValid ? <div className="text-red-600 text-sm">Invalid number for base {fromBase}</div> : (
        <div className="space-y-3">
          {bases.map(b => (
            <div key={b.base} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
              <div><span className="text-sm text-gray-500 block">{b.name} (base {b.base})</span><code className="font-mono text-lg font-medium text-gray-900">{b.prefix}{decimal.toString(b.base).toUpperCase()}</code></div>
              <CopyButton text={decimal.toString(b.base).toUpperCase()} />
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
