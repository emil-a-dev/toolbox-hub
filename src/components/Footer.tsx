'use client';

import Link from 'next/link';
import { Heart, Github } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-100 bg-white mt-8 sm:mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">🧰 ToolBox Hub</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t('footer.brand.desc')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">{t('footer.popular')}</h4>
            <ul className="space-y-2">
              {[
                { name: 'JSON Formatter', href: '/tools/json-formatter' },
                { name: 'Password Generator', href: '/tools/password-generator' },
                { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
                { name: 'QR Code Generator', href: '/tools/qr-code-generator' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">{t('footer.about')}</h4>
            <ul className="space-y-2 mb-3">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
            <a href="https://github.com/emil-a-dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
              <Github size={16} /> github.com/emil-a-dev
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            {t('footer.madeWith')} <Heart size={12} className="text-red-500 fill-red-500" /> {t('footer.by')} <a href="https://github.com/emil-a-dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors">emil-a-dev</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
