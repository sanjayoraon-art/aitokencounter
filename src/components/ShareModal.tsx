'use client';

import React, { useState } from 'react';
import { LLMModel } from '../lib/models';
import { VisionParams } from '../lib/tokenizer';
import LZString from 'lz-string';
import { X, Copy, Check, Share2, Link as LinkIcon } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptText: string;
  selectedModel: LLMModel;
  visionParams: VisionParams;
  outputTokens: number;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  promptText,
  selectedModel,
  visionParams,
  outputTokens,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Compress state into URL payload
  const payload = {
    t: promptText,
    m: selectedModel.id,
    v: visionParams,
    o: outputTokens,
  };

  const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(payload));
  const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  const shareableUrl = `${baseUrl}?prompt=${compressed}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-100">
                Share Prompt State
              </h3>
              <p className="text-xs text-slate-400">
                LZ-compressed link containing your text, model choice, and metrics configuration
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

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Shareable Short URL:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={shareableUrl}
              className="flex-1 bg-slate-950 text-slate-200 font-mono text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none select-all"
            />
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs cursor-pointer transition-all shadow-md shadow-cyan-500/20"
            >
              {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start space-x-2">
          <LinkIcon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            Anyone opening this link will immediately load your exact prompt text, model selection, vision parameters, and live cost calculation matrix.
          </p>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
