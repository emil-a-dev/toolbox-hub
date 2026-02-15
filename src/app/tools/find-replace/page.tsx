'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

const texts = {
  en: {
    enterText: 'Enter your text...',
    find: 'Find',
    searchFor: 'Search for...',
    replaceWith: 'Replace with',
    replaceWithPlaceholder: 'Replace with...',
    regex: 'Regex',
    caseSensitive: 'Case sensitive',
    match: 'match',
    matches: 'matches',
    replaceAll: 'Replace All',
    result: 'Result',
  },
  ru: {
    enterText: 'Введите текст...',
    find: 'Найти',
    searchFor: 'Искать...',
    replaceWith: 'Заменить на',
    replaceWithPlaceholder: 'Заменить на...',
    regex: 'Регулярные выражения',
    caseSensitive: 'Учитывать регистр',
    match: 'совпадение',
    matches: 'совпадений',
    replaceAll: 'Заменить всё',
    result: 'Результат',
  },
};

export default function FindReplacePage() {
  const { locale } = useLanguage();
  const tx = texts[locale];

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
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={tx.enterText} className="tool-textarea !min-h-[150px]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tx.find}</label>
          <input type="text" value={find} onChange={(e) => setFind(e.target.value)} className="tool-input" placeholder={tx.searchFor} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tx.replaceWith}</label>
          <input type="text" value={replace} onChange={(e) => setReplace(e.target.value)} className="tool-input" placeholder={tx.replaceWithPlaceholder} />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="rounded" /> {tx.regex}</label>
        <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded" /> {tx.caseSensitive}</label>
        {find && <span className="text-sm text-gray-500">{matchCount} {matchCount !== 1 ? tx.matches : tx.match}</span>}
      </div>
      <button onClick={handleReplace} className="tool-btn mt-4">{tx.replaceAll}</button>
      {result && <div className="mt-6"><div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">{tx.result}</h3><CopyButton text={result} /></div><div className="result-box">{result}</div></div>}
    </ToolLayout>
  );
}
