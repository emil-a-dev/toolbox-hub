'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 prose prose-gray max-w-none">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: February 15, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Overview</h2>
        <p className="text-gray-600 leading-relaxed">
          ToolBox Hub (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your
          privacy. This Privacy Policy explains what information we collect (spoiler: almost none)
          and how we use it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Data Processing</h2>
        <p className="text-gray-600 leading-relaxed">
          All tools on ToolBox Hub run <strong>entirely in your browser</strong>. No text, files,
          images, or any other data you input into our tools is ever transmitted to our servers or any
          third party. Your data stays on your device at all times.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Analytics</h2>
        <p className="text-gray-600 leading-relaxed">
          We may use analytics services (such as Google Analytics and Yandex Metrika) to collect
          anonymous, aggregated usage data including:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
          <li>Pages visited and time spent on page</li>
          <li>Referring website</li>
          <li>Browser type and operating system</li>
          <li>Approximate geographic location (country/city level)</li>
        </ul>
        <p className="text-gray-600 leading-relaxed mt-2">
          This data is used solely to understand how our tools are used and to improve the service. No
          personally identifiable information is collected through analytics.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Cookies</h2>
        <p className="text-gray-600 leading-relaxed">
          We may use cookies for analytics purposes. These cookies do not contain any personal
          information. You can disable cookies in your browser settings at any time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Advertising</h2>
        <p className="text-gray-600 leading-relaxed">
          We may display advertisements through Google AdSense. Google may use cookies to serve ads
          based on your prior visits to this or other websites. You can opt out of personalized
          advertising by visiting{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            Google Ads Settings
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Third-Party Links</h2>
        <p className="text-gray-600 leading-relaxed">
          Our site may contain links to third-party websites. We are not responsible for the privacy
          practices of those sites. We encourage you to read their privacy policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Children&apos;s Privacy</h2>
        <p className="text-gray-600 leading-relaxed">
          ToolBox Hub is not directed at children under 13. We do not knowingly collect personal
          information from children.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
        <p className="text-gray-600 leading-relaxed">
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with an updated &quot;Last updated&quot; date.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Contact</h2>
        <p className="text-gray-600 leading-relaxed">
          If you have questions about this Privacy Policy, please contact us via{' '}
          <a
            href="https://github.com/emil-a-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </section>

      <div className="mt-10 pt-6 border-t border-gray-100">
        <Link href="/" className="text-sm text-primary-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
