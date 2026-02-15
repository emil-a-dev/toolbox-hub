'use client';

import { useState, useCallback } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function ReactionTimePage() {
  const [state, setState] = useState<'waiting' | 'ready' | 'go' | 'result' | 'early'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [result, setResult] = useState(0);
  const [results, setResults] = useState<number[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setState('ready');
    const delay = 1000 + Math.random() * 4000;
    const id = setTimeout(() => { setState('go'); setStartTime(Date.now()); }, delay);
    setTimeoutId(id);
  }, []);

  const click = useCallback(() => {
    if (state === 'waiting') { start(); }
    else if (state === 'ready') { if (timeoutId) clearTimeout(timeoutId); setState('early'); }
    else if (state === 'go') { const t = Date.now() - startTime; setResult(t); setResults(prev => [...prev, t]); setState('result'); }
    else if (state === 'result' || state === 'early') { start(); }
  }, [state, startTime, start, timeoutId]);

  const avg = results.length > 0 ? Math.round(results.reduce((a, b) => a + b, 0) / results.length) : 0;
  const best = results.length > 0 ? Math.min(...results) : 0;

  const colors: Record<string, string> = {
    waiting: 'from-primary-500 to-primary-600',
    ready: 'from-red-500 to-red-600',
    go: 'from-emerald-400 to-emerald-500',
    result: 'from-blue-500 to-blue-600',
    early: 'from-orange-500 to-orange-600',
  };

  const messages: Record<string, string> = {
    waiting: '🎯 Click to Start',
    ready: '⏳ Wait for green...',
    go: '🟢 CLICK NOW!',
    result: `⚡ ${result} ms`,
    early: '😅 Too early! Click to retry',
  };

  const getRating = (ms: number) => {
    if (ms < 200) return '🏆 Incredible!';
    if (ms < 250) return '⚡ Fast!';
    if (ms < 300) return '👍 Good';
    if (ms < 400) return '🐢 Average';
    return '💤 Slow';
  };

  return (
    <ToolLayout title="Reaction Time Test" description="Test your reaction time. How fast can you click?">
      <div onClick={click} className={`rounded-2xl bg-gradient-to-br ${colors[state]} p-12 text-center cursor-pointer select-none transition-all active:scale-95 min-h-[250px] flex flex-col items-center justify-center`}>
        <div className="text-white text-4xl md:text-5xl font-bold mb-2">{messages[state]}</div>
        {state === 'result' && <div className="text-white/80 text-xl">{getRating(result)}</div>}
      </div>
      {results.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="rounded-xl bg-gray-50 p-4 text-center"><div className="text-sm text-gray-500">Average</div><div className="text-2xl font-bold">{avg} ms</div></div>
          <div className="rounded-xl bg-emerald-50 p-4 text-center"><div className="text-sm text-emerald-600">Best</div><div className="text-2xl font-bold text-emerald-700">{best} ms</div></div>
          <div className="rounded-xl bg-gray-50 p-4 text-center"><div className="text-sm text-gray-500">Attempts</div><div className="text-2xl font-bold">{results.length}</div></div>
        </div>
      )}
    </ToolLayout>
  );
}
