'use client';

import React, { useRef } from 'react';
import { LLMModel, LLM_MODELS } from '../lib/models';
import { PROMPT_PRESETS, PromptPreset } from '../lib/presets';
import { VisionParams } from '../lib/tokenizer';
import {
  Sparkles,
  Eye,
  EyeOff,
  Trash2,
  Clipboard,
  Upload,
  FileText,
  Image as ImageIcon,
  ChevronDown,
  Layers,
} from 'lucide-react';

interface TopControlBarProps {
  selectedModel: LLMModel;
  onSelectModel: (model: LLMModel) => void;
  visionParams: VisionParams;
  onUpdateVisionParams: (params: Partial<VisionParams>) => void;
  onSelectPreset: (preset: PromptPreset) => void;
  onClearPrompt: () => void;
  onPasteClipboard: () => void;
  onFileUpload: (file: File) => void;
}

export const TopControlBar: React.FC<TopControlBarProps> = ({
  selectedModel,
  onSelectModel,
  visionParams,
  onUpdateVisionParams,
  onSelectPreset,
  onClearPrompt,
  onPasteClipboard,
  onFileUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      e.target.value = '';
    }
  };

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Group: Model Selector & Vision Mode */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Model Selector Dropdown */}
          <div className="relative">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center space-x-1">
              <Layers className="w-3 h-3 text-cyan-400" />
              <span>Target LLM Model</span>
            </label>
            <div className="relative">
              <select
                value={selectedModel.id}
                onChange={(e) => {
                  const found = LLM_MODELS.find(m => m.id === e.target.value);
                  if (found) onSelectModel(found);
                }}
                className="appearance-none bg-slate-950 text-slate-100 font-semibold text-xs rounded-lg pl-3 pr-8 py-2 border border-slate-700 hover:border-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer shadow-sm w-56 sm:w-64"
              >
                <optgroup label="OpenAI Models">
                  {LLM_MODELS.filter(m => m.provider === 'OpenAI').map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.badge || `${Math.round(m.contextWindow / 1000)}k`})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Anthropic Models">
                  {LLM_MODELS.filter(m => m.provider === 'Anthropic').map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.badge || `${Math.round(m.contextWindow / 1000)}k`})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Google Models">
                  {LLM_MODELS.filter(m => m.provider === 'Google').map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.badge || `${Math.round(m.contextWindow / 1000)}k`})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="DeepSeek & Open Source">
                  {LLM_MODELS.filter(m => ['DeepSeek', 'Meta'].includes(m.provider)).map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.badge || `${Math.round(m.contextWindow / 1000)}k`})
                    </option>
                  ))}
                </optgroup>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Vision Detail Mode Toggle (If Model supports Vision) */}
          {selectedModel.visionSupport ? (
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center space-x-1">
                <Eye className="w-3 h-3 text-indigo-400" />
                <span>Vision Mode Detail</span>
              </label>
              <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-700">
                <button
                  type="button"
                  onClick={() => onUpdateVisionParams({ detail: 'low', enabled: visionParams.imageCount > 0 })}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    visionParams.detail === 'low'
                      ? 'bg-slate-800 text-cyan-400 border border-slate-600 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Low Detail (85t)
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateVisionParams({ detail: 'high', enabled: visionParams.imageCount > 0 })}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    visionParams.detail === 'high'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  High Detail (Tile Math)
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Vision Mode</label>
              <div className="px-3 py-1.5 rounded-lg bg-slate-950/50 border border-slate-800 text-xs text-slate-500 flex items-center space-x-1">
                <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                <span>Text Only</span>
              </div>
            </div>
          )}

          {/* Preset Prompts Selector */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Sample Presets</span>
            </label>
            <div className="relative">
              <select
                onChange={(e) => {
                  const preset = PROMPT_PRESETS.find(p => p.id === e.target.value);
                  if (preset) onSelectPreset(preset);
                  e.target.value = '';
                }}
                defaultValue=""
                className="appearance-none bg-slate-950 text-slate-300 hover:text-white font-medium text-xs rounded-lg pl-3 pr-8 py-2 border border-slate-700 hover:border-slate-600 focus:outline-none transition-all cursor-pointer shadow-sm w-44 sm:w-48"
              >
                <option value="" disabled>Load Sample Prompt...</option>
                {PROMPT_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.category}] {p.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Right Group: Quick Action Buttons */}
        <div className="flex items-center space-x-2 pt-1 sm:pt-0">
          
          {/* File Upload Hidden Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx,.txt,.md,.json,.csv,.py,.js,.ts,.tsx,.jsx,.html,.css,.xml,.yaml,.yml"
            className="hidden"
          />

          {/* Image Upload Hidden Input */}
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* File Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
            title="Upload Document (.pdf, .txt, .docx, .json, .py)"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Upload Doc</span>
          </button>

          {/* Image Upload Button */}
          <button
            onClick={() => imageInputRef.current?.click()}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
            title="Upload Image for Vision Math"
          >
            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">Add Image</span>
          </button>

          {/* Paste Clipboard Button */}
          <button
            onClick={onPasteClipboard}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
            title="Paste text from clipboard"
          >
            <Clipboard className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Paste</span>
          </button>

          {/* Clear Button */}
          <button
            onClick={onClearPrompt}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 transition-all cursor-pointer"
            title="Clear current prompt input"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
            <span>Clear</span>
          </button>

        </div>

      </div>
    </div>
  );
};
