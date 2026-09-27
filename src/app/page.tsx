'use client';

import React, { useState, useEffect, useCallback } from 'react';
import LZString from 'lz-string';
import { LLMModel, LLM_MODELS } from '../lib/models';
import { PROMPT_PRESETS, PromptPreset } from '../lib/presets';
import { VisionParams } from '../lib/tokenizer';
import { parseUploadedFile, FileParseResult } from '../lib/fileParser';
import { Header } from '../components/Header';
import { TopControlBar } from '../components/TopControlBar';
import { MainWorkspace } from '../components/MainWorkspace';
import { ComparisonMatrix } from '../components/ComparisonMatrix';
import { EmbedModal } from '../components/EmbedModal';
import { ShareModal } from '../components/ShareModal';
import { SeoContent } from '../components/SeoContent';
import { Footer } from '../components/Footer';

export default function HomePage() {
  // Application State
  const [selectedModel, setSelectedModel] = useState<LLMModel>(LLM_MODELS[0]); // Default GPT-4o
  const [promptText, setPromptText] = useState<string>(PROMPT_PRESETS[0].prompt);
  const [visionParams, setVisionParams] = useState<VisionParams>({
    enabled: false,
    width: 1024,
    height: 1024,
    detail: 'high',
    imageCount: 0,
  });
  const [outputTokens, setOutputTokens] = useState<number>(500);
  
  // Modals & Options
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isEmbedMode, setIsEmbedMode] = useState<boolean>(false);

  // Restore URL compressed state on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);
    
    // Embed mode check
    if (searchParams.get('embed') === 'true') {
      setIsEmbedMode(true);
    }

    // Theme check
    const themeParam = searchParams.get('theme');
    if (themeParam === 'light' || themeParam === 'dark') {
      setTheme(themeParam);
    }

    // Target Model check
    const modelParam = searchParams.get('model');
    if (modelParam) {
      const found = LLM_MODELS.find(m => m.id === modelParam);
      if (found) setSelectedModel(found);
    }

    // Compressed Prompt LZ parameter check
    const promptParam = searchParams.get('prompt');
    if (promptParam) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(promptParam);
        if (decompressed) {
          const parsed = JSON.parse(decompressed);
          if (parsed.t) setPromptText(parsed.t);
          if (parsed.m) {
            const found = LLM_MODELS.find(m => m.id === parsed.m);
            if (found) setSelectedModel(found);
          }
          if (parsed.v) setVisionParams(parsed.v);
          if (parsed.o) setOutputTokens(parsed.o);
        }
      } catch (e) {
        console.warn('Failed restoring compressed URL state:', e);
      }
    }
  }, []);

  // Update Vision Params helper
  const handleUpdateVisionParams = useCallback((params: Partial<VisionParams>) => {
    setVisionParams(prev => ({ ...prev, ...params }));
  }, []);

  // Preset Selector handler
  const handleSelectPreset = useCallback((preset: PromptPreset) => {
    setPromptText(preset.prompt);
  }, []);

  // Clipboard Paste handler
  const handlePasteClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setPromptText(text);
    } catch (e) {
      console.warn('Clipboard read error:', e);
    }
  }, []);

  // File Upload handler
  const handleFileUpload = useCallback(async (file: File) => {
    try {
      const result: FileParseResult = await parseUploadedFile(file);
      if (result.isImage && result.imageDimensions) {
        setVisionParams({
          enabled: true,
          width: result.imageDimensions.width,
          height: result.imageDimensions.height,
          detail: 'high',
          imageCount: 1,
        });
      } else {
        setPromptText(result.text);
      }
    } catch (e) {
      console.error('File parsing error:', e);
    }
  }, []);

  // Toggle Theme handler
  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // If running inside Embed iframe widget mode
  if (isEmbedMode) {
    return (
      <div className={`${theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'} p-2 min-h-screen font-sans`}>
        <TopControlBar
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
          visionParams={visionParams}
          onUpdateVisionParams={handleUpdateVisionParams}
          onSelectPreset={handleSelectPreset}
          onClearPrompt={() => setPromptText('')}
          onPasteClipboard={handlePasteClipboard}
          onFileUpload={handleFileUpload}
        />
        <MainWorkspace
          selectedModel={selectedModel}
          promptText={promptText}
          onChangePromptText={setPromptText}
          visionParams={visionParams}
          onUpdateVisionParams={handleUpdateVisionParams}
          outputTokens={outputTokens}
          onChangeOutputTokens={setOutputTokens}
        />
      </div>
    );
  }

  return (
    <div className={`${theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'} min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950`}>
      
      {/* 1. Sticky Header */}
      <Header
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* 2. Top Controls Bar */}
      <TopControlBar
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        visionParams={visionParams}
        onUpdateVisionParams={handleUpdateVisionParams}
        onSelectPreset={handleSelectPreset}
        onClearPrompt={() => setPromptText('')}
        onPasteClipboard={handlePasteClipboard}
        onFileUpload={handleFileUpload}
      />

      {/* 3. Main Workspace (Split View) */}
      <main className="flex-1">
        <MainWorkspace
          selectedModel={selectedModel}
          promptText={promptText}
          onChangePromptText={setPromptText}
          visionParams={visionParams}
          onUpdateVisionParams={handleUpdateVisionParams}
          outputTokens={outputTokens}
          onChangeOutputTokens={setOutputTokens}
        />

        {/* 4. Model vs Model Side-by-Side Comparison Table Matrix */}
        <ComparisonMatrix
          promptText={promptText}
          visionParams={visionParams}
          outputTokens={outputTokens}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
        />

        {/* 5. pSEO Content, Guides & FAQ */}
        <SeoContent />
      </main>

      {/* 6. Footer */}
      <Footer onOpenEmbedModal={() => setIsEmbedModalOpen(true)} />

      {/* Share Link Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        promptText={promptText}
        selectedModel={selectedModel}
        visionParams={visionParams}
        outputTokens={outputTokens}
      />

      {/* Embed Widget Modal */}
      <EmbedModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
        currentModel={selectedModel}
      />

    </div>
  );
}
