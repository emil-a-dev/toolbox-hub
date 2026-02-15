'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function PrivacyPolicyPage() {
  const [site, setSite] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [analytics, setAnalytics] = useState(true);
  const [cookies, setCookies] = useState(true);
  const [ads, setAds] = useState(false);

  const policy = `# Privacy Policy

**Last updated:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

${company || 'We'} operate${site ? ` ${site}` : ' this website'}. This page informs you of our policies regarding the collection, use, and disclosure of personal data.

## Information Collection
${analytics ? `\n### Analytics\nWe use third-party analytics services (such as Google Analytics) to monitor and analyze the use of our website. These services may collect information about your browsing behavior.\n` : ''}
${cookies ? `\n### Cookies\nWe use cookies and similar tracking technologies to track activity on our website. Cookies are files with a small amount of data. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.\n` : ''}
${ads ? `\n### Advertising\nWe may use third-party advertising companies to serve ads when you visit our website. These companies may use information about your visits to provide relevant advertisements.\n` : ''}
## Data Usage
We use the collected data for:
- Providing and maintaining the website
- Notifying you about changes
- Providing customer support
- Monitoring website usage
- Detecting and preventing technical issues

## Data Security
The security of your data is important to us, but no method of transmission over the Internet is 100% secure. We strive to use commercially acceptable means to protect your data.

## Third-Party Links
Our website may contain links to other sites. We have no control over and assume no responsibility for the content or privacy policies of any third-party sites.

## Children's Privacy
Our website does not address anyone under the age of 13. We do not knowingly collect personal information from children under 13.

## Changes to This Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

## Contact Us
If you have any questions about this Privacy Policy, please contact us${email ? ` at ${email}` : ''}.`;

  return (
    <ToolLayout title="Privacy Policy Generator" description="Generate a basic privacy policy for your website.">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label><input type="text" value={site} onChange={(e) => setSite(e.target.value)} placeholder="https://example.com" className="tool-input" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label><input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." className="tool-input" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="privacy@example.com" className="tool-input" /></div>
      </div>
      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="rounded" /> Analytics</label>
        <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={cookies} onChange={(e) => setCookies(e.target.checked)} className="rounded" /> Cookies</label>
        <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={ads} onChange={(e) => setAds(e.target.checked)} className="rounded" /> Advertising</label>
      </div>
      <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-700">Generated Policy</h3><CopyButton text={policy} /></div>
      <div className="result-box !whitespace-pre-wrap !max-h-[500px] overflow-y-auto">{policy}</div>
    </ToolLayout>
  );
}
