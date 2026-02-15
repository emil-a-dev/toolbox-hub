'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Wrench, Menu, X, Github, Languages } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  const toggleLocale = () => setLocale(locale === 'en' ? 'ru' : 'en');

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white transition-transform group-hover:scale-110">
            <Wrench size={18} />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            ToolBox Hub
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#text" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
            {t('nav.textTools')}
          </Link>
          <Link href="/#dev" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
            {t('nav.developer')}
          </Link>
          <Link href="/#security" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
            {t('nav.security')}
          </Link>
          <Link href="/#utility" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
            {t('nav.utilities')}
          </Link>
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-600 transition-colors"
            title={locale === 'en' ? 'Переключить на русский' : 'Switch to English'}
          >
            <Languages size={18} />
            <span className="uppercase font-medium">{locale}</span>
          </button>
          <a href="https://github.com/emil-a-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-600 transition-colors">
            <Github size={18} />
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLocale}
            className="p-2 rounded-lg hover:bg-gray-100 text-sm font-medium text-gray-600 uppercase"
          >
            {locale === 'en' ? 'RU' : 'EN'}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 animate-fade-in">
          <Link href="/#text" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 hover:text-primary-600">
            {t('nav.textTools')}
          </Link>
          <Link href="/#dev" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 hover:text-primary-600">
            {t('nav.developer')}
          </Link>
          <Link href="/#security" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 hover:text-primary-600">
            {t('nav.security')}
          </Link>
          <Link href="/#utility" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 hover:text-primary-600">
            {t('nav.utilities')}
          </Link>
          <a href="https://github.com/emil-a-dev" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600">
            <Github size={16} /> GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
