'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

function toSlug(text: string): string {
  return text.toLowerCase().trim()
    .replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e').replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o').replace(/[ùúûü]/g, 'u').replace(/[ñ]/g, 'n')
    .replace(/[а-яё]/gi, (c) => {
      const map: Record<string, string> = { а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'j',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'c',ч:'ch',ш:'sh',щ:'shch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya' };
      return map[c.toLowerCase()] || '';
    })
    .replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

const texts = {
  en: {
    placeholder: 'Enter title or text...',
    urlSlug: 'URL Slug',
  },
  ru: {
    placeholder: 'Введите заголовок или текст...',
    urlSlug: 'Сгенерированный слаг',
  },
};

export default function SlugGeneratorPage() {
  const { locale } = useLanguage();
  const tx = texts[locale];

  const [text, setText] = useState('');
  const slug = toSlug(text);

  return (
    <ToolLayout title="Slug Generator" description="Convert text to URL-friendly slugs. Supports transliteration of Cyrillic and accented characters.">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={tx.placeholder} className="tool-input text-lg" />
      {text && <div className="mt-6"><div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">{tx.urlSlug}</h3><CopyButton text={slug} /></div><div className="result-box text-lg">{slug || '—'}</div></div>}
    </ToolLayout>
  );
}
