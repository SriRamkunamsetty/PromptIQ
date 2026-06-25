import { describe, it, expect, vi } from 'vitest';
import { ai } from './gemini';

// Mock global fetch
global.fetch = vi.fn();

describe('gemini embedding proxy', () => {
  it('should route embedContent through /api/embed', async () => {
    const mockResponse = { embeddings: [{ values: [0.1, 0.2] }] };
    
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await ai.models.embedContent({
      model: 'embedding-test',
      contents: 'Hello vector',
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/embed', expect.objectContaining({
      method: 'POST',
      body: expect.stringContaining('Hello vector'),
    }));
    
    expect(response.embeddings[0].values[0]).toBe(0.1);
  });

  it('should handle embedding errors correctly', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Vector engine failure' }),
    });

    await expect(ai.models.embedContent({
      model: 'embedding-test',
      contents: 'Hello vector',
    })).rejects.toThrow('Vector engine failure');
  });
});
