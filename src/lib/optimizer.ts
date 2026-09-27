import { LLMModel } from './models';
import { calculateTokens, VisionParams } from './tokenizer';

export interface OptimizationRules {
  stripRedundantSpaces: boolean;
  minifyJsonAndCode: boolean;
  stripComments: boolean;
  removeFillerWords: boolean;
  compactMarkdown: boolean;
}

export const DEFAULT_OPTIMIZATION_RULES: OptimizationRules = {
  stripRedundantSpaces: true,
  minifyJsonAndCode: true,
  stripComments: true,
  removeFillerWords: true,
  compactMarkdown: true,
};

// Common filler/politeness stop words in AI prompts
const FILLER_PATTERNS = [
  /\b(please|kindly|could you|would you|can you|i would like you to|i want you to)\b/gi,
  /\b(as an ai|as an ai language model|in order to|as much as possible)\b/gi,
  /\b(make sure to|be sure to|remember to|don't forget to|it is important that)\b/gi,
  /\b(thank you|thanks in advance|i appreciate it)\b/gi,
  /\b(briefly|concisely|in detail|step by step)\b(?=\s*,|\s*\.)/gi,
];

/**
 * Minify JSON substrings inside prompt text
 */
function minifyJsonSubstrings(text: string): string {
  // Regex to detect JSON blocks like ```json ... ``` or standalone JSON objects
  let result = text.replace(/```json\s*([\s\S]*?)\s*```/gi, (match, jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      return '```json\n' + JSON.stringify(parsed) + '\n```';
    } catch {
      return match;
    }
  });

  // Attempt minifying standalone JSON if whole text is JSON
  if (result.trim().startsWith('{') || result.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(result.trim());
      result = JSON.stringify(parsed);
    } catch {
      // Ignore if invalid JSON
    }
  }

  return result;
}

/**
 * Strip code comments (single-line, block comments, and hash comments)
 */
function stripCodeComments(text: string): string {
  return text
    // Multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Single-line js/c comments (preserving URLs like https://)
    .replace(/(?<!:)\/\/(?!\/).*/g, '')
    // Python/Bash comments (preserving #headers in markdown or #HEX colors)
    .replace(/(?<=^|\s)#(?![A-Fa-f0-9]{3,6}\b|#|\s+[A-Z]).*/gm, '');
}

/**
 * Main prompt optimization function
 */
export function optimizePrompt(
  text: string,
  model: LLMModel,
  vision: VisionParams,
  rules: OptimizationRules = DEFAULT_OPTIMIZATION_RULES
): {
  originalText: string;
  optimizedText: string;
  originalTokens: number;
  optimizedTokens: number;
  tokensSaved: number;
  percentSaved: number;
  dollarsSavedPer1kRequests: number;
  dollarsSavedPer100kRequests: number;
  appliedRulesCount: number;
} {
  if (!text || text.trim().length === 0) {
    return {
      originalText: text,
      optimizedText: text,
      originalTokens: 0,
      optimizedTokens: 0,
      tokensSaved: 0,
      percentSaved: 0,
      dollarsSavedPer1kRequests: 0,
      dollarsSavedPer100kRequests: 0,
      appliedRulesCount: 0,
    };
  }

  const originalResult = calculateTokens(text, model, vision);
  let processed = text;
  let appliedRulesCount = 0;

  // 1. Minify JSON & Code
  if (rules.minifyJsonAndCode) {
    const temp = minifyJsonSubstrings(processed);
    if (temp !== processed) {
      processed = temp;
      appliedRulesCount++;
    }
  }

  // 2. Strip comments
  if (rules.stripComments) {
    const temp = stripCodeComments(processed);
    if (temp !== processed) {
      processed = temp;
      appliedRulesCount++;
    }
  }

  // 3. Remove filler politeness words
  if (rules.removeFillerWords) {
    let temp = processed;
    for (const pattern of FILLER_PATTERNS) {
      temp = temp.replace(pattern, '');
    }
    if (temp !== processed) {
      processed = temp;
      appliedRulesCount++;
    }
  }

  // 4. Compact Markdown formatting
  if (rules.compactMarkdown) {
    // Strip trailing whitespace per line & combine empty list spacing
    const temp = processed
      .split('\n')
      .map(line => line.trimEnd())
      .join('\n')
      .replace(/\n{3,}/g, '\n\n');
    if (temp !== processed) {
      processed = temp;
      appliedRulesCount++;
    }
  }

  // 5. Strip redundant spaces & extra newlines
  if (rules.stripRedundantSpaces) {
    const temp = processed
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/^\s+|\s+$/g, '')
      .replace(/\n{3,}/g, '\n\n');
    if (temp !== processed) {
      processed = temp;
      appliedRulesCount++;
    }
  }

  const optimizedResult = calculateTokens(processed, model, vision);
  const originalTokens = originalResult.totalTokens;
  const optimizedTokens = optimizedResult.totalTokens;
  const tokensSaved = Math.max(0, originalTokens - optimizedTokens);
  const percentSaved = originalTokens > 0 ? parseFloat(((tokensSaved / originalTokens) * 100).toFixed(1)) : 0;

  const inputCostSavingPerToken = model.inputCostPer1M / 1_000_000;
  const dollarsSavedSingle = tokensSaved * inputCostSavingPerToken;
  const dollarsSavedPer1kRequests = parseFloat((dollarsSavedSingle * 1_000).toFixed(4));
  const dollarsSavedPer100kRequests = parseFloat((dollarsSavedSingle * 100_000).toFixed(2));

  return {
    originalText: text,
    optimizedText: processed,
    originalTokens,
    optimizedTokens,
    tokensSaved,
    percentSaved,
    dollarsSavedPer1kRequests,
    dollarsSavedPer100kRequests,
    appliedRulesCount,
  };
}
