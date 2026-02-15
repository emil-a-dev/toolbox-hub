'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function MarkdownTablePage() {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);
  const [align, setAlign] = useState<('left' | 'center' | 'right')[]>(Array(3).fill('left'));
  const [data, setData] = useState<string[][]>([
    ['Header 1', 'Header 2', 'Header 3'],
    ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
    ['Row 2 Col 1', 'Row 2 Col 2', 'Row 2 Col 3'],
    ['Row 3 Col 1', 'Row 3 Col 2', 'Row 3 Col 3'],
  ]);

  const updateCell = (r: number, c: number, val: string) => {
    const copy = data.map(row => [...row]);
    if (!copy[r]) copy[r] = Array(cols).fill('');
    copy[r][c] = val;
    setData(copy);
  };

  const updateCols = (n: number) => {
    setCols(n);
    const newAlign = Array(n).fill('left').map((_, i) => align[i] || 'left');
    setAlign(newAlign);
    setData(data.map(row => {
      const nr = [...row];
      while (nr.length < n + 1) nr.push('');
      return nr.slice(0, n);
    }));
  };

  const updateRows = (n: number) => {
    setRows(n);
    const copy = [...data];
    while (copy.length < n + 1) copy.push(Array(cols).fill(''));
    setData(copy.slice(0, n + 1));
  };

  const getAlignSep = (a: string) => {
    if (a === 'center') return ':---:';
    if (a === 'right') return '---:';
    return '---';
  };

  const markdown = (() => {
    const header = '| ' + (data[0] || []).join(' | ') + ' |';
    const sep = '| ' + align.map(a => getAlignSep(a)).join(' | ') + ' |';
    const body = data.slice(1).map(row => '| ' + row.map(c => c || '').join(' | ') + ' |');
    return [header, sep, ...body].join('\n');
  })();

  return (
    <ToolLayout title="Markdown Table Generator" description="Generate Markdown tables visually. Set columns, rows, and alignment.">
      <div className="flex flex-wrap gap-4 mb-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Columns</label><input type="number" min={1} max={10} value={cols} onChange={e => updateCols(Number(e.target.value))} className="tool-input !w-20" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Data Rows</label><input type="number" min={1} max={20} value={rows} onChange={e => updateRows(Number(e.target.value))} className="tool-input !w-20" /></div>
      </div>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {Array.from({ length: cols }).map((_, c) => (
                <th key={c} className="border border-gray-200 px-1 py-1 bg-gray-50">
                  <input type="text" value={data[0]?.[c] || ''} onChange={e => updateCell(0, c, e.target.value)} className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm font-bold" />
                  <select value={align[c]} onChange={e => { const a = [...align]; a[c] = e.target.value as any; setAlign(a); }} className="w-full text-xs border-0 mt-1 text-gray-500">
                    <option value="left">⬅ Left</option><option value="center">↔ Center</option><option value="right">➡ Right</option>
                  </select>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: cols }).map((_, c) => (
                  <td key={c} className="border border-gray-200 px-1 py-1">
                    <input type="text" value={data[r + 1]?.[c] || ''} onChange={e => updateCell(r + 1, c, e.target.value)} className="w-full bg-white border border-gray-100 rounded px-2 py-1 text-sm" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2"><label className="text-sm font-medium text-gray-700">Markdown Output</label><CopyButton text={markdown} /></div>
        <pre className="bg-gray-50 rounded-xl p-4 text-sm font-mono overflow-x-auto border border-gray-200 whitespace-pre-wrap">{markdown}</pre>
      </div>
    </ToolLayout>
  );
}
