'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

function beautifyCSS(css: string): string {
  return css
    .replace(/\s*{\s*/g, ' {\n  ')
    .replace(/\s*}\s*/g, '\n}\n\n')
    .replace(/;\s*/g, ';\n  ')
    .replace(/,\s*/g, ',\n')
    .replace(/\n\s*\n/g, '\n')
    .replace(/  \n}/g, '\n}')
    .trim();
}

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

const texts = {
  en: {
    inputCss: 'Input CSS',
    output: 'Output',
    outputPlaceholder: 'Output will appear here...',
    minify: 'Minify',
    beautify: 'Beautify',
  },
  ru: {
    inputCss: 'Входной CSS',
    output: 'Результат',
    outputPlaceholder: 'Результат появится здесь...',
    minify: 'Минифицировать',
    beautify: 'Форматировать',
  },
};

export default function CssMinifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { locale } = useLanguage();
  const tx = texts[locale];

  const originalSize = new Blob([input]).size;
  const outputSize = new Blob([output]).size;
  const savings = originalSize > 0 ? Math.round((1 - outputSize / originalSize) * 100) : 0;

  return (
    <ToolLayout title="CSS Minifier / Beautifier" description="Minify or beautify CSS code. See size savings.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">{tx.inputCss}</label><textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder=".class { color: red; }" className="tool-textarea !min-h-[300px]" /></div>
        <div><div className="flex items-center justify-between mb-1"><label className="text-sm font-medium text-gray-700">{tx.output}</label>{output && <CopyButton text={output} />}</div><div className="result-box min-h-[300px]">{output || tx.outputPlaceholder}</div></div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button onClick={() => setOutput(minifyCSS(input))} className="tool-btn">{tx.minify}</button>
        <button onClick={() => setOutput(beautifyCSS(input))} className="tool-btn-secondary">{tx.beautify}</button>
        {output && <span className="text-sm text-gray-500">{originalSize}B → {outputSize}B ({savings > 0 ? `-${savings}%` : `+${Math.abs(savings)}%`})</span>}
      </div>
    </ToolLayout>
  );
}
