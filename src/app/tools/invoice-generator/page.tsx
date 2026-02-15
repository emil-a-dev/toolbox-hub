'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

interface Item { desc: string; qty: number; price: number; }

export default function InvoiceGeneratorPage() {
  const [from, setFrom] = useState('Your Company\n123 Street\nCity, State');
  const [to, setTo] = useState('Client Name\n456 Avenue\nCity, State');
  const [invoiceNo, setInvoiceNo] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<Item[]>([{ desc: 'Service', qty: 1, price: 100 }]);
  const [tax, setTax] = useState(0);

  const subtotal = items.reduce((a, i) => a + i.qty * i.price, 0);
  const taxAmt = subtotal * tax / 100;
  const total = subtotal + taxAmt;

  const addItem = () => setItems([...items, { desc: '', qty: 1, price: 0 }]);
  const updateItem = (idx: number, field: keyof Item, val: string) => {
    const updated = [...items];
    if (field === 'desc') updated[idx].desc = val;
    else updated[idx][field] = Number(val);
    setItems(updated);
  };
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  const print = () => window.print();

  return (
    <ToolLayout title="Invoice Generator" description="Create and print professional invoices.">
      <div className="print:hidden space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">From</label><textarea value={from} onChange={e => setFrom(e.target.value)} className="tool-textarea !h-20" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Bill To</label><textarea value={to} onChange={e => setTo(e.target.value)} className="tool-textarea !h-20" /></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Invoice #</label><input type="text" value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} className="tool-input" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="tool-input" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Tax %</label><input type="number" value={tax} onChange={e => setTax(Number(e.target.value))} className="tool-input" /></div>
        </div>
      </div>

      {/* Invoice Preview */}
      <div className="rounded-xl border border-gray-200 p-8 bg-white">
        <div className="flex justify-between mb-8">
          <div className="whitespace-pre-line text-sm text-gray-600">{from}</div>
          <div className="text-right"><div className="text-2xl font-bold text-gray-900">INVOICE</div><div className="text-sm text-gray-500">#{invoiceNo}</div><div className="text-sm text-gray-500">{date}</div></div>
        </div>
        <div className="mb-6"><div className="text-xs text-gray-500 uppercase mb-1">Bill To</div><div className="whitespace-pre-line text-sm text-gray-700">{to}</div></div>
        <table className="w-full mb-6">
          <thead><tr className="border-b-2 border-gray-200"><th className="text-left text-xs uppercase text-gray-500 py-2">Description</th><th className="text-right text-xs uppercase text-gray-500 py-2 w-20">Qty</th><th className="text-right text-xs uppercase text-gray-500 py-2 w-28">Price</th><th className="text-right text-xs uppercase text-gray-500 py-2 w-28">Total</th><th className="w-8 print:hidden"></th></tr></thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-2"><input type="text" value={item.desc} onChange={e => updateItem(i, 'desc', e.target.value)} className="w-full bg-transparent text-sm" placeholder="Description" /></td>
                <td className="py-2"><input type="number" value={item.qty} onChange={e => updateItem(i, 'qty', e.target.value)} className="w-full text-right bg-transparent text-sm" /></td>
                <td className="py-2"><input type="number" value={item.price} onChange={e => updateItem(i, 'price', e.target.value)} className="w-full text-right bg-transparent text-sm" /></td>
                <td className="py-2 text-right text-sm font-medium">${(item.qty * item.price).toFixed(2)}</td>
                <td className="py-2 print:hidden"><button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 text-xs">✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addItem} className="text-sm text-primary-600 hover:text-primary-800 mb-4 print:hidden">+ Add Item</button>
        <div className="border-t border-gray-200 pt-4 ml-auto max-w-xs space-y-1">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          {tax > 0 && <div className="flex justify-between text-sm"><span className="text-gray-500">Tax ({tax}%)</span><span>${taxAmt.toFixed(2)}</span></div>}
          <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
      </div>
      <div className="mt-4 print:hidden"><button onClick={print} className="tool-btn">🖨️ Print Invoice</button></div>
    </ToolLayout>
  );
}
