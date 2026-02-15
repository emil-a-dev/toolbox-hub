import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Case Converter — UPPER, lower, Title, camelCase & More',
  description: 'Free online text case converter. Convert text to uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
