'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

export default function SitemapGenPage() {
  const texts = {
    en: {
      urlsLabel: 'URLs (one per line)',
      changeFrequency: 'Change Frequency',
      priority: 'Priority',
      urlCount: 'URL(s)',
      generated: 'Generated Sitemap',
    },
    ru: {
      urlsLabel: 'URL-адреса (по одному на строку)',
      changeFrequency: 'Частота обновления',
      priority: 'Приоритет',
      urlCount: 'URL',
      generated: 'Сгенерированная карта сайта',
    },
  };
  const { locale } = useLanguage();
  const tx = texts[locale];

  const [urls, setUrls] = useState('https://example.com\nhttps://example.com/about\nhttps://example.com/blog');
  const [freq, setFreq] = useState('weekly');
  const [priority, setPriority] = useState('0.8');

  const lines = urls.split('\n').map(u => u.trim()).filter(Boolean);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${lines.map(u => `  <url>
    <loc>${u}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return (
    <ToolLayout title="XML Sitemap Generator" description="Generate an XML sitemap for search engines.">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">{tx.urlsLabel}</label><textarea value={urls} onChange={e => setUrls(e.target.value)} className="tool-textarea h-32" /></div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">{tx.changeFrequency}</label><select value={freq} onChange={e => setFreq(e.target.value)} className="tool-input">{['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].map(f => <option key={f}>{f}</option>)}</select></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">{tx.priority}</label><select value={priority} onChange={e => setPriority(e.target.value)} className="tool-input">{['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1'].map(p => <option key={p}>{p}</option>)}</select></div>
      </div>
      <div className="mt-6 text-sm text-gray-500 mb-1">{lines.length} {tx.urlCount}</div>
      <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">{tx.generated}</h3><CopyButton text={xml} /></div>
      <pre className="result-box !text-xs overflow-x-auto">{xml}</pre>
    </ToolLayout>
  );
}
