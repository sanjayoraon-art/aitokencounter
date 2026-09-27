export interface LLMModel {
  id: string;
  name: string;
  provider: 'OpenAI' | 'Anthropic' | 'Google' | 'DeepSeek' | 'Meta';
  contextWindow: number; // Max tokens
  inputCostPer1M: number; // USD per 1M tokens
  outputCostPer1M: number; // USD per 1M tokens
  tokenizerType: 'tiktoken-o200k' | 'tiktoken-cl100k' | 'anthropic-bpe' | 'gemini-bpe' | 'deepseek-bpe' | 'llama-bpe';
  description: string;
  badge?: string;
  visionSupport: boolean;
  visionTokenMath: 'openai' | 'anthropic' | 'gemini' | 'none';
  maxOutputTokens: number;
}

export const LLM_MODELS: LLMModel[] = [
  // OpenAI Models
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    contextWindow: 128000,
    inputCostPer1M: 2.50,
    outputCostPer1M: 10.00,
    tokenizerType: 'tiktoken-o200k',
    description: 'Flagship multimodal model for complex, multi-step tasks.',
    badge: 'Most Popular',
    visionSupport: true,
    visionTokenMath: 'openai',
    maxOutputTokens: 16384,
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    contextWindow: 128000,
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.60,
    tokenizerType: 'tiktoken-o200k',
    description: 'Lightweight & ultra-fast model for high-volume tasks.',
    badge: 'Ultra Low Cost',
    visionSupport: true,
    visionTokenMath: 'openai',
    maxOutputTokens: 16384,
  },
  {
    id: 'o1',
    name: 'o1 (Reasoning)',
    provider: 'OpenAI',
    contextWindow: 200000,
    inputCostPer1M: 15.00,
    outputCostPer1M: 60.00,
    tokenizerType: 'tiktoken-o200k',
    description: 'Advanced reasoning model for math, coding, and scientific logic.',
    badge: 'Reasoning',
    visionSupport: true,
    visionTokenMath: 'openai',
    maxOutputTokens: 100000,
  },
  {
    id: 'o3-mini',
    name: 'o3-mini',
    provider: 'OpenAI',
    contextWindow: 200000,
    inputCostPer1M: 1.10,
    outputCostPer1M: 4.40,
    tokenizerType: 'tiktoken-o200k',
    description: 'Fast and efficient reasoning model optimized for code and STEM.',
    badge: 'Code & STEM',
    visionSupport: false,
    visionTokenMath: 'none',
    maxOutputTokens: 100000,
  },

  // Anthropic Models
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    contextWindow: 200000,
    inputCostPer1M: 3.00,
    outputCostPer1M: 15.00,
    tokenizerType: 'anthropic-bpe',
    description: 'Hybrid reasoning and high-speed intelligence model.',
    badge: 'Top Coding Model',
    visionSupport: true,
    visionTokenMath: 'anthropic',
    maxOutputTokens: 64000,
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    contextWindow: 200000,
    inputCostPer1M: 3.00,
    outputCostPer1M: 15.00,
    tokenizerType: 'anthropic-bpe',
    description: 'Industry benchmark for nuance, writing, and code generation.',
    badge: 'Developer Choice',
    visionSupport: true,
    visionTokenMath: 'anthropic',
    maxOutputTokens: 8192,
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    contextWindow: 200000,
    inputCostPer1M: 15.00,
    outputCostPer1M: 75.00,
    tokenizerType: 'anthropic-bpe',
    description: 'Maximum intelligence for deeply complex analysis and research.',
    badge: 'Heavyweight',
    visionSupport: true,
    visionTokenMath: 'anthropic',
    maxOutputTokens: 4096,
  },

  // Google Models
  {
    id: 'gemini-2-5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    contextWindow: 1048576,
    inputCostPer1M: 0.075,
    outputCostPer1M: 0.30,
    tokenizerType: 'gemini-bpe',
    description: 'Next-gen speed and efficiency with massive 1M context window.',
    badge: 'Fast & Cheap',
    visionSupport: true,
    visionTokenMath: 'gemini',
    maxOutputTokens: 8192,
  },
  {
    id: 'gemini-2-0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    contextWindow: 1048576,
    inputCostPer1M: 0.10,
    outputCostPer1M: 0.40,
    tokenizerType: 'gemini-bpe',
    description: 'Multimodal powerhouse with 1M token context and agentic features.',
    badge: '1M Context',
    visionSupport: true,
    visionTokenMath: 'gemini',
    maxOutputTokens: 8192,
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    contextWindow: 2097152,
    inputCostPer1M: 1.25,
    outputCostPer1M: 5.00,
    tokenizerType: 'gemini-bpe',
    description: 'Industry-leading 2M token context window for massive documents and video.',
    badge: '2M Max Context',
    visionSupport: true,
    visionTokenMath: 'gemini',
    maxOutputTokens: 8192,
  },

  // DeepSeek / Meta Open Source Models
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    contextWindow: 64000,
    inputCostPer1M: 0.14,
    outputCostPer1M: 0.28,
    tokenizerType: 'deepseek-bpe',
    description: 'State-of-the-art open mixture-of-experts model.',
    badge: 'Open Source MoE',
    visionSupport: false,
    visionTokenMath: 'none',
    maxOutputTokens: 8192,
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    contextWindow: 64000,
    inputCostPer1M: 0.55,
    outputCostPer1M: 2.19,
    tokenizerType: 'deepseek-bpe',
    description: 'Open-weights reasoning model matching closed-source performance.',
    badge: 'Open Reasoning',
    visionSupport: false,
    visionTokenMath: 'none',
    maxOutputTokens: 8192,
  },
  {
    id: 'llama-3-3-70b',
    name: 'Llama 3.3 (70B)',
    provider: 'Meta',
    contextWindow: 128000,
    inputCostPer1M: 0.59,
    outputCostPer1M: 0.79,
    tokenizerType: 'llama-bpe',
    description: 'Meta\'s premier open source model offering enterprise-grade capability.',
    badge: 'Open Weights',
    visionSupport: false,
    visionTokenMath: 'none',
    maxOutputTokens: 4096,
  }
];

export interface CostCalculationResult {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  inputCostSingle: number;
  outputCostSingle: number;
  totalCostSingle: number;
  cost1kRequests: number;
  cost100kRequests: number;
}

export function calculateCost(
  model: LLMModel,
  inputTokens: number,
  outputTokens: number,
  requestMultiplier: number = 1
): CostCalculationResult {
  const inputCostSingle = (inputTokens / 1_000_000) * model.inputCostPer1M;
  const outputCostSingle = (outputTokens / 1_000_000) * model.outputCostPer1M;
  const totalCostSingle = inputCostSingle + outputCostSingle;

  return {
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    inputCostSingle,
    outputCostSingle,
    totalCostSingle: totalCostSingle * requestMultiplier,
    cost1kRequests: totalCostSingle * 1_000,
    cost100kRequests: totalCostSingle * 100_000,
  };
}
