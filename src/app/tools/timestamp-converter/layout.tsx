import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Timestamp Converter — Unix Timestamp to Date Online',
  description: 'Free online Unix timestamp converter. Convert between timestamps and dates with a live clock.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
