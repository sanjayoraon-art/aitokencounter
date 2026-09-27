'use client';

import React, { useState } from 'react';
import { LLMModel } from '../lib/models';
import { X, Copy, Check, Code2, Monitor, ExternalLink } from 'lucide-react';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentModel: LLMModel;
}

export const EmbedModal: React.FC<EmbedModalProps> = ({
  isOpen,
  onClose,
  currentModel,
}) => {
  const [embedTheme, setEmbedTheme] = useState<'dark' | 'light'>('dark');
  const [embedHeight, setEmbedHeight] = useState<number>(650);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tokencounter.ai';
  const iframeSrc = `${baseUrl}?embed=true&theme=${embedTheme}&model=${currentModel.id}`;
  const iframeSnippet = `<iframe\n  src="${iframeSrc}"\n  width="100%"\n  height="${embedHeight}"\n  style="border: none; border-radius: 12px; shadow: 0 10px 25px rgba(0,0,0,0.5);"\n  title="AI Token Counter & Cost Estimator Widget"\n></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(iframeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-100">
                Embed Token Counter Widget
              </h3>
              <p className="text-xs text-slate-400">
                Add an interactive AI Token Counter to your blog, documentation, or app
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customizer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
          {/* Theme Option */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Widget Theme</label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setEmbedTheme('dark')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  embedTheme === 'dark'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Dark Theme
              </button>
              <button
                type="button"
                onClick={() => setEmbedTheme('light')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  embedTheme === 'light'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Light Theme
              </button>
            </div>
          </div>

          {/* Height Option */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">
              Frame Height ({embedHeight}px)
            </label>
            <input
              type="range"
              min="400"
              max="1000"
              step="50"
              value={embedHeight}
              onChange={(e) => setEmbedHeight(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Code Snippet Box */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
            <span>HTML Embed Code:</span>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer transition-all shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied HTML!' : 'Copy Code Snippet'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed select-all">
            {iframeSnippet}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-500 border-t border-slate-800">
          <div className="flex items-center space-x-1">
            <Monitor className="w-3.5 h-3.5" />
            <span>Responsive 100% width iframe embed support</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
