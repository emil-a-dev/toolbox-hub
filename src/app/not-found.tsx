import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-6">The tool you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="tool-btn">
        ← Back to All Tools
      </Link>
    </div>
  );
}
