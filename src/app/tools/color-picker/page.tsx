'use client';

import { useState, useEffect } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!match) return null;
  return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorPickerPage() {
  const [hex, setHex] = useState('#3b82f6');
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const formats = rgb && hsl ? [
    { label: 'HEX', value: hex.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'RGBA', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
  ] : [];

  // Generate palette shades
  const shades = rgb ? [0.1, 0.3, 0.5, 0.7, 0.85, 1, 0.85, 0.7, 0.5, 0.3].map((factor, i) => {
    if (i < 5) {
      // Lighten: mix with white
      const f = factor;
      return '#' + [rgb.r, rgb.g, rgb.b].map(c => {
        const val = Math.round(c + (255 - c) * (1 - f));
        return val.toString(16).padStart(2, '0');
      }).join('');
    } else if (i === 5) {
      return hex;
    } else {
      // Darken: reduce
      const f = factor;
      return '#' + [rgb.r, rgb.g, rgb.b].map(c => {
        const val = Math.round(c * f);
        return val.toString(16).padStart(2, '0');
      }).join('');
    }
  }) : [];

  return (
    <ToolLayout
      title="Color Picker & Converter"
      description="Pick a color and convert between HEX, RGB, and HSL formats."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-20 h-20 rounded-xl cursor-pointer border-2 border-gray-200"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">HEX</label>
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="tool-input !w-36 font-mono"
              />
            </div>
          </div>

          {/* Color formats */}
          <div className="space-y-3">
            {formats.map((f) => (
              <div key={f.label} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <div>
                  <span className="text-xs text-gray-500">{f.label}</span>
                  <div className="font-mono text-sm">{f.value}</div>
                </div>
                <CopyButton text={f.value} />
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Color preview */}
          <div
            className="w-full h-32 rounded-2xl mb-6 border border-gray-200"
            style={{ backgroundColor: hex }}
          />

          {/* Shades */}
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Shades</h3>
          <div className="flex rounded-xl overflow-hidden">
            {shades.map((shade, i) => (
              <button
                key={i}
                className="flex-1 h-12 transition-transform hover:scale-y-110 cursor-pointer"
                style={{ backgroundColor: shade }}
                onClick={() => setHex(shade)}
                title={shade}
              />
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
