'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

function caesarCipher(text: string, shift: number, decrypt: boolean) {
  const s = decrypt ? (26 - shift) % 26 : shift;
  return text.replace(/[a-zA-Z]/g, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + s) % 26) + base);
  });
}

export default function CaesarCipherPage() {
  const [input, setInput] = useState('');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const result = caesarCipher(input, shift, mode === 'decrypt');

  return (
    <ToolLayout title="Caesar Cipher" description="Encrypt or decrypt text using the Caesar shift cipher.">
      <div className="flex gap-2 mb-4">
        {(['encrypt', 'decrypt'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${mode === m ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{m}</button>
        ))}
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-textarea h-24" placeholder={`Enter text to ${mode}...`} />
      <div className="flex items-center gap-3 mt-4">
        <label className="text-sm text-gray-600">Shift: {shift}</label>
        <input type="range" min={1} max={25} value={shift} onChange={e => setShift(Number(e.target.value))} className="flex-1" />
      </div>
      {result && (<>
        <div className="flex items-center justify-between mt-4 mb-2"><h3 className="text-sm font-semibold text-gray-700">Result</h3><CopyButton text={result} /></div>
        <div className="result-box font-mono">{result}</div>
      </>)}
      {input && (
        <div className="mt-6"><h3 className="text-sm font-semibold text-gray-700 mb-2">All Shifts (Brute Force)</h3>
          <div className="space-y-1 max-h-64 overflow-y-auto">{Array.from({ length: 25 }, (_, i) => i + 1).map(s => (
            <div key={s} className="flex items-center gap-3 text-sm rounded px-3 py-1 hover:bg-gray-50"><span className="text-gray-400 w-8">+{s}</span><span className="font-mono text-gray-700">{caesarCipher(input, s, mode === 'decrypt')}</span></div>
          ))}</div>
        </div>
      )}
    </ToolLayout>
  );
}
