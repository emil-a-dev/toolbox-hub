import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — ToolBox Hub',
  description:
    'ToolBox Hub Privacy Policy. All tools run in your browser — no data is sent to servers. Learn about our minimal analytics and cookie usage.',
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
