'use client';

import { useState } from 'react';
import { ToolLayout, CopyButton } from '@/components/ToolLayout';

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Imagination is more important than knowledge.", author: "Albert Einstein" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
  { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
  { text: "I think, therefore I am.", author: "René Descartes" },
  { text: "That which does not kill us makes us stronger.", author: "Friedrich Nietzsche" },
  { text: "To be or not to be, that is the question.", author: "William Shakespeare" },
  { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "The unexamined life is not worth living.", author: "Socrates" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "If you want to go fast, go alone. If you want to go far, go together.", author: "African Proverb" },
  { text: "Knowledge is power.", author: "Francis Bacon" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupéry" },
];

export default function RandomQuotePage() {
  const [quote, setQuote] = useState(quotes[0]);
  const [fade, setFade] = useState(false);

  const next = () => {
    setFade(true);
    setTimeout(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setFade(false);
    }, 200);
  };

  return (
    <ToolLayout title="Random Quote Generator" description="Get inspired with random quotes from famous people.">
      <div className={`rounded-2xl bg-gradient-to-br from-primary-50 to-purple-50 border border-primary-100 p-8 md:p-12 text-center transition-opacity duration-200 ${fade ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-4xl mb-4">💬</div>
        <blockquote className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-4">"{quote.text}"</blockquote>
        <cite className="text-gray-500 not-italic">— {quote.author}</cite>
      </div>
      <div className="flex justify-center gap-3 mt-6">
        <button onClick={next} className="tool-btn">🎲 New Quote</button>
        <CopyButton text={`"${quote.text}" — ${quote.author}`} />
      </div>
    </ToolLayout>
  );
}
