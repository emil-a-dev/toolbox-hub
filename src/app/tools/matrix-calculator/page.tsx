'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

type Matrix = number[][];

const parseMatrix = (s: string): Matrix => s.trim().split('\n').map(row => row.trim().split(/[,\s]+/).map(Number));
const formatMatrix = (m: Matrix): string => m.map(row => row.map(v => v.toFixed(2).replace(/\.?0+$/, '')).join('\t')).join('\n');

function multiply(a: Matrix, b: Matrix): Matrix | null {
  if (a[0].length !== b.length) return null;
  return a.map(row => b[0].map((_, j) => row.reduce((sum, v, k) => sum + v * (b[k]?.[j] || 0), 0)));
}

function transpose(m: Matrix): Matrix {
  return m[0].map((_, i) => m.map(row => row[i]));
}

function determinant(m: Matrix): number | null {
  if (m.length !== m[0].length) return null;
  if (m.length === 1) return m[0][0];
  if (m.length === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  let det = 0;
  for (let j = 0; j < m.length; j++) {
    const sub = m.slice(1).map(row => [...row.slice(0, j), ...row.slice(j + 1)]);
    det += (j % 2 === 0 ? 1 : -1) * m[0][j] * (determinant(sub) || 0);
  }
  return det;
}

function add(a: Matrix, b: Matrix): Matrix | null {
  if (a.length !== b.length || a[0].length !== b[0].length) return null;
  return a.map((row, i) => row.map((v, j) => v + b[i][j]));
}

function scalarMul(m: Matrix, s: number): Matrix {
  return m.map(row => row.map(v => v * s));
}

export default function MatrixCalcPage() {
  const [matA, setMatA] = useState('1 2\n3 4');
  const [matB, setMatB] = useState('5 6\n7 8');
  const [scalar, setScalar] = useState(2);
  const [result, setResult] = useState('');
  const [op, setOp] = useState('');

  const run = (operation: string) => {
    const a = parseMatrix(matA);
    setOp(operation);
    switch (operation) {
      case 'A + B': { const b = parseMatrix(matB); const r = add(a, b); setResult(r ? formatMatrix(r) : 'Dimension mismatch'); break; }
      case 'A × B': { const b = parseMatrix(matB); const r = multiply(a, b); setResult(r ? formatMatrix(r) : 'Dimension mismatch'); break; }
      case 'Transpose A': setResult(formatMatrix(transpose(a))); break;
      case 'det(A)': { const d = determinant(a); setResult(d !== null ? String(d) : 'Must be square'); break; }
      case 'Scalar × A': setResult(formatMatrix(scalarMul(a, scalar))); break;
    }
  };

  return (
    <ToolLayout title="Matrix Calculator" description="Add, multiply, transpose matrices and calculate determinants.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Matrix A (rows on lines, values separated by spaces)</label><textarea value={matA} onChange={e => setMatA(e.target.value)} className="tool-textarea font-mono h-24" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Matrix B</label><textarea value={matB} onChange={e => setMatB(e.target.value)} className="tool-textarea font-mono h-24" /></div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {['A + B', 'A × B', 'Transpose A', 'det(A)'].map(o => (
          <button key={o} onClick={() => run(o)} className="tool-btn">{o}</button>
        ))}
        <div className="flex items-center gap-2">
          <input type="number" value={scalar} onChange={e => setScalar(Number(e.target.value))} className="tool-input !w-16" />
          <button onClick={() => run('Scalar × A')} className="tool-btn">× A</button>
        </div>
      </div>
      {result && (<div className="rounded-xl bg-gray-50 p-4"><div className="text-sm text-gray-500 mb-2">{op}</div><pre className="font-mono text-lg text-gray-900 whitespace-pre">{result}</pre></div>)}
    </ToolLayout>
  );
}
