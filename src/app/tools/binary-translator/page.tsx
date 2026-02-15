'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

const textToBinary = (text: string) => text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
const binaryToText = (bin: string) => bin.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('');
const textToHex = (text: string) => text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
const hexToText = (hex: string) => hex.trim().split(/\s+/).map(h => String.fromCharCode(parseInt(h, 16))).join('');
const textToDecimal = (text: string) => text.split('').map(c => c.charCodeAt(0)).join(' ');
const decimalToText = (dec: string) => dec.trim().split(/\s+/).map(d => String.fromCharCode(Number(d))).join('');

export default function BinaryTranslatorPage() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [format, setFormat] = useState<'binary' | 'hex' | 'decimal'>('binary');

  const encode = format === 'binary' ? textToBinary : format === 'hex' ? textToHex : textToDecimal;
  const decode = format === 'binary' ? binaryToText : format === 'hex' ? hexToText : decimalToText;
  const result = mode === 'encode' ? encode(input) : decode(input);

  return (
    <ToolLayout title="Binary Translator" description="Convert text to binary, hexadecimal, or decimal and back.">
      <div className="flex gap-2 mb-4">
        {(['encode', 'decode'] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setInput(''); }} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === m ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{m === 'encode' ? 'Text → Code' : 'Code → Text'}</button>
        ))}
        <div className="ml-auto flex gap-1">
          {(['binary', 'hex', 'decimal'] as const).map(f => (
            <button key={f} onClick={() => { setFormat(f); setInput(''); }} className={`px-3 py-2 rounded-lg text-xs font-medium capitalize ${format === f ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'}`}>{f}</button>
          ))}
        </div>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-textarea h-24 font-mono" placeholder={mode === 'encode' ? 'Enter text...' : `Enter ${format} (space-separated)...`} />
      {result && (<>
        <div className="flex items-center justify-between mt-4 mb-2"><h3 className="text-sm font-semibold text-gray-700">Result</h3><CopyButton text={result} /></div>
        <div className="result-box font-mono">{result}</div>
      </>)}
    </ToolLayout>
  );
}
