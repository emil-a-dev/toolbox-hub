'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

const texts = {
  en: {
    inputJson: 'Input JSON',
    output: 'Output',
    outputPlaceholder: 'Output will appear here...',
    format: 'Format',
    minify: 'Minify',
    validate: 'Validate',
    indent: 'Indent:',
    validJson: '✅ Valid JSON!',
    invalidJson: '❌ Invalid JSON:',
  },
  ru: {
    inputJson: 'Входной JSON',
    output: 'Результат',
    outputPlaceholder: 'Результат появится здесь...',
    format: 'Форматировать',
    minify: 'Минифицировать',
    validate: 'Проверить',
    indent: 'Отступ:',
    validJson: '✅ Валидный JSON!',
    invalidJson: '❌ Невалидный JSON:',
  },
};

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);
  const { locale } = useLanguage();
  const tx = texts[locale];

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError('');
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const validate = () => {
    try {
      JSON.parse(input);
      setError('');
      setOutput(tx.validJson);
    } catch (e: any) {
      setError(`${tx.invalidJson} ${e.message}`);
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate, and minify JSON data instantly in your browser."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tx.inputJson}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value", "array": [1, 2, 3]}'
            className="tool-textarea !min-h-[300px]"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">{tx.output}</label>
            {output && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="result-box !bg-red-50 !border-red-200 !text-red-600 min-h-[300px]">{error}</div>
          ) : (
            <div className="result-box min-h-[300px]">{output || tx.outputPlaceholder}</div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button onClick={format} className="tool-btn">{tx.format}</button>
        <button onClick={minify} className="tool-btn-secondary">{tx.minify}</button>
        <button onClick={validate} className="tool-btn-secondary">{tx.validate}</button>
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm text-gray-500">{tx.indent}</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="tool-input !w-20"
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </div>
      </div>
    </ToolLayout>
  );
}
