'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

const NATO: Record<string, string> = { A: 'Alfa', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliet', K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee', Z: 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Niner' };

export default function NatoPhoneticPage() {
  const [input, setInput] = useState('');

  const result = input.toUpperCase().split('').map(c => {
    if (c === ' ') return '(space)';
    return NATO[c] || c;
  });

  return (
    <ToolLayout title="NATO Phonetic Alphabet" description="Convert text to NATO phonetic alphabet representation.">
      <input type="text" value={input} onChange={e => setInput(e.target.value)} className="tool-input text-lg" placeholder="Enter text..." />
      {input && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">NATO Phonetic</h3><CopyButton text={result.filter(r => r !== '(space)').join(' ')} /></div>
          <div className="flex flex-wrap gap-2">
            {input.toUpperCase().split('').map((c, i) => (
              <div key={i} className={`rounded-lg px-3 py-2 text-center ${c === ' ' ? 'bg-gray-100' : 'bg-primary-50 border border-primary-200'}`}>
                <div className="text-lg font-bold text-primary-700">{c === ' ' ? '␣' : c}</div>
                <div className="text-xs text-primary-600">{result[i]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-8"><h3 className="text-sm font-semibold text-gray-700 mb-3">Full NATO Alphabet</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2">
          {Object.entries(NATO).map(([k, v]) => (
            <div key={k} className="rounded-lg bg-gray-50 p-2 text-center"><div className="text-sm font-bold text-gray-800">{k}</div><div className="text-xs text-gray-500">{v}</div></div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
