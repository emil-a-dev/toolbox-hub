'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

const SYMBOLS: { cat: string; chars: string[] }[] = [
  { cat: 'Arrows', chars: ['←','→','↑','↓','↔','↕','⇐','⇒','⇑','⇓','⇔','➜','➤','▶','◀','▲','▼'] },
  { cat: 'Math', chars: ['±','×','÷','≠','≈','≤','≥','∞','∑','∏','√','∫','∂','∆','∇','°','‰','⅓','⅔','¼','½','¾'] },
  { cat: 'Currency', chars: ['$','€','£','¥','₽','₿','¢','₹','₩','₺','₴','₸','₮'] },
  { cat: 'Stars & Shapes', chars: ['★','☆','✦','✧','◆','◇','●','○','■','□','▪','▫','♠','♣','♥','♦','✶','✴'] },
  { cat: 'Legal & Marks', chars: ['©','®','™','§','¶','†','‡','•','…','‐','–','—','¦','‖'] },
  { cat: 'Music & Misc', chars: ['♩','♪','♫','♬','♭','♮','♯','⌘','⌥','⌫','⏎','⌨','☎','✉','✂','✏','✓','✗','✕'] },
  { cat: 'Weather', chars: ['☀','☁','☂','☃','❄','⚡','☔','⛅','🌙','⭐'] },
  { cat: 'Punctuation', chars: ['\u00AB','\u00BB','\u2039','\u203A','\u201E','\u201C','\u201D','\u2018','\u2019','\u201A','\u00A1','\u00BF','\u00B7','\u2025'] },
];

export default function CharacterMapPage() {
  const [copied, setCopied] = useState('');

  const copy = (char: string) => {
    navigator.clipboard.writeText(char);
    setCopied(char);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <ToolLayout title="Character Map" description="Browse and copy special characters, symbols, arrows, and more.">
      {copied && <div className="fixed top-20 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm shadow-lg z-50 animate-fade-in">Copied: {copied}</div>}
      <div className="space-y-8">
        {SYMBOLS.map((group) => (
          <div key={group.cat}>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{group.cat}</h3>
            <div className="flex flex-wrap gap-2">
              {group.chars.map((ch) => (
                <button key={ch} onClick={() => copy(ch)} className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-xl hover:bg-primary-50 hover:border-primary-300 transition-all hover:scale-110 active:scale-95">{ch}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
