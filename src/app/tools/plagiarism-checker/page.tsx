'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { ShieldCheck, Search, AlertTriangle, CheckCircle, FileText, BarChart2 } from 'lucide-react';

/* ────────── analysis engine ────────── */

interface AnalysisResult {
  overallScore: number; // 0-100 uniqueness
  totalWords: number;
  totalSentences: number;
  duplicateFragments: { text: string; count: number; positions: number[] }[];
  repeatedPhrases: { phrase: string; count: number }[];
  sentenceOriginality: { sentence: string; score: number; flags: string[] }[];
  waterScore: number; // "water" content %
  commonPhrases: { phrase: string; category: string }[];
}

// Common cliché / template phrases that indicate potential plagiarism
const CLICHE_PHRASES: [string, string][] = [
  ['в настоящее время', 'cliché'],
  ['на сегодняшний день', 'cliché'],
  ['в современном мире', 'cliché'],
  ['играет важную роль', 'cliché'],
  ['является одним из', 'cliché'],
  ['следует отметить', 'filler'],
  ['необходимо подчеркнуть', 'filler'],
  ['таким образом', 'connector'],
  ['в заключение можно сказать', 'cliché'],
  ['подводя итоги', 'cliché'],
  ['как показывает практика', 'cliché'],
  ['в связи с этим', 'connector'],
  ['исходя из вышеизложенного', 'cliché'],
  ['принимая во внимание', 'filler'],
  ['it is important to note', 'cliché'],
  ['in today\'s world', 'cliché'],
  ['plays an important role', 'cliché'],
  ['it should be noted', 'filler'],
  ['in conclusion', 'connector'],
  ['as a result', 'connector'],
  ['on the other hand', 'connector'],
  ['it goes without saying', 'cliché'],
  ['the fact that', 'filler'],
  ['due to the fact', 'filler'],
  ['in order to', 'filler'],
  ['at the present time', 'cliché'],
  ['first and foremost', 'cliché'],
  ['last but not least', 'cliché'],
  ['it is worth mentioning', 'filler'],
  ['to sum up', 'connector'],
];

function getNGrams(text: string, n: number): string[] {
  const words = text.toLowerCase().replace(/[^a-zA-Z0-9\s\u0400-\u04FF\u00C0-\u024F]/g, '').split(/\s+/).filter(Boolean);
  const grams: string[] = [];
  for (let i = 0; i <= words.length - n; i++) {
    grams.push(words.slice(i, i + n).join(' '));
  }
  return grams;
}

function getSentences(text: string): string[] {
  return text
    .split(/[.!?…]+/)
    .map(s => s.trim())
    .filter(s => s.length > 10);
}

function analyzeText(text: string, referenceText: string): AnalysisResult {
  const sentences = getSentences(text);
  const words = text.split(/\s+/).filter(Boolean);
  const totalWords = words.length;
  const totalSentences = sentences.length;

  // 1. Find duplicate fragments (n-grams of size 4-8)
  const fragmentMap = new Map<string, { count: number; positions: number[] }>();
  for (let n = 4; n <= 8; n++) {
    const grams = getNGrams(text, n);
    grams.forEach((gram, pos) => {
      const entry = fragmentMap.get(gram);
      if (entry) {
        entry.count++;
        entry.positions.push(pos);
      } else {
        fragmentMap.set(gram, { count: 1, positions: [pos] });
      }
    });
  }

  const duplicateFragments = Array.from(fragmentMap.entries())
    .filter(([, v]) => v.count > 1)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 20)
    .map(([text, data]) => ({ text, count: data.count, positions: data.positions }));

  // 2. Repeated phrases (3-grams)
  const trigramMap = new Map<string, number>();
  getNGrams(text, 3).forEach(gram => {
    trigramMap.set(gram, (trigramMap.get(gram) || 0) + 1);
  });
  const repeatedPhrases = Array.from(trigramMap.entries())
    .filter(([, count]) => count > 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([phrase, count]) => ({ phrase, count }));

  // 3. Cross-reference with reference text
  let crossMatchCount = 0;
  if (referenceText.trim()) {
    const refGrams = new Set(getNGrams(referenceText, 5));
    const textGrams = getNGrams(text, 5);
    textGrams.forEach(gram => {
      if (refGrams.has(gram)) crossMatchCount++;
    });
  }

  // 4. Detect common / cliché phrases
  const textLower = text.toLowerCase();
  const commonPhrases = CLICHE_PHRASES
    .filter(([phrase]) => textLower.includes(phrase))
    .map(([phrase, category]) => ({ phrase, category }));

  // 5. Sentence-level analysis
  const sentenceOriginality = sentences.map(sentence => {
    const flags: string[] = [];
    let score = 100;

    // Check for clichés
    const sentLower = sentence.toLowerCase();
    CLICHE_PHRASES.forEach(([phrase, cat]) => {
      if (sentLower.includes(phrase)) {
        flags.push(`Contains ${cat}: "${phrase}"`);
        score -= 10;
      }
    });

    // Check internal self-repetition
    const sentGrams = getNGrams(sentence, 3);
    const gramSet = new Set(sentGrams);
    if (sentGrams.length > 0 && gramSet.size < sentGrams.length * 0.7) {
      flags.push('High internal repetition');
      score -= 15;
    }

    // Check if sentence appears in reference
    if (referenceText.trim()) {
      const refLower = referenceText.toLowerCase();
      if (refLower.includes(sentLower)) {
        flags.push('Exact match in reference text');
        score -= 50;
      } else {
        // Partial n-gram match
        const sentNgrams = getNGrams(sentence, 4);
        const refNgrams = new Set(getNGrams(referenceText, 4));
        const matchRatio = sentNgrams.filter(g => refNgrams.has(g)).length / Math.max(sentNgrams.length, 1);
        if (matchRatio > 0.5) {
          flags.push(`${Math.round(matchRatio * 100)}% overlap with reference`);
          score -= Math.round(matchRatio * 40);
        }
      }
    }

    return { sentence, score: Math.max(0, Math.min(100, score)), flags };
  });

  // 6. Water (filler) score
  const fillerWords = ['который', 'которая', 'которое', 'которые', 'является', 'данный', 'данная',
    'данное', 'также', 'однако', 'кроме того', 'помимо', 'более того',
    'the', 'a', 'an', 'this', 'that', 'these', 'those', 'which', 'however',
    'moreover', 'furthermore', 'therefore', 'nevertheless', 'consequently'];
  const fillerCount = words.filter(w => fillerWords.includes(w.toLowerCase())).length;
  const waterScore = Math.round((fillerCount / Math.max(totalWords, 1)) * 100);

  // 7. Calculate overall uniqueness score
  let overallScore = 100;

  // Penalize for duplicate fragments
  const dupPenalty = Math.min(30, duplicateFragments.length * 3);
  overallScore -= dupPenalty;

  // Penalize for cross-reference overlap
  if (referenceText.trim()) {
    const textGramsTotal = getNGrams(text, 5).length;
    const crossRatio = crossMatchCount / Math.max(textGramsTotal, 1);
    overallScore -= Math.round(crossRatio * 50);
  }

  // Penalize for clichés
  overallScore -= Math.min(15, commonPhrases.length * 3);

  // Penalize for repeated phrases
  overallScore -= Math.min(10, repeatedPhrases.length * 2);

  // Adjust for water
  overallScore -= Math.min(5, Math.round(waterScore / 5));

  overallScore = Math.max(0, Math.min(100, overallScore));

  return {
    overallScore,
    totalWords,
    totalSentences,
    duplicateFragments,
    repeatedPhrases,
    sentenceOriginality,
    waterScore,
    commonPhrases,
  };
}

/* ────────── color helpers ────────── */
function scoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-600';
}

function scoreBg(score: number): string {
  if (score >= 80) return 'bg-green-50 border-green-200';
  if (score >= 60) return 'bg-yellow-50 border-yellow-200';
  if (score >= 40) return 'bg-orange-50 border-orange-200';
  return 'bg-red-50 border-red-200';
}

function scoreLabel(score: number): string {
  if (score >= 90) return 'Excellent — Highly original';
  if (score >= 80) return 'Good — Mostly original';
  if (score >= 60) return 'Fair — Some unoriginal fragments';
  if (score >= 40) return 'Poor — Significant overlap detected';
  return 'Very Poor — Possible plagiarism';
}

/* ────────── component ────────── */
export default function PlagiarismCheckerPage() {
  const [text, setText] = useState('');
  const [referenceText, setReferenceText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'overview' | 'sentences' | 'fragments' | 'phrases'>('overview');

  const handleCheck = () => {
    if (!text.trim()) return;
    setLoading(true);
    // Simulate analysis time for UX
    setTimeout(() => {
      setResult(analyzeText(text, referenceText));
      setLoading(false);
      setTab('overview');
    }, 800);
  };

  return (
    <ToolLayout
      title="Plagiarism Checker"
      description="Analyze your text for originality. Detect duplicate fragments, repeated phrases, clichés, and compare with reference text."
    >
      <div className="space-y-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text to Check <span className="text-gray-400">*</span>
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Paste your text here to check for plagiarism..."
            className="input w-full font-mono text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">
            {text.split(/\s+/).filter(Boolean).length} words · {getSentences(text).length} sentences
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reference Text <span className="text-gray-400">(optional — for cross-comparison)</span>
          </label>
          <textarea
            value={referenceText}
            onChange={(e) => setReferenceText(e.target.value)}
            rows={5}
            placeholder="Paste a source/reference text to compare against (optional)..."
            className="input w-full font-mono text-sm"
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={!text.trim() || loading}
          className="btn btn-primary flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search size={18} />
              Check for Plagiarism
            </>
          )}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Overall score */}
            <div className={`p-6 rounded-xl border-2 ${scoreBg(result.overallScore)}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Originality Report</h3>
                  <p className="text-sm text-gray-500">{result.totalWords} words · {result.totalSentences} sentences</p>
                </div>
                <div className="text-right">
                  <div className={`text-5xl font-extrabold ${scoreColor(result.overallScore)}`}>
                    {result.overallScore}%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">uniqueness</p>
                </div>
              </div>
              <p className={`text-sm font-medium ${scoreColor(result.overallScore)}`}>
                {result.overallScore >= 80 ? <CheckCircle size={16} className="inline mr-1" /> : <AlertTriangle size={16} className="inline mr-1" />}
                {scoreLabel(result.overallScore)}
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{result.duplicateFragments.length}</div>
                <div className="text-xs text-gray-500">Duplicate Fragments</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{result.repeatedPhrases.length}</div>
                <div className="text-xs text-gray-500">Repeated Phrases</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{result.commonPhrases.length}</div>
                <div className="text-xs text-gray-500">Clichés Found</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{result.waterScore}%</div>
                <div className="text-xs text-gray-500">Filler Words</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {(['overview', 'sentences', 'fragments', 'phrases'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors capitalize ${
                    tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {tab === 'overview' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart2 size={18} /> Analysis Breakdown
                </h4>

                <div className="space-y-3">
                  {[
                    { label: 'Self-duplication', value: Math.max(0, 100 - result.duplicateFragments.length * 5), desc: 'Internal text repetition' },
                    { label: 'Phrase originality', value: Math.max(0, 100 - result.repeatedPhrases.length * 4), desc: 'Variety of expressions' },
                    { label: 'Cliché-free', value: Math.max(0, 100 - result.commonPhrases.length * 8), desc: 'Absence of template phrases' },
                    { label: 'Content density', value: Math.max(0, 100 - result.waterScore * 2), desc: 'Low filler word ratio' },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">{metric.label}</span>
                        <span className={`text-sm font-medium ${scoreColor(metric.value)}`}>{metric.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            metric.value >= 80 ? 'bg-green-500' : metric.value >= 60 ? 'bg-yellow-500' : metric.value >= 40 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{metric.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'sentences' && (
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {result.sentenceOriginality.map((s, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border ${scoreBg(s.score)}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm text-gray-800 flex-1">{s.sentence}</p>
                      <span className={`text-sm font-bold ${scoreColor(s.score)} whitespace-nowrap`}>
                        {s.score}%
                      </span>
                    </div>
                    {s.flags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {s.flags.map((flag, fi) => (
                          <span key={fi} className="text-xs px-2 py-0.5 rounded-full bg-white/80 text-gray-600 border border-gray-200">
                            {flag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {tab === 'fragments' && (
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {result.duplicateFragments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No duplicate fragments detected — great!</p>
                ) : (
                  result.duplicateFragments.map((f, i) => (
                    <div key={i} className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-sm text-gray-800 font-mono">&quot;{f.text}&quot;</p>
                      <p className="text-xs text-red-600 mt-1">
                        Repeated {f.count} times
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === 'phrases' && (
              <div className="space-y-4">
                {result.commonPhrases.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Clichés & Template Phrases</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.commonPhrases.map((p, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full text-sm bg-orange-50 text-orange-700 border border-orange-200">
                          {p.phrase}
                          <span className="ml-1 text-xs text-orange-400">({p.category})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.repeatedPhrases.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Frequently Repeated Phrases</h4>
                    <div className="space-y-1">
                      {result.repeatedPhrases.map((p, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-200">
                          <span className="text-sm text-gray-700">&quot;{p.phrase}&quot;</span>
                          <span className="text-xs text-gray-400">{p.count}×</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.commonPhrases.length === 0 && result.repeatedPhrases.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No problematic phrases detected!</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
