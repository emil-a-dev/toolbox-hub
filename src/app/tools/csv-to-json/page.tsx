'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function CsvToJsonPage() {
  const [input, setInput] = useState('name,age,city\nAlice,30,New York\nBob,25,London\nCharlie,35,Tokyo');
  const [delimiter, setDelimiter] = useState(',');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convert = () => {
    try {
      setError('');
      const lines = input.trim().split('\n').filter(l => l.trim());
      if (lines.length < 2) { setError('Need at least a header row and one data row'); return; }
      const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
      const data = lines.slice(1).map(line => {
        const vals = line.split(delimiter).map(v => v.trim().replace(/^"|"$/g, ''));
        const obj: Record<string, string | number> = {};
        headers.forEach((h, i) => {
          const v = vals[i] || '';
          obj[h] = isNaN(Number(v)) || v === '' ? v : Number(v);
        });
        return obj;
      });
      setOutput(JSON.stringify(data, null, 2));
    } catch { setError('Failed to parse CSV'); }
  };

  return (
    <ToolLayout title="CSV to JSON Converter" description="Convert CSV data to JSON array format.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2"><label className="text-sm font-medium text-gray-700">CSV Input</label>
            <select value={delimiter} onChange={e => setDelimiter(e.target.value)} className="text-xs border rounded px-2 py-1"><option value=",">Comma</option><option value=";">Semicolon</option><option value="	">Tab</option></select>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-textarea !font-mono !text-sm" rows={14} />
          <button onClick={convert} className="tool-btn mt-3 w-full">Convert to JSON →</button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">JSON Output</label>
          <textarea value={output} readOnly className="tool-textarea !font-mono !text-sm bg-gray-50" rows={14} />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {output && <div className="mt-3"><CopyButton text={output} /></div>}
        </div>
      </div>
    </ToolLayout>
  );
}
