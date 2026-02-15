'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

function jsonToTs(obj: unknown, name: string, indent = 0): string {
  const pad = '  '.repeat(indent + 1);
  if (obj === null) return 'null';
  if (Array.isArray(obj)) {
    if (obj.length === 0) return 'unknown[]';
    const first = obj[0];
    if (typeof first === 'object' && first !== null) {
      return jsonToTs(first, name + 'Item', indent) + '[]';
    }
    return typeof first + '[]';
  }
  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>);
    const lines = entries.map(([k, v]) => {
      const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `"${k}"`;
      if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
        return `${pad}${key}: {\n${Object.entries(v as Record<string, unknown>).map(([ik, iv]) => {
          const ikey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(ik) ? ik : `"${ik}"`;
          return `${pad}  ${ikey}: ${getType(iv)};`;
        }).join('\n')}\n${pad}};`;
      }
      if (Array.isArray(v)) {
        if (v.length > 0 && typeof v[0] === 'object' && v[0] !== null) {
          return `${pad}${key}: {\n${Object.entries(v[0] as Record<string, unknown>).map(([ik, iv]) => {
            const ikey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(ik) ? ik : `"${ik}"`;
            return `${pad}  ${ikey}: ${getType(iv)};`;
          }).join('\n')}\n${pad}}[];`;
        }
        return `${pad}${key}: ${v.length > 0 ? getType(v[0]) : 'unknown'}[];`;
      }
      return `${pad}${key}: ${getType(v)};`;
    });
    return `{\n${lines.join('\n')}\n${'  '.repeat(indent)}}`;
  }
  return typeof obj;
}

function getType(val: unknown): string {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (typeof val === 'string') return 'string';
  if (typeof val === 'number') return 'number';
  if (typeof val === 'boolean') return 'boolean';
  return 'unknown';
}

export default function JsonToTypescriptPage() {
  const [input, setInput] = useState('{\n  "id": 1,\n  "name": "Alice",\n  "email": "alice@example.com",\n  "isActive": true,\n  "roles": ["admin", "user"],\n  "address": {\n    "street": "123 Main St",\n    "city": "Springfield",\n    "zip": "62701"\n  },\n  "orders": [\n    { "id": 100, "total": 29.99, "status": "shipped" }\n  ]\n}');
  const [name, setName] = useState('Root');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convert = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      const body = jsonToTs(parsed, name);
      setOutput(`export interface ${name} ${body}`);
    } catch { setError('Invalid JSON input'); }
  };

  return (
    <ToolLayout title="JSON to TypeScript" description="Generate TypeScript interfaces from JSON data.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <label className="text-sm font-medium text-gray-700">JSON Input</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="tool-input !w-32 !text-sm" placeholder="Interface name" />
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-textarea !font-mono !text-sm" rows={16} />
          <button onClick={convert} className="tool-btn mt-3 w-full">Generate Interface →</button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">TypeScript Interface</label>
          <textarea value={output} readOnly className="tool-textarea !font-mono !text-sm bg-gray-50" rows={16} />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {output && <div className="mt-3"><CopyButton text={output} /></div>}
        </div>
      </div>
    </ToolLayout>
  );
}
