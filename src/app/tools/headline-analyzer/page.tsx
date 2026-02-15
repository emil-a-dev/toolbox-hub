'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

function analyzeHeadline(headline: string) {
  if (!headline.trim()) return null;
  const words = headline.split(/\s+/).filter(w => w);
  const wordCount = words.length;
  let score = 50;

  // Length
  if (wordCount >= 6 && wordCount <= 12) score += 15;
  else if (wordCount >= 4 && wordCount <= 15) score += 8;
  else score -= 10;

  // Power words
  const power = ['free', 'new', 'how', 'why', 'best', 'top', 'ultimate', 'proven', 'secret', 'essential', 'amazing', 'easy', 'simple', 'powerful', 'guide', 'tips', 'ways', 'mistakes'];
  const powerCount = words.filter(w => power.includes(w.toLowerCase())).length;
  score += powerCount * 5;

  // Numbers
  if (/\d/.test(headline)) score += 10;

  // Question
  if (headline.includes('?')) score += 5;

  // Starts with number
  if (/^\d/.test(headline)) score += 5;

  // Character count
  const chars = headline.length;
  if (chars >= 40 && chars <= 70) score += 10;

  score = Math.min(100, Math.max(0, score));

  return { score, wordCount, charCount: chars, powerWords: powerCount, hasNumber: /\d/.test(headline), isQuestion: headline.includes('?') };
}

export default function HeadlinePage() {
  const [headline, setHeadline] = useState('');
  const result = analyzeHeadline(headline);

  const scoreColor = (s: number) => s >= 70 ? 'text-emerald-600' : s >= 50 ? 'text-yellow-600' : 'text-red-600';
  const scoreBg = (s: number) => s >= 70 ? 'bg-emerald-50 border-emerald-200' : s >= 50 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';

  return (
    <ToolLayout title="Headline Analyzer" description="Score your headline for engagement and SEO effectiveness.">
      <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} className="tool-input text-lg" placeholder="Enter your headline..." />
      {result && (
        <div className="mt-6 space-y-4">
          <div className={`rounded-xl border p-6 text-center ${scoreBg(result.score)}`}>
            <div className="text-sm text-gray-600 mb-1">Headline Score</div>
            <div className={`text-5xl font-bold ${scoreColor(result.score)}`}>{result.score}</div>
            <div className={`text-sm font-medium ${scoreColor(result.score)} mt-1`}>{result.score >= 70 ? 'Great!' : result.score >= 50 ? 'Good, but could be better' : 'Needs improvement'}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-lg bg-gray-50 p-3 text-center"><div className="text-xs text-gray-500">Words</div><div className="text-lg font-bold">{result.wordCount}</div><div className="text-xs text-gray-400">ideal: 6–12</div></div>
            <div className="rounded-lg bg-gray-50 p-3 text-center"><div className="text-xs text-gray-500">Characters</div><div className="text-lg font-bold">{result.charCount}</div><div className="text-xs text-gray-400">ideal: 40–70</div></div>
            <div className="rounded-lg bg-gray-50 p-3 text-center"><div className="text-xs text-gray-500">Power Words</div><div className="text-lg font-bold">{result.powerWords}</div></div>
            <div className="rounded-lg bg-gray-50 p-3 text-center"><div className="text-xs text-gray-500">Features</div><div className="text-sm font-medium">{[result.hasNumber && '🔢 Number', result.isQuestion && '❓ Question'].filter(Boolean).join(', ') || 'None'}</div></div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
