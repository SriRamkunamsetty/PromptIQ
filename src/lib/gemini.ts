import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export function requireAi() {
  if (!ai) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }
  return ai;
}
