'use client';

import { useState, useEffect } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

interface Expense { id: string; desc: string; amount: number; category: string; date: string; }

const CATEGORIES = ['🍔 Food', '🚗 Transport', '🛒 Shopping', '🎬 Entertainment', '💊 Health', '📚 Education', '🏠 Housing', '📱 Bills', '💰 Other'];

export default function ExpenseTrackerPage() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('expenses');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => { localStorage.setItem('expenses', JSON.stringify(expenses)); }, [expenses]);

  const add = () => {
    if (!desc || !amount) return;
    setExpenses([{ id: Date.now().toString(), desc, amount: Number(amount), category, date }, ...expenses]);
    setDesc(''); setAmount('');
  };

  const remove = (id: string) => setExpenses(expenses.filter(e => e.id !== id));
  const total = expenses.reduce((a, e) => a + e.amount, 0);

  const byCat = CATEGORIES.map(c => ({ cat: c, total: expenses.filter(e => e.category === c).reduce((a, e) => a + e.amount, 0) })).filter(c => c.total > 0).sort((a, b) => b.total - a.total);

  return (
    <ToolLayout title="Expense Tracker" description="Track your expenses by category. Data saved in your browser.">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className="tool-input md:col-span-2" placeholder="Description" />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="tool-input" placeholder="Amount" />
        <select value={category} onChange={e => setCategory(e.target.value)} className="tool-input">{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select>
        <button onClick={add} className="tool-btn">Add</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl bg-primary-50 border border-primary-200 p-4 text-center"><div className="text-sm text-primary-600">Total Spent</div><div className="text-2xl font-bold text-primary-800">${total.toFixed(2)}</div></div>
        <div className="rounded-xl bg-gray-50 p-4 text-center"><div className="text-sm text-gray-500">Transactions</div><div className="text-2xl font-bold">{expenses.length}</div></div>
        <div className="rounded-xl bg-gray-50 p-4 text-center"><div className="text-sm text-gray-500">Average</div><div className="text-2xl font-bold">${expenses.length ? (total / expenses.length).toFixed(2) : '0.00'}</div></div>
      </div>
      {byCat.length > 0 && (
        <div className="mb-6 space-y-2">{byCat.map(c => (
          <div key={c.cat} className="flex items-center gap-3"><span className="text-sm w-28">{c.cat}</span><div className="flex-1 bg-gray-100 rounded-full h-4"><div className="bg-primary-500 h-full rounded-full" style={{ width: `${(c.total / total) * 100}%` }} /></div><span className="text-sm font-mono w-20 text-right">${c.total.toFixed(2)}</span></div>
        ))}</div>
      )}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {expenses.map(e => (
          <div key={e.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2 group">
            <div><span className="text-sm font-medium text-gray-800">{e.desc}</span><span className="text-xs text-gray-400 ml-2">{e.category}</span></div>
            <div className="flex items-center gap-3"><span className="text-sm font-semibold text-gray-700">${e.amount.toFixed(2)}</span><button onClick={() => remove(e.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 text-xs">✕</button></div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
