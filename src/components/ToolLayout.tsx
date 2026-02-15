'use client';

import { ArrowLeft, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';
import { AdBanner } from './AdBanner';
import { ShareButtons } from './ShareButtons';
import { useLanguage } from './LanguageProvider';
import { getToolI18n } from '@/lib/toolTranslations';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  const { locale } = useLanguage();
  const pathname = usePathname();

  // Extract tool slug from pathname (e.g. /tools/word-counter -> word-counter)
  const slug = pathname.replace('/tools/', '');
  const i18n = getToolI18n(slug, locale);
  const displayTitle = locale === 'ru' && i18n.title !== slug ? i18n.title : title;
  const displayDesc = locale === 'ru' && i18n.desc ? i18n.desc : description;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          {locale === 'ru' ? 'Все инструменты' : 'All Tools'}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{displayTitle}</h1>
        <p className="text-gray-500">{displayDesc}</p>
      </div>

      <AdBanner slot="top" />

      <div className="mt-6">{children}</div>

      <div className="mt-8">
        <ShareButtons title={displayTitle} />
      </div>

      <AdBanner slot="bottom" />
    </div>
  );
}

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return { copied, copy };
}

export function CopyButton({ text }: { text: string }) {
  const { copied, copy } = useCopyToClipboard();
  const { t } = useLanguage();

  return (
    <button
      onClick={() => copy(text)}
      className="tool-btn-secondary !py-2 !px-3 text-xs"
      title={t('ui.copyToClipboard')}
    >
      {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
      {copied ? t('ui.copied') : t('ui.copy')}
    </button>
  );
}
