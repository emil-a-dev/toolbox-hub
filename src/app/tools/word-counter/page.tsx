'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { Type } from 'lucide-react';

export default function WordCounterPage() {
  const [text, setText] = useState('');

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? (text.match(/[.!?]+/g) || []).length || (text.trim() ? 1 : 0) : 0,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
    lines: text ? text.split('\n').length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
  };

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, paragraphs, and estimate reading time."
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="tool-textarea !min-h-[200px]"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {[
          { label: 'Words', value: stats.words, color: 'bg-blue-50 text-blue-700' },
          { label: 'Characters', value: stats.characters, color: 'bg-purple-50 text-purple-700' },
          { label: 'No Spaces', value: stats.charactersNoSpaces, color: 'bg-indigo-50 text-indigo-700' },
          { label: 'Sentences', value: stats.sentences, color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Paragraphs', value: stats.paragraphs, color: 'bg-orange-50 text-orange-700' },
          { label: 'Lines', value: stats.lines, color: 'bg-pink-50 text-pink-700' },
          { label: 'Reading Time', value: `${stats.readingTime} min`, color: 'bg-yellow-50 text-yellow-700' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm opacity-70">{s.label}</div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
