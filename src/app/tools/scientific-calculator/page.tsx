'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function ScientificCalcPage() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [isNew, setIsNew] = useState(true);

  const input = (val: string) => {
    if (isNew) { setDisplay(val); setIsNew(false); }
    else setDisplay(display + val);
  };

  const clear = () => { setDisplay('0'); setIsNew(true); };

  const calc = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = Function('"use strict"; return (' + display.replace(/×/g, '*').replace(/÷/g, '/').replace(/π/g, `${Math.PI}`).replace(/e(?![x])/g, `${Math.E}`) + ')')();
      setDisplay(String(result));
      setIsNew(true);
    } catch { setDisplay('Error'); setIsNew(true); }
  };

  const fn = (name: string) => {
    const n = Number(display);
    let result: number;
    switch (name) {
      case 'sin': result = Math.sin(n * Math.PI / 180); break;
      case 'cos': result = Math.cos(n * Math.PI / 180); break;
      case 'tan': result = Math.tan(n * Math.PI / 180); break;
      case 'log': result = Math.log10(n); break;
      case 'ln': result = Math.log(n); break;
      case '√': result = Math.sqrt(n); break;
      case 'x²': result = n * n; break;
      case 'x³': result = n * n * n; break;
      case '1/x': result = 1 / n; break;
      case '|x|': result = Math.abs(n); break;
      case 'n!': result = n <= 0 ? 1 : Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1); break;
      default: return;
    }
    setDisplay(String(result)); setIsNew(true);
  };

  const btnClass = (type: string) => `p-3 rounded-lg font-medium text-sm transition-all active:scale-95 ${type === 'op' ? 'bg-primary-500 text-white hover:bg-primary-600' : type === 'fn' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : type === 'eq' ? 'bg-emerald-500 text-white hover:bg-emerald-600' : type === 'clear' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200'}`;

  return (
    <ToolLayout title="Scientific Calculator" description="Full-featured scientific calculator with trigonometric, logarithmic, and power functions.">
      <div className="max-w-sm mx-auto">
        <div className="rounded-xl bg-gray-900 p-4 mb-4 text-right"><div className="text-3xl font-mono text-white break-all">{display}</div></div>
        <div className="grid grid-cols-5 gap-1.5 mb-2">
          {['sin', 'cos', 'tan', 'log', 'ln'].map(f => <button key={f} onClick={() => fn(f)} className={btnClass('fn')}>{f}</button>)}
          {['√', 'x²', 'x³', '1/x', 'n!'].map(f => <button key={f} onClick={() => fn(f)} className={btnClass('fn')}>{f}</button>)}
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          <button onClick={clear} className={btnClass('clear')}>C</button>
          <button onClick={() => { setDisplay(display.slice(0, -1) || '0'); }} className={btnClass('clear')}>⌫</button>
          <button onClick={() => input('(')} className={btnClass('fn')}>(</button>
          <button onClick={() => input(')')} className={btnClass('fn')}>)</button>
          <button onClick={() => input('÷')} className={btnClass('op')}>÷</button>

          {['7', '8', '9'].map(n => <button key={n} onClick={() => input(n)} className={btnClass('num')}>{n}</button>)}
          <button onClick={() => input('×')} className={btnClass('op')}>×</button>
          <button onClick={() => input('**')} className={btnClass('op')}>xʸ</button>

          {['4', '5', '6'].map(n => <button key={n} onClick={() => input(n)} className={btnClass('num')}>{n}</button>)}
          <button onClick={() => input('-')} className={btnClass('op')}>−</button>
          <button onClick={() => input('%')} className={btnClass('op')}>%</button>

          {['1', '2', '3'].map(n => <button key={n} onClick={() => input(n)} className={btnClass('num')}>{n}</button>)}
          <button onClick={() => input('+')} className={btnClass('op')}>+</button>
          <button onClick={() => input('π')} className={btnClass('fn')}>π</button>

          <button onClick={() => { setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display); }} className={btnClass('fn')}>±</button>
          <button onClick={() => input('0')} className={btnClass('num')}>0</button>
          <button onClick={() => input('.')} className={btnClass('num')}>.</button>
          <button onClick={calc} className={`${btnClass('eq')} col-span-2`}>=</button>
        </div>
      </div>
    </ToolLayout>
  );
}
