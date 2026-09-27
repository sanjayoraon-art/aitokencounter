'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Code2, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenEmbedModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEmbedModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        <div className="flex flex-wrap items-center justify-between gap-6">
          
          {/* Brand & Description */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <Zap className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="font-extrabold text-slate-100 text-base tracking-tight">
                TokenCounter<span className="text-cyan-400">.AI</span>
              </span>
            </Link>
            <p className="text-slate-500 max-w-sm leading-relaxed text-xs">
              Free, 100% client-side AI Token Counter, LLM Cost Estimator & Prompt Compression Engine.
            </p>
          </div>

          {/* Quick Page Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-300">
            <Link href="/about" className="hover:text-cyan-400 transition-colors">
              About Us
            </Link>
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>
            <button onClick={onOpenEmbedModal} className="hover:text-cyan-400 transition-colors flex items-center space-x-1 cursor-pointer">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Embed Widget</span>
            </button>
            <button onClick={scrollToTop} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer" title="Back to top">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Client-Side Privacy Protection • Zero Data Logging</span>
          </div>

          <div className="flex items-center space-x-4">
            <span>© 2026 TokenCounter.AI. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
