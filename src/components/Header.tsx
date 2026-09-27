'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Share2, Code2, Sun, Moon, Info, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenShareModal: () => void;
  onOpenEmbedModal: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenShareModal,
  onOpenEmbedModal,
  theme,
  onToggleTheme,
}) => {
  const [showPrivacyTooltip, setShowPrivacyTooltip] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-indigo-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                TokenCounter<span className="text-cyan-400">.AI</span>
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v2026.1
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Multi-Model Tokenizer, Cost Matrix & Prompt Compression Engine
            </p>
          </div>
        </Link>

        {/* Center Badge: 100% Client-Side Privacy Shield */}
        <div className="relative hidden md:block">
          <button
            onMouseEnter={() => setShowPrivacyTooltip(true)}
            onMouseLeave={() => setShowPrivacyTooltip(false)}
            onClick={() => setShowPrivacyTooltip(!showPrivacyTooltip)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all cursor-pointer shadow-sm shadow-emerald-950/50"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Client-Side</span>
            <span>Privacy Shield</span>
            <Info className="w-3 h-3 text-emerald-400/70 opacity-60 ml-0.5" />
          </button>

          {/* Tooltip Modal */}
          {showPrivacyTooltip && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 sm:w-80 p-3.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-xs text-slate-300 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Zero-Server Data Processing</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Your prompts, text documents, code, and images are tokenized strictly inside your local browser using client-side WebAssembly & Web APIs. Zero text is stored or sent to any server.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center space-x-2">
          
          {/* SEO Pages Links */}
          <nav className="hidden lg:flex items-center space-x-3 text-xs font-semibold text-slate-300 mr-2 border-r border-slate-800 pr-3">
            <Link href="/about" className="hover:text-cyan-400 transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-cyan-400 transition-colors">
              Terms
            </Link>
          </nav>

          {/* Share Button */}
          <button
            onClick={onOpenShareModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all shadow-sm cursor-pointer"
            title="Share URL with encoded prompt"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Embed Widget Button */}
          <button
            onClick={onOpenEmbedModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/50 transition-all shadow-sm cursor-pointer"
            title="Embed Token Counter Widget"
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Embed</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
