import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, ShieldCheck, Cpu, Target, Award, ArrowLeft, Layers, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | TokenCounter.AI - Client-Side AI Token & Cost Platform',
  description: 'Learn about TokenCounter.AI, our mission to empower AI developers with 100% client-side token counting, LLM cost estimation, and prompt optimization technology.',
  openGraph: {
    title: 'About Us | TokenCounter.AI',
    description: 'Empowering AI developers with 100% private, real-time token counting and LLM API cost calculators.',
    url: 'https://tokencounter.ai/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Schema.org Organization & Breadcrumb Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About TokenCounter.AI',
            url: 'https://tokencounter.ai/about',
            description: 'Mission and engineering background of TokenCounter.AI platform.',
            publisher: {
              '@type': 'Organization',
              name: 'TokenCounter.AI',
              url: 'https://tokencounter.ai',
              logo: 'https://tokencounter.ai/favicon.ico',
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://tokencounter.ai',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'About Us',
                  item: 'https://tokencounter.ai/about',
                },
              ],
            },
          }),
        }}
      />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-indigo-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                TokenCounter<span className="text-cyan-400">.AI</span>
              </span>
              <p className="text-[10px] text-slate-400">About Us & Engineering Vision</p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>Back to Counter</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Engineering Mission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Demystifying LLM Tokenization & API Cost Transparency
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            TokenCounter.AI was built to provide software engineers, prompt designers, and AI researchers with a lightning-fast, 100% client-side tool to calculate token consumption and API billing across modern Large Language Models.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-white">100% Client-Side Privacy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We believe your prompts, proprietary code, and sensitive documents should never leave your machine. Every single byte is tokenized directly inside your browser using WebAssembly & JavaScript. Zero text is ever logged or uploaded to any server.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-white">Multi-Model Token Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We maintain calibrated tokenizer models for OpenAI (GPT-4o, o1, o3-mini using Byte-Pair Encoding), Anthropic (Claude 3.7 Sonnet, Claude 3.5 Sonnet, Opus), Google (Gemini 2.5 Flash, 2.0 Flash, 1.5 Pro), and DeepSeek R1 / Llama 3.3.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-white">Dual-Tier Cost Estimator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculate exact API costs for single executions, 1,000 requests, and 100,000 monthly calls. Adjust expected output length dynamically to eliminate billing surprises.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-white">Prompt Optimization</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compress token footprints by 20% to 40% without losing prompt intent. Minify JSON payloads, strip code comments, and remove filler politeness stop-words automatically.
            </p>
          </div>

        </div>

        {/* Story & Tech Overview */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <h2 className="font-extrabold text-lg text-white flex items-center space-x-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Why Token Optimization Matters in 2026</span>
          </h2>
          <p>
            As large language models scale up context windows to millions of tokens, managing API bills and latency becomes paramount for enterprise applications. Unoptimized prompts with duplicate whitespace, unminified JSON data, and unnecessary stop-words inflate monthly invoices rapidly.
          </p>
          <p>
            TokenCounter.AI provides an instant, developer-first workspace to measure token density, preview vision token math for images, compare side-by-side pricing models, and optimize prompts prior to API deployment.
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-500 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">TokenCounter.AI</span>
            <span>• 100% Client-Side Privacy Shield</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400 font-medium">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="/about" className="text-cyan-400 font-bold">About</Link>
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
