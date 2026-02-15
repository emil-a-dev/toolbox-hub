'use client';

import { useState, useRef } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import {
  Presentation, Download, Plus, Trash2, ChevronLeft, ChevronRight,
  Edit3, Eye, Palette, FileText, Sparkles, Layout,
} from 'lucide-react';

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

function generatePresentation(topic: string, slideCount: number): Slide[] {
  const t = topic.trim();
  const slides: Slide[] = [];
  let id = 0;

  // Title slide
  slides.push({
    id: id++,
    type: 'title',
    title: t,
    body: `Comprehensive overview and key insights\nPrepared ${new Date().toLocaleDateString()}`,
  });

  // Introduction
  slides.push({
    id: id++,
    type: 'content',
    title: `Introduction to ${t}`,
    body: `This presentation explores the key aspects of "${t}". We will cover fundamental concepts, current trends, important data points, and actionable conclusions. The goal is to provide a clear and structured understanding of this topic.`,
  });

  // Overview bullets
  slides.push({
    id: id++,
    type: 'bullets',
    title: 'Agenda',
    body: '',
    bullets: [
      'Background & Context',
      'Key Concepts & Definitions',
      'Current State & Trends',
      'Data & Analysis',
      'Challenges & Opportunities',
      'Conclusions & Next Steps',
    ],
  });

  // Background
  slides.push({
    id: id++,
    type: 'content',
    title: 'Background & Context',
    body: `Understanding the background of "${t}" is essential for grasping its full significance. This field has evolved significantly over recent years, driven by technological innovation, changing market dynamics, and growing interest from both professionals and the general public.`,
  });

  // Key concepts - two column
  slides.push({
    id: id++,
    type: 'two-column',
    title: 'Key Concepts',
    body: '',
    leftCol: `Core Principles:\n\n• Foundational theory and frameworks\n• Essential terminology\n• Historical development\n• Academic perspective`,
    rightCol: `Practical Applications:\n\n• Real-world use cases\n• Industry implementations\n• Best practices\n• Common methodologies`,
  });

  // Statistics
  slides.push({
    id: id++,
    type: 'bullets',
    title: 'Key Data Points',
    body: `Important metrics and statistics related to "${t}":`,
    bullets: [
      'Growing market demand — increasing interest year-over-year',
      'Adoption rate accelerating across multiple industries',
      'Significant ROI documented in case studies',
      'Expanding ecosystem of tools and resources',
      'Rising investment and research funding',
    ],
  });

  // Quote
  slides.push({
    id: id++,
    type: 'quote',
    title: 'Expert Perspective',
    body: '',
    quote: `"The future belongs to those who understand and embrace the transformative potential of ${t.toLowerCase()}."`,
    author: 'Industry Expert',
  });

  // Challenges
  slides.push({
    id: id++,
    type: 'two-column',
    title: 'Challenges & Solutions',
    body: '',
    leftCol: `Challenges:\n\n• Learning curve for newcomers\n• Resource constraints\n• Integration complexity\n• Rapid pace of change`,
    rightCol: `Solutions:\n\n• Structured education programs\n• Scalable approaches\n• Modular architectures\n• Continuous learning culture`,
  });

  // Trends
  slides.push({
    id: id++,
    type: 'bullets',
    title: 'Current Trends',
    body: `What is shaping the landscape of "${t}" right now:`,
    bullets: [
      'AI and automation integration',
      'Data-driven decision making',
      'Sustainability and ethical considerations',
      'Globalization and remote collaboration',
      'Open-source community contributions',
    ],
  });

  // Best practices
  slides.push({
    id: id++,
    type: 'content',
    title: 'Best Practices',
    body: `To achieve the best results with "${t}", consider these proven approaches: Start with a clear strategy and measurable goals. Invest in continuous education and skill development. Leverage data and analytics for informed decision-making. Foster collaboration between teams and stakeholders. Stay updated with the latest developments and adapt accordingly.`,
  });

  // Conclusions
  slides.push({
    id: id++,
    type: 'bullets',
    title: 'Conclusions',
    body: 'Key takeaways from this presentation:',
    bullets: [
      `${t} is a significant and evolving field`,
      'Understanding the fundamentals is crucial for success',
      'Data-driven approaches yield the best results',
      'Continuous learning and adaptation are essential',
      'Opportunities outweigh challenges for prepared organizations',
    ],
  });

  // End slide
  slides.push({
    id: id++,
    type: 'end',
    title: 'Thank You!',
    body: `Questions & Discussion\n\n${t}\n\nPresentation generated by ToolBox Hub`,
  });

  // Trim or pad to desired count
  if (slides.length > slideCount) {
    // Keep title + end, trim middle
    const core = slides.slice(0, slideCount - 1);
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
  const printRef = useRef<HTMLDivElement>(null);

  const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];

  const handleGenerate = () => {
    if (!topic.trim()) return;
    const gen = generatePresentation(topic, slideCount);
    setSlides(gen);
    setCurrentSlide(0);
    setMode('preview');
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Presentation Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Artificial Intelligence in Education"
            className="input w-full text-lg"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Slides</label>
            <input
              type="range"
              min={5}
              max={15}
              value={slideCount}
              onChange={(e) => setSlideCount(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{slideCount} slides</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
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
          disabled={!topic.trim()}
          className="btn btn-primary w-full sm:w-auto flex items-center gap-2"
        >
          <Sparkles size={18} />
          Generate Presentation
        </button>
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
            Use ← → arrow keys to navigate slides. Edit mode lets you customize all content.
          </p>
        </div>
      )}
    </ToolLayout>
  );
}
