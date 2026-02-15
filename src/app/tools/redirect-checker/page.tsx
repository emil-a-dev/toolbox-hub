'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function RedirectCheckerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const check = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const target = url.startsWith('http') ? url : `https://${url}`;
      const res = await fetch(target, { redirect: 'follow', mode: 'no-cors' });
      setResult(`Final URL: ${res.url || target}\nStatus: ${res.status || 'opaque (CORS)'}\nType: ${res.type}\nRedirected: ${res.redirected ? 'Yes' : 'No'}`);
    } catch (e: any) {
      setResult(`Error: ${e.message}\n\nNote: CORS restrictions may prevent checking cross-origin redirects in the browser.`);
    }
    setLoading(false);
  };

  return (
    <ToolLayout title="Redirect Checker" description="Check URL redirects and final destination. Limited by browser CORS.">
      <div className="flex gap-3">
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" className="tool-input flex-1" onKeyDown={e => e.key === 'Enter' && check()} />
        <button onClick={check} disabled={loading} className="tool-btn">{loading ? 'Checking...' : 'Check'}</button>
      </div>
      {result && <pre className="result-box mt-6">{result}</pre>}
    </ToolLayout>
  );
}
