import {config} from 'dotenv';

// Cargar variables de entorno
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey || '',
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
