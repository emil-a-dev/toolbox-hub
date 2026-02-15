'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

function analyze(text: string) {
  if (!text.trim()) return null;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const words = text.split(/\s+/).filter(w => w);
  const syllables = words.reduce((acc, w) => acc + countSyllables(w), 0);
  const chars = text.replace(/\s/g, '').length;
  const avgSentenceLen = words.length / (sentences.length || 1);
  const avgSyllables = syllables / (words.length || 1);
  const fleschKincaid = 206.835 - 1.015 * avgSentenceLen - 84.6 * avgSyllables;
  const gradeLevel = 0.39 * avgSentenceLen + 11.8 * avgSyllables - 15.59;
  const ari = 4.71 * (chars / (words.length || 1)) + 0.5 * avgSentenceLen - 21.43;
  return { sentences: sentences.length, words: words.length, syllables, chars, avgSentenceLen: avgSentenceLen.toFixed(1), fleschKincaid: Math.max(0, Math.min(100, fleschKincaid)).toFixed(1), gradeLevel: Math.max(0, gradeLevel).toFixed(1), ari: Math.max(0, ari).toFixed(1) };
}

function countSyllables(word: string) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

function getLevel(score: number) {
  if (score >= 90) return { label: 'Very Easy', desc: '5th grade', color: 'text-emerald-600' };
  if (score >= 80) return { label: 'Easy', desc: '6th grade', color: 'text-emerald-500' };
  if (score >= 70) return { label: 'Fairly Easy', desc: '7th grade', color: 'text-green-500' };
  if (score >= 60) return { label: 'Standard', desc: '8th–9th grade', color: 'text-yellow-500' };
  if (score >= 50) return { label: 'Fairly Difficult', desc: '10th–12th grade', color: 'text-orange-500' };
  if (score >= 30) return { label: 'Difficult', desc: 'College', color: 'text-red-500' };
  return { label: 'Very Difficult', desc: 'Graduate+', color: 'text-red-600' };
}

export default function ReadabilityPage() {
  const [text, setText] = useState('');
  const stats = analyze(text);
  const level = stats ? getLevel(Number(stats.fleschKincaid)) : null;

  return (
    <ToolLayout title="Readability Score" description="Analyze text readability using Flesch-Kincaid and other metrics.">
      <textarea value={text} onChange={e => setText(e.target.value)} className="tool-textarea h-40" placeholder="Paste your text here to analyze readability..." />
      {stats && level && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl bg-primary-50 border border-primary-200 p-6 text-center">
            <div className="text-sm text-primary-600 mb-1">Flesch Reading Ease</div>
            <div className={`text-4xl font-bold ${level.color} mb-1`}>{stats.fleschKincaid}</div>
            <div className={`font-semibold ${level.color}`}>{level.label}</div>
            <div className="text-sm text-gray-500">{level.desc}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[{ l: 'Words', v: stats.words },{ l: 'Sentences', v: stats.sentences },{ l: 'Syllables', v: stats.syllables },{ l: 'Avg Words/Sentence', v: stats.avgSentenceLen },{ l: 'Characters', v: stats.chars },{ l: 'Grade Level (FK)', v: stats.gradeLevel },{ l: 'ARI Score', v: stats.ari },{ l: 'Reading Time', v: `${Math.ceil(stats.words / 200)} min` }].map(s => (
              <div key={s.l} className="rounded-lg bg-gray-50 p-3 text-center"><div className="text-xs text-gray-500">{s.l}</div><div className="text-lg font-bold text-gray-800">{s.v}</div></div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
