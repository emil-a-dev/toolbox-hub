'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

const UNITS: Record<string, { name: string; units: { name: string; factor: number }[] }> = {
  length: { name: 'Length', units: [{ name: 'mm', factor: 0.001 },{ name: 'cm', factor: 0.01 },{ name: 'm', factor: 1 },{ name: 'km', factor: 1000 },{ name: 'inch', factor: 0.0254 },{ name: 'foot', factor: 0.3048 },{ name: 'yard', factor: 0.9144 },{ name: 'mile', factor: 1609.344 }] },
  weight: { name: 'Weight', units: [{ name: 'mg', factor: 0.001 },{ name: 'g', factor: 1 },{ name: 'kg', factor: 1000 },{ name: 'ton', factor: 1000000 },{ name: 'oz', factor: 28.3495 },{ name: 'lb', factor: 453.592 }] },
  temperature: { name: 'Temperature', units: [{ name: '°C', factor: 1 },{ name: '°F', factor: 1 },{ name: 'K', factor: 1 }] },
  speed: { name: 'Speed', units: [{ name: 'm/s', factor: 1 },{ name: 'km/h', factor: 0.277778 },{ name: 'mph', factor: 0.44704 },{ name: 'knot', factor: 0.514444 }] },
  area: { name: 'Area', units: [{ name: 'mm²', factor: 0.000001 },{ name: 'cm²', factor: 0.0001 },{ name: 'm²', factor: 1 },{ name: 'km²', factor: 1000000 },{ name: 'ft²', factor: 0.092903 },{ name: 'acre', factor: 4046.86 },{ name: 'hectare', factor: 10000 }] },
  volume: { name: 'Volume', units: [{ name: 'mL', factor: 0.001 },{ name: 'L', factor: 1 },{ name: 'm³', factor: 1000 },{ name: 'fl oz', factor: 0.0295735 },{ name: 'cup', factor: 0.236588 },{ name: 'gallon', factor: 3.78541 }] },
};

function convert(value: number, from: string, to: string, category: string): number {
  if (category === 'temperature') {
    let celsius = value;
    if (from === '°F') celsius = (value - 32) * 5/9;
    else if (from === 'K') celsius = value - 273.15;
    if (to === '°C') return celsius;
    if (to === '°F') return celsius * 9/5 + 32;
    if (to === 'K') return celsius + 273.15;
  }
  const cat = UNITS[category];
  const fromFactor = cat.units.find(u => u.name === from)?.factor || 1;
  const toFactor = cat.units.find(u => u.name === to)?.factor || 1;
  return (value * fromFactor) / toFactor;
}

export default function UnitConverterPage() {
  const [category, setCategory] = useState('length');
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState(UNITS.length.units[2].name);
  const [to, setTo] = useState(UNITS.length.units[3].name);

  const result = convert(Number(value), from, to, category);
  const units = UNITS[category].units;

  return (
    <ToolLayout title="Unit Converter" description="Convert between length, weight, temperature, speed, area, and volume units.">
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(UNITS).map(([key, val]) => (
          <button key={key} onClick={() => { setCategory(key); setFrom(val.units[0].name); setTo(val.units[1].name); }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${category === key ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{val.name}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Value</label><input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="tool-input text-lg" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">From</label><select value={from} onChange={(e) => setFrom(e.target.value)} className="tool-input">{units.map(u => <option key={u.name} value={u.name}>{u.name}</option>)}</select></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">To</label><select value={to} onChange={(e) => setTo(e.target.value)} className="tool-input">{units.map(u => <option key={u.name} value={u.name}>{u.name}</option>)}</select></div>
      </div>
      <div className="mt-6 rounded-xl bg-primary-50 border border-primary-200 p-6 text-center">
        <div className="text-sm text-primary-600 mb-1">{value} {from} =</div>
        <div className="text-3xl font-bold text-primary-800">{isNaN(result) ? '—' : result.toLocaleString('en', { maximumFractionDigits: 6 })} {to}</div>
      </div>
    </ToolLayout>
  );
}
