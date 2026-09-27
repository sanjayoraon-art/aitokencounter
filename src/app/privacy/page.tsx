import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, ShieldCheck, Lock, EyeOff, Database, ServerOff, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | TokenCounter.AI - 100% Client-Side Privacy Shield',
  description: 'Privacy Policy for TokenCounter.AI. Learn how our 100% client-side architecture guarantees zero data storage, zero prompt logging, and full confidentiality.',
  openGraph: {
    title: 'Privacy Policy | TokenCounter.AI',
    description: '100% Client-Side Privacy Shield guarantee. Zero server uploads, zero data logging.',
    url: 'https://tokencounter.ai/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Schema.org Privacy Policy Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Privacy Policy - TokenCounter.AI',
            url: 'https://tokencounter.ai/privacy',
            description: 'Privacy policy and data processing guarantee for TokenCounter.AI.',
            publisher: {
              '@type': 'Organization',
              name: 'TokenCounter.AI',
              url: 'https://tokencounter.ai',
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
                <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                TokenCounter<span className="text-cyan-400">.AI</span>
              </span>
              <p className="text-[10px] text-slate-400">100% Client-Side Privacy Guarantee</p>
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
        
        {/* Hero Privacy Badge */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 space-y-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Privacy Policy & Privacy Shield Guarantee</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Effective Date: September 27, 2026. At <strong>TokenCounter.AI</strong>, privacy is not an afterthought—it is the foundation of our software architecture.
          </p>
        </div>

        {/* Section List */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="font-extrabold text-base text-cyan-400 flex items-center space-x-2">
              <ServerOff className="w-4 h-4" />
              <span>1. Zero Server Uploads & Client-Side Execution</span>
            </h2>
            <p className="text-slate-400">
              All text prompts, source code files, JSON datasets, PDF documents, and image files uploaded or pasted into TokenCounter.AI are processed <strong>strictly inside your web browser</strong> using JavaScript and WebAssembly (WASM). No prompt text, code, or images are ever transmitted to or stored on our servers.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="font-extrabold text-base text-indigo-400 flex items-center space-x-2">
              <EyeOff className="w-4 h-4" />
              <span>2. No AI Training or Data Harvesting</span>
            </h2>
            <p className="text-slate-400">
              Because we do not capture, log, or transmit your input data, your prompts are never used to train machine learning models, sold to third parties, or indexed by search engine bots.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="font-extrabold text-base text-emerald-400 flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>3. Local Storage & URL Parameters</span>
            </h2>
            <p className="text-slate-400">
              TokenCounter.AI uses standard browser `localStorage` solely to persist your user interface preferences (such as Dark/Light theme mode). When using the "Share Prompt" feature, your prompt state is encoded directly into your URL hash (`?prompt=...`) using LZ-string compression. Sharing this URL is completely under your manual control.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="font-extrabold text-base text-amber-400 flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>4. Third-Party Analytics & Web Hosting</span>
            </h2>
            <p className="text-slate-400">
              Our website is hosted on high-speed static content delivery networks (CDNs). Standard anonymous web server access logs (such as IP address, user agent, and timestamp) may be collected automatically by infrastructure providers for network security and DDoS mitigation. No personal identifiers or prompt data are attached to these server logs.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="font-extrabold text-base text-slate-200">5. Contact Us</h2>
            <p className="text-slate-400">
              If you have any questions or security inquiries regarding our privacy policy, please contact us at <a href="mailto:privacy@tokencounter.ai" className="text-cyan-400 underline">privacy@tokencounter.ai</a>.
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
            <Link href="/privacy" className="text-emerald-400 font-bold">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
