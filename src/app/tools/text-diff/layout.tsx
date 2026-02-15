import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Text Diff — Compare Two Texts Online',
  description: 'Free online text diff tool. Compare two texts side by side and see added, removed, and unchanged lines.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
