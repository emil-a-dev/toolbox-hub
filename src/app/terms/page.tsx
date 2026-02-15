'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 prose prose-gray max-w-none">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: February 15, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
        <p className="text-gray-600 leading-relaxed">
          By accessing and using ToolBox Hub (&quot;the Service&quot;), you agree to be bound by these
          Terms of Service. If you do not agree to these terms, please do not use the Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
        <p className="text-gray-600 leading-relaxed">
          ToolBox Hub provides a collection of free, browser-based online tools for text processing,
          development, security, design, and other purposes. All tools run entirely in your browser
          and do not transmit your data to any server.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Use of the Service</h2>
        <p className="text-gray-600 leading-relaxed">You agree to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
          <li>Use the Service only for lawful purposes</li>
          <li>Not attempt to disrupt or overload the Service</li>
          <li>Not reverse-engineer or exploit the Service in unauthorized ways</li>
          <li>Not use the Service to process illegal or harmful content</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
        <p className="text-gray-600 leading-relaxed">
          ToolBox Hub is open-source software. The source code is available on{' '}
          <a
            href="https://github.com/emil-a-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            GitHub
          </a>
          . You are free to use, modify, and distribute the code in accordance with the applicable
          open-source license.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Disclaimer of Warranties</h2>
        <p className="text-gray-600 leading-relaxed">
          The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of
          any kind, either express or implied. We do not guarantee that the Service will be
          uninterrupted, error-free, or that the results obtained from the tools will be accurate.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
        <p className="text-gray-600 leading-relaxed">
          In no event shall ToolBox Hub, its creators, or contributors be liable for any direct,
          indirect, incidental, special, consequential, or punitive damages arising out of or relating
          to your use of the Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Privacy</h2>
        <p className="text-gray-600 leading-relaxed">
          Your use of the Service is also governed by our{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </Link>
          , which describes how we handle information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Changes to Terms</h2>
        <p className="text-gray-600 leading-relaxed">
          We reserve the right to modify these Terms at any time. Changes will be posted on this page
          with an updated date. Continued use of the Service constitutes acceptance of the updated
          Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Contact</h2>
        <p className="text-gray-600 leading-relaxed">
          Questions about these Terms? Reach out via{' '}
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
