'use client';

import { useState, useEffect } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

export default function IpAddressPage() {
  const texts = {
    en: {
      loading: 'Loading...',
      ipAddress: 'IP Address',
      city: 'City',
      region: 'Region',
      country: 'Country',
      isp: 'ISP',
      timezone: 'Timezone',
      latitude: 'Latitude',
      longitude: 'Longitude',
    },
    ru: {
      loading: 'Загрузка...',
      ipAddress: 'IP-адрес',
      city: 'Город',
      region: 'Регион',
      country: 'Страна',
      isp: 'Провайдер',
      timezone: 'Часовой пояс',
      latitude: 'Широта',
      longitude: 'Долгота',
    },
  };
  const { locale } = useLanguage();
  const tx = texts[locale];

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
    { label: tx.ipAddress, value: ip },
    { label: tx.city, value: info.city },
    { label: tx.region, value: info.region },
    { label: tx.country, value: `${info.country_name} (${info.country_code})` },
    { label: tx.isp, value: info.org },
    { label: tx.timezone, value: info.timezone },
    { label: tx.latitude, value: info.latitude },
    { label: tx.longitude, value: info.longitude },
  ] : [];

  return (
    <ToolLayout title="IP Address Info" description="See your public IP address and geolocation information.">
      {loading ? <div className="text-center py-12 text-gray-500">{tx.loading}</div> : (
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
