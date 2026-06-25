import { ai } from './gemini';

export type ModelProvider = 'gemini' | 'openai' | 'claude';

export interface TokenAnalytics {
  promptCost: number;
  completionCost: number;
  totalTokens: number;
}

const COST_RATES: Record<ModelProvider, { input: number, output: number }> = {
  gemini: { input: 0.00125, output: 0.0050 },       // Gemini Pro Pricing approx
  openai: { input: 0.005, output: 0.015 },               // GPT-4o approx
  claude: { input: 0.003, output: 0.015 }                // Sonnet 3.5 approx
};

// Fallback synchronous estimator for UI
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// True token accountant using Gemini API
export async function countTokensAsync(text: string): Promise<number> {
  if (!text) return 0;
  if (!ai) return estimateTokens(text);
  
  try {
    const res = await ai.models.countTokens({
      model: "gemini-3.1-pro-preview",
      contents: text
    });
    return res.totalTokens || estimateTokens(text);
  } catch (err: any) {
    const msg = typeof err === 'string' ? err : (err?.message || JSON.stringify(err) || '');
    if (err?.status === 429 || err?.error?.code === 429 || msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
      return estimateTokens(text);
    }
    console.warn("Token counting failed, using fallback estimator", err);
    return estimateTokens(text);
  }
}

export function calculateCost(provider: ModelProvider, inputTokens: number, outputTokens: number = 0): TokenAnalytics {
  const rates = COST_RATES[provider];
  return {
    totalTokens: inputTokens + outputTokens,
    promptCost: (inputTokens / 1000) * rates.input,
    completionCost: (outputTokens / 1000) * rates.output
  };
}
