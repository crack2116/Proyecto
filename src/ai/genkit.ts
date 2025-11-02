import { genkit, configureGenkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { nextDev } from '@genkit-ai/next/dev';

const IS_DEV = process.env.NODE_ENV === 'development';

export const config = configureGenkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
    ...(IS_DEV ? [nextDev()] : []),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const ai = genkit(config);

export default config;
