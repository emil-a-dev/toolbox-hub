'use client';

import Link from 'next/link';
import { Wrench, Shield, Zap, Globe, Github, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About ToolBox Hub</h1>
      <p className="text-lg text-gray-600 mb-10 leading-relaxed">
        ToolBox Hub is a free collection of 90+ online tools for developers, designers, writers, and
        everyday users. Every tool runs entirely in your browser — your data never leaves your device.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {[
          {
            icon: Shield,
            title: '100% Privacy',
            text: 'No server-side processing. All tools work client-side, so your data stays on your device.',
          },
          {
            icon: Zap,
            title: 'Lightning Fast',
            text: 'No uploads, no waiting. Everything executes instantly in your browser.',
          },
          {
            icon: Globe,
            title: 'Always Free',
            text: 'No registration, no subscriptions, no hidden fees. Free tools for everyone.',
          },
          {
            icon: Wrench,
            title: '90+ Tools',
            text: 'Text, developer, security, design, productivity, science, crypto, and much more.',
          },
        ].map((card) => (
          <div key={card.title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <card.icon className="text-primary-600 mb-3" size={28} />
            <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        We believe essential online tools should be accessible to everyone — without sacrificing
        privacy. Too many &quot;free&quot; tool sites track your every move, sell your data, or require
        sign-ups. ToolBox Hub is different: open source, transparent, and built with respect for
        users.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Open Source</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        ToolBox Hub is open source and available on GitHub. Contributions, bug reports, and feature
        requests are always welcome.
      </p>
      <a
        href="https://github.com/emil-a-dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
      >
        <Github size={18} /> View on GitHub
      </a>

      <hr className="my-10 border-gray-100" />

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Have a suggestion, found a bug, or want to collaborate? Open an issue on{' '}
        <a
          href="https://github.com/emil-a-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:underline"
        >
          GitHub
        </a>{' '}
        or reach out through the repository&apos;s Discussions page.
      </p>

      <div className="text-center mt-12">
        <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
          Made with <Heart size={14} className="text-red-500 fill-red-500" /> by{' '}
          <a
            href="https://github.com/emil-a-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            emil-a-dev
          </a>
        </p>
      </div>
    </div>
  );
}
