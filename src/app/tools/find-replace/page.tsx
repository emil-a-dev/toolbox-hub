'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function FindReplacePage() {
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [result, setResult] = useState('');

  const handleReplace = () => {
    if (!find) return;
    try {
      if (useRegex) {
        const flags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(find, flags);
        setResult(text.replace(regex, replace));
      } else {
        if (caseSensitive) {
          setResult(text.split(find).join(replace));
        } else {
          const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
          setResult(text.replace(regex, replace));
        }
      }
    } catch (e: any) { setResult(`Error: ${e.message}`); }
  };

  const matchCount = (() => {
    if (!find || !text) return 0;
    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const regex = useRegex ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      return (text.match(regex) || []).length;
    } catch { return 0; }
  })();

  return (
    <ToolLayout title="Find & Replace" description="Find and replace text with support for regular expressions.">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text..." className="tool-textarea !min-h-[150px]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Find</label>
          <input type="text" value={find} onChange={(e) => setFind(e.target.value)} className="tool-input" placeholder="Search for..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Replace with</label>
          <input type="text" value={replace} onChange={(e) => setReplace(e.target.value)} className="tool-input" placeholder="Replace with..." />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="rounded" /> Regex</label>
        <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded" /> Case sensitive</label>
        {find && <span className="text-sm text-gray-500">{matchCount} match{matchCount !== 1 ? 'es' : ''}</span>}
      </div>
      <button onClick={handleReplace} className="tool-btn mt-4">Replace All</button>
      {result && <div className="mt-6"><div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">Result</h3><CopyButton text={result} /></div><div className="result-box">{result}</div></div>}
    </ToolLayout>
  );
}
