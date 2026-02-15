'use client';

import { useState, useEffect } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

export default function ScreenResolutionPage() {
  const [info, setInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    const update = () => setInfo({
      'Screen Width': `${screen.width}px`,
      'Screen Height': `${screen.height}px`,
      'Available Width': `${screen.availWidth}px`,
      'Available Height': `${screen.availHeight}px`,
      'Window Inner Width': `${window.innerWidth}px`,
      'Window Inner Height': `${window.innerHeight}px`,
      'Window Outer Width': `${window.outerWidth}px`,
      'Window Outer Height': `${window.outerHeight}px`,
      'Device Pixel Ratio': `${window.devicePixelRatio}`,
      'Color Depth': `${screen.colorDepth} bit`,
      'Orientation': screen.orientation?.type || 'unknown',
      'Touch Support': 'ontouchstart' in window ? 'Yes' : 'No',
    });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const allText = Object.entries(info).map(([k, v]) => `${k}: ${v}`).join('\n');

  return (
    <ToolLayout title="Screen Resolution Detector" description="Detect your screen resolution, viewport size, and display info.">
      <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 p-8 text-center mb-6">
        <div className="text-sm text-primary-600 mb-1">Your Screen Resolution</div>
        <div className="text-5xl font-bold text-primary-800">{info['Screen Width']} × {info['Screen Height']}</div>
        <div className="text-lg text-primary-600 mt-2">Viewport: {info['Window Inner Width']} × {info['Window Inner Height']}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {Object.entries(info).map(([key, val]) => (
          <div key={key} className="flex justify-between items-center rounded-lg bg-gray-50 px-4 py-3">
            <span className="text-sm text-gray-600">{key}</span>
            <span className="text-sm font-mono font-bold text-gray-800">{val}</span>
          </div>
        ))}
      </div>
      <CopyButton text={allText} />
    </ToolLayout>
  );
}
