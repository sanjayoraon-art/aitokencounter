'use client';

import React, { useState, useRef, useCallback } from 'react';
import { LLMModel } from '../lib/models';
import { calculateTokens, VisionParams, TokenCountResult } from '../lib/tokenizer';
import { parseUploadedFile, FileParseResult } from '../lib/fileParser';
import { ContextGauge } from './ContextGauge';
import { CostBreakdown } from './CostBreakdown';
import { OptimizationPanel } from './OptimizationPanel';
import {
  FileText,
  UploadCloud,
  Image as ImageIcon,
  X,
  Copy,
  Check,
  Code,
  Sparkles,
  Info,
  Clock,
  Layers,
  Zap,
} from 'lucide-react';

interface MainWorkspaceProps {
  selectedModel: LLMModel;
  promptText: string;
  onChangePromptText: (text: string) => void;
  visionParams: VisionParams;
  onUpdateVisionParams: (params: Partial<VisionParams>) => void;
  outputTokens: number;
  onChangeOutputTokens: (tokens: number) => void;
}

export const MainWorkspace: React.FC<MainWorkspaceProps> = ({
  selectedModel,
  promptText,
  onChangePromptText,
  visionParams,
  onUpdateVisionParams,
  outputTokens,
  onChangeOutputTokens,
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loadedFileName, setLoadedFileName] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Live Token & Text Statistics calculation
  const tokenMetrics: TokenCountResult = calculateTokens(
    promptText,
    selectedModel,
    visionParams
  );

  // Drag and Drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        const file = files[0];
        try {
          const result: FileParseResult = await parseUploadedFile(file);
          if (result.isImage && result.imageDimensions) {
            onUpdateVisionParams({
              enabled: true,
              width: result.imageDimensions.width,
              height: result.imageDimensions.height,
              imageCount: 1,
            });
            setImagePreviewUrl(result.imageDimensions.previewUrl || null);
          } else {
            onChangePromptText(result.text);
            setLoadedFileName(result.fileName);
          }
        } catch (err) {
          console.error('File drop error:', err);
        }
      }
    },
    [onChangePromptText, onUpdateVisionParams]
  );

  const handleCopyText = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(promptText);
      const formatted = JSON.stringify(parsed, null, 2);
      onChangePromptText(formatted);
    } catch {
      // Ignore if not valid JSON
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANE: Prompt Textarea & Upload Dropzone (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            
            {/* Textarea Header Bar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-xs text-slate-200 uppercase tracking-wide">
                  Prompt Input & Code Workspace
                </span>
                {loadedFileName && (
                  <span className="flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                    <span>{loadedFileName}</span>
                    <button
                      onClick={() => setLoadedFileName(null)}
                      className="hover:text-red-400 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {/* Textarea Action Buttons */}
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={handleFormatJson}
                  className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer flex items-center space-x-1"
                  title="Pretty Format JSON if text is valid JSON"
                >
                  <Code className="w-3 h-3 text-cyan-400" />
                  <span className="hidden sm:inline">Format JSON</span>
                </button>
                <button
                  onClick={handleCopyText}
                  className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer flex items-center space-x-1"
                  title="Copy Prompt Text"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Dropzone Container */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative p-1 transition-all ${
                isDraggingOver ? 'bg-indigo-950/40 ring-2 ring-cyan-500 ring-inset' : ''
              }`}
            >
              {/* Drag Over Overlay */}
              {isDraggingOver && (
                <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-cyan-400 p-6 space-y-2 border-2 border-dashed border-cyan-400 rounded-xl">
                  <UploadCloud className="w-12 h-12 animate-bounce text-cyan-400" />
                  <p className="font-extrabold text-lg">Drop Document or Image to Parse</p>
                  <p className="text-xs text-slate-400">Supports PDF, DOCX, TXT, JSON, Code files & Images</p>
                </div>
              )}

              {/* Main Text Area */}
              <textarea
                ref={textareaRef}
                value={promptText}
                onChange={(e) => onChangePromptText(e.target.value)}
                placeholder="Type, paste, or drop your prompt, code snippet, system prompt, or JSON payload here..."
                rows={16}
                className="w-full bg-slate-900/50 text-slate-100 placeholder-slate-500 font-mono text-xs sm:text-sm p-4 focus:outline-none resize-y min-h-[380px] leading-relaxed select-text border-0"
              />
            </div>

            {/* Vision Image Attachment Bar (If image vision is loaded) */}
            {visionParams.enabled && (
              <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt="Vision preview"
                      className="w-9 h-9 object-cover rounded border border-slate-700"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-400">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )}

                  <div>
                    <div className="text-xs font-bold text-slate-200 flex items-center space-x-2">
                      <span>Vision Image Attached</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-mono">
                        {visionParams.width}x{visionParams.height}px
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {tokenMetrics.visionTokens} Vision Tokens ({visionParams.detail.toUpperCase()} detail)
                    </div>
                  </div>
                </div>

                {/* Dimension Controls & Remove */}
                <div className="flex items-center space-x-2 text-xs">
                  <div className="flex items-center space-x-1 font-mono text-slate-300">
                    <input
                      type="number"
                      value={visionParams.width}
                      onChange={(e) => onUpdateVisionParams({ width: Number(e.target.value) })}
                      className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-center text-xs focus:outline-none"
                    />
                    <span>x</span>
                    <input
                      type="number"
                      value={visionParams.height}
                      onChange={(e) => onUpdateVisionParams({ height: Number(e.target.value) })}
                      className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-center text-xs focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateVisionParams({ enabled: false, imageCount: 0 });
                      setImagePreviewUrl(null);
                    }}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400 cursor-pointer"
                    title="Remove vision image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Textarea Bottom Quick Footer Stats */}
            <div className="bg-slate-950/80 px-4 py-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center space-x-4">
                <span>Chars: <strong className="text-slate-200">{tokenMetrics.characterCount.toLocaleString()}</strong></span>
                <span>Words: <strong className="text-slate-200">{tokenMetrics.wordCount.toLocaleString()}</strong></span>
                <span>Lines: <strong className="text-slate-200">{tokenMetrics.lineCount.toLocaleString()}</strong></span>
              </div>
              <div className="text-[11px] text-slate-500">
                Avg: <strong className="text-cyan-400">{tokenMetrics.avgTokensPerWord}</strong> tokens/word
              </div>
            </div>

          </div>

          {/* Drag & Drop File Helper Zone Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <UploadCloud className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Drag & drop <strong>.pdf, .txt, .docx, .json, .py, .js</strong> files or images directly into the workspace.</span>
            </div>
          </div>

        </div>

        {/* RIGHT PANE: Live Metrics Dashboard (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Hero Live Token Count Card */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="font-extrabold text-sm text-slate-200 uppercase tracking-wider">
                  Live Token Count
                </span>
              </div>

              {/* Exact Tiktoken vs BPE Estimator Badge */}
              <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                <span className={`w-1.5 h-1.5 rounded-full ${tokenMetrics.isExactTiktoken ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'}`} />
                <span>{tokenMetrics.isExactTiktoken ? 'Exact Tiktoken Engine' : `${selectedModel.provider} BPE`}</span>
              </div>
            </div>

            {/* Large Token Counter */}
            <div className="flex items-baseline space-x-3 my-3">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-400">
                {tokenMetrics.totalTokens.toLocaleString()}
              </span>
              <span className="text-slate-400 font-semibold text-sm">
                Tokens
              </span>
            </div>

            {/* Token Breakdown if Vision Tokens are Present */}
            {tokenMetrics.visionTokens > 0 && (
              <div className="text-xs font-mono text-slate-400 flex items-center space-x-3 bg-slate-950/60 p-2 rounded-lg border border-slate-800 mb-3">
                <span>Text: <strong className="text-slate-200">{tokenMetrics.textTokens.toLocaleString()}</strong></span>
                <span>+</span>
                <span>Vision: <strong className="text-indigo-400">{tokenMetrics.visionTokens.toLocaleString()}</strong></span>
              </div>
            )}

            {/* Secondary Reading & Speaking Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reading Time: <strong className="text-slate-200">{tokenMetrics.readingTimeMinutes} min</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Speaking Time: <strong className="text-slate-200">{tokenMetrics.speakingTimeMinutes} min</strong></span>
              </div>
            </div>
          </div>

          {/* Context Window Capacity Gauge */}
          <ContextGauge model={selectedModel} currentTokens={tokenMetrics.totalTokens} />

          {/* Dual-Tier Cost Estimator */}
          <CostBreakdown
            model={selectedModel}
            inputTokens={tokenMetrics.totalTokens}
            outputTokens={outputTokens}
            onChangeOutputTokens={onChangeOutputTokens}
          />

          {/* Prompt Optimizer Panel */}
          <OptimizationPanel
            text={promptText}
            model={selectedModel}
            vision={visionParams}
            onApplyOptimization={(newText) => onChangePromptText(newText)}
          />

        </div>

      </div>
    </div>
  );
};
