'use client';

import { useState, useEffect, useMemo } from 'react';
import { Crown, Calendar, KeyRound, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const STORAGE_KEY = 'pro_subscription_expiry';

// Demo keys: any key of format XXXX-XXXX-XXXX-XXXX activates a 1-year subscription
function parseDemoKey(key: string): Date | null {
  if (/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(key.trim())) {
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    return expiry;
  }
  return null;
}

export default function SubscriptionPage() {
  const { t, locale } = useLanguage();
  const [expiry, setExpiry] = useState<Date | null>(null);
  const [keyInput, setKeyInput] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const date = new Date(stored);
      if (!isNaN(date.getTime())) {
        setExpiry(date);
      }
    }
  }, []);

  const now = useMemo(() => new Date(), []);
  const isActive = expiry !== null && expiry > now;

  const daysLeft = expiry
    ? Math.max(0, Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  const formattedExpiry = expiry
    ? expiry.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  function handleActivate() {
    setMessage(null);
    const date = parseDemoKey(keyInput);
    if (date) {
      localStorage.setItem(STORAGE_KEY, date.toISOString());
      setExpiry(date);
      setKeyInput('');
      setMessage({ type: 'success', text: t('subscription.activateSuccess') });
    } else {
      setMessage({ type: 'error', text: t('subscription.activateError') });
    }
  }

  if (!mounted) return null;

  return (
    <div className="max-w-md mx-auto py-10 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white">
          <Crown size={20} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{t('subscription.title')}</h1>
      </div>

      {/* Status card */}
      <div className={`rounded-2xl border p-6 mb-6 ${isActive ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center gap-2 mb-4">
          {isActive ? (
            <CheckCircle size={20} className="text-emerald-600" />
          ) : (
            <XCircle size={20} className="text-gray-400" />
          )}
          <span className={`font-semibold text-lg ${isActive ? 'text-emerald-700' : 'text-gray-500'}`}>
            {isActive ? t('subscription.active') : t('subscription.inactive')}
          </span>
        </div>

        {isActive && expiry && (
          <>
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <Calendar size={16} className="text-emerald-600" />
              <span className="text-sm">
                <span className="font-medium">{t('subscription.expiresOn')}:</span>{' '}
                {formattedExpiry}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span className="text-sm">{t('subscription.daysLeft', { days: daysLeft })}</span>
            </div>
          </>
        )}

        {!isActive && expiry && expiry <= now && (
          <p className="text-sm text-red-600">{t('subscription.expired')}</p>
        )}

        {!isActive && !expiry && (
          <p className="text-sm text-gray-500">{t('subscription.noSubscription')}</p>
        )}
      </div>

      {/* Activation form */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <KeyRound size={14} className="inline mr-1.5 text-gray-400" />
          {t('subscription.activateLabel')}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            onKeyDown={(e) => e.key === 'Enter' && handleActivate()}
          />
          <button
            onClick={handleActivate}
            className="px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            {t('subscription.activateButton')}
          </button>
        </div>
        {message && (
          <p className={`mt-2 text-sm ${message.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
