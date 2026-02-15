'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function OgPreviewPage() {
  const [title, setTitle] = useState('My Amazing Website');
  const [desc, setDesc] = useState('This is a brief description of the page content that will appear in social media shares.');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('https://example.com');
  const [siteName, setSiteName] = useState('Example');

  return (
    <ToolLayout title="Open Graph Preview" description="Preview how your page looks when shared on social media.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} className="tool-input" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">URL</label><input type="text" value={url} onChange={e => setUrl(e.target.value)} className="tool-input" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={desc} onChange={e => setDesc(e.target.value)} className="tool-textarea !h-16" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label><input type="text" value={image} onChange={e => setImage(e.target.value)} className="tool-input" placeholder="https://example.com/og-image.jpg" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label><input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} className="tool-input" /></div>
      </div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
      <div className="space-y-6">
        {/* Facebook style */}
        <div><div className="text-xs text-gray-500 mb-1 font-semibold">Facebook / LinkedIn</div>
          <div className="max-w-lg rounded-lg border border-gray-300 overflow-hidden bg-gray-50">
            {image && <div className="h-48 bg-gray-200 overflow-hidden"><img src={image} alt="" className="w-full h-full object-cover" onError={e => (e.target as HTMLImageElement).style.display = 'none'} /></div>}
            <div className="p-3"><div className="text-xs text-gray-500 uppercase">{new URL(url || 'https://example.com').hostname}</div><div className="font-semibold text-gray-900 text-sm mt-1">{title}</div><div className="text-xs text-gray-500 mt-1 line-clamp-2">{desc}</div></div>
          </div>
        </div>
        {/* Twitter style */}
        <div><div className="text-xs text-gray-500 mb-1 font-semibold">Twitter / X</div>
          <div className="max-w-lg rounded-2xl border border-gray-200 overflow-hidden">
            {image && <div className="h-48 bg-gray-200 overflow-hidden"><img src={image} alt="" className="w-full h-full object-cover" onError={e => (e.target as HTMLImageElement).style.display = 'none'} /></div>}
            <div className="p-3"><div className="font-semibold text-gray-900 text-sm">{title}</div><div className="text-sm text-gray-500 mt-0.5 line-clamp-2">{desc}</div><div className="text-xs text-gray-400 mt-1">🔗 {new URL(url || 'https://example.com').hostname}</div></div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
