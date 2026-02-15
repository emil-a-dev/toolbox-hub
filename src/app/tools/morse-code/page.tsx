'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

const MORSE: Record<string, string> = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', ' ': '/' };
const REVERSE: Record<string, string> = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

export default function MorseCodePage() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const encode = (text: string) => text.toUpperCase().split('').map(c => MORSE[c] || c).join(' ');
  const decode = (morse: string) => morse.split(' ').map(c => c === '/' ? ' ' : REVERSE[c] || c).join('');

  const result = mode === 'encode' ? encode(input) : decode(input);

  const playMorse = () => {
    const ctx = new AudioContext();
    const morse = mode === 'encode' ? result : encode(input);
    let time = ctx.currentTime;
    const dot = 0.08, dash = dot * 3, gap = dot;
    morse.split('').forEach(c => {
      if (c === '.' || c === '-') {
        const osc = ctx.createOscillator();
        osc.frequency.value = 600;
        osc.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + (c === '.' ? dot : dash));
        time += (c === '.' ? dot : dash) + gap;
      } else if (c === ' ') time += dot * 3;
      else if (c === '/') time += dot * 7;
    });
  };

  return (
    <ToolLayout title="Morse Code Translator" description="Translate text to Morse code and back. Listen to the Morse audio.">
      <div className="flex gap-2 mb-4">
        {(['encode', 'decode'] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setInput(''); }} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === m ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{m === 'encode' ? 'Text → Morse' : 'Morse → Text'}</button>
        ))}
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-textarea h-24" placeholder={mode === 'encode' ? 'Enter text...' : 'Enter morse code (use . and -, spaces between letters, / between words)...'} />
      {result && (<>
        <div className="flex items-center justify-between mt-4 mb-2"><h3 className="text-sm font-semibold text-gray-700">Result</h3><div className="flex gap-2"><button onClick={playMorse} className="tool-btn-secondary text-sm">🔊 Play</button><CopyButton text={result} /></div></div>
        <div className="result-box !text-lg font-mono tracking-wider">{result}</div>
      </>)}
    </ToolLayout>
  );
}
