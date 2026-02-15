'use client';

import { useState, useEffect } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

interface Habit { id: string; name: string; dates: string[]; }

export default function HabitTrackerPage() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('habits');
      return saved ? JSON.parse(saved) : [{ id: '1', name: 'Exercise', dates: [] }, { id: '2', name: 'Reading', dates: [] }, { id: '3', name: 'Meditation', dates: [] }];
    }
    return [];
  });
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => { localStorage.setItem('habits', JSON.stringify(habits)); }, [habits]);

  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits([...habits, { id: Date.now().toString(), name: newHabit, dates: [] }]);
    setNewHabit('');
  };

  const toggleDay = (habitId: string, date: string) => {
    setHabits(habits.map(h => h.id === habitId ? { ...h, dates: h.dates.includes(date) ? h.dates.filter(d => d !== date) : [...h.dates, date] } : h));
  };

  const deleteHabit = (id: string) => setHabits(habits.filter(h => h.id !== id));

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    return { date: d.toISOString().split('T')[0], label: d.toLocaleDateString('en', { weekday: 'short' }), day: d.getDate() };
  });

  return (
    <ToolLayout title="Habit Tracker" description="Track your daily habits with a simple visual tracker. Data saved in your browser.">
      <div className="flex gap-3 mb-6">
        <input type="text" value={newHabit} onChange={e => setNewHabit(e.target.value)} className="tool-input flex-1" placeholder="New habit..." onKeyDown={e => e.key === 'Enter' && addHabit()} />
        <button onClick={addHabit} className="tool-btn">Add</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr><th className="text-left text-sm text-gray-500 pb-3 pr-4">Habit</th>{last7.map(d => <th key={d.date} className="text-center text-xs text-gray-500 pb-3 w-12"><div>{d.label}</div><div className="font-bold text-gray-700">{d.day}</div></th>)}<th className="w-10"></th></tr>
          </thead>
          <tbody>
            {habits.map(habit => {
              const streak = last7.filter(d => habit.dates.includes(d.date)).length;
              return (
                <tr key={habit.id} className="border-t border-gray-100">
                  <td className="py-3 pr-4"><span className="text-sm font-medium text-gray-800">{habit.name}</span><span className="text-xs text-gray-400 ml-2">{streak}/7</span></td>
                  {last7.map(d => (
                    <td key={d.date} className="text-center py-3">
                      <button onClick={() => toggleDay(habit.id, d.date)} className={`w-8 h-8 rounded-lg transition-all ${habit.dates.includes(d.date) ? 'bg-emerald-500 text-white scale-110' : 'bg-gray-100 hover:bg-gray-200 text-gray-300'}`}>{habit.dates.includes(d.date) ? '✓' : ''}</button>
                    </td>
                  ))}
                  <td><button onClick={() => deleteHabit(habit.id)} className="text-gray-300 hover:text-red-500 text-xs">✕</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ToolLayout>
  );
}
