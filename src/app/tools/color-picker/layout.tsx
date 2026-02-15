import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Color Picker & Converter — HEX, RGB, HSL Online',
  description: 'Free online color picker and converter. Pick colors and convert between HEX, RGB, HSL formats.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
