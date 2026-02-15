'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function BorderRadiusPage() {
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [bl, setBl] = useState(16);
  const [br, setBr] = useState(16);
  const [linked, setLinked] = useState(true);

  const setAll = (v: number) => { setTl(v); setTr(v); setBl(v); setBr(v); };

  const css = tl === tr && tr === bl && bl === br ? `border-radius: ${tl}px;` : `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;

  return (
    <ToolLayout title="Border Radius Generator" description="Visually create CSS border-radius values.">
      <div className="flex items-center justify-center py-12 mb-6 rounded-xl bg-gray-50">
        <div className="w-48 h-48 bg-primary-500" style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }} />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600 mb-4"><input type="checkbox" checked={linked} onChange={e => setLinked(e.target.checked)} /> Link all corners</label>
      {linked ? (
        <div className="flex items-center gap-3"><span className="text-sm text-gray-600 w-24">All corners</span><input type="range" min={0} max={100} value={tl} onChange={e => setAll(Number(e.target.value))} className="flex-1" /><span className="text-sm font-mono w-12 text-right">{tl}px</span></div>
      ) : (
        <div className="space-y-2">
          {[{ label: 'Top Left', v: tl, s: setTl }, { label: 'Top Right', v: tr, s: setTr }, { label: 'Bottom Left', v: bl, s: setBl }, { label: 'Bottom Right', v: br, s: setBr }].map(c => (
            <div key={c.label} className="flex items-center gap-3"><span className="text-sm text-gray-600 w-24">{c.label}</span><input type="range" min={0} max={100} value={c.v} onChange={e => c.s(Number(e.target.value))} className="flex-1" /><span className="text-sm font-mono w-12 text-right">{c.v}px</span></div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between mt-6 mb-2"><h3 className="text-sm font-semibold text-gray-700">CSS</h3><CopyButton text={css} /></div>
      <pre className="result-box">{css}</pre>
    </ToolLayout>
  );
}
