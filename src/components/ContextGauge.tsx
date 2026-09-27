'use client';

import React from 'react';
import { LLMModel } from '../lib/models';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ContextGaugeProps {
  model: LLMModel;
  currentTokens: number;
}

export const ContextGauge: React.FC<ContextGaugeProps> = ({ model, currentTokens }) => {
  const maxContext = model.contextWindow;
  const percentage = Math.min(100, Math.max(0, (currentTokens / maxContext) * 100));
  const isExceeded = currentTokens > maxContext;

  // Determine status color & label
  let statusColor = 'from-emerald-500 to-teal-400';
  let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let statusText = 'Optimal Context';
  let Icon = CheckCircle2;

  if (isExceeded) {
    statusColor = 'from-red-600 to-rose-500';
    badgeColor = 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse';
    statusText = 'Context Limit Exceeded!';
    Icon = ShieldAlert;
  } else if (percentage >= 80) {
    statusColor = 'from-red-500 to-amber-500';
    badgeColor = 'bg-red-500/10 text-red-400 border-red-500/30';
    statusText = 'Near Capacity (>80%)';
    Icon = AlertTriangle;
  } else if (percentage >= 50) {
    statusColor = 'from-amber-400 to-yellow-500';
    badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    statusText = 'Moderate Usage (50-80%)';
    Icon = AlertTriangle;
  }

  const remainingTokens = Math.max(0, maxContext - currentTokens);

  return (
    <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-xs text-slate-300">Context Window Gauge</span>
          <span className="text-[11px] text-slate-500">({model.name})</span>
        </div>
        
        <div className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeColor}`}>
          <Icon className="w-3.5 h-3.5 shrink-0" />
          <span>{statusText}</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${statusColor} transition-all duration-300 ease-out shadow-sm`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Stats Below Bar */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
        <div>
          <span className="font-bold text-slate-200">{currentTokens.toLocaleString()}</span>
          <span className="text-slate-500"> / {maxContext.toLocaleString()} tokens</span>
        </div>
        <div className="font-semibold">
          {percentage.toFixed(1)}% Used
        </div>
        <div>
          <span className="text-slate-500">Remaining: </span>
          <span className={isExceeded ? 'text-red-400 font-bold' : 'text-slate-300 font-bold'}>
            {remainingTokens.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Alert Banner if Exceeded */}
      {isExceeded && (
        <div className="mt-3 p-2.5 rounded-lg bg-red-950/60 border border-red-800/80 text-xs text-red-200 flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          <span>
            Warning: This prompt exceeds {model.name}'s max context window by <strong>{(currentTokens - maxContext).toLocaleString()} tokens</strong>. API requests will fail with a 400 Context Length Error.
          </span>
        </div>
      )}
    </div>
  );
};
