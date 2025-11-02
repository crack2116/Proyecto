/**
 * @fileoverview This file is the entry point for the Genkit development server.
 *
 * It is not included in the production build.
 */

import { dev } from '@genkit-ai/next/dev';
import config from './genkit';

dev(config);
