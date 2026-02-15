'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

function jsonToYaml(obj: unknown, indent = 0): string {
  const pad = '  '.repeat(indent);
  if (obj === null || obj === undefined) return 'null';
  if (typeof obj === 'boolean') return obj ? 'true' : 'false';
  if (typeof obj === 'number') return String(obj);
  if (typeof obj === 'string') {
    if (obj.includes('\n') || obj.includes(':') || obj.includes('#') || obj.includes('"') || obj.includes("'") || obj === '' || obj === 'true' || obj === 'false' || obj === 'null' || !isNaN(Number(obj)))
      return `"${obj.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return obj.map(item => {
      const v = jsonToYaml(item, indent + 1);
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) return `${pad}- ${v.trimStart()}`;
      return `${pad}- ${v}`;
    }).join('\n');
  }
  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    return entries.map(([k, v]) => {
      const key = /[: #\[\]{}&*!|>'"%@`]/.test(k) || k === '' ? `"${k}"` : k;
      if (typeof v === 'object' && v !== null) return `${pad}${key}:\n${jsonToYaml(v, indent + 1)}`;
      return `${pad}${key}: ${jsonToYaml(v, indent + 1)}`;
    }).join('\n');
  }
  return String(obj);
}

export default function JsonToYamlPage() {
  const [input, setInput] = useState('{\n  "name": "ToolBox Hub",\n  "version": "1.0.0",\n  "features": ["fast", "free", "private"],\n  "config": {\n    "theme": "dark",\n    "lang": "en",\n    "debug": false\n  }\n}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convert = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      setOutput(jsonToYaml(parsed));
    } catch { setError('Invalid JSON input'); }
  };

  return (
    <ToolLayout title="JSON to YAML Converter" description="Convert JSON to YAML format online.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">JSON Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-textarea !font-mono !text-sm" rows={14} />
          <button onClick={convert} className="tool-btn mt-3 w-full">Convert to YAML →</button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">YAML Output</label>
          <textarea value={output} readOnly className="tool-textarea !font-mono !text-sm bg-gray-50" rows={14} />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {output && <div className="mt-3"><CopyButton text={output} /></div>}
        </div>
      </div>
    </ToolLayout>
  );
}
