'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

function decodeJWT(token: string): { header: any; payload: any; signature: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return { header, payload, signature: parts[2] };
  } catch { return null; }
}

function formatTimestamp(ts: number): string {
  return new Date(ts * 1000).toLocaleString() + ' (' + new Date(ts * 1000).toISOString() + ')';
}

export default function JwtDecoderPage() {
  const [token, setToken] = useState('');
  const decoded = token ? decodeJWT(token) : null;
  const isExpired = decoded?.payload?.exp ? decoded.payload.exp * 1000 < Date.now() : false;

  return (
    <ToolLayout title="JWT Decoder" description="Decode and inspect JSON Web Tokens (JWT). Nothing is sent to any server.">
      <textarea value={token} onChange={(e) => setToken(e.target.value.trim())} placeholder="Paste your JWT token here (eyJhbG...)" className="tool-textarea font-mono text-xs" />
      {token && !decoded && <div className="mt-4 text-red-600 text-sm">⚠ Invalid JWT format. Must have 3 parts separated by dots.</div>}
      {decoded && (
        <div className="space-y-4 mt-6">
          {isExpired && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">⚠ This token is expired!</div>}
          <div>
            <div className="flex items-center justify-between mb-1"><h3 className="text-sm font-semibold text-gray-700">Header</h3><CopyButton text={JSON.stringify(decoded.header, null, 2)} /></div>
            <div className="result-box !text-blue-700">{JSON.stringify(decoded.header, null, 2)}</div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1"><h3 className="text-sm font-semibold text-gray-700">Payload</h3><CopyButton text={JSON.stringify(decoded.payload, null, 2)} /></div>
            <div className="result-box !text-purple-700">{JSON.stringify(decoded.payload, null, 2)}</div>
          </div>
          {(decoded.payload.iat || decoded.payload.exp || decoded.payload.nbf) && (
            <div className="rounded-xl bg-gray-50 p-4 space-y-2 text-sm">
              {decoded.payload.iat && <div><span className="font-medium text-gray-700">Issued At:</span> {formatTimestamp(decoded.payload.iat)}</div>}
              {decoded.payload.exp && <div><span className="font-medium text-gray-700">Expires:</span> {formatTimestamp(decoded.payload.exp)}</div>}
              {decoded.payload.nbf && <div><span className="font-medium text-gray-700">Not Before:</span> {formatTimestamp(decoded.payload.nbf)}</div>}
            </div>
          )}
          <div><h3 className="text-sm font-semibold text-gray-700 mb-1">Signature</h3><div className="result-box !text-red-600 text-xs">{decoded.signature}</div></div>
        </div>
      )}
    </ToolLayout>
  );
}
