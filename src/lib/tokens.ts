export type ModelProvider = 'gemini' | 'openai' | 'claude';

export interface TokenAnalytics {
  promptCost: number;
  completionCost: number;
  totalTokens: number;
}

const COST_RATES: Record<ModelProvider, { input: number, output: number }> = {
  gemini: { input: 0.000125, output: 0.000375 },       // per 1k tokens
  openai: { input: 0.005, output: 0.015 },               // GPT-4o approx
  claude: { input: 0.003, output: 0.015 }                // Sonnet 3.5 approx
};

export function estimateTokens(text: string): number {
  // Rough approximation: 1 token ~ 4 chars in English
  return Math.ceil(text.length / 4);
}

export function calculateCost(provider: ModelProvider, inputTokens: number, outputTokens: number = 0): TokenAnalytics {
  const rates = COST_RATES[provider];
  return {
    totalTokens: inputTokens + outputTokens,
    promptCost: (inputTokens / 1000) * rates.input,
    completionCost: (outputTokens / 1000) * rates.output
  };
}
