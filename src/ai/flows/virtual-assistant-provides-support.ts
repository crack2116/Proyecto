'use server';

/**
 * @fileOverview A virtual assistant that provides support to users.
 *
 * - virtualAssistantProvidesSupport - A function that handles user queries and provides support.
 * - VirtualAssistantProvidesSupportInput - The input type for the virtualAssistantProvidesSupport function.
 * - VirtualAssistantProvidesSupportOutput - The return type for the virtualAssistantProvidesSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VirtualAssistantProvidesSupportInputSchema = z.object({
  query: z.string().describe('The user query or issue description.'),
});
export type VirtualAssistantProvidesSupportInput = z.infer<typeof VirtualAssistantProvidesSupportInputSchema>;

const VirtualAssistantProvidesSupportOutputSchema = z.object({
  response: z.string().describe('The virtual assistant\'s response to the user query.'),
});
export type VirtualAssistantProvidesSupportOutput = z.infer<typeof VirtualAssistantProvidesSupportOutputSchema>;

export async function virtualAssistantProvidesSupport(
  input: VirtualAssistantProvidesSupportInput
): Promise<VirtualAssistantProvidesSupportOutput> {
  return virtualAssistantProvidesSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'virtualAssistantProvidesSupportPrompt',
  input: {schema: VirtualAssistantProvidesSupportInputSchema},
  output: {schema: VirtualAssistantProvidesSupportOutputSchema},
  prompt: `You are a virtual assistant for a transport service company. Your goal is to help users with their issues and difficulties on the platform.

  User Query: {{{query}}}

  Please provide a helpful and informative response to the user query. If you cannot answer the question, please ask the user to contact support directly.`,
});

const virtualAssistantProvidesSupportFlow = ai.defineFlow(
  {
    name: 'virtualAssistantProvidesSupportFlow',
    inputSchema: VirtualAssistantProvidesSupportInputSchema,
    outputSchema: VirtualAssistantProvidesSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
