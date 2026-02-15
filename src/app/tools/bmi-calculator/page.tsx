'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function BmiCalcPage() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightIn, setHeightIn] = useState('');

  const bmi = (() => {
    const w = Number(weight), h = Number(height);
    if (!w || !h) return null;
    if (unit === 'metric') return w / ((h / 100) ** 2);
    const totalInches = h * 12 + Number(heightIn || 0);
    return (w / (totalInches ** 2)) * 703;
  })();

  const category = bmi ? (bmi < 18.5 ? { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-50' } : bmi < 25 ? { label: 'Normal', color: 'text-emerald-600', bg: 'bg-emerald-50' } : bmi < 30 ? { label: 'Overweight', color: 'text-orange-600', bg: 'bg-orange-50' } : { label: 'Obese', color: 'text-red-600', bg: 'bg-red-50' }) : null;

  return (
    <ToolLayout title="BMI Calculator" description="Calculate your Body Mass Index (BMI) and see your weight category.">
      <div className="max-w-md">
        <div className="flex gap-2 mb-6">
          {(['metric', 'imperial'] as const).map(u => (
            <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${unit === u ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{u === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/ft)'}</button>
          ))}
        </div>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label><input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="tool-input" placeholder={unit === 'metric' ? '70' : '154'} /></div>
          <div className="flex gap-3">
            <div className="flex-1"><label className="block text-sm font-medium text-gray-700 mb-1">Height ({unit === 'metric' ? 'cm' : 'feet'})</label><input type="number" value={height} onChange={e => setHeight(e.target.value)} className="tool-input" placeholder={unit === 'metric' ? '175' : '5'} /></div>
            {unit === 'imperial' && <div className="w-24"><label className="block text-sm font-medium text-gray-700 mb-1">Inches</label><input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} className="tool-input" placeholder="9" /></div>}
          </div>
        </div>
        {bmi && category && (
          <div className={`mt-6 rounded-xl ${category.bg} p-6 text-center animate-fade-in`}>
            <div className="text-sm text-gray-600 mb-1">Your BMI</div>
            <div className={`text-4xl font-bold ${category.color} mb-2`}>{bmi.toFixed(1)}</div>
            <div className={`text-lg font-semibold ${category.color}`}>{category.label}</div>
          </div>
        )}
        <div className="mt-6 text-sm text-gray-500 space-y-1">
          <div>• Underweight: &lt; 18.5</div><div>• Normal: 18.5 – 24.9</div><div>• Overweight: 25 – 29.9</div><div>• Obese: ≥ 30</div>
        </div>
      </div>
    </ToolLayout>
  );
}
