export interface PromptPreset {
  id: string;
  title: string;
  category: 'System Prompt' | 'Code' | 'RAG Context' | 'JSON Payload' | 'Creative';
  description: string;
  prompt: string;
}

export const PROMPT_PRESETS: PromptPreset[] = [
  {
    id: 'system-prompt',
    title: 'Enterprise AI Assistant System Prompt',
    category: 'System Prompt',
    description: 'A structured, high-detail system prompt with persona, instructions, and response formatting rules.',
    prompt: `You are an expert Senior Staff Full-Stack Engineer and Software Architect AI assistant.
Your goal is to provide precise, clean, highly efficient, and modern code solutions.

### Core Guidelines & Rules:
1. Always write complete, production-grade TypeScript / Python code without placeholders like "// implement here".
2. Prioritize type-safety, modular architecture, and zero runtime side effects.
3. Optimize code for minimal memory usage, maximum execution speed, and high readability.
4. When reviewing code, highlight security vulnerabilities, edge-case failures, and architectural bottlenecks.
5. If the requirement is underspecified or ambiguous, clearly state assumptions before proceeding with implementation.

Please confirm you understand these operational constraints and await the user prompt.`,
  },
  {
    id: 'fastapi-backend',
    title: 'Python FastAPI Microservice Code',
    category: 'Code',
    description: 'Complete Python REST API snippet with Pydantic validation, async database access, and CORS middleware.',
    prompt: `from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import asyncio
import time

app = FastAPI(
    title="AI Token Analytics Service",
    description="High-throughput asynchronous telemetry API for tracking LLM token consumption.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TokenUsageRequest(BaseModel):
    user_id: str = Field(..., example="usr_98234")
    model_name: str = Field(..., example="gpt-4o")
    prompt_tokens: int = Field(..., ge=0)
    completion_tokens: int = Field(..., ge=0)
    total_cost_usd: float = Field(..., ge=0.0)

class UsageResponse(BaseModel):
    status: str
    record_id: str
    timestamp: float

@app.post("/api/v1/telemetry", response_model=UsageResponse, status_code=status.HTTP_201_CREATED)
async def record_usage(payload: TokenUsageRequest):
    if payload.prompt_tokens > 100000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payload exceeds maximum single request context limit."
        )
    
    # Simulate DB persistence latency
    await asyncio.sleep(0.02)
    
    return UsageResponse(
        status="success",
        record_id=f"rec_{int(time.time() * 1000)}",
        timestamp=time.time()
    )`,
  },
  {
    id: 'rag-context',
    title: 'RAG Knowledge Retrieval Context',
    category: 'RAG Context',
    description: 'Detailed multi-document RAG context snippet passed into an LLM context window.',
    prompt: `[CONTEXT DATA START]
Document ID: DOC-2026-884
Source: OpenAI API Pricing & Model Specs 2026
Title: GPT-4o & Reasoning Models Context Limits

Summary of Specifications:
- GPT-4o features a 128,000 token context window with an 8k/16k maximum output token limit. Input cost is $2.50 per 1M tokens, and output cost is $10.00 per 1M tokens.
- GPT-4o Mini is priced at $0.15 per 1M input tokens and $0.60 per 1M output tokens, featuring vision support with 85-token low-detail tiles.
- o1 Reasoning Model offers a 200,000 token context window, priced at $15.00 per 1M input tokens and $60.00 per 1M output tokens.
- o3-mini Reasoning Model is optimized for coding and math, offering a 200,000 token context window priced at $1.10 per 1M input tokens and $4.40 per 1M output tokens.

Document ID: DOC-2026-885
Source: Anthropic Claude 3.7 Sonnet Specs
- Claude 3.7 Sonnet features a 200,000 token context window with hybrid reasoning capabilities. Input cost: $3.00/1M, Output cost: $15.00/1M.
[CONTEXT DATA END]

User Question:
Based on the context documents above, what is the cost ratio between GPT-4o Mini and Claude 3.7 Sonnet for 100,000 input tokens? Please show step-by-step calculations.`,
  },
  {
    id: 'json-payload',
    title: 'Nested E-commerce API JSON Payload',
    category: 'JSON Payload',
    description: 'Large formatted JSON dataset containing nested product inventory, pricing, and metadata.',
    prompt: `{
  "store_id": "store_cyber_electronics_90",
  "currency": "USD",
  "generated_at": "2026-09-26T10:00:00Z",
  "products": [
    {
      "sku": "AI-GPU-9090-XT",
      "name": "Neural Processing Accelerator 9090",
      "category": "Hardware",
      "price": 1499.99,
      "in_stock": true,
      "specs": {
        "vram_gb": 32,
        "cuda_cores": 16384,
        "tensor_cores": 512,
        "power_draw_watts": 350
      },
      "ratings": {
        "average": 4.9,
        "reviews_count": 1284
      }
    },
    {
      "sku": "AI-ACCEL-LITE",
      "name": "Edge AI Inference Core",
      "category": "Embedded",
      "price": 299.50,
      "in_stock": false,
      "specs": {
        "vram_gb": 8,
        "power_draw_watts": 45
      }
    }
  ]
}`,
  },
  {
    id: 'creative-essay',
    title: 'Technical Blog Post Draft',
    category: 'Creative',
    description: 'Long-form markdown draft analyzing modern AI LLM architecture and cost optimization strategies.',
    prompt: `# Demystifying AI Tokens: How Modern LLMs Count, Estimate, and Charge for Text

In the era of large language models like GPT-4o, Claude 3.7 Sonnet, and Gemini 2.5 Flash, understanding **tokenization** is fundamental for software engineers and AI developers. 

## What is a Token?
A token is the atomic unit of text processed by an LLM. Unlike humans who read words, or computers that read raw bytes, LLMs slice text into subwords using algorithms like **Byte-Pair Encoding (BPE)**. 

- In English text, **1,000 tokens** is roughly equal to **750 words**.
- In code or JSON, **1,000 tokens** is roughly **3,000 to 4,000 characters**.

## Why Prompt Optimization Matters
Every API call to OpenAI, Anthropic, or DeepSeek bills based on **Input Tokens** and **Output Tokens**. Unoptimized prompts with duplicate spaces, verbose filler language, and unminified JSON can inflate your monthly API invoice by **20% to 40%**.

### Quick Optimization Checklist:
1. Minify JSON payloads before appending to prompts.
2. Remove politeness filler words ("please", "could you kindly").
3. Compact markdown list spacing.
4. Leverage model caching for repeated prompt context.`,
  }
];
