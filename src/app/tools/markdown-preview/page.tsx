'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

function parseMarkdown(md: string): string {
  let html = md
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm">$1</code>')
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    // Bold & Italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Strikethrough
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 underline" target="_blank">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-4" />')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary-300 pl-4 py-1 my-4 text-gray-600 italic">$1</blockquote>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="my-6 border-gray-200" />')
    // Unordered list
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    // Ordered list
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    // Line breaks / paragraphs
    .replace(/\n\n/g, '</p><p class="my-3">')
    .replace(/\n/g, '<br />');

  return `<div class="prose"><p class="my-3">${html}</p></div>`;
}

const texts = {
  en: {
    markdown: 'Markdown',
    preview: 'Preview',
    placeholder: 'Write your Markdown here...',
  },
  ru: {
    markdown: 'Редактор',
    preview: 'Предпросмотр',
    placeholder: 'Пишите Markdown здесь...',
  },
};

export default function MarkdownPreviewPage() {
  const { locale } = useLanguage();
  const tx = texts[locale];

  const [md, setMd] = useState(`# Hello World

This is a **Markdown** preview tool.

## Features
- **Bold**, *italic*, ~~strikethrough~~
- [Links](https://example.com)
- \`inline code\`

### Code Block
\`\`\`javascript
const greeting = "Hello!";
console.log(greeting);
\`\`\`

> Blockquotes are supported too!

---

1. Ordered lists
2. Work as well
`);

  return (
    <ToolLayout
      title="Markdown Preview"
      description="Write Markdown and see a live preview in real time."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tx.markdown}</label>
          <textarea
            value={md}
            onChange={(e) => setMd(e.target.value)}
            className="tool-textarea !min-h-[400px]"
            placeholder={tx.placeholder}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tx.preview}</label>
          <div
            className="rounded-xl border border-gray-200 bg-white p-6 min-h-[400px] overflow-auto"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(md) }}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
