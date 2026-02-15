'use client';

import { useState, useEffect, useRef } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function MeetingCostPage() {
  const [people, setPeople] = useState(5);
  const [avgSalary, setAvgSalary] = useState(60000);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const hourlyRate = avgSalary / (52 * 40);
  const perSecond = (hourlyRate * people) / 3600;
  const cost = perSecond * elapsed;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const reset = () => { setRunning(false); setElapsed(0); };

  return (
    <ToolLayout title="Meeting Cost Calculator" description="Calculate how much your meeting is costing in real-time.">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">People in meeting</label><input type="number" min={1} value={people} onChange={e => setPeople(Number(e.target.value))} className="tool-input" disabled={running} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Avg. Annual Salary ($)</label><input type="number" value={avgSalary} onChange={e => setAvgSalary(Number(e.target.value))} className="tool-input" disabled={running} /></div>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 p-8 text-center mb-6">
        <div className="text-sm text-red-600 mb-2">Meeting Cost</div>
        <div className={`text-5xl md:text-6xl font-bold text-red-700 font-mono mb-4 ${running ? 'animate-pulse' : ''}`}>${cost.toFixed(2)}</div>
        <div className="text-2xl font-mono text-gray-600 mb-6">{formatTime(elapsed)}</div>
        <div className="flex justify-center gap-3">
          <button onClick={() => setRunning(!running)} className={`px-6 py-3 rounded-xl font-semibold text-white transition-all ${running ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}>{running ? '⏸ Pause' : '▶ Start'}</button>
          <button onClick={reset} className="px-6 py-3 rounded-xl font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300">🔄 Reset</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-gray-50 p-3"><div className="text-xs text-gray-500">Per Second</div><div className="font-bold">${perSecond.toFixed(3)}</div></div>
        <div className="rounded-lg bg-gray-50 p-3"><div className="text-xs text-gray-500">Per Minute</div><div className="font-bold">${(perSecond * 60).toFixed(2)}</div></div>
        <div className="rounded-lg bg-gray-50 p-3"><div className="text-xs text-gray-500">Per Hour</div><div className="font-bold">${(hourlyRate * people).toFixed(2)}</div></div>
      </div>
    </ToolLayout>
  );
}
