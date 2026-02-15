import { MetadataRoute } from 'next';

const BASE_URL = 'https://toolboxhub.vercel.app';

const tools = [
  // Text Tools
  'word-counter', 'case-converter', 'lorem-ipsum-generator', 'text-diff', 'markdown-preview',
  'text-to-speech', 'find-replace', 'slug-generator', 'text-reverser', 'character-map', 'emoji-picker',
  // Developer Tools
  'json-formatter', 'base64-encoder', 'url-encoder', 'hash-generator', 'uuid-generator',
  'html-prettifier', 'css-minifier', 'regex-tester', 'jwt-decoder', 'cron-parser', 'sql-formatter', 'code-diff',
  // Security & Privacy
  'password-generator', 'password-strength', 'ip-address', 'http-headers', 'privacy-policy',
  // Web & SEO
  'meta-tag-generator', 'robots-txt-generator', 'sitemap-generator', 'redirect-checker', 'og-preview', 'structured-data',
  // Math & Converters
  'unit-converter', 'number-base', 'percentage-calculator', 'bmi-calculator', 'tip-calculator',
  // Media & Files
  'image-to-base64', 'svg-to-png', 'image-compressor', 'favicon-generator', 'pdf-page-counter',
  // Content & Writing
  'title-case', 'plagiarism-hash', 'readability-score', 'headline-analyzer', 'word-frequency', 'random-quote',
  // Design & CSS
  'color-picker', 'gradient-generator', 'box-shadow', 'border-radius', 'css-grid',
  'glassmorphism', 'neumorphism', 'font-pairing', 'contrast-checker',
  // Crypto & Encoding
  'morse-code', 'rot13', 'caesar-cipher', 'binary-translator', 'nato-phonetic', 'punycode',
  // Math & Science
  'scientific-calculator', 'matrix-calculator', 'statistics-calculator', 'aspect-ratio', 'byte-converter', 'roman-numeral',
  // Productivity
  'invoice-generator', 'lorem-picsum', 'kanban-board', 'habit-tracker', 'expense-tracker', 'meeting-cost',
  // Fun & Games
  'random-number', 'coin-dice', 'typing-speed-test', 'reaction-time-test', 'screen-resolution',
  'fake-data-generator', 'wifi-qr-generator', 'meme-text-generator',
  // Data Converters
  'json-to-csv', 'csv-to-json', 'json-to-yaml', 'json-to-typescript', 'html-entity', 'markdown-table',
  // Utilities
  'qr-code-generator', 'timestamp-converter',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...['about', 'privacy', 'terms'].map((page) => ({
      url: `${BASE_URL}/${page}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
    ...toolPages,
  ];
}
