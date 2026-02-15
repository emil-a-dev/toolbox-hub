'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

interface StrengthResult {
  score: number; // 0-4
  label: string;
  color: string;
  feedback: string[];
}

function checkStrength(password: string): StrengthResult {
  const feedback: string[] = [];
  let score = 0;

  if (!password) return { score: 0, label: 'Enter a password', color: 'bg-gray-200', feedback: [] };

  // Length
  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  // Character variety
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  const variety = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
  if (variety >= 3) score++;
  if (variety === 4) score++;

  if (!hasUpper) feedback.push('Add uppercase letters');
  if (!hasLower) feedback.push('Add lowercase letters');
  if (!hasNumber) feedback.push('Add numbers');
  if (!hasSymbol) feedback.push('Add special characters (!@#$...)');

  // Common patterns
  if (/^[0-9]+$/.test(password)) { score = Math.max(0, score - 2); feedback.push('Avoid all-number passwords'); }
  if (/(.)\1{2,}/.test(password)) { score = Math.max(0, score - 1); feedback.push('Avoid repeated characters'); }
  if (/^(password|123456|qwerty|admin|letmein)/i.test(password)) { score = 0; feedback.push('This is a commonly used password'); }
  if (/^(abc|123|qwe)/i.test(password)) { feedback.push('Avoid sequential patterns'); }

  score = Math.min(4, Math.max(0, score));

  const labels: [string, string][] = [
    ['Very Weak', 'bg-red-500'],
    ['Weak', 'bg-orange-500'],
    ['Fair', 'bg-yellow-500'],
    ['Strong', 'bg-lime-500'],
    ['Very Strong', 'bg-emerald-500'],
  ];

  return {
    score,
    label: labels[score][0],
    color: labels[score][1],
    feedback: feedback.slice(0, 4),
  };
}

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState('');
  const result = checkStrength(password);

  const entropy = password.length > 0
    ? Math.round(password.length * Math.log2(
        ((/[a-z]/.test(password) ? 26 : 0) +
         (/[A-Z]/.test(password) ? 26 : 0) +
         (/[0-9]/.test(password) ? 10 : 0) +
         (/[^a-zA-Z0-9]/.test(password) ? 32 : 0)) || 1
      ))
    : 0;

  return (
    <ToolLayout
      title="Password Strength Checker"
      description="Check how strong your password is. Nothing is sent to any server."
    >
      <div className="max-w-xl">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
          className="tool-input text-lg"
          autoComplete="off"
        />

        {password && (
          <div className="mt-6 animate-fade-in">
            {/* Strength bar */}
            <div className="flex gap-1.5 mb-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    i <= result.score ? result.color : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">{result.label}</span>
              <span className="text-sm text-gray-500">~{entropy} bits of entropy</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-sm text-gray-500">Length</div>
                <div className="text-lg font-semibold">{password.length}</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-sm text-gray-500">Unique chars</div>
                <div className="text-lg font-semibold">{new Set(password).size}</div>
              </div>
            </div>

            {/* Feedback */}
            {result.feedback.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">Suggestions:</h3>
                {result.feedback.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-orange-500">⚠</span>
                    {f}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
