'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

function prettifyHTML(html: string): string {
  let indent = 0;
  const tab = '  ';
  const selfClosing = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;
  return html
    .replace(/>\s+</g, '><')
    .replace(/(<\/?[^>]+>)/g, '\n$1')
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('</')) indent = Math.max(0, indent - 1);
      const result = tab.repeat(indent) + trimmed;
      const tagMatch = trimmed.match(/^<(\w+)/);
      if (tagMatch && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !selfClosing.test(tagMatch[1])) indent++;
      return result;
    })
    .join('\n');
}

function minifyHTML(html: string): string {
  return html.replace(/\n/g, '').replace(/\s{2,}/g, ' ').replace(/>\s+</g, '><').trim();
}

const texts = {
  en: {
    inputHtml: 'Input HTML',
    output: 'Output',
    outputPlaceholder: 'Output will appear here...',
    beautify: 'Beautify',
    minify: 'Minify',
  },
  ru: {
    inputHtml: 'Входной HTML',
    output: 'Результат',
    outputPlaceholder: 'Результат появится здесь...',
    beautify: 'Форматировать',
    minify: 'Минифицировать',
  },
};

export default function HtmlPrettifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { locale } = useLanguage();
  const tx = texts[locale];

  return (
    <ToolLayout title="HTML Prettifier" description="Format, beautify, or minify HTML code.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">{tx.inputHtml}</label><textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<div><p>Paste HTML here</p></div>" className="tool-textarea !min-h-[300px]" /></div>
        <div><div className="flex items-center justify-between mb-1"><label className="text-sm font-medium text-gray-700">{tx.output}</label>{output && <CopyButton text={output} />}</div><div className="result-box min-h-[300px]">{output || tx.outputPlaceholder}</div></div>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={() => setOutput(prettifyHTML(input))} className="tool-btn">{tx.beautify}</button>
        <button onClick={() => setOutput(minifyHTML(input))} className="tool-btn-secondary">{tx.minify}</button>
      </div>
    </ToolLayout>
  );
}
