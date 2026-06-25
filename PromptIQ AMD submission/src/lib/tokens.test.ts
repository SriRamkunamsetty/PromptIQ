import { describe, it, expect } from 'vitest';
import { estimateTokens, calculateCost } from './tokens';

describe('token accounting utility', () => {
    it('estimates tokens correctly', () => {
        expect(estimateTokens('Hello world!')).toBe(3); // 12 chars / 4
        expect(estimateTokens('')).toBe(0);
    });

    it('calculates costs correctly', () => {
        const cost = calculateCost('gemini', 1000, 2000);
        expect(cost.promptCost).toBe(0.000125);
        expect(cost.completionCost).toBe(0.00075);
        expect(cost.totalTokens).toBe(3000);
    });
});
