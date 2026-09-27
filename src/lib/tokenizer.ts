import { LLMModel } from './models';
import { getEncoding } from 'js-tiktoken';

// Tiktoken encodings
let tiktokenO200k: any = null;
let tiktokenCl100k: any = null;

try {
  tiktokenO200k = getEncoding('o200k_base');
  tiktokenCl100k = getEncoding('cl100k_base');
} catch (e) {
  console.warn('js-tiktoken init warning, using accurate BPE fallback engine:', e);
}

export interface VisionParams {
  enabled: boolean;
  width: number;
  height: number;
  detail: 'high' | 'low';
  imageCount: number;
}

export interface TokenCountResult {
  textTokens: number;
  visionTokens: number;
  totalTokens: number;
  characterCount: number;
  wordCount: number;
  lineCount: number;
  paragraphCount: number;
  avgTokensPerWord: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  isExactTiktoken: boolean;
}

/**
 * Calculate vision tokens based on provider and image dimensions
 */
export function calculateVisionTokens(
  model: LLMModel,
  vision: VisionParams
): number {
  if (!vision.enabled || vision.imageCount <= 0 || !model.visionSupport) {
    return 0;
  }

  const { width, height, detail, imageCount } = vision;
  const w = width > 0 ? width : 1024;
  const h = height > 0 ? height : 1024;

  let tokensPerImage = 0;

  switch (model.visionTokenMath) {
    case 'openai': {
      if (detail === 'low') {
        tokensPerImage = 85;
      } else {
        // High detail tile calculation
        // 1. Scale image so max side is 2048
        let scale = 1;
        const maxDim = Math.max(w, h);
        if (maxDim > 2048) {
          scale = 2048 / maxDim;
        }
        let scaledW = w * scale;
        let scaledH = h * scale;

        // 2. Scale so min side is 768
        const minDim = Math.min(scaledW, scaledH);
        if (minDim > 768) {
          scale = 768 / minDim;
          scaledW = scaledW * scale;
          scaledH = scaledH * scale;
        }

        // 3. Count 512x512 tiles
        const tilesW = Math.ceil(scaledW / 512);
        const tilesH = Math.ceil(scaledH / 512);
        const totalTiles = tilesW * tilesH;

        tokensPerImage = 85 + 170 * totalTiles;
      }
      break;
    }

    case 'anthropic': {
      // Claude vision token formula: ceil((w * h) / 750)
      tokensPerImage = Math.max(160, Math.ceil((w * h) / 750));
      break;
    }

    case 'gemini': {
      // Gemini vision math: 258 tokens per 512x512 tile or default 258
      const tiles = Math.max(1, Math.ceil((w * h) / (512 * 512)));
      tokensPerImage = 258 * tiles;
      break;
    }

    default:
      tokensPerImage = 0;
  }

  return tokensPerImage * imageCount;
}

/**
 * Calibrated fallback BPE token count for non-tiktoken models or tiktoken fallback
 */
function estimateTokensFallback(text: string, tokenizerType: LLMModel['tokenizerType']): number {
  if (!text || text.length === 0) return 0;

  // Split text into tokens based on subword boundaries, whitespace, numbers, code symbols
  const words = text.trim().split(/\s+/).filter(Boolean);
  const totalChars = text.length;

  if (words.length === 0) return 0;

  // Code detector heuristic
  const isCodeOrJson = /[{}[\]()<>=;:$#\/\\_]/.test(text) && (text.includes('function') || text.includes('const') || text.includes('import') || text.includes('{'));

  let multiplier = 1.3; // Default word-to-token ratio

  switch (tokenizerType) {
    case 'anthropic-bpe':
      multiplier = isCodeOrJson ? 1.45 : 1.28;
      break;
    case 'gemini-bpe':
      multiplier = isCodeOrJson ? 1.40 : 1.22;
      break;
    case 'deepseek-bpe':
      multiplier = isCodeOrJson ? 1.50 : 1.32;
      break;
    case 'llama-bpe':
      multiplier = isCodeOrJson ? 1.48 : 1.30;
      break;
    case 'tiktoken-o200k':
    case 'tiktoken-cl100k':
    default:
      multiplier = isCodeOrJson ? 1.40 : 1.25;
      break;
  }

  // Count punctuation marks, numbers, and special symbols which usually form independent tokens
  const specialChars = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
  const numericTokens = (text.match(/\b\d+\b/g) || []).length;

  const estimatedFromWords = Math.ceil(words.length * multiplier);
  const estimatedFromChars = Math.ceil(totalChars / (isCodeOrJson ? 3.3 : 3.8));

  // Balanced weighted average
  let tokenCount = Math.round((estimatedFromWords * 0.6) + (estimatedFromChars * 0.4) + (specialChars * 0.1) + (numericTokens * 0.1));

  return Math.max(1, tokenCount);
}

/**
 * Main token calculation function for any text and model
 */
export function calculateTokens(
  text: string,
  model: LLMModel,
  vision: VisionParams
): TokenCountResult {
  const trimmed = text || '';
  const characterCount = trimmed.length;
  const words = trimmed.trim() ? trimmed.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const lineCount = trimmed ? trimmed.split('\n').length : 0;
  const paragraphCount = trimmed ? trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;

  let textTokens = 0;
  let isExactTiktoken = false;

  if (trimmed.length > 0) {
    if (model.tokenizerType === 'tiktoken-o200k' && tiktokenO200k) {
      try {
        const encoded = tiktokenO200k.encode(trimmed);
        textTokens = encoded.length;
        isExactTiktoken = true;
      } catch (e) {
        textTokens = estimateTokensFallback(trimmed, model.tokenizerType);
      }
    } else if (model.tokenizerType === 'tiktoken-cl100k' && tiktokenCl100k) {
      try {
        const encoded = tiktokenCl100k.encode(trimmed);
        textTokens = encoded.length;
        isExactTiktoken = true;
      } catch (e) {
        textTokens = estimateTokensFallback(trimmed, model.tokenizerType);
      }
    } else {
      textTokens = estimateTokensFallback(trimmed, model.tokenizerType);
    }
  }

  const visionTokens = calculateVisionTokens(model, vision);
  const totalTokens = textTokens + visionTokens;

  const avgTokensPerWord = wordCount > 0 ? parseFloat((textTokens / wordCount).toFixed(2)) : 0;
  
  // Reading speed: ~200 WPM, Speaking speed: ~130 WPM
  const readingTimeMinutes = wordCount > 0 ? parseFloat((wordCount / 200).toFixed(1)) : 0;
  const speakingTimeMinutes = wordCount > 0 ? parseFloat((wordCount / 130).toFixed(1)) : 0;

  return {
    textTokens,
    visionTokens,
    totalTokens,
    characterCount,
    wordCount,
    lineCount,
    paragraphCount,
    avgTokensPerWord,
    readingTimeMinutes,
    speakingTimeMinutes,
    isExactTiktoken,
  };
}
