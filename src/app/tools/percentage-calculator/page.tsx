'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function PercentageCalcPage() {
  const [a1, setA1] = useState(''); const [a2, setA2] = useState('');
  const [b1, setB1] = useState(''); const [b2, setB2] = useState('');
  const [c1, setC1] = useState(''); const [c2, setC2] = useState('');
  const [d1, setD1] = useState(''); const [d2, setD2] = useState('');

  const r1 = a1 && a2 ? (Number(a1) / 100) * Number(a2) : null;
  const r2 = b1 && b2 ? (Number(b1) / Number(b2)) * 100 : null;
  const r3 = c1 && c2 ? ((Number(c2) - Number(c1)) / Number(c1)) * 100 : null;
  const r4 = d1 && d2 ? Number(d1) * (1 + Number(d2) / 100) : null;

  const Card = ({ title, children, result }: { title: string; children: React.ReactNode; result: number | null }) => (
    <div className="rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      {result !== null && <div className="mt-3 text-2xl font-bold text-primary-600">= {result.toLocaleString('en', { maximumFractionDigits: 4 })}{title.includes('%') ? '' : '%'}</div>}
    </div>
  );

  return (
    <ToolLayout title="Percentage Calculator" description="Calculate percentages easily with multiple calculation modes.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="What is X% of Y?" result={r1}>
          <span className="text-sm text-gray-600">What is</span>
          <input type="number" value={a1} onChange={e => setA1(e.target.value)} className="tool-input !w-24" placeholder="X" />
          <span className="text-sm text-gray-600">% of</span>
          <input type="number" value={a2} onChange={e => setA2(e.target.value)} className="tool-input !w-24" placeholder="Y" />
        </Card>
        <Card title="X is what % of Y?" result={r2}>
          <input type="number" value={b1} onChange={e => setB1(e.target.value)} className="tool-input !w-24" placeholder="X" />
          <span className="text-sm text-gray-600">is what % of</span>
          <input type="number" value={b2} onChange={e => setB2(e.target.value)} className="tool-input !w-24" placeholder="Y" />
        </Card>
        <Card title="% change from X to Y" result={r3}>
          <span className="text-sm text-gray-600">From</span>
          <input type="number" value={c1} onChange={e => setC1(e.target.value)} className="tool-input !w-24" placeholder="X" />
          <span className="text-sm text-gray-600">to</span>
          <input type="number" value={c2} onChange={e => setC2(e.target.value)} className="tool-input !w-24" placeholder="Y" />
        </Card>
        <Card title="X increased by Y%" result={r4}>
          <input type="number" value={d1} onChange={e => setD1(e.target.value)} className="tool-input !w-24" placeholder="X" />
          <span className="text-sm text-gray-600">+ </span>
          <input type="number" value={d2} onChange={e => setD2(e.target.value)} className="tool-input !w-24" placeholder="Y" />
          <span className="text-sm text-gray-600">%</span>
        </Card>
      </div>
    </ToolLayout>
  );
}
