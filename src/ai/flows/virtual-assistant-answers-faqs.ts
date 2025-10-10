'use server';
/**
 * @fileOverview A virtual assistant that answers frequently asked questions about the transportation services.
 *
 * - virtualAssistantAnswersFAQs - A function that handles the virtual assistant answering frequently asked questions.
 * - VirtualAssistantAnswersFAQsInput - The input type for the virtualAssistantAnswersFAQs function.
 * - VirtualAssistantAnswersFAQsOutput - The return type for the virtualAssistantAnswersFAQs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VirtualAssistantAnswersFAQsInputSchema = z.object({
  question: z.string().describe('The question asked by the user.'),
});
export type VirtualAssistantAnswersFAQsInput = z.infer<typeof VirtualAssistantAnswersFAQsInputSchema>;

const VirtualAssistantAnswersFAQsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type VirtualAssistantAnswersFAQsOutput = z.infer<typeof VirtualAssistantAnswersFAQsOutputSchema>;

export async function virtualAssistantAnswersFAQs(input: VirtualAssistantAnswersFAQsInput): Promise<VirtualAssistantAnswersFAQsOutput> {
  return virtualAssistantAnswersFAQsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'virtualAssistantAnswersFAQsPrompt',
  input: {schema: VirtualAssistantAnswersFAQsInputSchema},
  output: {schema: VirtualAssistantAnswersFAQsOutputSchema},
  prompt: `You are a virtual assistant for Mewing Transport Manager, a transportation services company. Answer the following question about the transportation services:\n\nQuestion: {{{question}}}`,
});

const virtualAssistantAnswersFAQsFlow = ai.defineFlow(
  {
    name: 'virtualAssistantAnswersFAQsFlow',
    inputSchema: VirtualAssistantAnswersFAQsInputSchema,
    outputSchema: VirtualAssistantAnswersFAQsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
