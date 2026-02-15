'use client';

import { Share2, Twitter, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Check out ${title} — free online tool!`
      )}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const shareReddit = () => {
    window.open(
      `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(
        `${title} — Free Online Tool`
      )}`,
      '_blank'
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
      <Share2 size={16} className="text-gray-400" />
      <span className="text-sm text-gray-500">Share:</span>
      <button
        onClick={shareTwitter}
        className="p-2 rounded-lg hover:bg-blue-50 text-gray-500 hover:text-blue-500 transition-colors"
        title="Share on X/Twitter"
      >
        <Twitter size={16} />
      </button>
      <button
        onClick={shareReddit}
        className="p-2 rounded-lg hover:bg-orange-50 text-gray-500 hover:text-orange-500 transition-colors text-sm font-bold"
        title="Share on Reddit"
      >
        r/
      </button>
      <button
        onClick={copyLink}
        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
        title="Copy link"
      >
        {copied ? <Check size={16} className="text-emerald-500" /> : <LinkIcon size={16} />}
      </button>
    </div>
  );
}
