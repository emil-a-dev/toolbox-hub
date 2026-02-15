'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

interface DiffLine { type: 'same' | 'added' | 'removed'; text: string; num: number; }

function diffCode(a: string, b: string): DiffLine[] {
  const linesA = a.split('\n'), linesB = b.split('\n');
  const result: DiffLine[] = [];
  const max = Math.max(linesA.length, linesB.length);
  for (let i = 0; i < max; i++) {
    if (i >= linesA.length) result.push({ type: 'added', text: linesB[i], num: i + 1 });
    else if (i >= linesB.length) result.push({ type: 'removed', text: linesA[i], num: i + 1 });
    else if (linesA[i] === linesB[i]) result.push({ type: 'same', text: linesA[i], num: i + 1 });
    else { result.push({ type: 'removed', text: linesA[i], num: i + 1 }); result.push({ type: 'added', text: linesB[i], num: i + 1 }); }
  }
  return result;
}

const texts = {
  en: {
    original: 'Original',
    modified: 'Modified',
    originalPlaceholder: 'Paste original code...',
    modifiedPlaceholder: 'Paste modified code...',
    compare: 'Compare',
    added: 'added',
    removed: 'removed',
    unchanged: 'unchanged',
  },
  ru: {
    original: 'Оригинал',
    modified: 'Изменённый',
    originalPlaceholder: 'Вставьте оригинальный код...',
    modifiedPlaceholder: 'Вставьте изменённый код...',
    compare: 'Сравнить',
    added: 'добавлено',
    removed: 'удалено',
    unchanged: 'без изменений',
  },
};

export default function CodeDiffPage() {
  const [codeA, setCodeA] = useState('');
  const [codeB, setCodeB] = useState('');
  const [diff, setDiff] = useState<DiffLine[] | null>(null);
  const { locale } = useLanguage();
  const tx = texts[locale];

  const stats = diff ? { added: diff.filter(d => d.type === 'added').length, removed: diff.filter(d => d.type === 'removed').length, same: diff.filter(d => d.type === 'same').length } : null;

  return (
    <ToolLayout title="Code Diff" description="Compare two code snippets and see the differences with syntax highlighting.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">{tx.original}</label><textarea value={codeA} onChange={(e) => setCodeA(e.target.value)} placeholder={tx.originalPlaceholder} className="tool-textarea !min-h-[200px]" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">{tx.modified}</label><textarea value={codeB} onChange={(e) => setCodeB(e.target.value)} placeholder={tx.modifiedPlaceholder} className="tool-textarea !min-h-[200px]" /></div>
      </div>
      <button onClick={() => setDiff(diffCode(codeA, codeB))} className="tool-btn mt-4">{tx.compare}</button>
      {diff && stats && (
        <div className="mt-6">
          <div className="flex gap-4 mb-4 text-sm">
            <span className="badge bg-emerald-50 text-emerald-700">+{stats.added} {tx.added}</span>
            <span className="badge bg-red-50 text-red-700">-{stats.removed} {tx.removed}</span>
            <span className="badge bg-gray-100 text-gray-600">{stats.same} {tx.unchanged}</span>
          </div>
          <div className="rounded-xl border border-gray-200 overflow-hidden font-mono text-sm">
            {diff.map((line, i) => (
              <div key={i} className={`flex ${line.type === 'added' ? 'bg-emerald-50' : line.type === 'removed' ? 'bg-red-50' : 'bg-white'}`}>
                <span className="w-12 shrink-0 text-right pr-3 py-1 text-gray-400 border-r border-gray-100 select-none">{line.num}</span>
                <span className="w-6 shrink-0 text-center py-1 select-none font-bold">{line.type === 'added' ? <span className="text-emerald-600">+</span> : line.type === 'removed' ? <span className="text-red-600">−</span> : ''}</span>
                <span className="py-1 px-2 break-all">{line.text || ' '}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
