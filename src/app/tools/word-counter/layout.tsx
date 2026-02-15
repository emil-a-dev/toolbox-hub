import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word Counter — Count Words, Characters & Sentences',
  description: 'Free online word counter tool. Count words, characters, sentences, paragraphs, and estimate reading time. No registration needed.',
};

export default function WordCounterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
