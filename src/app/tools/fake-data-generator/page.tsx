'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

type DataType = 'name' | 'email' | 'phone' | 'address' | 'company' | 'ip' | 'uuid' | 'date' | 'url' | 'sentence';

const firstNames = ['James','Mary','John','Patricia','Robert','Jennifer','Michael','Linda','William','Elizabeth','David','Barbara','Richard','Susan','Joseph','Jessica','Thomas','Sarah','Charles','Karen'];
const lastNames = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee'];
const domains = ['gmail.com','yahoo.com','outlook.com','company.com','mail.com','proton.me'];
const streets = ['Main St','Oak Ave','Elm Dr','Park Blvd','Cedar Ln','Maple Way','Pine Rd','Walnut St','Lake Ave','Hill Dr'];
const cities = ['New York','Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Antonio','San Diego','Dallas','Austin'];
const states = ['NY','CA','IL','TX','AZ','PA','TX','CA','TX','TX'];
const companies = ['Acme Inc','Globex Corp','Initech','Umbrella Corp','Stark Industries','Wayne Enterprises','Cyberdyne Systems','Soylent Corp','Massive Dynamic','Aperture Science'];
const words = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua'];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function uuid() { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); }); }

function generate(type: DataType): string {
  const fn = rand(firstNames), ln = rand(lastNames);
  switch (type) {
    case 'name': return `${fn} ${ln}`;
    case 'email': return `${fn.toLowerCase()}.${ln.toLowerCase()}@${rand(domains)}`;
    case 'phone': return `+1 (${randInt(200, 999)}) ${randInt(200, 999)}-${randInt(1000, 9999)}`;
    case 'address': return `${randInt(1, 9999)} ${rand(streets)}, ${rand(cities)}, ${rand(states)} ${randInt(10000, 99999)}`;
    case 'company': return rand(companies);
    case 'ip': return `${randInt(1, 255)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}`;
    case 'uuid': return uuid();
    case 'date': { const d = new Date(Date.now() - Math.random() * 365 * 24 * 3600 * 1000 * 5); return d.toISOString().split('T')[0]; }
    case 'url': return `https://www.${ln.toLowerCase()}.com/${words[randInt(0, words.length - 1)]}`;
    case 'sentence': return Array.from({ length: randInt(6, 15) }, () => rand(words)).join(' ').replace(/^./, c => c.toUpperCase()) + '.';
    default: return '';
  }
}

export default function FakeDataPage() {
  const [type, setType] = useState<DataType>('name');
  const [count, setCount] = useState(10);
  const [data, setData] = useState<string[]>([]);

  const gen = () => setData(Array.from({ length: count }, () => generate(type)));

  const types: { key: DataType; label: string }[] = [
    { key: 'name', label: '👤 Names' },
    { key: 'email', label: '📧 Emails' },
    { key: 'phone', label: '📱 Phones' },
    { key: 'address', label: '🏠 Addresses' },
    { key: 'company', label: '🏢 Companies' },
    { key: 'ip', label: '🌐 IP Addresses' },
    { key: 'uuid', label: '🔑 UUIDs' },
    { key: 'date', label: '📅 Dates' },
    { key: 'url', label: '🔗 URLs' },
    { key: 'sentence', label: '📝 Sentences' },
  ];

  return (
    <ToolLayout title="Fake Data Generator" description="Generate realistic fake data for testing — names, emails, addresses, and more.">
      <div className="flex flex-wrap gap-2 mb-4">
        {types.map(t => (
          <button key={t.key} onClick={() => setType(t.key)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${type === t.key ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t.label}</button>
        ))}
      </div>
      <div className="flex gap-3 mb-6">
        <input type="number" min={1} max={100} value={count} onChange={e => setCount(Number(e.target.value))} className="tool-input w-24" />
        <button onClick={gen} className="tool-btn">Generate</button>
      </div>
      {data.length > 0 && (
        <div>
          <div className="flex justify-end mb-2"><CopyButton text={data.join('\n')} /></div>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {data.map((d, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2">
                <code className="text-sm text-gray-700">{d}</code>
                <CopyButton text={d} />
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
