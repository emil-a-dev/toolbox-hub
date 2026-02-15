'use client';

import { useState, useEffect } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { useLanguage } from '@/components/LanguageProvider';
import { Play, Pause, Square } from 'lucide-react';

const texts = {
  en: {
    placeholder: 'Enter text to speak...',
    voice: 'Voice',
    speed: 'Speed',
    pitch: 'Pitch',
    speak: 'Speak',
    pause: 'Pause',
    resume: 'Resume',
    stop: 'Stop',
  },
  ru: {
    placeholder: 'Введите текст для озвучивания...',
    voice: 'Голос',
    speed: 'Скорость',
    pitch: 'Тон',
    speak: 'Озвучить',
    pause: 'Пауза',
    resume: 'Продолжить',
    stop: 'Стоп',
  },
};

export default function TextToSpeechPage() {
  const { locale } = useLanguage();
  const tx = texts[locale];

  const [text, setText] = useState('Hello! This is a text to speech demo. Try typing something.');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const v = speechSynthesis.getVoices();
      if (v.length) setVoices(v);
    };
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const speak = () => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voices[selectedVoice]) utterance.voice = voices[selectedVoice];
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const stop = () => { speechSynthesis.cancel(); setSpeaking(false); };
  const pause = () => { speechSynthesis.pause(); setSpeaking(false); };
  const resume = () => { speechSynthesis.resume(); setSpeaking(true); };

  return (
    <ToolLayout title="Text to Speech" description="Convert text to speech using your browser's built-in speech synthesis.">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={tx.placeholder} className="tool-textarea !min-h-[150px]" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tx.voice}</label>
          <select value={selectedVoice} onChange={(e) => setSelectedVoice(Number(e.target.value))} className="tool-input">
            {voices.map((v, i) => <option key={i} value={i}>{v.name} ({v.lang})</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tx.speed}: {rate}x</label>
          <input type="range" min={0.25} max={4} step={0.25} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{tx.pitch}: {pitch}</label>
          <input type="range" min={0} max={2} step={0.1} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full" />
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={speak} className="tool-btn"><Play size={16} /> {tx.speak}</button>
        {speaking && <button onClick={pause} className="tool-btn-secondary"><Pause size={16} /> {tx.pause}</button>}
        {!speaking && <button onClick={resume} className="tool-btn-secondary"><Play size={16} /> {tx.resume}</button>}
        <button onClick={stop} className="tool-btn-secondary"><Square size={16} /> {tx.stop}</button>
      </div>
    </ToolLayout>
  );
}
