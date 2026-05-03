import { describe, it, expect } from 'vitest';
import { cosineSimilarity } from './embeddings';

describe('cosineSimilarity', () => {
  it('correctly calculates cosine similarity of same vectors', () => {
    const vecA = [1, 0, 0];
    const vecB = [1, 0, 0];
    expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(1);
  });

  it('correctly calculates cosine similarity of orthogonal vectors', () => {
    const vecA = [1, 0, 0];
    const vecB = [0, 1, 0];
    expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(0);
  });

  it('correctly calculates cosine similarity of opposite vectors', () => {
    const vecA = [1, 0, 0];
    const vecB = [-1, 0, 0];
    expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(-1);
  });

  it('returns 0 if one vector represents zero magnitude', () => {
    const vecA = [1, 1, 1];
    const vecB = [0, 0, 0];
    expect(cosineSimilarity(vecA, vecB)).toBe(0);
  });

  it('throws an error if vectors have different lengths', () => {
    const vecA = [1, 0];
    const vecB = [1, 0, 0];
    expect(() => cosineSimilarity(vecA, vecB)).toThrow('Vectors must be of same length');
  });
});
