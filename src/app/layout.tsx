import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI Token Counter, Multi-Model Cost Estimator & Prompt Optimizer',
  description: 'Free, 100% client-side AI Token Counter, LLM API Cost Calculator, and Prompt Compression Engine for OpenAI GPT-4o, o1, o3-mini, Claude 3.7 Sonnet, Gemini 2.5 Flash, and DeepSeek R1.',
  keywords: [
    'AI Token Counter',
    'GPT-4o Token Counter',
    'Claude 3.7 Sonnet Token Counter',
    'Gemini Token Counter',
    'LLM API Cost Calculator',
    'Prompt Optimizer',
    'Prompt Compression',
    'DeepSeek Token Counter',
    'Tiktoken Online',
    'Multimodal Vision Token Math',
  ],
  authors: [{ name: 'TokenCounter.AI Team' }],
  openGraph: {
    title: 'AI Token Counter, Multi-Model Cost Estimator & Prompt Optimizer',
    description: 'Free, lightning-fast client-side AI token counter, LLM cost comparison matrix, and prompt compression engine.',
    url: 'https://tokencounter.ai',
    siteName: 'TokenCounter.AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Token Counter & Multi-Model Cost Estimator',
    description: 'Calculate live AI tokens and API costs for OpenAI, Anthropic, Google & DeepSeek models.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
