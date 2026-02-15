'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';

type SchemaType = 'Organization' | 'Article' | 'Product' | 'LocalBusiness' | 'FAQ' | 'BreadcrumbList';

const templates: Record<SchemaType, object> = {
  Organization: { "@context": "https://schema.org", "@type": "Organization", name: "Your Company", url: "https://example.com", logo: "https://example.com/logo.png", contactPoint: { "@type": "ContactPoint", telephone: "+1-555-555-5555", contactType: "customer service" } },
  Article: { "@context": "https://schema.org", "@type": "Article", headline: "Article Title", author: { "@type": "Person", name: "Author Name" }, datePublished: new Date().toISOString().split('T')[0], description: "Article description", image: "https://example.com/image.jpg" },
  Product: { "@context": "https://schema.org", "@type": "Product", name: "Product Name", description: "Product description", image: "https://example.com/product.jpg", offers: { "@type": "Offer", price: "29.99", priceCurrency: "USD", availability: "https://schema.org/InStock" } },
  LocalBusiness: { "@context": "https://schema.org", "@type": "LocalBusiness", name: "Business Name", address: { "@type": "PostalAddress", streetAddress: "123 Main St", addressLocality: "City", addressRegion: "State", postalCode: "12345" }, telephone: "+1-555-555-5555" },
  FAQ: { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this?", acceptedAnswer: { "@type": "Answer", text: "This is an example." } }] },
  BreadcrumbList: { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://example.com" }, { "@type": "ListItem", position: 2, name: "Category", item: "https://example.com/cat" }] },
};

export default function StructuredDataPage() {
  const texts = {
    en: {
      htmlScriptTag: 'HTML Script Tag',
    },
    ru: {
      htmlScriptTag: 'HTML Script-тег',
    },
  };
  const { locale } = useLanguage();
  const tx = texts[locale];

  const [type, setType] = useState<SchemaType>('Organization');
  const [json, setJson] = useState(JSON.stringify(templates['Organization'], null, 2));

  const selectType = (t: SchemaType) => { setType(t); setJson(JSON.stringify(templates[t], null, 2)); };

  const script = `<script type="application/ld+json">\n${json}\n</script>`;

  return (
    <ToolLayout title="Structured Data Generator" description="Generate JSON-LD structured data for rich search results.">
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(templates) as SchemaType[]).map(t => (
          <button key={t} onClick={() => selectType(t)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${type === t ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t}</button>
        ))}
      </div>
      <textarea value={json} onChange={e => setJson(e.target.value)} className="tool-textarea font-mono !text-sm h-64" />
      <div className="flex items-center justify-between mt-4 mb-2"><h3 className="text-sm font-semibold text-gray-700">{tx.htmlScriptTag}</h3><CopyButton text={script} /></div>
      <pre className="result-box !text-xs overflow-x-auto">{script}</pre>
    </ToolLayout>
  );
}
