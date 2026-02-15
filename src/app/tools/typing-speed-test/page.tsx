'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

const TEXTS = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump! The five boxing wizards jump quickly at dawn.",
  "Amazingly few discotheques provide jukeboxes. Crazy Frederick bought many very exquisite opal jewels.",
  "A wizard's job is to vex chumps quickly in fog. Sphinx of black quartz, judge my vow.",
  "Two driven jocks help fax my big quiz. The jay, pig, fox, zebra, and my wolves quack!",
];

export default function TypingSpeedPage() {
  const [text] = useState(TEXTS[Math.floor(Math.random() * TEXTS.length)]);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback((val: string) => {
    if (finished) return;
    if (!started) { setStarted(true); setStartTime(Date.now()); }
    setInput(val);
    if (val.length >= text.length) { setFinished(true); setEndTime(Date.now()); }
  }, [started, finished, text]);

  const elapsed = finished ? (endTime - startTime) / 1000 : started ? 0 : 0;
  const words = input.trim().split(/\s+/).filter(Boolean).length;
  const wpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;
  const correctChars = input.split('').filter((c, i) => c === text[i]).length;
  const accuracy = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

  const reset = () => { setInput(''); setStarted(false); setFinished(false); setStartTime(0); setEndTime(0); inputRef.current?.focus(); };

  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (started && !finished) {
      const id = setInterval(() => setTimer(Math.floor((Date.now() - startTime) / 1000)), 100);
      return () => clearInterval(id);
    }
  }, [started, finished, startTime]);

  return (
    <ToolLayout title="Typing Speed Test" description="Test your typing speed (WPM) and accuracy.">
      <div className="rounded-xl bg-gray-50 p-6 mb-6 font-mono text-lg leading-relaxed">
        {text.split('').map((char, i) => {
          let color = 'text-gray-400';
          if (i < input.length) color = input[i] === char ? 'text-emerald-600' : 'text-red-500 bg-red-100';
          if (i === input.length) color = 'text-gray-900 border-b-2 border-primary-500';
          return <span key={i} className={color}>{char}</span>;
        })}
      </div>
      <textarea ref={inputRef} value={input} onChange={e => handleChange(e.target.value)} className="tool-textarea !font-mono !text-lg" rows={3} placeholder="Start typing here..." disabled={finished} autoFocus />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="rounded-xl bg-primary-50 border border-primary-200 p-4 text-center"><div className="text-sm text-primary-600">WPM</div><div className="text-3xl font-bold text-primary-800">{finished ? wpm : '—'}</div></div>
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center"><div className="text-sm text-emerald-600">Accuracy</div><div className="text-3xl font-bold text-emerald-800">{input.length > 0 ? `${accuracy}%` : '—'}</div></div>
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center"><div className="text-sm text-gray-500">Time</div><div className="text-3xl font-bold">{started ? (finished ? `${elapsed.toFixed(1)}s` : `${timer}s`) : '—'}</div></div>
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center"><div className="text-sm text-gray-500">Characters</div><div className="text-3xl font-bold">{input.length}/{text.length}</div></div>
      </div>
      {finished && <div className="mt-4 text-center"><button onClick={reset} className="tool-btn">Try Again</button></div>}
    </ToolLayout>
  );
}
