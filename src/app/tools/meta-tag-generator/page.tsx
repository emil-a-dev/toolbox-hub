'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function MetaTagPage() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [keywords, setKeywords] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('website');
  const [twitter, setTwitter] = useState('');

  const code = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${desc}">
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${type}">
${url ? `<meta property="og:url" content="${url}">` : ''}
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
${image ? `<meta property="og:image" content="${image}">` : ''}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
${url ? `<meta property="twitter:url" content="${url}">` : ''}
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${desc}">
${image ? `<meta property="twitter:image" content="${image}">` : ''}
${twitter ? `<meta property="twitter:creator" content="${twitter}">` : ''}`;

  return (
    <ToolLayout title="Meta Tag Generator" description="Generate meta tags for SEO and social media sharing.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} className="tool-input" placeholder="My Amazing Website" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">URL</label><input type="text" value={url} onChange={e => setUrl(e.target.value)} className="tool-input" placeholder="https://example.com" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} className="tool-textarea !h-20" placeholder="A brief description of your page..." /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label><input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} className="tool-input" placeholder="keyword1, keyword2" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label><input type="text" value={image} onChange={e => setImage(e.target.value)} className="tool-input" placeholder="https://example.com/image.jpg" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Type</label><select value={type} onChange={e => setType(e.target.value)} className="tool-input">{['website', 'article', 'product', 'profile'].map(t => <option key={t}>{t}</option>)}</select></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Twitter Handle</label><input type="text" value={twitter} onChange={e => setTwitter(e.target.value)} className="tool-input" placeholder="@username" /></div>
      </div>
      <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">Generated Meta Tags</h3><CopyButton text={code} /></div>
      <pre className="result-box !text-xs overflow-x-auto">{code}</pre>
    </ToolLayout>
  );
}
