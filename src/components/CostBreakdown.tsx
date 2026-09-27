'use client';

import React from 'react';
import { LLMModel, calculateCost } from '../lib/models';
import { DollarSign, Layers, Sliders, Zap, Calculator } from 'lucide-react';

interface CostBreakdownProps {
  model: LLMModel;
  inputTokens: number;
  outputTokens: number;
  onChangeOutputTokens: (val: number) => void;
}

const OUTPUT_PRESETS = [
  { label: 'Short', tokens: 150 },
  { label: 'Medium', tokens: 500 },
  { label: 'Long', tokens: 2000 },
  { label: 'Extra Long', tokens: 4000 },
];

export const CostBreakdown: React.FC<CostBreakdownProps> = ({
  model,
  inputTokens,
  outputTokens,
  onChangeOutputTokens,
}) => {
  const cost = calculateCost(model, inputTokens, outputTokens);

  return (
    <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">Dual-Tier Cost Estimator</h3>
            <p className="text-[11px] text-slate-400">Real-time API billing calculations</p>
          </div>
        </div>

        {/* Model Pricing Rate Pill */}
        <div className="text-right">
          <div className="text-[10px] text-slate-400">API Rate per 1M Tokens</div>
          <div className="text-xs font-mono font-bold text-cyan-400">
            ${model.inputCostPer1M.toFixed(2)} in / ${model.outputCostPer1M.toFixed(2)} out
          </div>
        </div>
      </div>

      {/* Expected Output Tokens Selector */}
      <div className="mb-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Expected Output Tokens:</span>
            <span className="font-mono font-bold text-indigo-400">{outputTokens.toLocaleString()} tokens</span>
          </label>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {OUTPUT_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChangeOutputTokens(preset.tokens)}
              className={`py-1 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                outputTokens === preset.tokens
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {preset.label} ({preset.tokens})
            </button>
          ))}
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min="10"
          max={Math.min(16000, model.maxOutputTokens)}
          step="10"
          value={outputTokens}
          onChange={(e) => onChangeOutputTokens(Number(e.target.value))}
          className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
        />
      </div>

      {/* Cost Cards Grid (1 Call, 1K Calls, 100K Calls) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Single Request */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 mb-1">Single API Call</div>
          <div className="text-lg font-extrabold font-mono text-white">
            ${cost.totalCostSingle < 0.0001 ? '< $0.0001' : cost.totalCostSingle.toFixed(5)}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
            <span>In: ${cost.inputCostSingle.toFixed(6)}</span>
            <span>Out: ${cost.outputCostSingle.toFixed(6)}</span>
          </div>
        </div>

        {/* 1,000 Requests */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 mb-1">1,000 API Calls</div>
          <div className="text-lg font-extrabold font-mono text-cyan-400">
            ${cost.cost1kRequests.toFixed(3)}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">
            {cost.totalTokens.toLocaleString()} total tokens/call
          </div>
        </div>

        {/* 100,000 Monthly Calls */}
        <div className="bg-slate-950 p-3 rounded-xl border border-indigo-900/50 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-950">
          <div className="text-[11px] font-semibold text-indigo-300 mb-1">100k Monthly Scale</div>
          <div className="text-lg font-extrabold font-mono text-indigo-400">
            ${cost.cost100kRequests.toFixed(2)}
          </div>
          <div className="text-[10px] text-indigo-300/70 mt-1 font-mono">
            Estimated Monthly Invoice
          </div>
        </div>

      </div>
    </div>
  );
};
