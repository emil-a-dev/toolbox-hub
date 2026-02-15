import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Password Strength Checker — Test Your Password',
  description: 'Free online password strength checker. Analyze your password strength, entropy, and get suggestions for improvement.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
