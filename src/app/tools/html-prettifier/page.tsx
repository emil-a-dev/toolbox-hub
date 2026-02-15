'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

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

export default function HtmlPrettifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <ToolLayout title="HTML Prettifier" description="Format, beautify, or minify HTML code.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Input HTML</label><textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<div><p>Paste HTML here</p></div>" className="tool-textarea !min-h-[300px]" /></div>
        <div><div className="flex items-center justify-between mb-1"><label className="text-sm font-medium text-gray-700">Output</label>{output && <CopyButton text={output} />}</div><div className="result-box min-h-[300px]">{output || 'Output will appear here...'}</div></div>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={() => setOutput(prettifyHTML(input))} className="tool-btn">Beautify</button>
        <button onClick={() => setOutput(minifyHTML(input))} className="tool-btn-secondary">Minify</button>
      </div>
    </ToolLayout>
  );
}
