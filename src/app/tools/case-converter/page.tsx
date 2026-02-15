'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab' | 'toggle';

const conversions: { id: CaseType; label: string }[] = [
  { id: 'upper', label: 'UPPER CASE' },
  { id: 'lower', label: 'lower case' },
  { id: 'title', label: 'Title Case' },
  { id: 'sentence', label: 'Sentence case' },
  { id: 'camel', label: 'camelCase' },
  { id: 'snake', label: 'snake_case' },
  { id: 'kebab', label: 'kebab-case' },
  { id: 'toggle', label: 'tOGGLE cASE' },
];

const texts = {
  en: {
    placeholder: 'Type or paste your text here...',
    result: 'Result',
  },
  ru: {
    placeholder: 'Введите или вставьте текст...',
    result: 'Результат',
  },
};

function convertCase(text: string, type: CaseType): string {
  switch (type) {
    case 'upper': return text.toUpperCase();
    case 'lower': return text.toLowerCase();
    case 'title': return text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case 'sentence': return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case 'camel': {
      const words = text.trim().split(/[\s_\-]+/);
      return words[0].toLowerCase() + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    }
    case 'snake': return text.trim().replace(/[\s\-]+/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    case 'kebab': return text.trim().replace(/[\s_]+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    case 'toggle': return text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
    default: return text;
  }
}

export default function CaseConverterPage() {
  const { locale } = useLanguage();
  const tx = texts[locale];
  const [text, setText] = useState('');
  const [activeCase, setActiveCase] = useState<CaseType>('upper');
  const result = convertCase(text, activeCase);

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text between different cases: UPPER, lower, Title, camelCase, snake_case, and more."
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={tx.placeholder}
        className="tool-textarea"
      />

      <div className="flex flex-wrap gap-2 mt-4">
        {conversions.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCase(c.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCase === c.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {text && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">{tx.result}</h3>
            <CopyButton text={result} />
          </div>
          <div className="result-box">{result}</div>
        </div>
      )}
    </ToolLayout>
  );
}
