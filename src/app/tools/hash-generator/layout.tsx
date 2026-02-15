import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Hash Generator — SHA-1, SHA-256, SHA-512 Online',
  description: 'Free online hash generator. Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from text instantly.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
