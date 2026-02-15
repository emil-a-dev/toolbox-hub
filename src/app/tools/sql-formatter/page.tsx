'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

function formatSQL(sql: string): string {
  const keywords = ['SELECT','FROM','WHERE','AND','OR','JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN','OUTER JOIN','FULL JOIN','ON','ORDER BY','GROUP BY','HAVING','LIMIT','OFFSET','INSERT INTO','VALUES','UPDATE','SET','DELETE FROM','CREATE TABLE','ALTER TABLE','DROP TABLE','AS','IN','NOT','NULL','IS','BETWEEN','LIKE','EXISTS','UNION','ALL','DISTINCT','CASE','WHEN','THEN','ELSE','END','COUNT','SUM','AVG','MIN','MAX','WITH'];
  let formatted = sql.replace(/\s+/g, ' ').trim();
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'gi');
    formatted = formatted.replace(regex, `\n${kw.toUpperCase()}`);
  });
  formatted = formatted.replace(/,/g, ',\n  ');
  formatted = formatted.replace(/\(\s*/g, '(\n  ');
  formatted = formatted.replace(/\s*\)/g, '\n)');
  return formatted.trim().replace(/^\n/, '');
}

function minifySQL(sql: string): string {
  return sql.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
}

const texts = {
  en: {
    inputSql: 'Input SQL',
    output: 'Output',
    outputPlaceholder: 'Formatted SQL will appear here...',
    format: 'Format',
    minify: 'Minify',
    uppercaseKeywords: 'UPPERCASE Keywords',
  },
  ru: {
    inputSql: 'Входной SQL',
    output: 'Результат',
    outputPlaceholder: 'Отформатированный SQL появится здесь...',
    format: 'Форматировать',
    minify: 'Минифицировать',
    uppercaseKeywords: 'ЗАГЛАВНЫЕ ключевые слова',
  },
};

export default function SqlFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { locale } = useLanguage();
  const tx = texts[locale];

  return (
    <ToolLayout title="SQL Formatter" description="Format and beautify SQL queries for better readability.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">{tx.inputSql}</label><textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="SELECT * FROM users WHERE id = 1" className="tool-textarea !min-h-[300px]" /></div>
        <div><div className="flex items-center justify-between mb-1"><label className="text-sm font-medium text-gray-700">{tx.output}</label>{output && <CopyButton text={output} />}</div><div className="result-box min-h-[300px]">{output || tx.outputPlaceholder}</div></div>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={() => setOutput(formatSQL(input))} className="tool-btn">{tx.format}</button>
        <button onClick={() => setOutput(minifySQL(input))} className="tool-btn-secondary">{tx.minify}</button>
        <button onClick={() => setOutput(input.toUpperCase())} className="tool-btn-secondary">{tx.uppercaseKeywords}</button>
      </div>
    </ToolLayout>
  );
}
