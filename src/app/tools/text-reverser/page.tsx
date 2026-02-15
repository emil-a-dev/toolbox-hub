'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function TextReverserPage() {
  const [text, setText] = useState('');
  const reversed = text.split('').reverse().join('');
  const wordReversed = text.split(' ').reverse().join(' ');
  const eachWordReversed = text.split(' ').map(w => w.split('').reverse().join('')).join(' ');

  return (
    <ToolLayout title="Text Reverser" description="Reverse text, words, or individual characters.">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to reverse..." className="tool-textarea" />
      {text && <div className="space-y-4 mt-6">
        {[
          { label: 'Reverse Characters', value: reversed },
          { label: 'Reverse Words', value: wordReversed },
          { label: 'Reverse Each Word', value: eachWordReversed },
        ].map((r) => <div key={r.label}><div className="flex items-center justify-between mb-1"><h3 className="text-sm font-semibold text-gray-700">{r.label}</h3><CopyButton text={r.value} /></div><div className="result-box">{r.value}</div></div>)}
      </div>}
    </ToolLayout>
  );
}
