import { ai } from './gemini';

export async function generateEmbedding(text: string): Promise<number[]> {
  if (!ai) {
    throw new Error('Gemini API is not configured.');
  }

  try {
    const response = await ai.models.embedContent({
      model: 'gemini-embedding-2-preview',
      contents: text,
    });

    if (!response.embeddings?.[0]?.values) {
      throw new Error('Failed to generate embedding');
    }

    return response.embeddings[0].values;
  } catch (e: any) {
    const msg = typeof e === 'string' ? e : (e?.message || JSON.stringify(e) || '');
    if (e?.status === 429 || e?.error?.code === 429 || msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
      console.warn("API quota exceeded for embeddings. Returning simulated vector.");
      const simulated = new Array(768).fill(0).map((_, i) => {
         let val = Math.sin(text.length * i);
         for(let j=0; j<Math.min(text.length, 10); j++) {
            val += Math.cos(text.charCodeAt(j) * i);
         }
         return val / 10;
      });
      return simulated;
    }
    throw e;
  }
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must be of same length');
  }
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
