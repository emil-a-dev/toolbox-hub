'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

const FIELDS: Record<string, string[]> = {
  minute: ['0-59','*',',','-','/'],
  hour: ['0-23','*',',','-','/'],
  'day of month': ['1-31','*',',','-','/','?','L','W'],
  month: ['1-12','*',',','-','/'],
  'day of week': ['0-7','*',',','-','/','?','L','#'],
};

function parseCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length < 5) return 'Invalid cron expression. Expected 5 fields: minute hour day month weekday';
  const [min, hr, dom, mon, dow] = parts;

  const descriptions: string[] = [];
  const descField = (val: string, name: string, max: number): string => {
    if (val === '*') return `every ${name}`;
    if (val.includes('/')) { const [base, step] = val.split('/'); return `every ${step} ${name}(s)${base !== '*' && base !== '0' ? ` starting at ${base}` : ''}`; }
    if (val.includes('-')) { const [from, to] = val.split('-'); return `${name} ${from} through ${to}`; }
    if (val.includes(',')) return `${name} ${val}`;
    return `at ${name} ${val}`;
  };

  const months = ['', 'January','February','March','April','May','June','July','August','September','October','November','December'];
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  descriptions.push(descField(min, 'minute', 59));
  descriptions.push(descField(hr, 'hour', 23));
  if (dom !== '*' && dom !== '?') descriptions.push(descField(dom, 'day', 31));
  if (mon !== '*') {
    const monthDesc = mon.split(',').map(m => months[Number(m)] || m).join(', ');
    descriptions.push(`in ${monthDesc}`);
  }
  if (dow !== '*' && dow !== '?') {
    const dowDesc = dow.split(',').map(d => days[Number(d)] || d).join(', ');
    descriptions.push(`on ${dowDesc}`);
  }

  return descriptions.join(', ');
}

const EXAMPLES = [
  { expr: '* * * * *', desc: 'Every minute' },
  { expr: '0 * * * *', desc: 'Every hour' },
  { expr: '0 0 * * *', desc: 'Every day at midnight' },
  { expr: '0 9 * * 1-5', desc: 'Weekdays at 9 AM' },
  { expr: '*/15 * * * *', desc: 'Every 15 minutes' },
  { expr: '0 0 1 * *', desc: 'First day of every month' },
  { expr: '0 0 * * 0', desc: 'Every Sunday at midnight' },
];

export default function CronParserPage() {
  const [expr, setExpr] = useState('*/15 * * * *');
  const description = parseCron(expr);

  return (
    <ToolLayout title="Cron Expression Parser" description="Parse and explain cron expressions in human-readable format.">
      <input type="text" value={expr} onChange={(e) => setExpr(e.target.value)} placeholder="* * * * *" className="tool-input font-mono text-xl text-center" />
      <div className="flex justify-center gap-4 mt-2 text-xs text-gray-400">
        {['minute','hour','day(month)','month','day(week)'].map(f => <span key={f}>{f}</span>)}
      </div>
      <div className="mt-6 rounded-xl bg-primary-50 border border-primary-200 p-4 text-center"><p className="text-primary-800 font-medium">{description}</p></div>
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Common Examples</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {EXAMPLES.map(ex => (
            <button key={ex.expr} onClick={() => setExpr(ex.expr)} className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors text-left">
              <code className="font-mono text-sm text-primary-600">{ex.expr}</code>
              <span className="text-sm text-gray-500">{ex.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
