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

if (!apiKey) {
    console.warn("⚠️ ADVERTENCIA: La GOOGLE_AI_API_KEY no está configurada en las variables de entorno. La funcionalidad de IA no funcionará.");
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey || '',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
