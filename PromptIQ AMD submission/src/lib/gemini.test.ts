import { describe, it, expect, vi } from 'vitest';
import { ai, requireAi } from './gemini';

// Mock global fetch
global.fetch = vi.fn();

describe('gemini proxy', () => {
  it('should route generateContent through /api/generate', async () => {
    const mockResponse = { output: 'Test response' };
    
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const instance = requireAi();
    expect(instance).toBeDefined();

    const response = await instance.models.generateContent({
      model: 'gemini-test',
      contents: 'Hello',
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/generate', expect.objectContaining({
      method: 'POST',
      body: expect.stringContaining('Hello'),
    }));
    
    expect(response.text).toBe('Test response');
  });

  it('should handle API errors correctly', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Bad request' }),
    });

    const instance = requireAi();

    await expect(instance.models.generateContent({
      model: 'gemini-test',
      contents: 'Hello',
    })).rejects.toThrow('Bad request');
  });
});
