import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plagiarism Checker — ToolBox Hub',
  description: 'Check your text for plagiarism. Analyze text uniqueness, find duplicate fragments, and get a detailed originality report. 100% client-side.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
