'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

export default function RedirectCheckerPage() {
  const texts = {
    en: {
      check: 'Check',
      checking: 'Checking...',
      finalUrl: 'Final URL',
      status: 'Status',
      type: 'Type',
      redirected: 'Redirected',
      yes: 'Yes',
      no: 'No',
      error: 'Error',
      corsNote: 'Note: CORS restrictions may prevent checking cross-origin redirects in the browser.',
    },
    ru: {
      check: 'Проверить',
      checking: 'Проверка...',
      finalUrl: 'Итоговый URL',
      status: 'Статус',
      type: 'Тип',
      redirected: 'Перенаправлено',
      yes: 'Да',
      no: 'Нет',
      error: 'Ошибка',
      corsNote: 'Примечание: CORS может блокировать проверку перенаправлений между доменами.',
    },
  };
  const { locale } = useLanguage();
  const tx = texts[locale];

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const check = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const target = url.startsWith('http') ? url : `https://${url}`;
      const res = await fetch(target, { redirect: 'follow', mode: 'no-cors' });
      setResult(`${tx.finalUrl}: ${res.url || target}\n${tx.status}: ${res.status || 'opaque (CORS)'}\n${tx.type}: ${res.type}\n${tx.redirected}: ${res.redirected ? tx.yes : tx.no}`);
    } catch (e: any) {
      setResult(`${tx.error}: ${e.message}\n\n${tx.corsNote}`);
    }
    setLoading(false);
  };

  return (
    <ToolLayout title="Redirect Checker" description="Check URL redirects and final destination. Limited by browser CORS.">
      <div className="flex gap-3">
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" className="tool-input flex-1" onKeyDown={e => e.key === 'Enter' && check()} />
        <button onClick={check} disabled={loading} className="tool-btn">{loading ? tx.checking : tx.check}</button>
      </div>
      {result && <pre className="result-box mt-6">{result}</pre>}
    </ToolLayout>
  );
}
