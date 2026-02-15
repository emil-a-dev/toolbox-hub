'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';
import { RefreshCw } from 'lucide-react';

function generate(length: number, options: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean }): string {
  let chars = '';
  if (options.upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.lower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (options.numbers) chars += '0123456789';
  if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (v) => chars[v % chars.length]).join('');
}

export default function PasswordGeneratorPage() {
  const texts = {
    en: { length: 'Length', generate: 'Generate' },
    ru: { length: 'Длина', generate: 'Сгенерировать' },
  };
  const { locale } = useLanguage();
  const tx = texts[locale];

  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const [passwords, setPasswords] = useState<string[]>(() =>
    Array.from({ length: 5 }, () => generate(16, { upper: true, lower: true, numbers: true, symbols: true }))
  );

  const regenerate = useCallback(() => {
    setPasswords(Array.from({ length: 5 }, () => generate(length, options)));
  }, [length, options]);

  const toggleOption = (key: keyof typeof options) => {
    setOptions((o) => ({ ...o, [key]: !o[key] }));
  };

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong, cryptographically random passwords. Everything happens in your browser."
    >
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tx.length}: {length}</label>
          <input
            type="range"
            min={4}
            max={128}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-48"
          />
        </div>
        {([
          ['upper', 'A-Z'],
          ['lower', 'a-z'],
          ['numbers', '0-9'],
          ['symbols', '!@#'],
        ] as const).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 text-sm text-gray-600 pb-2">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={() => toggleOption(key)}
              className="rounded"
            />
            {label}
          </label>
        ))}
        <button onClick={regenerate} className="tool-btn">
          <RefreshCw size={16} /> {tx.generate}
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 divide-y divide-gray-100">
        {passwords.map((pw, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 group">
            <code className="text-sm font-mono text-gray-800 break-all">{pw}</code>
            <CopyButton text={pw} />
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
