'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

export default function RobotsTxtPage() {
  const texts = {
    en: {
      remove: 'Remove',
      allowLabel: 'Allow (one per line)',
      disallowLabel: 'Disallow (one per line)',
      addRule: '+ Add Rule',
      sitemapUrl: 'Sitemap URL',
      generated: 'Generated robots.txt',
    },
    ru: {
      remove: 'Удалить',
      allowLabel: 'Разрешить (по одному на строку)',
      disallowLabel: 'Запретить (по одному на строку)',
      addRule: '+ Добавить правило',
      sitemapUrl: 'URL карты сайта',
      generated: 'Сгенерированный robots.txt',
    },
  };
  const { locale } = useLanguage();
  const tx = texts[locale];

  const [sitemap, setSitemap] = useState('');
  const [rules, setRules] = useState([
    { agent: '*', allow: ['/'], disallow: ['/admin/', '/private/'] },
  ]);

  const addRule = () => setRules([...rules, { agent: '*', allow: ['/'], disallow: [] }]);

  const output = rules.map(r =>
    `User-agent: ${r.agent}\n` +
    r.allow.map(p => `Allow: ${p}`).join('\n') +
    (r.allow.length && r.disallow.length ? '\n' : '') +
    r.disallow.map(p => `Disallow: ${p}`).join('\n')
  ).join('\n\n') + (sitemap ? `\n\nSitemap: ${sitemap}` : '');

  return (
    <ToolLayout title="robots.txt Generator" description="Generate a robots.txt file for your website.">
      {rules.map((rule, ri) => (
        <div key={ri} className="rounded-xl border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><label className="text-sm text-gray-600">User-agent:</label><input type="text" value={rule.agent} onChange={e => { const r = [...rules]; r[ri].agent = e.target.value; setRules(r); }} className="tool-input !w-40" /></div>
            {rules.length > 1 && <button onClick={() => setRules(rules.filter((_, i) => i !== ri))} className="text-sm text-red-500 hover:text-red-700">{tx.remove}</button>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-gray-600 block mb-1">{tx.allowLabel}</label><textarea value={rule.allow.join('\n')} onChange={e => { const r = [...rules]; r[ri].allow = e.target.value.split('\n'); setRules(r); }} className="tool-textarea !h-20" /></div>
            <div><label className="text-sm text-gray-600 block mb-1">{tx.disallowLabel}</label><textarea value={rule.disallow.join('\n')} onChange={e => { const r = [...rules]; r[ri].disallow = e.target.value.split('\n'); setRules(r); }} className="tool-textarea !h-20" /></div>
          </div>
        </div>
      ))}
      <div className="flex gap-3 mb-6"><button onClick={addRule} className="tool-btn-secondary">{tx.addRule}</button></div>
      <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">{tx.sitemapUrl}</label><input type="text" value={sitemap} onChange={e => setSitemap(e.target.value)} className="tool-input" placeholder="https://example.com/sitemap.xml" /></div>
      <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">{tx.generated}</h3><CopyButton text={output} /></div>
      <pre className="result-box">{output}</pre>
    </ToolLayout>
  );
}
