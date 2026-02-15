'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

async function computeHash(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const algorithms = [
  { id: 'SHA-1', label: 'SHA-1' },
  { id: 'SHA-256', label: 'SHA-256' },
  { id: 'SHA-384', label: 'SHA-384' },
  { id: 'SHA-512', label: 'SHA-512' },
];

const texts = {
  en: {
    placeholder: 'Enter text to hash...',
    generateHashes: 'Generate Hashes',
    uppercase: 'Uppercase',
  },
  ru: {
    placeholder: 'Введите текст для хеширования...',
    generateHashes: 'Сгенерировать хеши',
    uppercase: 'Верхний регистр',
  },
};

export default function HashGeneratorPage() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [uppercase, setUppercase] = useState(false);
  const { locale } = useLanguage();
  const tx = texts[locale];

  const generate = async () => {
    if (!input) return;
    const results: Record<string, string> = {};
    for (const algo of algorithms) {
      results[algo.id] = await computeHash(algo.id, input);
    }
    setHashes(results);
  };

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from any text. All client-side."
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={tx.placeholder}
        className="tool-textarea"
      />

      <div className="flex items-center gap-4 mt-4">
        <button onClick={generate} className="tool-btn">{tx.generateHashes}</button>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="rounded"
          />
          {tx.uppercase}
        </label>
      </div>

      {Object.keys(hashes).length > 0 && (
        <div className="mt-6 space-y-4">
          {algorithms.map((algo) => {
            const val = uppercase ? hashes[algo.id]?.toUpperCase() : hashes[algo.id];
            return (
              <div key={algo.id}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-700">{algo.label}</h3>
                  <CopyButton text={val || ''} />
                </div>
                <div className="result-box text-xs">{val}</div>
              </div>
            );
          })}
        </div>
      )}
    </ToolLayout>
  );
}
