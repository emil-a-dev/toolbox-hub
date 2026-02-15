'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

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

export default function CssMinifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const originalSize = new Blob([input]).size;
  const outputSize = new Blob([output]).size;
  const savings = originalSize > 0 ? Math.round((1 - outputSize / originalSize) * 100) : 0;

  return (
    <ToolLayout title="CSS Minifier / Beautifier" description="Minify or beautify CSS code. See size savings.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Input CSS</label><textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder=".class { color: red; }" className="tool-textarea !min-h-[300px]" /></div>
        <div><div className="flex items-center justify-between mb-1"><label className="text-sm font-medium text-gray-700">Output</label>{output && <CopyButton text={output} />}</div><div className="result-box min-h-[300px]">{output || 'Output will appear here...'}</div></div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button onClick={() => setOutput(minifyCSS(input))} className="tool-btn">Minify</button>
        <button onClick={() => setOutput(beautifyCSS(input))} className="tool-btn-secondary">Beautify</button>
        {output && <span className="text-sm text-gray-500">{originalSize}B → {outputSize}B ({savings > 0 ? `-${savings}%` : `+${Math.abs(savings)}%`})</span>}
      </div>
    </ToolLayout>
  );
}
