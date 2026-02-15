'use client';

import { useState, useRef } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function WifiQrPage() {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [hidden, setHidden] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);

  const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;

  const generate = async () => {
    if (!ssid) return;
    const QRCode = (await import('qrcode')).default;
    if (canvasRef.current) {
      await QRCode.toCanvas(canvasRef.current, wifiString, { width: 300, margin: 2, color: { dark: '#1a1a2e', light: '#ffffff' } });
      setGenerated(true);
    }
  };

  const download = () => {
    if (!canvasRef.current) return;
    const a = document.createElement('a');
    a.href = canvasRef.current.toDataURL('image/png');
    a.download = `wifi-${ssid}.png`;
    a.click();
  };

  return (
    <ToolLayout title="WiFi QR Code Generator" description="Generate a QR code to share your WiFi network. Scan with any phone to connect.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Network Name (SSID)</label><input type="text" value={ssid} onChange={e => setSsid(e.target.value)} className="tool-input" placeholder="MyWiFiNetwork" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="text" value={password} onChange={e => setPassword(e.target.value)} className="tool-input" placeholder="Password" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Encryption</label>
            <select value={encryption} onChange={e => setEncryption(e.target.value as 'WPA' | 'WEP' | 'nopass')} className="tool-input">
              <option value="WPA">WPA/WPA2</option><option value="WEP">WEP</option><option value="nopass">None</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={hidden} onChange={e => setHidden(e.target.checked)} /> Hidden network</label>
          <button onClick={generate} className="tool-btn w-full">Generate QR Code</button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className={`rounded-2xl bg-white border-2 border-gray-200 p-4 ${generated ? '' : 'flex items-center justify-center min-h-[300px] text-gray-400'}`}>
            <canvas ref={canvasRef} className={generated ? '' : 'hidden'} />
            {!generated && <span>QR code will appear here</span>}
          </div>
          {generated && <button onClick={download} className="mt-4 text-sm text-primary-600 hover:text-primary-800">📥 Download PNG</button>}
        </div>
      </div>
    </ToolLayout>
  );
}
