'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { Bot, User, Brain, BarChart3, AlertCircle, CheckCircle2, Zap, BookOpen } from 'lucide-react';

/* ────────── AI detection engine ────────── */

interface DetectionResult {
  aiScore: number; // 0-100 (0 = human, 100 = AI)
  confidence: number;
  totalWords: number;
  totalSentences: number;
  metrics: {
    sentenceLengthVariance: number;
    vocabularyDiversity: number; // TTR
    burstiness: number;
    avgSentenceLength: number;
    lexicalSophistication: number;
    repetitiveness: number;
    formulaicScore: number;
  };
  indicators: { label: string; value: string; signal: 'human' | 'ai' | 'neutral'; explanation: string }[];
  aiPhrases: string[];
  sentenceAnalysis: { sentence: string; score: number }[];
}

// Phrases commonly overused by AI
const AI_PHRASES = [
  'it is important to note',
  'it is worth noting',
  'it\'s worth noting',
  'in today\'s digital age',
  'in today\'s world',
  'in this article',
  'in conclusion',
  'furthermore',
  'moreover',
  'additionally',
  'in summary',
  'to summarize',
  'it\'s important to',
  'play a crucial role',
  'plays a crucial role',
  'plays a vital role',
  'a wide range of',
  'it is essential to',
  'it is crucial to',
  'in the realm of',
  'delve into',
  'navigate the complexities',
  'tapestry of',
  'multifaceted',
  'comprehensive guide',
  'landscape of',
  'in the ever-evolving',
  'crucial aspect',
  'by understanding',
  'whether you\'re',
  'this comprehensive',
  'harness the power',
  'dive into',
  'explore the',
  'unlock the',
  'leverage',
  'streamline',
  'robust',
  'seamless',
  'seamlessly',
  'encompassing',
  'pivotal',
  'elevate',
  'foster',
  'empower',
  'в современном мире',
  'играет важную роль',
  'является ключевым',
  'стоит отметить',
  'необходимо подчеркнуть',
  'следует отметить',
  'в заключение',
  'подводя итоги',
  'таким образом',
  'комплексный подход',
  'всесторонний анализ',
  'на сегодняшний день',
  'в рамках данной',
  'ключевой аспект',
];

function getSentences(text: string): string[] {
  return text
    .split(/[.!?…]+/)
    .map(s => s.trim())
    .filter(s => s.length > 5);
}

function getWords(text: string): string[] {
  return text.toLowerCase().replace(/[^a-zA-Z0-9\s\u0400-\u04FF\u00C0-\u024F]/g, '').split(/\s+/).filter(Boolean);
}

function standardDeviation(arr: number[]): number {
  const n = arr.length;
  if (n < 2) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / n;
  const variance = arr.reduce((acc, val) => acc + (val - mean) ** 2, 0) / (n - 1);
  return Math.sqrt(variance);
}

function detectAI(text: string): DetectionResult {
  const sentences = getSentences(text);
  const words = getWords(text);
  const totalWords = words.length;
  const totalSentences = sentences.length;

  // ── Sentence length analysis ──
  const sentenceLengths = sentences.map(s => getWords(s).length);
  const avgSentenceLength = sentenceLengths.reduce((a, b) => a + b, 0) / Math.max(sentenceLengths.length, 1);
  const sentLenStdDev = standardDeviation(sentenceLengths);
  // AI text tends to have more uniform sentence lengths (lower CV)
  const coefficientOfVariation = sentLenStdDev / Math.max(avgSentenceLength, 1);

  // ── Vocabulary diversity (Type-Token Ratio) ──
  const uniqueWords = new Set(words);
  // Use root TTR to normalize for text length
  const ttr = uniqueWords.size / Math.sqrt(Math.max(totalWords, 1));

  // ── Burstiness ──
  // Human text is "bursty" — some words cluster together. AI distributes evenly.
  const wordFreq = new Map<string, number[]>();
  words.forEach((w, i) => {
    if (!wordFreq.has(w)) wordFreq.set(w, []);
    wordFreq.get(w)!.push(i);
  });
  let burstyWords = 0;
  let totalChecked = 0;
  wordFreq.forEach((positions) => {
    if (positions.length >= 3) {
      const gaps = [];
      for (let i = 1; i < positions.length; i++) {
        gaps.push(positions[i] - positions[i - 1]);
      }
      const gapStdDev = standardDeviation(gaps);
      const gapMean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
      if (gapStdDev > gapMean * 0.5) burstyWords++;
      totalChecked++;
    }
  });
  const burstiness = totalChecked > 0 ? burstyWords / totalChecked : 0.5;

  // ── Lexical sophistication ──
  // Longer words and less common patterns suggest human writing
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / Math.max(totalWords, 1);
  const longWords = words.filter(w => w.length > 8).length;
  const longWordRatio = longWords / Math.max(totalWords, 1);

  // ── Repetitiveness ──
  // AI tends to repeat sentence starters
  const starters = sentences.map(s => {
    const w = getWords(s);
    return w.slice(0, 2).join(' ');
  });
  const starterSet = new Set(starters);
  const starterRepetition = 1 - starterSet.size / Math.max(starters.length, 1);

  // ── Formulaic / AI phrase detection ──
  const textLower = text.toLowerCase();
  const foundAIPhrases = AI_PHRASES.filter(phrase => textLower.includes(phrase));
  const formulaicScore = Math.min(1, foundAIPhrases.length / 5); // Normalized

  // ── Paragraph transition uniformity ──
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 20);
  const paraLengths = paragraphs.map(p => getWords(p).length);
  const paraLenCV = paraLengths.length > 1
    ? standardDeviation(paraLengths) / Math.max(paraLengths.reduce((a, b) => a + b, 0) / paraLengths.length, 1)
    : 0.5;

  // ── Compute AI score ──
  let aiScore = 50; // Start neutral

  // 1. Sentence length uniformity (AI = low CV, typically 0.2-0.35)
  if (coefficientOfVariation < 0.3) aiScore += 12;
  else if (coefficientOfVariation < 0.45) aiScore += 5;
  else if (coefficientOfVariation > 0.7) aiScore -= 12;
  else if (coefficientOfVariation > 0.55) aiScore -= 6;

  // 2. Vocabulary diversity (AI often has moderate-high but consistent TTR)
  if (ttr < 4.5) aiScore += 8;
  else if (ttr > 7) aiScore -= 10;
  else if (ttr > 5.5) aiScore -= 3;

  // 3. Burstiness (Human = high burstiness)
  if (burstiness < 0.3) aiScore += 10;
  else if (burstiness > 0.6) aiScore -= 10;

  // 4. Formulaic phrases (strong AI signal)
  aiScore += Math.round(formulaicScore * 20);

  // 5. Sentence starter repetition
  if (starterRepetition > 0.3) aiScore += 8;
  else if (starterRepetition < 0.1) aiScore -= 5;

  // 6. Paragraph uniformity
  if (paraLenCV < 0.25) aiScore += 6;
  else if (paraLenCV > 0.6) aiScore -= 6;

  // 7. Average sentence length (AI tends toward 15-25 words)
  if (avgSentenceLength >= 14 && avgSentenceLength <= 24) aiScore += 5;
  else aiScore -= 3;

  aiScore = Math.max(0, Math.min(100, aiScore));

  // Confidence based on text length
  let confidence = Math.min(95, 40 + Math.sqrt(totalWords) * 2);
  if (totalWords < 50) confidence = Math.min(confidence, 30);
  else if (totalWords < 100) confidence = Math.min(confidence, 50);

  // ── Indicators ──
  const indicators: DetectionResult['indicators'] = [
    {
      label: 'Sentence Length Uniformity',
      value: `CV = ${coefficientOfVariation.toFixed(2)}`,
      signal: coefficientOfVariation < 0.35 ? 'ai' : coefficientOfVariation > 0.55 ? 'human' : 'neutral',
      explanation: coefficientOfVariation < 0.35
        ? 'Very uniform sentence lengths — typical of AI'
        : coefficientOfVariation > 0.55
          ? 'High variation in sentence length — natural human pattern'
          : 'Moderate variation — inconclusive',
    },
    {
      label: 'Vocabulary Diversity',
      value: `TTR = ${ttr.toFixed(2)}`,
      signal: ttr < 4.5 ? 'ai' : ttr > 5.5 ? 'human' : 'neutral',
      explanation: ttr < 4.5
        ? 'Lower vocabulary diversity — may indicate AI generation'
        : ttr > 5.5
          ? 'Rich vocabulary — suggests human authorship'
          : 'Average vocabulary diversity',
    },
    {
      label: 'Burstiness',
      value: `${(burstiness * 100).toFixed(0)}%`,
      signal: burstiness < 0.3 ? 'ai' : burstiness > 0.6 ? 'human' : 'neutral',
      explanation: burstiness < 0.3
        ? 'Low burstiness — AI distributes words evenly'
        : burstiness > 0.6
          ? 'High burstiness — natural human clustering'
          : 'Moderate burstiness',
    },
    {
      label: 'AI Phrases Detected',
      value: `${foundAIPhrases.length} found`,
      signal: foundAIPhrases.length >= 3 ? 'ai' : foundAIPhrases.length === 0 ? 'human' : 'neutral',
      explanation: foundAIPhrases.length >= 3
        ? 'Multiple formulaic AI phrases detected'
        : foundAIPhrases.length === 0
          ? 'No common AI phrases found'
          : 'A few common phrases — not conclusive',
    },
    {
      label: 'Sentence Starters',
      value: `${(starterRepetition * 100).toFixed(0)}% repeated`,
      signal: starterRepetition > 0.3 ? 'ai' : starterRepetition < 0.1 ? 'human' : 'neutral',
      explanation: starterRepetition > 0.3
        ? 'Many repeated sentence beginnings — AI pattern'
        : starterRepetition < 0.1
          ? 'Varied sentence openings — human-like'
          : 'Some repetition — normal range',
    },
    {
      label: 'Paragraph Structure',
      value: `CV = ${paraLenCV.toFixed(2)}`,
      signal: paraLenCV < 0.25 ? 'ai' : paraLenCV > 0.6 ? 'human' : 'neutral',
      explanation: paraLenCV < 0.25
        ? 'Very uniform paragraph lengths — AI tends to be structured'
        : paraLenCV > 0.6
          ? 'Varied paragraph sizes — human writing style'
          : 'Moderate paragraph variation',
    },
  ];

  // ── Per-sentence scoring ──
  const sentenceAnalysis = sentences.map(sentence => {
    let score = 50;
    const sWords = getWords(sentence);

    // Length score
    if (sWords.length >= 14 && sWords.length <= 24) score += 10;
    else if (sWords.length < 6 || sWords.length > 40) score -= 10;

    // AI phrases in sentence
    const sLower = sentence.toLowerCase();
    const phraseCount = AI_PHRASES.filter(p => sLower.includes(p)).length;
    score += phraseCount * 12;

    // Generic opener
    const openers = ['this', 'it', 'the', 'these', 'there', 'это', 'данный', 'в'];
    if (openers.includes(sWords[0])) score += 5;

    return { sentence, score: Math.max(0, Math.min(100, score)) };
  });

  return {
    aiScore,
    confidence,
    totalWords,
    totalSentences,
    metrics: {
      sentenceLengthVariance: coefficientOfVariation,
      vocabularyDiversity: ttr,
      burstiness,
      avgSentenceLength,
      lexicalSophistication: longWordRatio,
      repetitiveness: starterRepetition,
      formulaicScore,
    },
    indicators,
    aiPhrases: foundAIPhrases,
    sentenceAnalysis,
  };
}

/* ────────── UI helpers ────────── */

function aiColor(score: number): string {
  if (score <= 25) return 'text-green-600';
  if (score <= 50) return 'text-yellow-600';
  if (score <= 75) return 'text-orange-500';
  return 'text-red-600';
}

function aiBg(score: number): string {
  if (score <= 25) return 'bg-green-50 border-green-200';
  if (score <= 50) return 'bg-yellow-50 border-yellow-200';
  if (score <= 75) return 'bg-orange-50 border-orange-200';
  return 'bg-red-50 border-red-200';
}

function aiLabel(score: number): string {
  if (score <= 15) return 'Very likely human-written';
  if (score <= 35) return 'Mostly human — minor AI patterns';
  if (score <= 55) return 'Uncertain — mixed signals';
  if (score <= 75) return 'Likely AI-generated';
  return 'Highly likely AI-generated';
}

function signalIcon(signal: 'human' | 'ai' | 'neutral') {
  switch (signal) {
    case 'human': return <User size={14} className="text-green-600" />;
    case 'ai': return <Bot size={14} className="text-red-500" />;
    case 'neutral': return <AlertCircle size={14} className="text-gray-400" />;
  }
}

/* ────────── component ────────── */

export default function AIContentDetectorPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'indicators' | 'sentences' | 'phrases'>('indicators');

  const handleDetect = () => {
    if (!text.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(detectAI(text));
      setLoading(false);
      setTab('indicators');
    }, 600);
  };

  return (
    <ToolLayout
      title="AI Content Detector"
      description="Analyze text to determine if it was written by a human or generated by AI. Uses statistical patterns, vocabulary analysis, and phrase detection."
    >
      <div className="space-y-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paste your text <span className="text-gray-400">*</span>
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Paste the text you want to analyze for AI authorship..."
            className="input w-full font-mono text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">
            {text.split(/\s+/).filter(Boolean).length} words
            {text.split(/\s+/).filter(Boolean).length < 50 && text.trim() && (
              <span className="text-orange-500 ml-2">Best results with 100+ words</span>
            )}
          </p>
        </div>

        <button
          onClick={handleDetect}
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
              <Zap size={18} />
              Detect AI Content
            </>
          )}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Score card */}
            <div className={`p-6 rounded-xl border-2 ${aiBg(result.aiScore)}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {result.aiScore > 50 ? <Bot size={32} className="text-red-500" /> : <User size={32} className="text-green-600" />}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Detection Result</h3>
                    <p className="text-sm text-gray-500">{result.totalWords} words · {result.totalSentences} sentences</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-5xl font-extrabold ${aiColor(result.aiScore)}`}>
                    {result.aiScore}%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">AI probability</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${aiColor(result.aiScore)}`}>
                  {result.aiScore > 50 ? <Bot size={16} className="inline mr-1" /> : <CheckCircle2 size={16} className="inline mr-1" />}
                  {aiLabel(result.aiScore)}
                </p>
                <span className="text-xs text-gray-400">Confidence: {result.confidence.toFixed(0)}%</span>
              </div>

              {/* Score bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span className="flex items-center gap-1"><User size={12} /> Human</span>
                  <span className="flex items-center gap-1">AI <Bot size={12} /></span>
                </div>
                <div className="h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-full relative">
                  <div
                    className="absolute top-0 w-4 h-3 bg-gray-800 rounded-full border-2 border-white shadow-md transition-all"
                    style={{ left: `calc(${result.aiScore}% - 8px)` }}
                  />
                </div>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{result.metrics.avgSentenceLength.toFixed(0)}</div>
                <div className="text-xs text-gray-500">Avg Words/Sentence</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{result.metrics.vocabularyDiversity.toFixed(1)}</div>
                <div className="text-xs text-gray-500">Vocab Diversity</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{(result.metrics.burstiness * 100).toFixed(0)}%</div>
                <div className="text-xs text-gray-500">Burstiness</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{result.aiPhrases.length}</div>
                <div className="text-xs text-gray-500">AI Phrases</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {(['indicators', 'sentences', 'phrases'] as const).map((t) => (
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
            {tab === 'indicators' && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 size={18} /> Detailed Indicators
                </h4>
                {result.indicators.map((ind, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border ${
                      ind.signal === 'ai' ? 'bg-red-50 border-red-200' :
                      ind.signal === 'human' ? 'bg-green-50 border-green-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {signalIcon(ind.signal)}
                        <span className="text-sm font-semibold text-gray-900">{ind.label}</span>
                      </div>
                      <span className="text-sm font-mono text-gray-600">{ind.value}</span>
                    </div>
                    <p className="text-xs text-gray-500">{ind.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === 'sentences' && (
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                  <BookOpen size={18} /> Sentence-Level Analysis
                </h4>
                {result.sentenceAnalysis.map((s, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border ${aiBg(s.score)}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm text-gray-800 flex-1">{s.sentence}</p>
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        {s.score > 50 ? <Bot size={14} className="text-red-500" /> : <User size={14} className="text-green-600" />}
                        <span className={`text-sm font-bold ${aiColor(s.score)}`}>
                          {s.score}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'phrases' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Bot size={18} /> Detected AI Phrases
                </h4>
                {result.aiPhrases.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 size={32} className="text-green-500 mx-auto mb-2" />
                    <p className="text-gray-500">No common AI phrases detected!</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {result.aiPhrases.map((phrase, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full text-sm bg-red-50 text-red-700 border border-red-200">
                        &quot;{phrase}&quot;
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <AlertCircle size={14} className="inline mr-1" />
                    <strong>Note:</strong> This detector uses statistical heuristics and pattern analysis.
                    It cannot guarantee 100% accuracy. AI-generated text that has been heavily edited may appear human-written,
                    and some human writing styles may trigger false positives.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
