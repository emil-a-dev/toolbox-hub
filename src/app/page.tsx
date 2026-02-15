'use client';

import { useState, useMemo } from 'react';
import {
  Type, CaseSensitive, FileText, GitCompare, Eye,
  Braces, Binary, Link, Hash, Fingerprint,
  KeyRound, ShieldCheck,
  QrCode, Palette, Clock,
  Volume2, Replace, Globe, ArrowLeftRight, Smile,
  Code, FileCode, Regex, Key, Timer, Database, FileDiff,
  Wifi, FileSearch, Shield,
  Scale, Calculator, Percent, Heart, DollarSign,
  Image, Download, Crop, Star, FileUp,
  Dice1, Shuffle,
  Tags, Bot, Map, ExternalLink, Layout, Layers,
  Heading, Search, BookOpen, Megaphone, BarChart2, Quote,
  PaintBucket, Square, Circle, Grid3X3, Sparkles, Zap, Contrast,
  MessageSquare, RotateCcw, Lock, Radio, AtSign,
  TrendingUp, HardDrive, Columns,
  Receipt, CheckSquare, Wallet, Users,
  Keyboard, MousePointer, Monitor, UserCheck, SmilePlus,
  FileJson, Table, FileType, Brackets,
  Search as SearchIcon, X,
} from 'lucide-react';
import { ToolCard } from '@/components/ToolCard';
import { useLanguage } from '@/components/LanguageProvider';
import type { TranslationKey } from '@/lib/translations';
import type { LucideIcon } from 'lucide-react';

interface ToolDef {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

interface CategoryDef {
  id: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  tools: ToolDef[];
}

const categories: CategoryDef[] = [
  {
    id: 'text',
    titleKey: 'cat.text',
    descKey: 'cat.text.desc',
    tools: [
      { title: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs', href: '/tools/word-counter', icon: Type },
      { title: 'Case Converter', description: 'Convert text to uppercase, lowercase, title case & more', href: '/tools/case-converter', icon: CaseSensitive },
      { title: 'Lorem Ipsum Generator', description: 'Generate placeholder text for your designs', href: '/tools/lorem-ipsum-generator', icon: FileText },
      { title: 'Text Diff', description: 'Compare two texts and see the differences', href: '/tools/text-diff', icon: GitCompare },
      { title: 'Markdown Preview', description: 'Write Markdown and see live preview', href: '/tools/markdown-preview', icon: Eye },
      { title: 'Text to Speech', description: 'Convert text to speech with different voices', href: '/tools/text-to-speech', icon: Volume2 },
      { title: 'Find & Replace', description: 'Find and replace text with regex support', href: '/tools/find-replace', icon: Replace },
      { title: 'Slug Generator', description: 'Generate URL-friendly slugs from text', href: '/tools/slug-generator', icon: Globe },
      { title: 'Text Reverser', description: 'Reverse text, words, or sentences', href: '/tools/text-reverser', icon: ArrowLeftRight },
      { title: 'Character Map', description: 'Browse and copy special Unicode characters', href: '/tools/character-map', icon: Hash },
      { title: 'Emoji Picker', description: 'Search and copy emojis quickly', href: '/tools/emoji-picker', icon: Smile },
    ],
  },
  {
    id: 'dev',
    titleKey: 'cat.dev',
    descKey: 'cat.dev.desc',
    tools: [
      { title: 'JSON Formatter', description: 'Format, validate, and minify JSON data', href: '/tools/json-formatter', icon: Braces, badge: 'Popular' },
      { title: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings', href: '/tools/base64-encoder', icon: Binary },
      { title: 'URL Encoder/Decoder', description: 'Encode and decode URL components', href: '/tools/url-encoder', icon: Link },
      { title: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes', href: '/tools/hash-generator', icon: Hash },
      { title: 'UUID Generator', description: 'Generate random UUIDs (v4)', href: '/tools/uuid-generator', icon: Fingerprint },
      { title: 'HTML Prettifier', description: 'Format and beautify HTML code', href: '/tools/html-prettifier', icon: Code },
      { title: 'CSS Minifier', description: 'Minify and beautify CSS code', href: '/tools/css-minifier', icon: FileCode },
      { title: 'Regex Tester', description: 'Test regular expressions with live matches', href: '/tools/regex-tester', icon: Regex },
      { title: 'JWT Decoder', description: 'Decode and inspect JWT tokens', href: '/tools/jwt-decoder', icon: Key },
      { title: 'Cron Parser', description: 'Parse and explain cron expressions', href: '/tools/cron-parser', icon: Timer },
      { title: 'SQL Formatter', description: 'Format and beautify SQL queries', href: '/tools/sql-formatter', icon: Database },
      { title: 'Code Diff', description: 'Compare two code snippets side by side', href: '/tools/code-diff', icon: FileDiff },
    ],
  },
  {
    id: 'security',
    titleKey: 'cat.security',
    descKey: 'cat.security.desc',
    tools: [
      { title: 'Password Generator', description: 'Generate strong, random passwords', href: '/tools/password-generator', icon: KeyRound, badge: 'Popular' },
      { title: 'Password Strength Checker', description: 'Check how strong your password is', href: '/tools/password-strength', icon: ShieldCheck },
      { title: 'IP Address Info', description: 'View your IP address and network info', href: '/tools/ip-address', icon: Wifi },
      { title: 'HTTP Headers Checker', description: 'View HTTP response headers for any URL', href: '/tools/http-headers', icon: FileSearch },
      { title: 'Privacy Policy Generator', description: 'Generate a privacy policy for your site', href: '/tools/privacy-policy', icon: Shield },
    ],
  },
  {
    id: 'web',
    titleKey: 'cat.web',
    descKey: 'cat.web.desc',
    tools: [
      { title: 'Meta Tag Generator', description: 'Generate HTML meta tags for SEO', href: '/tools/meta-tag-generator', icon: Tags },
      { title: 'Robots.txt Generator', description: 'Create robots.txt for search engines', href: '/tools/robots-txt-generator', icon: Bot },
      { title: 'Sitemap Generator', description: 'Generate XML sitemaps for your website', href: '/tools/sitemap-generator', icon: Map },
      { title: 'Redirect Checker', description: 'Check URL redirect chains', href: '/tools/redirect-checker', icon: ExternalLink },
      { title: 'Open Graph Preview', description: 'Preview social media sharing cards', href: '/tools/og-preview', icon: Layout },
      { title: 'Structured Data Generator', description: 'Generate JSON-LD structured data', href: '/tools/structured-data', icon: Layers },
    ],
  },
  {
    id: 'converters',
    titleKey: 'cat.converters',
    descKey: 'cat.converters.desc',
    tools: [
      { title: 'Unit Converter', description: 'Convert between length, weight, temperature & more', href: '/tools/unit-converter', icon: Scale },
      { title: 'Number Base Converter', description: 'Convert between binary, hex, decimal, octal', href: '/tools/number-base', icon: Binary },
      { title: 'Percentage Calculator', description: 'Calculate percentages easily', href: '/tools/percentage-calculator', icon: Percent },
      { title: 'BMI Calculator', description: 'Calculate your Body Mass Index', href: '/tools/bmi-calculator', icon: Heart },
      { title: 'Tip Calculator', description: 'Calculate tips and split bills', href: '/tools/tip-calculator', icon: DollarSign },
    ],
  },
  {
    id: 'media',
    titleKey: 'cat.media',
    descKey: 'cat.media.desc',
    tools: [
      { title: 'Image to Base64', description: 'Convert images to Base64 data URIs', href: '/tools/image-to-base64', icon: Image },
      { title: 'SVG to PNG', description: 'Convert SVG files to PNG images', href: '/tools/svg-to-png', icon: Download },
      { title: 'Image Compressor', description: 'Compress images in your browser', href: '/tools/image-compressor', icon: Crop },
      { title: 'Favicon Generator', description: 'Generate favicons from images', href: '/tools/favicon-generator', icon: Star },
      { title: 'PDF Page Counter', description: 'Count pages in PDF files', href: '/tools/pdf-page-counter', icon: FileUp },
    ],
  },
  {
    id: 'content',
    titleKey: 'cat.content',
    descKey: 'cat.content.desc',
    tools: [
      { title: 'Title Case Converter', description: 'Capitalize titles following proper rules', href: '/tools/title-case', icon: Heading },
      { title: 'Plagiarism Hash', description: 'Generate content fingerprints for plagiarism checking', href: '/tools/plagiarism-hash', icon: Search },
      { title: 'Readability Score', description: 'Calculate Flesch-Kincaid readability score', href: '/tools/readability-score', icon: BookOpen },
      { title: 'Headline Analyzer', description: 'Analyze and score your headlines', href: '/tools/headline-analyzer', icon: Megaphone },
      { title: 'Word Frequency Counter', description: 'Count word frequency in any text', href: '/tools/word-frequency', icon: BarChart2 },
      { title: 'Random Quote Generator', description: 'Get random inspiring quotes', href: '/tools/random-quote', icon: Quote },
      { title: 'Plagiarism Checker', description: 'Analyze text for originality and duplicate fragments', href: '/tools/plagiarism-checker', icon: ShieldCheck },
      { title: 'AI Content Detector', description: 'Detect AI-generated text with statistical analysis', href: '/tools/ai-content-detector', icon: Bot },
    ],
  },
  {
    id: 'design',
    titleKey: 'cat.design',
    descKey: 'cat.design.desc',
    tools: [
      { title: 'Color Picker', description: 'Pick colors and convert HEX, RGB, HSL', href: '/tools/color-picker', icon: Palette, badge: 'Popular' },
      { title: 'Gradient Generator', description: 'Create beautiful CSS gradients', href: '/tools/gradient-generator', icon: PaintBucket },
      { title: 'Box Shadow Generator', description: 'Generate CSS box shadows visually', href: '/tools/box-shadow', icon: Square },
      { title: 'Border Radius Generator', description: 'Create custom border radius values', href: '/tools/border-radius', icon: Circle },
      { title: 'CSS Grid Generator', description: 'Build CSS grid layouts visually', href: '/tools/css-grid', icon: Grid3X3 },
      { title: 'Glassmorphism Generator', description: 'Create frosted glass CSS effects', href: '/tools/glassmorphism', icon: Sparkles },
      { title: 'Neumorphism Generator', description: 'Create soft UI / neumorphic effects', href: '/tools/neumorphism', icon: Zap },
      { title: 'Font Pairing', description: 'Find beautiful font combinations', href: '/tools/font-pairing', icon: Type },
      { title: 'Contrast Checker', description: 'Check WCAG color contrast ratios', href: '/tools/contrast-checker', icon: Contrast },
    ],
  },
  {
    id: 'crypto',
    titleKey: 'cat.crypto',
    descKey: 'cat.crypto.desc',
    tools: [
      { title: 'Morse Code', description: 'Translate text to Morse code and back', href: '/tools/morse-code', icon: MessageSquare },
      { title: 'ROT13 Encoder', description: 'Apply ROT13 letter substitution cipher', href: '/tools/rot13', icon: RotateCcw },
      { title: 'Caesar Cipher', description: 'Encrypt/decrypt with Caesar shift cipher', href: '/tools/caesar-cipher', icon: Lock },
      { title: 'Binary Translator', description: 'Convert text to binary and back', href: '/tools/binary-translator', icon: Binary },
      { title: 'NATO Phonetic', description: 'Convert text to NATO phonetic alphabet', href: '/tools/nato-phonetic', icon: Radio },
      { title: 'Punycode Converter', description: 'Encode/decode international domain names', href: '/tools/punycode', icon: AtSign },
    ],
  },
  {
    id: 'science',
    titleKey: 'cat.science',
    descKey: 'cat.science.desc',
    tools: [
      { title: 'Scientific Calculator', description: 'Advanced calculator with scientific functions', href: '/tools/scientific-calculator', icon: Calculator },
      { title: 'Matrix Calculator', description: 'Perform matrix operations', href: '/tools/matrix-calculator', icon: Grid3X3 },
      { title: 'Statistics Calculator', description: 'Calculate mean, median, mode, std deviation', href: '/tools/statistics-calculator', icon: TrendingUp },
      { title: 'Aspect Ratio Calculator', description: 'Calculate and resize aspect ratios', href: '/tools/aspect-ratio', icon: Crop },
      { title: 'Byte Converter', description: 'Convert between bytes, KB, MB, GB, TB', href: '/tools/byte-converter', icon: HardDrive },
      { title: 'Roman Numeral Converter', description: 'Convert between Roman and Arabic numerals', href: '/tools/roman-numeral', icon: Columns },
    ],
  },
  {
    id: 'productivity',
    titleKey: 'cat.productivity',
    descKey: 'cat.productivity.desc',
    tools: [
      { title: 'Invoice Generator', description: 'Create and print professional invoices', href: '/tools/invoice-generator', icon: Receipt },
      { title: 'Lorem Picsum', description: 'Generate placeholder images with custom sizes', href: '/tools/lorem-picsum', icon: Image },
      { title: 'Kanban Board', description: 'Simple drag & drop task board', href: '/tools/kanban-board', icon: Layout },
      { title: 'Habit Tracker', description: 'Track daily habits with visual calendar', href: '/tools/habit-tracker', icon: CheckSquare },
      { title: 'Expense Tracker', description: 'Track expenses by category', href: '/tools/expense-tracker', icon: Wallet },
      { title: 'Meeting Cost Calculator', description: 'Calculate meeting cost in real-time', href: '/tools/meeting-cost', icon: Users },
      { title: 'Presentation Generator', description: 'Generate presentations from a topic with templates', href: '/tools/presentation-generator', icon: Layers },
    ],
  },
  {
    id: 'fun',
    titleKey: 'cat.fun',
    descKey: 'cat.fun.desc',
    tools: [
      { title: 'Random Number Generator', description: 'Generate random numbers with options', href: '/tools/random-number', icon: Shuffle },
      { title: 'Coin Flip & Dice', description: 'Flip coins and roll dice', href: '/tools/coin-dice', icon: Dice1 },
      { title: 'Typing Speed Test', description: 'Test your typing speed (WPM)', href: '/tools/typing-speed-test', icon: Keyboard },
      { title: 'Reaction Time Test', description: 'Test your reaction time in milliseconds', href: '/tools/reaction-time-test', icon: MousePointer },
      { title: 'Screen Resolution', description: 'Detect screen and viewport dimensions', href: '/tools/screen-resolution', icon: Monitor },
      { title: 'Fake Data Generator', description: 'Generate realistic test data', href: '/tools/fake-data-generator', icon: UserCheck },
      { title: 'WiFi QR Generator', description: 'Create QR codes for WiFi sharing', href: '/tools/wifi-qr-generator', icon: Wifi },
      { title: 'Meme Text Generator', description: 'Add meme text to images', href: '/tools/meme-text-generator', icon: SmilePlus },
    ],
  },
  {
    id: 'data',
    titleKey: 'cat.data',
    descKey: 'cat.data.desc',
    tools: [
      { title: 'JSON to CSV', description: 'Convert JSON arrays to CSV format', href: '/tools/json-to-csv', icon: Table },
      { title: 'CSV to JSON', description: 'Convert CSV data to JSON arrays', href: '/tools/csv-to-json', icon: FileJson },
      { title: 'JSON to YAML', description: 'Convert JSON to YAML and back', href: '/tools/json-to-yaml', icon: FileType },
      { title: 'JSON to TypeScript', description: 'Generate TypeScript interfaces from JSON', href: '/tools/json-to-typescript', icon: Brackets },
      { title: 'HTML Entity Encoder', description: 'Encode and decode HTML entities', href: '/tools/html-entity', icon: Code },
      { title: 'Markdown Table Generator', description: 'Create Markdown tables visually', href: '/tools/markdown-table', icon: Table },
    ],
  },
  {
    id: 'utility',
    titleKey: 'cat.utility',
    descKey: 'cat.utility.desc',
    tools: [
      { title: 'QR Code Generator', description: 'Generate QR codes for any text or URL', href: '/tools/qr-code-generator', icon: QrCode, badge: 'Popular' },
      { title: 'Timestamp Converter', description: 'Convert between Unix timestamps and dates', href: '/tools/timestamp-converter', icon: Clock },
    ],
  },
];

const totalTools = categories.reduce((a, c) => a + c.tools.length, 0);

export default function HomePage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter(
          (tool) =>
            tool.title.toLowerCase().includes(q) ||
            tool.description.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [query]);

  const matchCount = filtered.reduce((a, c) => a + c.tools.length, 0);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
          {t('hero.title1')}
          <span className="bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent">
            {t('hero.title2')}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8">
          {t('hero.subtitle', { count: totalTools })}
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm mb-10">
          <span className="badge bg-emerald-50 text-emerald-700 !px-3 !py-1.5">{t('hero.badge.free')}</span>
          <span className="badge bg-blue-50 text-blue-700 !px-3 !py-1.5">{t('hero.badge.client')}</span>
          <span className="badge bg-purple-50 text-purple-700 !px-3 !py-1.5">{t('hero.badge.noReg')}</span>
          <span className="badge bg-orange-50 text-orange-700 !px-3 !py-1.5">{t('hero.badge.pwa')}</span>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto relative">
          <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {query && (
          <p className="mt-3 text-sm text-gray-500">
            {matchCount === 0
              ? t('search.noResults', { query })
              : t('search.results', { count: matchCount })}
          </p>
        )}
      </section>

      {/* Quick Nav (hidden during search) */}
      {!query && (
        <section className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700 transition-colors"
              >
                {t(cat.titleKey)}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {filtered.map((cat) => (
        <section key={cat.id} id={cat.id} className="mb-14 scroll-mt-20">
          <div className="mb-6">
            <h2 className="section-title">{t(cat.titleKey)}</h2>
            <p className="text-gray-500 -mt-4 mb-6">{t(cat.descKey)}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.tools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </section>
      ))}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'ToolBox Hub',
            url: 'https://toolboxhub.vercel.app',
            description: `${totalTools}+ free online tools for developers, designers, writers and everyone`,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
    </div>
  );
}
