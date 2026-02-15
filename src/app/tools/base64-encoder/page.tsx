'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

const texts = {
  en: {
    encode: 'Encode',
    decode: 'Decode',
    encodePlaceholder: 'Enter text to encode...',
    decodePlaceholder: 'Enter Base64 string to decode...',
    encodeBtn: 'Encode →',
    decodeBtn: '← Decode',
    swap: '⇄ Swap',
    result: 'Result',
  },
  ru: {
    encode: 'Кодировать',
    decode: 'Декодировать',
    encodePlaceholder: 'Введите текст для кодирования...',
    decodePlaceholder: 'Введите строку Base64 для декодирования...',
    encodeBtn: 'Кодировать →',
    decodeBtn: '← Декодировать',
    swap: '⇄ Поменять',
    result: 'Результат',
  },
};

export default function Base64EncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const { locale } = useLanguage();
  const tx = texts[locale];

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError('');
    } catch (e: any) {
      setError(`Error: ${e.message}`);
      setOutput('');
    }
  };

  const swap = () => {
    setInput(output);
    setOutput('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode text to Base64 or decode Base64 strings back to text."
    >
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('encode')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'encode' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {tx.encode}
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'decode' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {tx.decode}
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === 'encode' ? tx.encodePlaceholder : tx.decodePlaceholder}
        className="tool-textarea"
      />

      <div className="flex gap-3 mt-4">
        <button onClick={process} className="tool-btn">
          {mode === 'encode' ? tx.encodeBtn : tx.decodeBtn}
        </button>
        <button onClick={swap} className="tool-btn-secondary">{tx.swap}</button>
      </div>

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

      {output && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">{tx.result}</h3>
            <CopyButton text={output} />
          </div>
          <div className="result-box">{output}</div>
        </div>
      )}
    </ToolLayout>
  );
}
