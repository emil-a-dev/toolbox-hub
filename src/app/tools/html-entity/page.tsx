'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

const ENTITIES: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  '\u00A0': '&nbsp;', '\u00A9': '&copy;', '\u00AE': '&reg;', '\u2122': '&trade;',
  '\u00AB': '&laquo;', '\u00BB': '&raquo;', '\u2013': '&ndash;', '\u2014': '&mdash;',
  '\u2018': '&lsquo;', '\u2019': '&rsquo;', '\u201C': '&ldquo;', '\u201D': '&rdquo;',
  '\u2026': '&hellip;', '\u00B7': '&middot;', '\u00B0': '&deg;', '\u00D7': '&times;',
  '\u00F7': '&divide;', '\u2260': '&ne;', '\u2264': '&le;', '\u2265': '&ge;',
  '\u221E': '&infin;', '\u2211': '&sum;', '\u221A': '&radic;', '\u00B1': '&plusmn;',
};

const REVERSE: Record<string, string> = {};
Object.entries(ENTITIES).forEach(([c, e]) => { REVERSE[e] = c; });

export default function HtmlEntityPage() {
  const [input, setInput] = useState('Hello <World> & "Quotes" — it\'s ©2025');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const encode = (text: string) => {
    return text.replace(/[&<>"'\u00A0-\u221E]/g, ch => ENTITIES[ch] || `&#${ch.charCodeAt(0)};`);
  };

  const decode = (text: string) => {
    return text.replace(/&[a-zA-Z]+;|&#\d+;|&#x[0-9a-fA-F]+;/g, entity => {
      if (REVERSE[entity]) return REVERSE[entity];
      if (entity.startsWith('&#x')) return String.fromCharCode(parseInt(entity.slice(3, -1), 16));
      if (entity.startsWith('&#')) return String.fromCharCode(parseInt(entity.slice(2, -1)));
      return entity;
    });
  };

  const output = mode === 'encode' ? encode(input) : decode(input);

  return (
    <ToolLayout title="HTML Entity Encoder/Decoder" description="Encode or decode HTML entities. Convert special characters to HTML entities and back.">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'encode' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'decode' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Decode</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{mode === 'encode' ? 'Plain Text' : 'HTML Entities'}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-textarea !font-mono !text-sm" rows={10} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{mode === 'encode' ? 'HTML Entities' : 'Decoded Text'}</label>
          <textarea value={output} readOnly className="tool-textarea !font-mono !text-sm bg-gray-50" rows={10} />
          <div className="mt-3"><CopyButton text={output} /></div>
        </div>
      </div>
      <div className="mt-6"><h3 className="text-sm font-semibold text-gray-700 mb-2">Common HTML Entities</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {Object.entries(ENTITIES).slice(0, 24).map(([c, e]) => (
            <div key={e} className="rounded-lg bg-gray-50 p-2 text-center text-xs"><div className="text-lg mb-1">{c}</div><div className="text-gray-500 font-mono">{e}</div></div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
