'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

const rot13 = (s: string) => s.replace(/[a-zA-Z]/g, c => {
  const base = c <= 'Z' ? 65 : 97;
  return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
});

export default function Rot13Page() {
  const [input, setInput] = useState('');
  const result = rot13(input);

  return (
    <ToolLayout title="ROT13 Encoder/Decoder" description="Apply ROT13 substitution cipher. Encoding and decoding are the same operation.">
      <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-textarea h-32" placeholder="Enter text to encode/decode..." />
      {result && (<>
        <div className="flex items-center justify-between mt-4 mb-2"><h3 className="text-sm font-semibold text-gray-700">Result</h3><CopyButton text={result} /></div>
        <div className="result-box">{result}</div>
      </>)}
      <div className="mt-4 text-sm text-gray-500">ROT13 is its own inverse — applying it twice returns the original text.</div>
    </ToolLayout>
  );
}
