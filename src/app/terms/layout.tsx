import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — ToolBox Hub',
  description:
    'Terms of Service for ToolBox Hub. Read about the rules governing your use of our free, browser-based online tools.',
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
