import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — ToolBox Hub',
  description:
    'Learn about ToolBox Hub — a free, open-source collection of 90+ online tools that run entirely in your browser. No data is ever sent to a server.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
