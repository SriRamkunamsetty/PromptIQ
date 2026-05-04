// Proxy for GoogleGenAI to route through our secure backend API Gateway
export const ai = {
  models: {
    generateContent: async (params: any) => {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: params.contents,
          model: params.model,
          systemInstruction: params.config?.systemInstruction,
          config: params.config,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        text: data.output,
      };
    },
    embedContent: async (params: any) => {
      const res = await fetch('/api/embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: params.contents,
          model: params.model
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to generate embedding');
      }

      return await res.json();
    }
  }
};

export function requireAi() {
  return ai;
}
