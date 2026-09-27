'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, BookOpen, DollarSign, Zap, ShieldCheck } from 'lucide-react';

const FAQS = [
  {
    q: 'What is an AI token and how is it calculated?',
    a: 'An AI token is the basic unit of text that a Large Language Model (LLM) reads and generates. In English, 1 token is roughly 4 characters or 0.75 words. LLMs convert raw text into numerical token IDs using Byte-Pair Encoding (BPE) algorithms such as OpenAI\'s o200k_base or cl100k_base.',
  },
  {
    q: 'How does prompt optimization reduce LLM API costs?',
    a: 'Prompt optimization removes redundant white spaces, unnecessary filler politeness words ("please", "kindly"), minifies JSON payloads, and strips code comments. By reducing token length by 20% to 40%, you directly lower your API input costs for OpenAI, Anthropic, Google Gemini, and DeepSeek.',
  },
  {
    q: 'How are vision and image tokens calculated?',
    a: 'For OpenAI (GPT-4o), vision tokens use tile math: low detail costs 85 tokens flat; high detail rescales images and divides them into 512x512 tiles, costing 85 base + 170 tokens per tile. Anthropic Claude calculates vision tokens as ceil((width * height) / 750), while Google Gemini charges a flat 258 tokens per image crop.',
  },
  {
    q: 'Is my prompt data safe and private when using this tool?',
    a: 'Yes, 100%! All token counting, text parsing, file extraction, and prompt compression execute entirely inside your local browser using client-side JavaScript & WebAssembly. Zero bytes of your text or files are uploaded to any backend server.',
  },
  {
    q: 'Which LLMs and models are supported by TokenCounter.AI?',
    a: 'TokenCounter.AI supports OpenAI (GPT-4o, GPT-4o-mini, o1, o3-mini), Anthropic (Claude 3.7 Sonnet, Claude 3.5 Sonnet, Claude 3 Opus), Google (Gemini 2.5 Flash, Gemini 2.0 Flash, Gemini 1.5 Pro), and Open Source / DeepSeek models (DeepSeek V3, DeepSeek R1, Llama 3.3 70B).',
  },
];

export const SeoContent: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Schema.org WebApplication Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AI Token Counter, Multi-Model Cost Estimator & Prompt Optimizer',
            url: 'https://tokencounter.ai',
            description: 'Free, 100% client-side AI token counter, LLM cost calculator, and prompt compression engine for OpenAI, Anthropic, Gemini, and DeepSeek.',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0.00',
              priceCurrency: 'USD',
            },
          }),
        }}
      />

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-100">
            Multi-Model Real-Time Tokenization
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Instantly count tokens using exact Byte-Pair Encoding (BPE) for GPT-4o, o1, o3-mini, Claude 3.7 Sonnet, Gemini 2.5 Flash, and DeepSeek R1.
          </p>
        </div>

        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-100">
            Dual-Tier API Cost Estimator
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Calculate input and output token costs across single API calls, 1,000 requests, and 100,000 monthly active users using official 2026 pricing rates.
          </p>
        </div>

        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-100">
            100% Client-Side Privacy Shield
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Zero server uploads. Your prompt text, PDF documents, JSON files, and code snippets remain confidential inside your browser memory.
          </p>
        </div>

      </div>

      {/* Deep-Dive Guide Section */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <h2 className="font-extrabold text-lg text-white">
            The Complete Guide to LLM Tokenization & API Cost Reduction
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-sm text-cyan-300 mb-2">
              1. Understanding Token-to-Word Ratios
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              When working with OpenAI, Anthropic, or DeepSeek APIs, tokenization determines your context window limit and monthly bill. While English prose averages ~1.3 tokens per word, code snippets (Python, TypeScript, JSON) can consume 2 to 4 tokens per word due to punctuation, brackets, and indentation.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm text-indigo-300 mb-2">
              2. Multimodal Vision Token Formula Breakdown
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Passing images to vision models adds significant token overhead. OpenAI GPT-4o divides high-detail images into 512x512 tiles (85 + 170 * tiles tokens). Claude 3.5/3.7 Sonnet calculates tokens as (width * height) / 750. Optimizing image resolution before API submission saves thousands of vision tokens.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          <h2 className="font-extrabold text-lg text-white">
            Frequently Asked Questions (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-slate-950 rounded-xl border border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-200 flex items-center justify-between hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-900 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
