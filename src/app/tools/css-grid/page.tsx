'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function CssGridPage() {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);
  const [gap, setGap] = useState(16);
  const [colSizes, setColSizes] = useState('1fr 1fr 1fr');
  const [rowSizes, setRowSizes] = useState('auto');

  const css = `.grid-container {
  display: grid;
  grid-template-columns: ${colSizes || `repeat(${cols}, 1fr)`};
  grid-template-rows: ${rowSizes || 'auto'};
  gap: ${gap}px;
}`;

  const cells = cols * rows;

  return (
    <ToolLayout title="CSS Grid Generator" description="Visually create CSS Grid layouts and generate code.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Columns</label><input type="number" min={1} max={12} value={cols} onChange={e => { const v = Number(e.target.value); setCols(v); setColSizes(Array(v).fill('1fr').join(' ')); }} className="tool-input" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Rows</label><input type="number" min={1} max={12} value={rows} onChange={e => setRows(Number(e.target.value))} className="tool-input" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Gap (px)</label><input type="number" min={0} max={64} value={gap} onChange={e => setGap(Number(e.target.value))} className="tool-input" /></div>
      </div>
      <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Column Sizes</label><input type="text" value={colSizes} onChange={e => setColSizes(e.target.value)} className="tool-input font-mono text-sm" placeholder="1fr 2fr 1fr" /></div>

      <div className="rounded-xl bg-gray-100 p-4 mb-6" style={{ display: 'grid', gridTemplateColumns: colSizes || `repeat(${cols}, 1fr)`, gridTemplateRows: rowSizes || 'auto', gap: `${gap}px` }}>
        {Array.from({ length: cells }, (_, i) => (
          <div key={i} className="bg-primary-100 border-2 border-primary-300 rounded-lg p-4 text-center text-sm font-medium text-primary-700 min-h-[60px] flex items-center justify-center">{i + 1}</div>
        ))}
      </div>
      <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">CSS</h3><CopyButton text={css} /></div>
      <pre className="result-box">{css}</pre>
    </ToolLayout>
  );
}
