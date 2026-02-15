'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function JsonToCsvPage() {
  const [input, setInput] = useState('[\n  { "name": "Alice", "age": 30, "city": "New York" },\n  { "name": "Bob", "age": 25, "city": "London" },\n  { "name": "Charlie", "age": 35, "city": "Tokyo" }\n]');
  const [delimiter, setDelimiter] = useState(',');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convert = () => {
    try {
      setError('');
      const data = JSON.parse(input);
      if (!Array.isArray(data) || data.length === 0) { setError('Input must be a non-empty JSON array of objects'); return; }
      const headers = Object.keys(data[0]);
      const escape = (val: unknown) => {
        const s = String(val ?? '');
        return s.includes(delimiter) || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
      };
      const lines = [headers.join(delimiter), ...data.map((row: Record<string, unknown>) => headers.map(h => escape(row[h])).join(delimiter))];
      setOutput(lines.join('\n'));
    } catch { setError('Invalid JSON input'); }
  };

  const download = () => {
    const blob = new Blob([output], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.csv';
    a.click();
  };

  return (
    <ToolLayout title="JSON to CSV Converter" description="Convert JSON arrays to CSV format.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2"><label className="text-sm font-medium text-gray-700">JSON Input</label>
            <select value={delimiter} onChange={e => setDelimiter(e.target.value)} className="text-xs border rounded px-2 py-1"><option value=",">Comma</option><option value=";">Semicolon</option><option value="	">Tab</option></select>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-textarea !font-mono !text-sm" rows={14} />
          <button onClick={convert} className="tool-btn mt-3 w-full">Convert to CSV →</button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CSV Output</label>
          <textarea value={output} readOnly className="tool-textarea !font-mono !text-sm bg-gray-50" rows={14} />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {output && <div className="flex gap-2 mt-3"><CopyButton text={output} /><button onClick={download} className="tool-btn">📥 Download CSV</button></div>}
        </div>
      </div>
    </ToolLayout>
  );
}
