'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

const texts = {
  en: {
    encode: 'Encode',
    decode: 'Decode',
    encodePlaceholder: 'Enter URL or text to encode...',
    decodePlaceholder: 'Enter encoded URL to decode...',
    encodeBtn: 'Encode →',
    decodeBtn: '← Decode',
    result: 'Result',
  },
  ru: {
    encode: 'Кодировать',
    decode: 'Декодировать',
    encodePlaceholder: 'Введите URL или текст для кодирования...',
    decodePlaceholder: 'Введите закодированный URL для декодирования...',
    encodeBtn: 'Кодировать →',
    decodeBtn: '← Декодировать',
    result: 'Результат',
  },
};

export default function UrlEncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const { locale } = useLanguage();
  const tx = texts[locale];

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
      setError('');
    } catch (e: any) {
      setError(`Error: ${e.message}`);
      setOutput('');
    }
  };

  return (
    <ToolLayout
      title="URL Encoder/Decoder"
      description="Encode and decode URL components. Useful for query parameters and special characters."
    >
      <div className="flex gap-2 mb-4">
        {(['encode', 'decode'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === m ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {m === 'encode' ? tx.encode : tx.decode}
          </button>
        ))}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === 'encode' ? tx.encodePlaceholder : tx.decodePlaceholder}
        className="tool-textarea"
      />

      <button onClick={process} className="tool-btn mt-4">
        {mode === 'encode' ? tx.encodeBtn : tx.decodeBtn}
      </button>

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
