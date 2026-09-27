'use client';

import React, { useState } from 'react';
import { LLMModel } from '../lib/models';
import { VisionParams } from '../lib/tokenizer';
import {
  OptimizationRules,
  DEFAULT_OPTIMIZATION_RULES,
  optimizePrompt,
} from '../lib/optimizer';
import {
  Zap,
  Check,
  TrendingDown,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Copy,
  CheckCircle2,
} from 'lucide-react';

interface OptimizationPanelProps {
  text: string;
  model: LLMModel;
  vision: VisionParams;
  onApplyOptimization: (newText: string) => void;
}

export const OptimizationPanel: React.FC<OptimizationPanelProps> = ({
  text,
  model,
  vision,
  onApplyOptimization,
}) => {
  const [rules, setRules] = useState<OptimizationRules>(DEFAULT_OPTIMIZATION_RULES);
  const [showRuleDetails, setShowRuleDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const optResult = optimizePrompt(text, model, vision, rules);

  const toggleRule = (key: keyof OptimizationRules) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyOptimized = () => {
    navigator.clipboard.writeText(optResult.optimizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAlreadyOptimal = optResult.tokensSaved === 0 && text.trim().length > 0;

  return (
    <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 flex items-center space-x-1">
              <span>Prompt Saver Engine</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                Client-Side
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Compress token footprint without losing semantic meaning</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowRuleDetails(!showRuleDetails)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all text-xs flex items-center space-x-1 cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Rules</span>
        </button>
      </div>

      {/* Rules Customizer Collapsible */}
      {showRuleDetails && (
        <div className="mb-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 animate-in fade-in duration-150">
          <div className="font-semibold text-slate-200 mb-1">Compression Rules Configurator:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rules.stripRedundantSpaces}
                onChange={() => toggleRule('stripRedundantSpaces')}
                className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
              />
              <span>Strip redundant spaces & empty lines</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rules.minifyJsonAndCode}
                onChange={() => toggleRule('minifyJsonAndCode')}
                className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
              />
              <span>Minify JSON payloads & code blocks</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rules.removeFillerWords}
                onChange={() => toggleRule('removeFillerWords')}
                className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
              />
              <span>Remove filler stop-words ("please", "kindly")</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rules.stripComments}
                onChange={() => toggleRule('stripComments')}
                className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
              />
              <span>Strip code comments (//, #, /* */)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer select-none sm:col-span-2">
              <input
                type="checkbox"
                checked={rules.compactMarkdown}
                onChange={() => toggleRule('compactMarkdown')}
                className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
              />
              <span>Compact Markdown list formatting</span>
            </label>
          </div>
        </div>
      )}

      {/* Main Savings Hero Display */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 p-4 rounded-xl border border-indigo-900/40 flex flex-wrap items-center justify-between gap-4 mb-4">
        
        {/* Left: Saved Tokens & Percent */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tokens Saved Potential</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
              -{optResult.tokensSaved.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-emerald-300/80">
              ({optResult.percentSaved}% reduction)
            </span>
          </div>
        </div>

        {/* Center: Monthly Invoice Impact */}
        <div className="text-right sm:text-left border-l border-slate-800 pl-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Monthly Savings (100k calls)
          </div>
          <div className="text-lg font-extrabold font-mono text-cyan-400">
            ${optResult.dollarsSavedPer100kRequests.toFixed(2)} / mo
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {optResult.tokensSaved > 0 ? (
            <>
              <button
                type="button"
                onClick={() => onApplyOptimization(optResult.optimizedText)}
                className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Apply Optimization</span>
              </button>
              <button
                type="button"
                onClick={handleCopyOptimized}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                title="Copy compressed text"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </>
          ) : (
            <div className="text-xs text-slate-400 flex items-center space-x-1.5 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 w-full sm:w-auto justify-center">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{isAlreadyOptimal ? 'Prompt is fully optimized!' : 'Enter prompt text to optimize'}</span>
            </div>
          )}
        </div>

      </div>

      {/* Quick Comparison Metrics Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono">
        <div>
          <span className="text-[10px] text-slate-500 block">Original Tokens</span>
          <span className="font-bold text-slate-200">{optResult.originalTokens.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">Compressed Tokens</span>
          <span className="font-bold text-cyan-400">{optResult.optimizedTokens.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">1K Calls Savings</span>
          <span className="font-bold text-emerald-400">${optResult.dollarsSavedPer1kRequests.toFixed(4)}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block">Applied Rules</span>
          <span className="font-bold text-indigo-400">{optResult.appliedRulesCount} Active</span>
        </div>
      </div>
    </div>
  );
};
