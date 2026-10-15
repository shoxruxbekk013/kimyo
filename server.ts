import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Google GenAI client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '') {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// CHEM AI Assistant API endpoint
app.post('/api/chem-ai', async (req, res) => {
  try {
    const { prompt, lang = 'uz' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!aiClient) {
      // Fallback response if no valid API key is configured
      return res.json({
        reply: null,
        fallback: true
      });
    }

    const systemInstruction = `You are CHEM AI, the expert AI research chemist of CHEMVERSE — The Future of Chemistry platform.
Language requested: ${lang === 'uz' ? 'Uzbek (Latin script)' : lang === 'ru' ? 'Russian' : 'English'}.
Default language: Uzbek.
Your knowledge includes:
- Chemistry principles (atomic structure, periodic trends, chemical bonding, kinetics, thermodynamics, equilibrium)
- Organic chemistry (mechanisms, IUPAC nomenclature, polymers, functional groups)
- Inorganic and analytical chemistry
- Biochemistry and molecular structures
- Step-by-step stoichiometric calculations and balancing equations.
Format responses cleanly with markdown headers, bullet points, chemical formulas, and mathematical notation.
Be encouraging, scientifically precise, and approachable for learners of all levels.`;

    // 8-second timeout guard
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI generation timed out')), 8000)
    );

    const callPromise = aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    const response = (await Promise.race([callPromise, timeoutPromise])) as any;
    const reply = response.text;
    res.json({ reply, fallback: false });
  } catch (err: unknown) {
    console.warn('AI call fallback triggered:', err instanceof Error ? err.message : String(err));
    res.json({
      reply: null,
      fallback: true,
      reason: err instanceof Error ? err.message : 'Fallback triggered'
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const port = Number(process.env.PORT) || 3000;

  if (isProd) {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[CHEMVERSE Server] Running on http://0.0.0.0:${port}`);
  });
}

startServer();
