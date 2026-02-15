'use client';

import { useState, useEffect } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function IpAddressPage() {
  const [ip, setIp] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(r => r.json())
      .then(data => { setIp(data.ip); return fetch(`https://ipapi.co/${data.ip}/json/`); })
      .then(r => r.json())
      .then(data => { setInfo(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const fields = info ? [
    { label: 'IP Address', value: ip },
    { label: 'City', value: info.city },
    { label: 'Region', value: info.region },
    { label: 'Country', value: `${info.country_name} (${info.country_code})` },
    { label: 'ISP', value: info.org },
    { label: 'Timezone', value: info.timezone },
    { label: 'Latitude', value: info.latitude },
    { label: 'Longitude', value: info.longitude },
  ] : [];

  return (
    <ToolLayout title="IP Address Info" description="See your public IP address and geolocation information.">
      {loading ? <div className="text-center py-12 text-gray-500">Loading...</div> : (
        <div className="max-w-xl">
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-primary-600 font-mono mb-2">{ip}</div>
            <CopyButton text={ip} />
          </div>
          <div className="space-y-2">
            {fields.map(f => f.value && (
              <div key={f.label} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-500">{f.label}</span>
                <span className="text-sm font-medium text-gray-900">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
