import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { validateMlDomain, OUT_OF_SCOPE_RESPONSE } from './server/domainValidator.ts';
import { ML_KNOWLEDGE_TOPICS, ML_ALGORITHMS, ML_GLOSSARY, ML_ROADMAP } from './server/knowledgeBase.ts';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(express.json({ limit: '1mb' }));

// Initialize Google Gemini Client (Server-side only)
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('⚠️ GEMINI_API_KEY is not set in environment variables.');
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Health & System Info
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'ML Assistant',
    description: 'Domain-Specific Machine Learning AI Assistant',
    version: '1.0.0',
    apiKeyConfigured: Boolean(apiKey),
    timestamp: new Date().toISOString()
  });
});

// Domain Validation Direct Inspection Endpoint (for Testing & Architecture Demonstration)
app.post('/api/validate-domain', (req: Request, res: Response) => {
  const query = typeof req.body?.query === 'string' ? req.body.query : '';
  const validation = validateMlDomain(query);
  return res.json({
    query,
    ...validation,
    timestamp: new Date().toISOString()
  });
});

// Knowledge Base Topics (21 Categories)
app.get('/api/kb/topics', (req: Request, res: Response) => {
  res.json({
    total: ML_KNOWLEDGE_TOPICS.length,
    topics: ML_KNOWLEDGE_TOPICS
  });
});

// Algorithm Explorer Data
app.get('/api/kb/algorithms', (req: Request, res: Response) => {
  res.json({
    total: ML_ALGORITHMS.length,
    algorithms: ML_ALGORITHMS
  });
});

// ML Glossary
app.get('/api/kb/glossary', (req: Request, res: Response) => {
  res.json({
    total: ML_GLOSSARY.length,
    glossary: ML_GLOSSARY
  });
});

// Learning Roadmap
app.get('/api/kb/roadmap', (req: Request, res: Response) => {
  res.json({
    total: ML_ROADMAP.length,
    roadmap: ML_ROADMAP
  });
});

// Core Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const { message, history } = req.body;

    // Step 1 & 2: Input Validation & Sanitization
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Please enter a valid question about Machine Learning.',
        isOutOfScope: false
      });
    }

    const cleanMessage = message.trim();

    if (cleanMessage.length > 2000) {
      return res.status(400).json({
        error: 'Your message is too long (limit: 2000 characters). Please provide a concise ML question.',
        isOutOfScope: false
      });
    }

    // Step 3: Domain Validation (with conversational context for follow-up questions)
    const recentHistoryText = Array.isArray(history) && history.length > 0 
      ? history.slice(-2).map((h: any) => h?.text || '').join(' ')
      : undefined;
    const domainValidation = validateMlDomain(cleanMessage, recentHistoryText);

    // Step 5: If not ML-related, return predefined out-of-scope response
    if (!domainValidation.isMlDomain) {
      const elapsed = Date.now() - startTime;
      return res.json({
        response: OUT_OF_SCOPE_RESPONSE,
        isOutOfScope: true,
        matchedKeywords: [],
        category: 'Out of Scope',
        reason: domainValidation.reason,
        confidence: domainValidation.confidence,
        executionTimeMs: elapsed
      });
    }

    // Step 4: If ML-related, forward to Gemini with strict system instruction
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini AI client is currently unavailable. Please verify that GEMINI_API_KEY is configured.',
        isOutOfScope: false
      });
    }

    const systemInstruction = 
`You are ML Assistant, a domain-specific Machine Learning educational chatbot.
Your primary responsibility is to answer questions related to Machine Learning accurately, clearly, and helpfully.
Determine whether each user query is within the supported ML domain. If it is outside the domain, politely refuse to answer and redirect the user to Machine Learning topics. Never pretend that an unrelated question is an ML question.

Response Guidelines:
1. Tone: Professional, encouraging, clear, and beginner-friendly yet technically precise.
2. Structure: Use markdown with clear headings, bullet points, numbered lists, and bold keywords.
3. Formulas: Where relevant, present mathematical formulas cleanly using readable notation or LaTeX (e.g. loss functions, MSE, cross-entropy, distance formulas, Bayes rule).
4. Code Examples: When providing Python code for ML, provide clean, idiomatic snippets using scikit-learn, PyTorch, NumPy, or Pandas, and explain the key lines step-by-step.
5. Comparisons: When asked to compare algorithms (e.g. Random Forest vs SVM), use comparison tables or balanced pros/cons.
6. Real-World Context: Include intuitive real-world examples to anchor theoretical ML concepts.
7. Anti-Hallucination: If an algorithm or hyperparameter has subtle caveats or limitations (e.g., curse of dimensionality, class imbalance sensitivity), state them honestly.`;

    // Build valid alternating conversation history
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      let expectedRole: 'user' | 'model' = 'user';
      for (const item of history.slice(-6)) {
        if (item && typeof item.text === 'string' && item.text.trim()) {
          if (item.role === expectedRole) {
            contents.push({
              role: item.role,
              parts: [{ text: item.text.trim() }]
            });
            expectedRole = expectedRole === 'user' ? 'model' : 'user';
          }
        }
      }
      // If history ends on 'user', remove it so we don't have consecutive 'user' turns
      if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
        contents.pop();
      }
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: cleanMessage }]
    });

    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    let geminiResponse: any = null;
    let modelUsed = '';
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        geminiResponse = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.4, // Lower temperature for factual ML explanations
          }
        });
        modelUsed = modelName;
        break; // Successfully generated
      } catch (err: any) {
        console.warn(`Attempt with ${modelName} failed, trying next model:`, err?.message || err);
        lastError = err;
      }
    }

    if (!geminiResponse) {
      throw lastError || new Error('All AI model tiers are currently unavailable.');
    }

    const replyText = geminiResponse.text || 'I was unable to generate an answer at this time. Please try again.';
    const elapsed = Date.now() - startTime;

    return res.json({
      response: replyText,
      isOutOfScope: false,
      modelUsed,
      matchedKeywords: domainValidation.matchedKeywords,
      category: domainValidation.category || 'Machine Learning',
      reason: domainValidation.reason,
      confidence: domainValidation.confidence,
      executionTimeMs: elapsed
    });

  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const elapsed = Date.now() - startTime;
    return res.status(500).json({
      error: 'Something went wrong while processing your request. Please try again in a moment.',
      details: error?.message || 'Unknown error',
      isOutOfScope: false,
      executionTimeMs: elapsed
    });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('⚡ Vite middleware mounted in development mode');
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 ML Assistant Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
