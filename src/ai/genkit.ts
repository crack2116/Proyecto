import {config} from 'dotenv';

// Cargar variables de entorno soportando .env.local en desarrollo
try {
  const envPath = process.env.NODE_ENV === 'development' ? '.env.local' : undefined;
  config(envPath ? { path: envPath } : undefined);
} catch (_) {
  // ignore if dotenv isn't available in the runtime
}

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const apiKey =
  process.env.GOOGLE_AI_API_KEY ||
  process.env.GOOGLE_GENAI_API_KEY ||
  process.env.GEMINI_API_KEY; // compat: usuario pudo definir GEMINI_API_KEY

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey || '',
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
