import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Markdown Preview — Live Markdown Editor',
  description: 'Free online Markdown editor with live preview. Write Markdown and see formatted output in real time.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
