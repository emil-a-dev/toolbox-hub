'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

const texts = {
  en: {
    placeholder: 'Enter text to reverse...',
    reverseChars: 'Reverse Characters',
    reverseWords: 'Reverse Words',
    reverseEach: 'Reverse Each Word',
  },
  ru: {
    placeholder: 'Введите текст для реверса...',
    reverseChars: 'Реверс символов',
    reverseWords: 'Реверс слов',
    reverseEach: 'Реверс каждого слова',
  },
};

export default function TextReverserPage() {
  const { locale } = useLanguage();
  const tx = texts[locale];

  const [text, setText] = useState('');
  const reversed = text.split('').reverse().join('');
  const wordReversed = text.split(' ').reverse().join(' ');
  const eachWordReversed = text.split(' ').map(w => w.split('').reverse().join('')).join(' ');

  return (
    <ToolLayout title="Text Reverser" description="Reverse text, words, or individual characters.">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={tx.placeholder} className="tool-textarea" />
      {text && <div className="space-y-4 mt-6">
        {[
          { label: tx.reverseChars, value: reversed },
          { label: tx.reverseWords, value: wordReversed },
          { label: tx.reverseEach, value: eachWordReversed },
        ].map((r) => <div key={r.label}><div className="flex items-center justify-between mb-1"><h3 className="text-sm font-semibold text-gray-700">{r.label}</h3><CopyButton text={r.value} /></div><div className="result-box">{r.value}</div></div>)}
      </div>}
    </ToolLayout>
  );
}
