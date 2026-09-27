import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, ShieldCheck, FileText, Scale, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | TokenCounter.AI',
  description: 'Terms of Service and API billing estimation disclaimer for TokenCounter.AI.',
  openGraph: {
    title: 'Terms of Service | TokenCounter.AI',
    description: 'Terms of Service and legal disclaimers.',
    url: 'https://tokencounter.ai/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-indigo-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Scale className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                TokenCounter<span className="text-cyan-400">.AI</span>
              </span>
              <p className="text-[10px] text-slate-400">Terms of Service & Disclaimer</p>
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
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Terms of Service & Legal Disclaimer</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Last updated: September 27, 2026
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="font-extrabold text-base text-cyan-400">1. Acceptance of Terms</h2>
            <p className="text-slate-400">
              By accessing and using <strong>TokenCounter.AI</strong>, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the platform.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="font-extrabold text-base text-indigo-400">2. Cost Estimation Disclaimer</h2>
            <p className="text-slate-400">
              Token counts and API cost estimates provided by TokenCounter.AI are calculated using client-side algorithms, standard Byte-Pair Encoding (BPE) rules, and official vendor pricing published by OpenAI, Anthropic, Google, and DeepSeek. Actual provider invoices may vary slightly due to model updates, dynamic system prompts, tool usage, cached tokens, or provider price revisions. Estimates are provided for planning purposes without warranty.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="font-extrabold text-base text-emerald-400">3. Intellectual Property & Client Confidentiality</h2>
            <p className="text-slate-400">
              You retain full ownership and intellectual property rights to all prompts, text, code, and images entered into TokenCounter.AI. Because all execution occurs locally inside your client browser, TokenCounter.AI acquires no license or rights to your input data.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="font-extrabold text-base text-amber-400">4. Limitation of Liability</h2>
            <p className="text-slate-400">
              TokenCounter.AI is provided "as is" without warranty of any kind. Under no circumstances shall TokenCounter.AI or its developers be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this web application.
            </p>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-500 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-300">TokenCounter.AI</span>
            <span>• 100% Client-Side Privacy Protection</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400 font-medium">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-indigo-400 font-bold">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
