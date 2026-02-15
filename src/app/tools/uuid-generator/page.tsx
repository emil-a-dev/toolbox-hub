'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { RefreshCw } from 'lucide-react';

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGeneratorPage() {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);
  const [uuids, setUuids] = useState<string[]>(() =>
    Array.from({ length: 5 }, () => generateUUID())
  );

  const generate = useCallback(() => {
    setUuids(Array.from({ length: count }, () => {
      let uuid = generateUUID();
      if (noDashes) uuid = uuid.replace(/-/g, '');
      if (uppercase) uuid = uuid.toUpperCase();
      return uuid;
    }));
  }, [count, uppercase, noDashes]);

  const allText = uuids.join('\n');

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate random UUIDs (v4) instantly. Batch generate up to 100 UUIDs."
    >
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
            className="tool-input !w-24"
            min={1}
            max={100}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600 pb-2">
          <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="rounded" />
          Uppercase
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 pb-2">
          <input type="checkbox" checked={noDashes} onChange={(e) => setNoDashes(e.target.checked)} className="rounded" />
          No dashes
        </label>
        <button onClick={generate} className="tool-btn">
          <RefreshCw size={16} /> Generate
        </button>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700">{uuids.length} UUIDs</h3>
          <CopyButton text={allText} />
        </div>
        <div className="rounded-xl border border-gray-200 divide-y divide-gray-100">
          {uuids.map((uuid, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 group">
              <code className="text-sm font-mono text-gray-800">{uuid}</code>
              <button
                onClick={() => navigator.clipboard.writeText(uuid)}
                className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary-600"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
