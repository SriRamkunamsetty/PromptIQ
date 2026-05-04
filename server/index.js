import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from the root .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Middleware to check API key
const checkApiKey = (req, res, next) => {
  if (!ai) {
    console.error('[AUTH ERROR] GEMINI_API_KEY is missing');
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not configured on the server.' });
  }
  next();
};

/**
 * Higher-order function to wrap async routes for centralized error handling
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error(`[API ERROR] ${req.path}:`, err);
    res.status(500).json({ 
      error: err.message || 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: req.path
    });
  });
};

app.post('/api/optimize', checkApiKey, asyncHandler(async (req, res) => {
  const { input, model, optimizationAggressiveness } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  const response = await ai.models.generateContent({
    model: model || 'gemini-2.5-flash',
    contents: `You are an expert Prompt Engineer and LLM Token Optimizer. 
    Analyze the following prompt and rewrite it to be:
    1. Highly token efficient (remove redundant words, pleasantries, and fluff).
    2. Extremely clear and unambiguous.
    3. Better structured for an LLM to understand.
    4. Optimization aggressiveness: ${optimizationAggressiveness || 50}/100.
    
    Return ONLY the optimized prompt text, nothing else.
    
    Original Prompt:
    ${input}`,
    config: {
      temperature: 0.2,
    }
  });

  const resultText = response.text?.trim() || '';
  res.json({ output: resultText });
}));

// Endpoint for general generation (used by other components if needed)
app.post('/api/generate', checkApiKey, asyncHandler(async (req, res) => {
  const { prompt, model, systemInstruction, config } = req.body;
  
  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res.status(400).json({ error: 'A non-empty string prompt is required' });
  }

  const response = await ai.models.generateContent({
    model: model || 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction,
      ...config
    }
  });

  res.json({ output: response.text?.trim() || '' });
}));

// Endpoint for embeddings
app.post('/api/embed', checkApiKey, asyncHandler(async (req, res) => {
  const { text, model } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const response = await ai.models.embedContent({
    model: model || 'gemini-embedding-2-preview',
    contents: text,
  });

  res.json(response);
}));

// Serve static frontend files in production
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
