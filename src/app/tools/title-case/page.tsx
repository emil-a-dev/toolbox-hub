'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

const toTitleCase = (s: string) => s.replace(/\w\S*/g, (t) => {
  const small = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
  return small.includes(t.toLowerCase()) ? t.toLowerCase() : t.charAt(0).toUpperCase() + t.substring(1).toLowerCase();
}).replace(/^./, c => c.toUpperCase());

export default function TitleCasePage() {
  const [input, setInput] = useState('');
  const cases = [
    { name: 'Title Case', fn: toTitleCase },
    { name: 'UPPER CASE', fn: (s: string) => s.toUpperCase() },
    { name: 'lower case', fn: (s: string) => s.toLowerCase() },
    { name: 'Sentence case', fn: (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
    { name: 'camelCase', fn: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
    { name: 'PascalCase', fn: (s: string) => s.toLowerCase().replace(/(^|[^a-zA-Z0-9]+)(.)/g, (_, _2, c) => c.toUpperCase()) },
    { name: 'snake_case', fn: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_') },
    { name: 'kebab-case', fn: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-') },
  ];

  return (
    <ToolLayout title="Title Case Capitalizer" description="Convert text to various capitalization styles.">
      <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-textarea h-24" placeholder="Enter your text here..." />
      {input && (
        <div className="mt-6 space-y-3">
          {cases.map(c => (
            <div key={c.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
              <div><span className="text-xs text-gray-500 block">{c.name}</span><span className="text-sm font-medium text-gray-900">{c.fn(input)}</span></div>
              <CopyButton text={c.fn(input)} />
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
