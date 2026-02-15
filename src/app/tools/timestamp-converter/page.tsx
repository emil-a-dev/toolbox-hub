'use client';

import { useState, useEffect } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const tsToDate = (ts: string): string => {
    const num = Number(ts);
    if (isNaN(num)) return 'Invalid timestamp';
    // Auto-detect seconds vs milliseconds
    const ms = num < 1e12 ? num * 1000 : num;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return 'Invalid timestamp';
    return d.toISOString() + '\n' + d.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' });
  };

  const dateToTs = (ds: string): string => {
    const d = new Date(ds);
    if (isNaN(d.getTime())) return 'Invalid date';
    return `Seconds: ${Math.floor(d.getTime() / 1000)}\nMilliseconds: ${d.getTime()}`;
  };

  const currentDate = new Date(now);
  const currentInfo = [
    { label: 'Unix (seconds)', value: Math.floor(now / 1000).toString() },
    { label: 'Unix (milliseconds)', value: now.toString() },
    { label: 'ISO 8601', value: currentDate.toISOString() },
    { label: 'UTC', value: currentDate.toUTCString() },
    { label: 'Local', value: currentDate.toLocaleString() },
  ];

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates. Live clock included."
    >
      {/* Live clock */}
      <div className="rounded-xl bg-gradient-to-r from-primary-600 to-blue-500 text-white p-6 mb-8">
        <div className="text-sm opacity-80 mb-1">Current Time</div>
        <div className="text-3xl font-bold font-mono mb-4">
          {currentDate.toLocaleTimeString()}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentInfo.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
              <div>
                <div className="text-xs opacity-70">{item.label}</div>
                <div className="text-sm font-mono">{item.value}</div>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(item.value)}
                className="text-xs opacity-60 hover:opacity-100"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Timestamp → Date */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Timestamp → Date</h3>
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="e.g. 1700000000"
            className="tool-input font-mono"
          />
          {timestamp && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">Result</span>
                <CopyButton text={tsToDate(timestamp)} />
              </div>
              <div className="result-box">{tsToDate(timestamp)}</div>
            </div>
          )}
        </div>

        {/* Date → Timestamp */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Date → Timestamp</h3>
          <input
            type="datetime-local"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="tool-input"
          />
          {dateStr && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">Result</span>
                <CopyButton text={dateToTs(dateStr)} />
              </div>
              <div className="result-box">{dateToTs(dateStr)}</div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
