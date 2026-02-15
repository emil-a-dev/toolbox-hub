'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

export default function CoinDicePage() {
  const [coinResult, setCoinResult] = useState<string | null>(null);
  const [coinFlipping, setCoinFlipping] = useState(false);
  const [diceCount, setDiceCount] = useState(1);
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [diceRolling, setDiceRolling] = useState(false);

  const flipCoin = () => {
    setCoinFlipping(true);
    setTimeout(() => { setCoinResult(Math.random() < 0.5 ? 'Heads' : 'Tails'); setCoinFlipping(false); }, 500);
  };

  const rollDice = () => {
    setDiceRolling(true);
    setTimeout(() => { setDiceResults(Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1)); setDiceRolling(false); }, 400);
  };

  const diceFaces: Record<number, string> = { 1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅' };

  return (
    <ToolLayout title="Coin Flip & Dice Roller" description="Flip a coin or roll dice with a click.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-gray-200 p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🪙 Coin Flip</h3>
          <div className={`text-6xl mb-4 transition-transform ${coinFlipping ? 'animate-spin' : ''}`}>
            {coinResult === 'Heads' ? '👑' : coinResult === 'Tails' ? '🏛️' : '🪙'}
          </div>
          {coinResult && !coinFlipping && <div className="text-2xl font-bold text-primary-600 mb-4">{coinResult}!</div>}
          <button onClick={flipCoin} disabled={coinFlipping} className="tool-btn">{coinFlipping ? 'Flipping...' : 'Flip Coin'}</button>
        </div>
        <div className="rounded-xl border border-gray-200 p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🎲 Dice Roller</h3>
          <div className="flex items-center justify-center gap-2 mb-4">
            <label className="text-sm text-gray-600">Dice:</label>
            <input type="number" min={1} max={10} value={diceCount} onChange={e => setDiceCount(Math.min(10, Math.max(1, Number(e.target.value))))} className="tool-input !w-16 text-center" />
          </div>
          <div className="flex justify-center gap-2 flex-wrap mb-4 min-h-[64px]">
            {diceResults.map((d, i) => <span key={i} className="text-5xl">{diceFaces[d]}</span>)}
          </div>
          {diceResults.length > 1 && <div className="text-lg font-semibold text-primary-600 mb-3">Total: {diceResults.reduce((a, b) => a + b, 0)}</div>}
          <button onClick={rollDice} disabled={diceRolling} className="tool-btn">{diceRolling ? 'Rolling...' : 'Roll Dice'}</button>
        </div>
      </div>
    </ToolLayout>
  );
}
