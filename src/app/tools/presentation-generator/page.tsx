'use client';

import { useState, useRef } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import {
  Presentation, Download, Plus, Trash2, ChevronLeft, ChevronRight,
  Edit3, Eye, Palette, FileText, Sparkles, Layout, Loader2, Search,
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

/* ───────── templates ───────── */
interface Template {
  id: string;
  name: string;
  colors: { bg: string; text: string; accent: string; heading: string; cardBg: string };
  font: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'business',
    name: '💼 Business',
    colors: { bg: '#1e293b', text: '#e2e8f0', accent: '#3b82f6', heading: '#ffffff', cardBg: '#334155' },
    font: 'system-ui, sans-serif',
  },
  {
    id: 'education',
    name: '🎓 Education',
    colors: { bg: '#fefce8', text: '#422006', accent: '#ca8a04', heading: '#713f12', cardBg: '#fef9c3' },
    font: 'Georgia, serif',
  },
  {
    id: 'creative',
    name: '🎨 Creative',
    colors: { bg: '#fdf2f8', text: '#831843', accent: '#ec4899', heading: '#9d174d', cardBg: '#fce7f3' },
    font: 'system-ui, sans-serif',
  },
  {
    id: 'minimal',
    name: '⬜ Minimal',
    colors: { bg: '#ffffff', text: '#374151', accent: '#6366f1', heading: '#111827', cardBg: '#f3f4f6' },
    font: 'system-ui, sans-serif',
  },
  {
    id: 'dark',
    name: '🌙 Dark',
    colors: { bg: '#0f172a', text: '#cbd5e1', accent: '#22d3ee', heading: '#f1f5f9', cardBg: '#1e293b' },
    font: 'system-ui, sans-serif',
  },
  {
    id: 'nature',
    name: '🌿 Nature',
    colors: { bg: '#ecfdf5', text: '#064e3b', accent: '#10b981', heading: '#065f46', cardBg: '#d1fae5' },
    font: 'system-ui, sans-serif',
  },
  {
    id: 'corporate',
    name: '🏢 Corporate',
    colors: { bg: '#f8fafc', text: '#334155', accent: '#0ea5e9', heading: '#0f172a', cardBg: '#e2e8f0' },
    font: 'system-ui, sans-serif',
  },
  {
    id: 'retro',
    name: '🕹 Retro',
    colors: { bg: '#fef3c7', text: '#78350f', accent: '#f59e0b', heading: '#92400e', cardBg: '#fde68a' },
    font: '"Courier New", monospace',
  },
];

/* ───────── content generation ───────── */
interface Slide {
  id: number;
  type: 'title' | 'content' | 'bullets' | 'two-column' | 'quote' | 'end';
  title: string;
  body: string;
  bullets?: string[];
  leftCol?: string;
  rightCol?: string;
  quote?: string;
  author?: string;
}

interface WikiContent {
  title: string;
  lang: string;
  intro: string;
  sections: { title: string; content: string }[];
}

function isCyrillic(text: string): boolean {
  return /[а-яА-ЯёЁ]/.test(text);
}

function truncateText(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const cut = text.lastIndexOf('. ', maxLen);
  return cut > maxLen * 0.3 ? text.substring(0, cut + 1) : text.substring(0, maxLen).trim() + '…';
}

const SKIP_SECTIONS = new Set([
  'см. также', 'see also', 'примечания', 'references', 'ссылки',
  'external links', 'литература', 'bibliography', 'further reading',
  'комментарии', 'notes', 'sources', 'источники', 'галерея', 'gallery',
  'навигация', 'категория',
]);

async function fetchWikipediaContent(topic: string): Promise<WikiContent | null> {
  const isRu = isCyrillic(topic);
  const langs = isRu ? ['ru', 'en'] : ['en', 'ru'];

  for (const lang of langs) {
    try {
      const searchUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(topic)}&srlimit=1&format=json&origin=*`;
      const searchRes = await fetch(searchUrl, { signal: AbortSignal.timeout(8000) });
      const searchData = await searchRes.json();
      if (!searchData.query?.search?.length) continue;

      const pageTitle = searchData.query.search[0].title;
      const contentUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=extracts&explaintext=true&exlimit=1&format=json&origin=*`;
      const contentRes = await fetch(contentUrl, { signal: AbortSignal.timeout(8000) });
      const contentData = await contentRes.json();

      const pages = contentData.query?.pages;
      if (!pages) continue;
      const page = Object.values(pages)[0] as any;
      if (!page?.extract || page.extract.length < 200) continue;

      const fullText: string = page.extract;
      const sectionRegex = /^==\s*([^=]+?)\s*==$/gm;
      const matches: { title: string; index: number; headerLen: number }[] = [];
      let m;
      while ((m = sectionRegex.exec(fullText)) !== null) {
        matches.push({ title: m[1].trim(), index: m.index, headerLen: m[0].length });
      }

      let intro = '';
      const sections: { title: string; content: string }[] = [];

      if (matches.length > 0) {
        intro = fullText.substring(0, matches[0].index).trim();
        for (let i = 0; i < matches.length; i++) {
          const start = matches[i].index + matches[i].headerLen;
          const end = i + 1 < matches.length ? matches[i + 1].index : fullText.length;
          let content = fullText.substring(start, end).trim();
          content = content.replace(/^={3,}\s*.+?\s*={3,}$/gm, '').replace(/\n{3,}/g, '\n\n').trim();
          if (content.length > 40) {
            sections.push({ title: matches[i].title, content });
          }
        }
      } else {
        intro = fullText;
      }

      return { title: pageTitle, lang, intro, sections };
    } catch {
      continue;
    }
  }
  return null;
}

function buildSlidesFromWiki(wiki: WikiContent, topic: string, count: number, isRu: boolean): Slide[] {
  const slides: Slide[] = [];
  let id = 0;
  const dateStr = new Date().toLocaleDateString(isRu ? 'ru-RU' : 'en-US');

  slides.push({
    id: id++, type: 'title', title: topic,
    body: `${wiki.title !== topic ? wiki.title + '\n' : ''}${isRu ? 'Подготовлено' : 'Prepared'} ${dateStr}`,
  });

  if (wiki.intro.length > 50) {
    slides.push({
      id: id++, type: 'content',
      title: isRu ? 'Введение' : 'Introduction',
      body: truncateText(wiki.intro, 600),
    });
  }

  const usable = wiki.sections.filter(s => !SKIP_SECTIONS.has(s.title.toLowerCase()));

  if (usable.length > 2) {
    slides.push({
      id: id++, type: 'bullets',
      title: isRu ? 'Содержание' : 'Agenda',
      body: '', bullets: usable.slice(0, 8).map(s => s.title),
    });
  }

  const reserved = 2 + (usable.length > 2 ? 1 : 0) + 1;
  const budget = Math.max(count - reserved, 2);
  const toUse = usable.slice(0, budget);

  toUse.forEach((sec, idx) => {
    const sentences = sec.content.split(/(?<=[.!?»"])\s+/).filter(s => s.trim().length > 20);

    if (sentences.length >= 4 && idx % 3 === 0) {
      slides.push({
        id: id++, type: 'bullets', title: sec.title, body: '',
        bullets: sentences.slice(0, 6).map(s => truncateText(s, 150)),
      });
    } else if (sentences.length >= 6 && idx % 3 === 2) {
      const half = Math.ceil(Math.min(sentences.length, 8) / 2);
      slides.push({
        id: id++, type: 'two-column', title: sec.title, body: '',
        leftCol: sentences.slice(0, half).map(s => truncateText(s, 150)).join('\n\n'),
        rightCol: sentences.slice(half, half * 2).map(s => truncateText(s, 150)).join('\n\n'),
      });
    } else {
      slides.push({
        id: id++, type: 'content', title: sec.title,
        body: truncateText(sec.content, 600),
      });
    }
  });

  slides.push({
    id: id++, type: 'end',
    title: isRu ? 'Спасибо за внимание!' : 'Thank You!',
    body: `${isRu ? 'Вопросы и обсуждение' : 'Questions & Discussion'}\n\n${topic}\n\n${isRu ? 'Создано с помощью' : 'Generated by'} ToolBox Hub`,
  });

  if (slides.length > count) {
    const core = slides.slice(0, count - 1);
    core.push(slides[slides.length - 1]);
    return core;
  }
  return slides;
}

function generateFallback(topic: string, count: number, isRu: boolean): Slide[] {
  const t = topic.trim();
  const slides: Slide[] = [];
  let id = 0;
  const dateStr = new Date().toLocaleDateString(isRu ? 'ru-RU' : 'en-US');

  slides.push({ id: id++, type: 'title', title: t,
    body: `${isRu ? 'Обзор и ключевые аспекты' : 'Overview and key insights'}\n${isRu ? 'Подготовлено' : 'Prepared'} ${dateStr}` });

  slides.push({ id: id++, type: 'content',
    title: isRu ? `Введение: ${t}` : `Introduction to ${t}`,
    body: isRu
      ? `Данная презентация посвящена ключевым аспектам темы «${t}». Мы рассмотрим основные понятия, текущее состояние, тенденции развития и практические выводы. Цель — сформировать структурированное понимание данной темы.`
      : `This presentation explores the key aspects of "${t}". We will cover fundamental concepts, current trends, important data points, and actionable conclusions.` });

  slides.push({ id: id++, type: 'bullets',
    title: isRu ? 'Содержание' : 'Agenda', body: '',
    bullets: isRu
      ? ['Контекст и предпосылки', 'Основные понятия', 'Текущее состояние', 'Данные и анализ', 'Вызовы и возможности', 'Выводы']
      : ['Background & Context', 'Key Concepts', 'Current State', 'Data & Analysis', 'Challenges & Opportunities', 'Conclusions'] });

  slides.push({ id: id++, type: 'content',
    title: isRu ? 'Контекст и предпосылки' : 'Background & Context',
    body: isRu
      ? `Понимание предпосылок темы «${t}» необходимо для оценки её значимости. Эта область существенно изменилась в последние годы благодаря технологическим инновациям, изменению рыночной динамики и растущему интересу со стороны профессионалов и широкой общественности.`
      : `Understanding the background of "${t}" is essential for grasping its full significance. This field has evolved significantly over recent years, driven by technological innovation, changing market dynamics, and growing interest.` });

  slides.push({ id: id++, type: 'two-column',
    title: isRu ? 'Основные понятия' : 'Key Concepts', body: '',
    leftCol: isRu ? 'Теоретические основы:\n\n• Фундаментальная теория\n• Основная терминология\n• Историческое развитие\n• Академический взгляд' : 'Core Principles:\n\n• Foundational theory\n• Essential terminology\n• Historical development\n• Academic perspective',
    rightCol: isRu ? 'Практическое применение:\n\n• Реальные примеры\n• Отраслевые решения\n• Лучшие практики\n• Распространённые методы' : 'Applications:\n\n• Real-world use cases\n• Industry implementations\n• Best practices\n• Common methodologies' });

  slides.push({ id: id++, type: 'bullets',
    title: isRu ? 'Ключевые тенденции' : 'Key Trends',
    body: isRu ? `Что формирует ландшафт «${t}» сейчас:` : `Current trends in "${t}":`,
    bullets: isRu
      ? ['Интеграция ИИ и автоматизации', 'Принятие решений на основе данных', 'Устойчивое развитие и этика', 'Глобализация и удалённая работа', 'Открытое сообщество и сотрудничество']
      : ['AI and automation integration', 'Data-driven decision making', 'Sustainability and ethics', 'Globalization and remote collaboration', 'Open-source community contributions'] });

  slides.push({ id: id++, type: 'bullets',
    title: isRu ? 'Выводы' : 'Conclusions',
    body: isRu ? 'Ключевые выводы:' : 'Key takeaways:',
    bullets: isRu
      ? [`«${t}» — значимая и развивающаяся область`, 'Понимание основ — залог успеха', 'Подходы на основе данных дают лучшие результаты', 'Непрерывное обучение необходимо', 'Возможности превышают вызовы']
      : [`${t} is a significant and evolving field`, 'Understanding fundamentals is crucial', 'Data-driven approaches yield best results', 'Continuous learning is essential', 'Opportunities outweigh challenges'] });

  slides.push({ id: id++, type: 'end',
    title: isRu ? 'Спасибо за внимание!' : 'Thank You!',
    body: `${isRu ? 'Вопросы и обсуждение' : 'Questions & Discussion'}\n\n${t}\n\n${isRu ? 'Создано с помощью' : 'Generated by'} ToolBox Hub` });

  if (slides.length > count) {
    const core = slides.slice(0, count - 1);
    core.push(slides[slides.length - 1]);
    return core;
  }
  return slides;
}

/* ───────── slide renderer ───────── */
function SlideView({ slide, template, slideNum, total }: { slide: Slide; template: Template; slideNum: number; total: number }) {
  const c = template.colors;

  const base: React.CSSProperties = {
    backgroundColor: c.bg,
    color: c.text,
    fontFamily: template.font,
    width: '100%',
    aspectRatio: '16/9',
    padding: '48px 56px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: slide.type === 'title' || slide.type === 'end' ? 'center' : 'flex-start',
    alignItems: slide.type === 'title' || slide.type === 'end' ? 'center' : 'stretch',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
  };

  const headingStyle: React.CSSProperties = {
    color: c.heading,
    fontSize: slide.type === 'title' || slide.type === 'end' ? '2.2em' : '1.6em',
    fontWeight: 800,
    marginBottom: '0.6em',
    textAlign: slide.type === 'title' || slide.type === 'end' ? 'center' : 'left',
    lineHeight: 1.2,
  };

  const bodyStyle: React.CSSProperties = {
    fontSize: '1em',
    lineHeight: 1.7,
    textAlign: slide.type === 'title' || slide.type === 'end' ? 'center' : 'left',
    whiteSpace: 'pre-line',
    maxWidth: slide.type === 'title' || slide.type === 'end' ? '80%' : '100%',
  };

  const accentBar: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    backgroundColor: c.accent,
  };

  const pageNum: React.CSSProperties = {
    position: 'absolute',
    bottom: '16px',
    right: '24px',
    fontSize: '0.75em',
    opacity: 0.5,
  };

  return (
    <div style={base}>
      <div style={accentBar} />
      <h2 style={headingStyle}>{slide.title}</h2>

      {slide.type === 'content' && <p style={bodyStyle}>{slide.body}</p>}

      {slide.type === 'title' && <p style={{ ...bodyStyle, opacity: 0.7 }}>{slide.body}</p>}

      {slide.type === 'end' && <p style={{ ...bodyStyle, opacity: 0.7 }}>{slide.body}</p>}

      {slide.type === 'bullets' && (
        <div>
          {slide.body && <p style={{ ...bodyStyle, marginBottom: '0.8em' }}>{slide.body}</p>}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {slide.bullets?.map((b, i) => (
              <li key={i} style={{ padding: '0.4em 0', fontSize: '1em', display: 'flex', alignItems: 'flex-start', gap: '0.6em' }}>
                <span style={{ color: c.accent, fontWeight: 700, fontSize: '1.2em', lineHeight: 1 }}>●</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {slide.type === 'two-column' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2em', flex: 1 }}>
          <div style={{ background: c.cardBg, borderRadius: '10px', padding: '1.2em', whiteSpace: 'pre-line', fontSize: '0.9em', lineHeight: 1.6 }}>
            {slide.leftCol}
          </div>
          <div style={{ background: c.cardBg, borderRadius: '10px', padding: '1.2em', whiteSpace: 'pre-line', fontSize: '0.9em', lineHeight: 1.6 }}>
            {slide.rightCol}
          </div>
        </div>
      )}

      {slide.type === 'quote' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 10%' }}>
          <p style={{ fontSize: '1.4em', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1em', color: c.heading }}>
            {slide.quote}
          </p>
          <p style={{ fontSize: '0.9em', opacity: 0.7 }}>— {slide.author}</p>
        </div>
      )}

      <span style={pageNum}>{slideNum} / {total}</span>
    </div>
  );
}

/* ───────── main component ───────── */
export default function PresentationGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [slideCount, setSlideCount] = useState(10);
  const [templateId, setTemplateId] = useState('business');
  const [slides, setSlides] = useState<Slide[] | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mode, setMode] = useState<'edit' | 'preview'>('preview');
  const [editingSlide, setEditingSlide] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const printRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const isRu = locale === 'ru';

  const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];

  const handleGenerate = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    setStatusMsg(isRu ? 'Поиск информации по теме…' : 'Searching for topic info…');
    try {
      const wiki = await fetchWikipediaContent(topic);
      let gen: Slide[];
      const ru = isCyrillic(topic) || isRu;
      if (wiki) {
        gen = buildSlidesFromWiki(wiki, topic, slideCount, ru);
        setStatusMsg(isRu ? `Найдена статья: ${wiki.title} (${wiki.lang === 'ru' ? 'рус' : 'англ'}). Создано ${gen.length} слайдов.` : `Found: ${wiki.title} (${wiki.lang}). Created ${gen.length} slides.`);
      } else {
        gen = generateFallback(topic, slideCount, ru);
        setStatusMsg(isRu ? 'Статья не найдена в Википедии. Создана базовая структура — отредактируйте содержимое.' : 'Wikipedia article not found. Generated basic structure — edit content as needed.');
      }
      setSlides(gen);
      setCurrentSlide(0);
      setMode('preview');
    } catch {
      setStatusMsg(isRu ? 'Ошибка при поиске. Создана базовая структура.' : 'Search error. Generated basic structure.');
      const ru = isCyrillic(topic) || isRu;
      setSlides(generateFallback(topic, slideCount, ru));
      setCurrentSlide(0);
      setMode('preview');
    } finally {
      setLoading(false);
    }
  };

  const updateSlide = (idx: number, field: keyof Slide, value: string) => {
    if (!slides) return;
    setSlides(slides.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  };

  const updateBullet = (slideIdx: number, bulletIdx: number, value: string) => {
    if (!slides) return;
    setSlides(slides.map((s, i) => {
      if (i !== slideIdx || !s.bullets) return s;
      const newBullets = [...s.bullets];
      newBullets[bulletIdx] = value;
      return { ...s, bullets: newBullets };
    }));
  };

  const addBullet = (slideIdx: number) => {
    if (!slides) return;
    setSlides(slides.map((s, i) => {
      if (i !== slideIdx || !s.bullets) return s;
      return { ...s, bullets: [...s.bullets, 'New point'] };
    }));
  };

  const removeBullet = (slideIdx: number, bulletIdx: number) => {
    if (!slides) return;
    setSlides(slides.map((s, i) => {
      if (i !== slideIdx || !s.bullets) return s;
      return { ...s, bullets: s.bullets.filter((_, bi) => bi !== bulletIdx) };
    }));
  };

  const deleteSlide = (idx: number) => {
    if (!slides || slides.length <= 1) return;
    const newSlides = slides.filter((_, i) => i !== idx);
    setSlides(newSlides);
    if (currentSlide >= newSlides.length) setCurrentSlide(newSlides.length - 1);
  };

  const addSlide = () => {
    if (!slides) return;
    const newSlide: Slide = {
      id: Date.now(),
      type: 'content',
      title: 'New Slide',
      body: 'Add your content here...',
    };
    const newSlides = [...slides];
    newSlides.splice(currentSlide + 1, 0, newSlide);
    setSlides(newSlides);
    setCurrentSlide(currentSlide + 1);
  };

  const exportHTML = () => {
    if (!slides) return;
    const c = template.colors;

    const slidesHtml = slides.map((slide, i) => {
      let content = '';

      if (slide.type === 'bullets' && slide.bullets) {
        content = `${slide.body ? `<p style="margin-bottom:0.8em">${slide.body}</p>` : ''}
          <ul style="list-style:none;padding:0">${slide.bullets.map(b =>
          `<li style="padding:0.4em 0;display:flex;align-items:flex-start;gap:0.6em">
            <span style="color:${c.accent};font-weight:700;font-size:1.2em;line-height:1">●</span>
            <span>${b}</span></li>`).join('')}</ul>`;
      } else if (slide.type === 'two-column') {
        content = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:2em;flex:1">
          <div style="background:${c.cardBg};border-radius:10px;padding:1.2em;white-space:pre-line;font-size:0.9em;line-height:1.6">${slide.leftCol || ''}</div>
          <div style="background:${c.cardBg};border-radius:10px;padding:1.2em;white-space:pre-line;font-size:0.9em;line-height:1.6">${slide.rightCol || ''}</div></div>`;
      } else if (slide.type === 'quote') {
        content = `<div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 10%">
          <p style="font-size:1.4em;font-style:italic;line-height:1.6;margin-bottom:1em;color:${c.heading}">${slide.quote || ''}</p>
          <p style="font-size:0.9em;opacity:0.7">\u2014 ${slide.author || ''}</p></div>`;
      } else {
        content = `<p style="white-space:pre-line;line-height:1.7;${(slide.type === 'title' || slide.type === 'end') ? 'text-align:center;opacity:0.7;max-width:80%' : ''}">${slide.body}</p>`;
      }

      const isCenter = slide.type === 'title' || slide.type === 'end';
      return `<div class="slide" style="background:${c.bg};color:${c.text};font-family:${template.font};
        width:100%;aspect-ratio:16/9;padding:48px 56px;display:flex;flex-direction:column;
        justify-content:${isCenter ? 'center' : 'flex-start'};align-items:${isCenter ? 'center' : 'stretch'};
        position:relative;overflow:hidden;page-break-after:always;box-sizing:border-box">
        <div style="position:absolute;top:0;left:0;right:0;height:5px;background:${c.accent}"></div>
        <h2 style="color:${c.heading};font-size:${isCenter ? '2.2em' : '1.6em'};font-weight:800;margin-bottom:0.6em;
          ${isCenter ? 'text-align:center' : ''};line-height:1.2">${slide.title}</h2>
        ${content}
        <span style="position:absolute;bottom:16px;right:24px;font-size:0.75em;opacity:0.5">${i + 1} / ${slides.length}</span>
      </div>`;
    }).join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${topic} — Presentation</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#111}
.slide{margin:0 auto 20px;max-width:960px;min-height:540px}
@media print{body{background:#fff}.slide{margin:0;max-width:100%;page-break-after:always;min-height:100vh}}
</style>
</head>
<body>${slidesHtml}</body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/[^a-zA-Z0-9а-яА-ЯёЁ ]/g, '').replace(/\s+/g, '-')}-presentation.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="Presentation Generator"
      description="Generate beautiful presentations on any topic. Choose a template, get structured slides, edit and export."
    >
      {/* ─── Setup ─── */}
      <div className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{isRu ? 'Тема презентации' : 'Presentation Topic'}</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder={isRu ? 'напр. Искусственный интеллект в образовании' : 'e.g. Artificial Intelligence in Education'}
            className="input w-full text-lg"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isRu ? 'Количество слайдов' : 'Number of Slides'}</label>
            <input
              type="range"
              min={5}
              max={15}
              value={slideCount}
              onChange={(e) => setSlideCount(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{slideCount} {isRu ? 'слайдов' : 'slides'}</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{isRu ? 'Шаблон' : 'Template'}</label>
            <div className="grid grid-cols-4 gap-2">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setTemplateId(tpl.id)}
                  className={`p-2 rounded-lg text-xs text-center border-2 transition-all ${
                    templateId === tpl.id
                      ? 'border-primary-500 bg-primary-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="w-full h-5 rounded mb-1"
                    style={{ background: `linear-gradient(135deg, ${tpl.colors.bg}, ${tpl.colors.accent})` }}
                  />
                  <span className="text-[10px] leading-tight">{tpl.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!topic.trim() || loading}
          className="btn btn-primary w-full sm:w-auto flex items-center gap-2"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          {loading
            ? (isRu ? 'Поиск и генерация…' : 'Searching & generating…')
            : (isRu ? 'Найти и создать презентацию' : 'Search & Generate Presentation')}
        </button>

        {statusMsg && (
          <div className={`mt-3 p-3 rounded-xl text-sm ${
            statusMsg.includes('не найден') || statusMsg.includes('not found') || statusMsg.includes('Ошибка') || statusMsg.includes('error')
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}>
            {statusMsg}
          </div>
        )}
      </div>

      {/* ─── Slides ─── */}
      {slides && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-30"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-medium text-gray-600 min-w-[80px] text-center">
                Slide {currentSlide + 1} / {slides.length}
              </span>
              <button
                onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === slides.length - 1}
                className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-30"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode(mode === 'preview' ? 'edit' : 'preview')}
                className="btn btn-secondary flex items-center gap-1.5 text-sm"
              >
                {mode === 'preview' ? <Edit3 size={16} /> : <Eye size={16} />}
                {mode === 'preview' ? 'Edit' : 'Preview'}
              </button>
              <button onClick={addSlide} className="btn btn-secondary flex items-center gap-1.5 text-sm">
                <Plus size={16} /> Add Slide
              </button>
              <button onClick={exportHTML} className="btn btn-primary flex items-center gap-1.5 text-sm">
                <Download size={16} /> Export HTML
              </button>
            </div>
          </div>

          {/* Slide thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(i)}
                className={`flex-shrink-0 w-24 h-14 rounded-lg border-2 p-1 transition-all text-[6px] overflow-hidden ${
                  i === currentSlide ? 'border-primary-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ background: template.colors.bg, color: template.colors.text }}
              >
                <div className="truncate font-bold" style={{ color: template.colors.heading, fontSize: '7px' }}>
                  {s.title}
                </div>
              </button>
            ))}
          </div>

          {/* Main view */}
          <div ref={printRef}>
            {mode === 'preview' ? (
              <SlideView
                slide={slides[currentSlide]}
                template={template}
                slideNum={currentSlide + 1}
                total={slides.length}
              />
            ) : (
              <div className="space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Edit Slide {currentSlide + 1}</h3>
                  <button
                    onClick={() => deleteSlide(currentSlide)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete slide"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={slides[currentSlide].title}
                    onChange={(e) => updateSlide(currentSlide, 'title', e.target.value)}
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
                  <textarea
                    value={slides[currentSlide].body}
                    onChange={(e) => updateSlide(currentSlide, 'body', e.target.value)}
                    rows={4}
                    className="input w-full"
                  />
                </div>

                {slides[currentSlide].bullets && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Bullet Points</label>
                    {slides[currentSlide].bullets!.map((b, bi) => (
                      <div key={bi} className="flex items-center gap-2 mb-2">
                        <span className="text-primary-500 font-bold">●</span>
                        <input
                          type="text"
                          value={b}
                          onChange={(e) => updateBullet(currentSlide, bi, e.target.value)}
                          className="input flex-1"
                        />
                        <button onClick={() => removeBullet(currentSlide, bi)} className="text-red-400 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addBullet(currentSlide)} className="text-sm text-primary-600 hover:underline flex items-center gap-1">
                      <Plus size={14} /> Add bullet
                    </button>
                  </div>
                )}

                {slides[currentSlide].type === 'two-column' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Left Column</label>
                      <textarea
                        value={slides[currentSlide].leftCol || ''}
                        onChange={(e) => updateSlide(currentSlide, 'leftCol' as any, e.target.value)}
                        rows={5}
                        className="input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Right Column</label>
                      <textarea
                        value={slides[currentSlide].rightCol || ''}
                        onChange={(e) => updateSlide(currentSlide, 'rightCol' as any, e.target.value)}
                        rows={5}
                        className="input w-full"
                      />
                    </div>
                  </div>
                )}

                {slides[currentSlide].type === 'quote' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Quote</label>
                      <textarea
                        value={slides[currentSlide].quote || ''}
                        onChange={(e) => updateSlide(currentSlide, 'quote' as any, e.target.value)}
                        rows={3}
                        className="input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Author</label>
                      <input
                        type="text"
                        value={slides[currentSlide].author || ''}
                        onChange={(e) => updateSlide(currentSlide, 'author' as any, e.target.value)}
                        className="input w-full"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Keyboard hint */}
          <p className="text-xs text-gray-400 text-center">
            {isRu ? 'Используйте ← → для навигации. Режим редактирования позволяет изменить любой контент.' : 'Use ← → arrow keys to navigate slides. Edit mode lets you customize all content.'}
          </p>
        </div>
      )}
    </ToolLayout>
  );
}
