import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '1mb' }));

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY is not configured in environment secrets.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function handleGeminiError(res: express.Response, error: unknown) {
  const message = error instanceof Error ? error.message : 'Unexpected server error';
  const status = message.includes('GEMINI_API_KEY') ? 503 : 500;
  res.status(status).json({ error: message });
}

app.post('/api/ai/search', async (req, res) => {
  try {
    const { query, projects } = req.body ?? {};
    if (typeof query !== 'string' || !query.trim()) {
      res.status(400).json({ error: 'Search query is required.' });
      return;
    }
    if (!Array.isArray(projects)) {
      res.status(400).json({ error: 'Projects list is required.' });
      return;
    }

    const ai = getGeminiClient();
    const projectSummary = projects.map((p: Record<string, unknown>) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      nature: p.nature,
      shortDescription: p.shortDescription,
      toolsUsed: p.toolsUsed,
      tags: p.tags,
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: `Visitor search query: "${query.trim()}"\n\nPortfolio projects:\n${JSON.stringify(projectSummary, null, 2)}`,
      config: {
        systemInstruction:
          'You are a portfolio discovery engine for Krishna Ladva. Rank the matching project IDs from most relevant to least relevant for the visitor query, and write a brief, factual 1-sentence discovery insight referencing only real details from the provided projects. Never invent metrics or employers.',
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchedIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Ordered array of matching project IDs (most relevant first). Empty array if none match.',
            },
            discoveryNote: {
              type: Type.STRING,
              description: 'Concise 1-sentence factual explanation of why these boards match.',
            },
          },
          required: ['matchedIds', 'discoveryNote'],
        },
      },
    });

    const parsed = JSON.parse((response.text ?? '{}').trim());
    res.json({
      matchedIds: Array.isArray(parsed.matchedIds) ? parsed.matchedIds : [],
      discoveryNote: typeof parsed.discoveryNote === 'string' ? parsed.discoveryNote : '',
    });
  } catch (error) {
    handleGeminiError(res, error);
  }
});

app.post('/api/ai/assistant', async (req, res) => {
  try {
    const { question, history, contextPrompt } = req.body ?? {};
    if (typeof question !== 'string' || !question.trim()) {
      res.status(400).json({ error: 'Question is required.' });
      return;
    }

    const ai = getGeminiClient();
    const historyText = Array.isArray(history)
      ? history
          .slice(-6)
          .map((m: { role?: string; content?: string }) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content ?? ''}`)
          .join('\n')
      : '';

    const prompt = historyText
      ? `Recent conversation:\n${historyText}\n\nNew visitor question: ${question.trim()}`
      : `Visitor question: ${question.trim()}`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        systemInstruction:
          typeof contextPrompt === 'string' && contextPrompt.trim()
            ? contextPrompt
            : 'You are a helpful portfolio assistant for Krishna Ladva. Only state factual details provided.',
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    res.json({ reply: response.text ?? 'I could not generate a response right now.' });
  } catch (error) {
    handleGeminiError(res, error);
  }
});

app.post('/api/ai/discover', async (req, res) => {
  try {
    const { roleFocus, contextPrompt } = req.body ?? {};
    if (typeof roleFocus !== 'string' || !roleFocus.trim()) {
      res.status(400).json({ error: 'Role focus is required.' });
      return;
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: `Explain concisely how Krishna Ladva's actual resume skills, BCA background, and portfolio boards align with this role focus: "${roleFocus.trim()}".`,
      config: {
        systemInstruction:
          (typeof contextPrompt === 'string' ? contextPrompt : '') +
          '\nReturn structured JSON with a 2-sentence headline summary, 3 concrete factual alignment points, and 2 recommended portfolio project IDs from the provided list.',
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            alignmentPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            recommendedProjectIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['summary', 'alignmentPoints', 'recommendedProjectIds'],
        },
      },
    });

    const parsed = JSON.parse((response.text ?? '{}').trim());
    res.json(parsed);
  } catch (error) {
    handleGeminiError(res, error);
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, collaborationType, message } = req.body ?? {};
  if (
    typeof name !== 'string' ||
    name.trim().length < 2 ||
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof collaborationType !== 'string' ||
    !collaborationType.trim() ||
    typeof message !== 'string' ||
    message.trim().length < 10
  ) {
    res.status(400).json({ error: 'Please complete all required fields with valid information.' });
    return;
  }

  res.json({
    ok: true,
    referenceId: `KL-${Date.now().toString(36).toUpperCase()}`,
    receivedAt: new Date().toISOString(),
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
