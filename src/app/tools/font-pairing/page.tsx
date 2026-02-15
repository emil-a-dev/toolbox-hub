'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

const pairings = [
  { heading: 'Playfair Display', body: 'Source Sans Pro', hStyle: 'serif', bStyle: 'sans-serif', hUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap', bUrl: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap' },
  { heading: 'Montserrat', body: 'Merriweather', hStyle: 'sans-serif', bStyle: 'serif', hUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap', bUrl: 'https://fonts.googleapis.com/css2?family=Merriweather&display=swap' },
  { heading: 'Oswald', body: 'Lato', hStyle: 'sans-serif', bStyle: 'sans-serif', hUrl: 'https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap', bUrl: 'https://fonts.googleapis.com/css2?family=Lato&display=swap' },
  { heading: 'Raleway', body: 'Roboto', hStyle: 'sans-serif', bStyle: 'sans-serif', hUrl: 'https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap', bUrl: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap' },
  { heading: 'Lora', body: 'Open Sans', hStyle: 'serif', bStyle: 'sans-serif', hUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@700&display=swap', bUrl: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap' },
  { heading: 'Poppins', body: 'Inter', hStyle: 'sans-serif', bStyle: 'sans-serif', hUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap', bUrl: 'https://fonts.googleapis.com/css2?family=Inter&display=swap' },
  { heading: 'DM Serif Display', body: 'DM Sans', hStyle: 'serif', bStyle: 'sans-serif', hUrl: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap', bUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans&display=swap' },
  { heading: 'Space Grotesk', body: 'Space Mono', hStyle: 'sans-serif', bStyle: 'monospace', hUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap', bUrl: 'https://fonts.googleapis.com/css2?family=Space+Mono&display=swap' },
];

export default function FontPairingPage() {
  const [selected, setSelected] = useState(0);
  const pair = pairings[selected];

  return (
    <ToolLayout title="Font Pairing Suggester" description="Find beautiful Google Font pairings for your designs.">
      <link href={pair.hUrl} rel="stylesheet" />
      <link href={pair.bUrl} rel="stylesheet" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-xl border border-gray-200 p-8">
          <h2 style={{ fontFamily: `'${pair.heading}', ${pair.hStyle}` }} className="text-4xl mb-4 text-gray-900">The quick brown fox</h2>
          <p style={{ fontFamily: `'${pair.body}', ${pair.bStyle}` }} className="text-lg text-gray-600 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
          <p style={{ fontFamily: `'${pair.body}', ${pair.bStyle}` }} className="text-sm text-gray-500">
            The five boxing wizards jump quickly. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!
          </p>
          <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
            <div>Heading: <strong>{pair.heading}</strong> ({pair.hStyle})</div>
            <div>Body: <strong>{pair.body}</strong> ({pair.bStyle})</div>
          </div>
        </div>
        <div className="space-y-2">
          {pairings.map((p, i) => (
            <button key={i} onClick={() => setSelected(i)} className={`w-full text-left px-4 py-3 rounded-lg transition-all ${selected === i ? 'bg-primary-50 border-2 border-primary-500' : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'}`}>
              <div className="text-sm font-semibold text-gray-800">{p.heading}</div>
              <div className="text-xs text-gray-500">+ {p.body}</div>
            </button>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
