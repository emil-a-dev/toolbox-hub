import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Content Detector — ToolBox Hub',
  description:
    'Detect AI-generated text with statistical analysis. Analyze sentence patterns, vocabulary diversity, burstiness, and common AI phrases.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
