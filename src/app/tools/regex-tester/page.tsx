'use client';

import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('gi');
  const [testString, setTestString] = useState('');
  const [error, setError] = useState('');

  const matches = useMemo(() => {
    if (!pattern || !testString) return [];
    try {
      const regex = new RegExp(pattern, flags);
      setError('');
      const results: { match: string; index: number; groups: string[] }[] = [];
      let m;
      if (flags.includes('g')) {
        while ((m = regex.exec(testString)) !== null) {
          results.push({ match: m[0], index: m.index, groups: m.slice(1) });
          if (!m[0]) break;
        }
      } else {
        m = regex.exec(testString);
        if (m) results.push({ match: m[0], index: m.index, groups: m.slice(1) });
      }
      return results;
    } catch (e: any) { setError(e.message); return []; }
  }, [pattern, flags, testString]);

  const highlighted = useMemo(() => {
    if (!pattern || !testString || error) return testString;
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      return testString.replace(regex, (m) => `<mark class="bg-yellow-200 rounded px-0.5">${m}</mark>`);
    } catch { return testString; }
  }, [pattern, flags, testString, error]);

  return (
    <ToolLayout title="Regex Tester" description="Test regular expressions with live highlighting and match details.">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Pattern</label>
          <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="[a-z]+" className="tool-input font-mono" />
        </div>
        <div className="w-24">
          <label className="block text-sm font-medium text-gray-700 mb-1">Flags</label>
          <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} className="tool-input font-mono" placeholder="gi" />
        </div>
      </div>
      {error && <div className="text-sm text-red-600 mb-3">⚠ {error}</div>}
      <label className="block text-sm font-medium text-gray-700 mb-1">Test String</label>
      <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Enter text to test against..." className="tool-textarea" />
      {testString && pattern && !error && (
        <>
          <div className="mt-4"><h3 className="text-sm font-semibold text-gray-700 mb-2">Highlighted Matches ({matches.length})</h3><div className="result-box" dangerouslySetInnerHTML={{ __html: highlighted }} /></div>
          {matches.length > 0 && (
            <div className="mt-4"><h3 className="text-sm font-semibold text-gray-700 mb-2">Match Details</h3>
              <div className="rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                {matches.slice(0, 50).map((m, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-2 text-sm">
                    <span className="text-gray-400 w-6">#{i + 1}</span>
                    <code className="font-mono text-primary-700 bg-primary-50 px-2 py-0.5 rounded">{m.match}</code>
                    <span className="text-gray-500">index: {m.index}</span>
                    {m.groups.length > 0 && <span className="text-gray-500">groups: [{m.groups.join(', ')}]</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </ToolLayout>
  );
}
