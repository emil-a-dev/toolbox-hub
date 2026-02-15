'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function HttpHeadersPage() {
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<[string, string][] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const check = async () => {
    if (!url) return;
    setLoading(true); setError(''); setHeaders(null);
    try {
      const target = url.startsWith('http') ? url : `https://${url}`;
      const res = await fetch(target, { method: 'HEAD', mode: 'no-cors' });
      const h: [string, string][] = [];
      res.headers.forEach((v, k) => h.push([k, v]));
      if (h.length === 0) { setError('No headers accessible (CORS restriction). Try with a same-origin URL or use the browser DevTools Network tab.'); }
      else setHeaders(h);
    } catch (e: any) { setError(`Failed to fetch: ${e.message}. Note: CORS may block cross-origin requests.`); }
    setLoading(false);
  };

  return (
    <ToolLayout title="HTTP Headers Checker" description="Check HTTP response headers of any URL. Note: limited by CORS in browser.">
      <div className="flex gap-3">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="tool-input flex-1" onKeyDown={(e) => e.key === 'Enter' && check()} />
        <button onClick={check} className="tool-btn" disabled={loading}>{loading ? 'Loading...' : 'Check'}</button>
      </div>
      {error && <div className="mt-4 text-sm text-orange-600 bg-orange-50 rounded-lg p-3">{error}</div>}
      {headers && (
        <div className="mt-6 rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
          {headers.map(([k, v]) => (
            <div key={k} className="flex items-start px-4 py-2 hover:bg-gray-50">
              <span className="font-mono text-sm font-medium text-primary-600 w-48 shrink-0">{k}</span>
              <span className="font-mono text-sm text-gray-700 break-all">{v}</span>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
