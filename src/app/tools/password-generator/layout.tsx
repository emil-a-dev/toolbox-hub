import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Password Generator — Generate Strong Random Passwords',
  description: 'Free online password generator. Create strong, cryptographically secure random passwords with custom length and character sets.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
