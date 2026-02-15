'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function TipCalcPage() {
  const [bill, setBill] = useState('');
  const [tipPct, setTipPct] = useState(15);
  const [people, setPeople] = useState(1);

  const billNum = Number(bill) || 0;
  const tip = billNum * tipPct / 100;
  const total = billNum + tip;
  const perPerson = people > 0 ? total / people : total;

  return (
    <ToolLayout title="Tip Calculator" description="Calculate tip amount and split the bill between people.">
      <div className="max-w-md">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Bill Amount ($)</label><input type="number" value={bill} onChange={e => setBill(e.target.value)} className="tool-input text-lg" placeholder="0.00" /></div>
        <div className="mt-4"><label className="block text-sm font-medium text-gray-700 mb-1">Tip: {tipPct}%</label>
          <input type="range" min={0} max={50} value={tipPct} onChange={e => setTipPct(Number(e.target.value))} className="w-full" />
          <div className="flex justify-between mt-1">{[10, 15, 18, 20, 25].map(p => <button key={p} onClick={() => setTipPct(p)} className={`px-3 py-1 rounded text-xs font-medium ${tipPct === p ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{p}%</button>)}</div>
        </div>
        <div className="mt-4"><label className="block text-sm font-medium text-gray-700 mb-1">Split Between</label><input type="number" min={1} value={people} onChange={e => setPeople(Math.max(1, Number(e.target.value)))} className="tool-input" /></div>
        {billNum > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3"><span className="text-gray-600">Tip</span><span className="font-semibold">${tip.toFixed(2)}</span></div>
            <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3"><span className="text-gray-600">Total</span><span className="font-semibold">${total.toFixed(2)}</span></div>
            {people > 1 && <div className="flex justify-between rounded-lg bg-primary-50 px-4 py-3"><span className="text-primary-700">Per Person</span><span className="font-bold text-primary-700 text-lg">${perPerson.toFixed(2)}</span></div>}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
