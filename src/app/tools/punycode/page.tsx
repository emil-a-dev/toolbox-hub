'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

function toASCII(domain: string) {
  try { return new URL(`http://${domain}`).hostname; } catch { return domain; }
}

function toPunycode(input: string): string {
  try {
    const url = new URL(`http://${input}`);
    return url.hostname;
  } catch {
    return input;
  }
}

export default function PunycodePage() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  let result = '';
  try {
    if (mode === 'encode') {
      const url = new URL(`http://${input}`);
      result = url.hostname;
    } else {
      // Decode punycode
      result = input; // In browser, URL API handles punycode
      try {
        const url = new URL(`http://${input}`);
        // Try to decode using IDN display
        result = decodeURIComponent(url.hostname);
      } catch { result = input; }
    }
  } catch { result = input; }

  return (
    <ToolLayout title="Punycode Converter" description="Convert international domain names to/from Punycode (ACE) format.">
      <div className="flex gap-2 mb-4">
        {(['encode', 'decode'] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setInput(''); }} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === m ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{m === 'encode' ? 'Unicode → Punycode' : 'Punycode → Unicode'}</button>
        ))}
      </div>
      <input type="text" value={input} onChange={e => setInput(e.target.value)} className="tool-input font-mono" placeholder={mode === 'encode' ? 'münchen.de' : 'xn--mnchen-3ya.de'} />
      {input && (<>
        <div className="flex items-center justify-between mt-4 mb-2"><h3 className="text-sm font-semibold text-gray-700">Result</h3><CopyButton text={result} /></div>
        <div className="result-box font-mono text-lg">{result}</div>
      </>)}
      <div className="mt-6 text-sm text-gray-500">
        <p>Punycode is used to encode internationalized domain names (IDN) that contain non-ASCII characters like ü, ñ, 中, etc.</p>
        <p className="mt-1">Example: <code className="bg-gray-100 px-1 rounded">münchen.de</code> → <code className="bg-gray-100 px-1 rounded">xn--mnchen-3ya.de</code></p>
      </div>
    </ToolLayout>
  );
}
