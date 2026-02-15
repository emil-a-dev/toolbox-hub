'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

interface DiffLine {
  type: 'same' | 'added' | 'removed';
  text: string;
  lineNum: number;
}

function computeDiff(textA: string, textB: string): DiffLine[] {
  const linesA = textA.split('\n');
  const linesB = textB.split('\n');
  const result: DiffLine[] = [];

  const maxLen = Math.max(linesA.length, linesB.length);

  for (let i = 0; i < maxLen; i++) {
    const a = linesA[i];
    const b = linesB[i];

    if (a === undefined && b !== undefined) {
      result.push({ type: 'added', text: b, lineNum: i + 1 });
    } else if (b === undefined && a !== undefined) {
      result.push({ type: 'removed', text: a, lineNum: i + 1 });
    } else if (a === b) {
      result.push({ type: 'same', text: a, lineNum: i + 1 });
    } else {
      result.push({ type: 'removed', text: a, lineNum: i + 1 });
      result.push({ type: 'added', text: b, lineNum: i + 1 });
    }
  }

  return result;
}

export default function TextDiffPage() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [diff, setDiff] = useState<DiffLine[] | null>(null);

  const handleCompare = () => {
    setDiff(computeDiff(textA, textB));
  };

  const stats = diff
    ? {
        added: diff.filter((d) => d.type === 'added').length,
        removed: diff.filter((d) => d.type === 'removed').length,
        same: diff.filter((d) => d.type === 'same').length,
      }
    : null;

  return (
    <ToolLayout
      title="Text Diff"
      description="Compare two texts and see the differences line by line."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Original</label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            placeholder="Paste original text here..."
            className="tool-textarea !min-h-[200px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Modified</label>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            placeholder="Paste modified text here..."
            className="tool-textarea !min-h-[200px]"
          />
        </div>
      </div>

      <button onClick={handleCompare} className="tool-btn mt-4">
        Compare
      </button>

      {diff && stats && (
        <div className="mt-6">
          <div className="flex gap-4 mb-4 text-sm">
            <span className="badge bg-emerald-50 text-emerald-700">+{stats.added} added</span>
            <span className="badge bg-red-50 text-red-700">-{stats.removed} removed</span>
            <span className="badge bg-gray-100 text-gray-600">{stats.same} unchanged</span>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden font-mono text-sm">
            {diff.map((line, i) => (
              <div
                key={i}
                className={`flex ${
                  line.type === 'added'
                    ? 'bg-emerald-50'
                    : line.type === 'removed'
                    ? 'bg-red-50'
                    : 'bg-white'
                }`}
              >
                <span className="w-12 shrink-0 text-right pr-3 py-1 text-gray-400 border-r border-gray-100 select-none">
                  {line.lineNum}
                </span>
                <span className="w-6 shrink-0 text-center py-1 select-none font-bold">
                  {line.type === 'added' ? (
                    <span className="text-emerald-600">+</span>
                  ) : line.type === 'removed' ? (
                    <span className="text-red-600">−</span>
                  ) : (
                    ''
                  )}
                </span>
                <span className="py-1 px-2 break-all">{line.text || ' '}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
