import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Presentation Generator — ToolBox Hub',
  description: 'Generate beautiful presentations on any topic. Choose a template, enter your topic, and get a ready-made slide deck. Export as HTML or print to PDF.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
