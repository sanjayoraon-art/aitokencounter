'use client';

import React, { useState } from 'react';
import { LLMModel, LLM_MODELS, calculateCost } from '../lib/models';
import { calculateTokens, VisionParams } from '../lib/tokenizer';
import { Layers, ArrowUpDown, Check, Award, DollarSign, Sparkles } from 'lucide-react';

interface ComparisonMatrixProps {
  promptText: string;
  visionParams: VisionParams;
  outputTokens: number;
  selectedModel: LLMModel;
  onSelectModel: (model: LLMModel) => void;
}

type SortField = 'name' | 'context' | 'cost1k' | 'cost100k' | 'inputRate';

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  promptText,
  visionParams,
  outputTokens,
  selectedModel,
  onSelectModel,
}) => {
  const [sortField, setSortField] = useState<SortField>('cost1k');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [filterProvider, setFilterProvider] = useState<string>('All');

  // Compute calculated metrics for all models
  const modelMetrics = LLM_MODELS.map((model) => {
    const tokenRes = calculateTokens(promptText, model, visionParams);
    const costRes = calculateCost(model, tokenRes.totalTokens, outputTokens);
    const contextPercent = Math.min(100, (tokenRes.totalTokens / model.contextWindow) * 100);
    const isExceeded = tokenRes.totalTokens > model.contextWindow;

    return {
      model,
      tokenRes,
      costRes,
      contextPercent,
      isExceeded,
    };
  });

  // Identify cheapest model overall
  const cheapestModelId = [...modelMetrics]
    .filter((m) => !m.isExceeded)
    .sort((a, b) => a.costRes.cost1kRequests - b.costRes.cost1kRequests)[0]?.model.id;

  // Filter by provider if selected
  const filteredMetrics = modelMetrics.filter((m) => {
    if (filterProvider === 'All') return true;
    return m.model.provider === filterProvider;
  });

  // Sort metrics
  const sortedMetrics = [...filteredMetrics].sort((a, b) => {
    let valA = 0;
    let valB = 0;

    switch (sortField) {
      case 'name':
        return sortAsc ? a.model.name.localeCompare(b.model.name) : b.model.name.localeCompare(a.model.name);
      case 'context':
        valA = a.model.contextWindow;
        valB = b.model.contextWindow;
        break;
      case 'inputRate':
        valA = a.model.inputCostPer1M;
        valB = b.model.inputCostPer1M;
        break;
      case 'cost1k':
        valA = a.costRes.cost1kRequests;
        valB = b.costRes.cost1kRequests;
        break;
      case 'cost100k':
        valA = a.costRes.cost100kRequests;
        valB = b.costRes.cost100kRequests;
        break;
    }

    return sortAsc ? valA - valB : valB - valA;
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-800">
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-950">
          <div>
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h2 className="font-extrabold text-lg text-slate-100">
                Multi-Model Cost & Context Comparison Matrix
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Side-by-side live pricing benchmark for your current prompt ({outputTokens} output tokens)
            </p>
          </div>

          {/* Provider Filter Tabs */}
          <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            {['All', 'OpenAI', 'Anthropic', 'Google', 'DeepSeek', 'Meta'].map((prov) => (
              <button
                key={prov}
                onClick={() => setFilterProvider(prov)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  filterProvider === prov
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {prov}
              </button>
            ))}
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-800 font-mono">
              <tr>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => toggleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>Model Name</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => toggleSort('context')}>
                  <div className="flex items-center space-x-1">
                    <span>Context Window</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => toggleSort('inputRate')}>
                  <div className="flex items-center space-x-1">
                    <span>Input Rate (1M)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3.5 px-4">
                  <span>Output Rate (1M)</span>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => toggleSort('cost1k')}>
                  <div className="flex items-center space-x-1">
                    <span>1,000 Calls</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => toggleSort('cost100k')}>
                  <div className="flex items-center space-x-1">
                    <span>100k Monthly</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right">
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {sortedMetrics.map(({ model, tokenRes, costRes, contextPercent, isExceeded }) => {
                const isSelected = model.id === selectedModel.id;
                const isCheapest = model.id === cheapestModelId;

                return (
                  <tr
                    key={model.id}
                    className={`transition-colors hover:bg-slate-800/50 ${
                      isSelected ? 'bg-indigo-950/40 border-l-4 border-indigo-500' : ''
                    }`}
                  >
                    {/* Model Name & Badge */}
                    <td className="py-3.5 px-4 font-sans">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-100 text-sm">{model.name}</span>
                        {isCheapest && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center space-x-1">
                            <Award className="w-3 h-3" />
                            <span>Cheapest</span>
                          </span>
                        )}
                        {model.badge && !isCheapest && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                            {model.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Provider: {model.provider}
                      </div>
                    </td>

                    {/* Context Limit & % Used Bar */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-200">
                        {Math.round(model.contextWindow / 1000)}k tokens
                      </div>
                      <div className="w-24 h-1.5 bg-slate-950 rounded-full overflow-hidden mt-1 border border-slate-800">
                        <div
                          className={`h-full rounded-full ${
                            isExceeded
                              ? 'bg-red-500'
                              : contextPercent > 80
                              ? 'bg-amber-500'
                              : 'bg-cyan-400'
                          }`}
                          style={{ width: `${Math.min(100, contextPercent)}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {isExceeded ? (
                          <span className="text-red-400 font-bold">Exceeded!</span>
                        ) : (
                          `${contextPercent.toFixed(1)}% used`
                        )}
                      </div>
                    </td>

                    {/* Input Rate per 1M */}
                    <td className="py-3.5 px-4 font-semibold text-slate-200">
                      ${model.inputCostPer1M.toFixed(2)}
                    </td>

                    {/* Output Rate per 1M */}
                    <td className="py-3.5 px-4 font-semibold text-slate-400">
                      ${model.outputCostPer1M.toFixed(2)}
                    </td>

                    {/* Cost 1k Requests */}
                    <td className="py-3.5 px-4 font-bold text-cyan-400">
                      ${costRes.cost1kRequests.toFixed(3)}
                    </td>

                    {/* Cost 100k Monthly */}
                    <td className="py-3.5 px-4 font-extrabold text-indigo-400">
                      ${costRes.cost100kRequests.toFixed(2)}
                    </td>

                    {/* Select Action */}
                    <td className="py-3.5 px-4 text-right">
                      {isSelected ? (
                        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white">
                          <Check className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => onSelectModel(model)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
                        >
                          Select
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
