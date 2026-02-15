'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

const UNITS = [
  { name: 'Bytes', factor: 1 },
  { name: 'KB', factor: 1024 },
  { name: 'MB', factor: 1024 ** 2 },
  { name: 'GB', factor: 1024 ** 3 },
  { name: 'TB', factor: 1024 ** 4 },
  { name: 'PB', factor: 1024 ** 5 },
  { name: 'Bits', factor: 1 / 8 },
  { name: 'Kilobits', factor: 1024 / 8 },
  { name: 'Megabits', factor: 1024 ** 2 / 8 },
  { name: 'Gigabits', factor: 1024 ** 3 / 8 },
];

export default function ByteConverterPage() {
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState('GB');

  const fromUnit = UNITS.find(u => u.name === from)!;
  const bytes = Number(value) * fromUnit.factor;

  return (
    <ToolLayout title="Byte Converter" description="Convert between bytes, KB, MB, GB, TB, and bits.">
      <div className="flex gap-4 mb-6">
        <input type="number" value={value} onChange={e => setValue(e.target.value)} className="tool-input flex-1 text-lg" />
        <select value={from} onChange={e => setFrom(e.target.value)} className="tool-input !w-32">{UNITS.map(u => <option key={u.name}>{u.name}</option>)}</select>
      </div>
      <div className="space-y-2">
        {UNITS.map(u => {
          const converted = bytes / u.factor;
          return (
            <div key={u.name} className={`flex items-center justify-between rounded-lg px-4 py-3 ${u.name === from ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'}`}>
              <span className="text-sm text-gray-600 w-24">{u.name}</span>
              <span className="font-mono text-sm font-medium text-gray-900">{converted.toLocaleString('en', { maximumFractionDigits: 6 })}</span>
              <CopyButton text={String(converted)} />
            </div>
          );
        })}
      </div>
    </ToolLayout>
  );
}
