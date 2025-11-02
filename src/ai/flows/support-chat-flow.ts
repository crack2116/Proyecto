'use server';
/**
 * @fileOverview A support chat AI agent for the Mewing Transport Manager app.
 *
 * - supportChat - A function that handles the support chat process.
 * - SupportChatInput - The input type for the supportChat function.
 * - SupportChatOutput - The return type for the supportChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export const SupportChatInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string(),
});
export type SupportChatInput = z.infer<typeof SupportChatInputSchema>;

export const SupportChatOutputSchema = z.string();
export type SupportChatOutput = z.infer<typeof SupportChatOutputSchema>;

export async function supportChat(
  input: SupportChatInput
): Promise<SupportChatOutput> {
  const { history, message } = input;

  const result = await ai.generate({
    model: 'googleai/gemini-1.5-flash-latest',
    history: history,
    prompt: message,
    system: `You are a helpful and friendly AI assistant for the "Mewing Transport Manager" application.
Your goal is to assist users with their questions about the application's features and functionality.
Keep your answers concise and easy to understand.
Application Features:
- Dashboard: Shows statistics, recent services, and quick actions.
- Service Requests: Users can create, view, and manage transport requests.
- Management: Admins can manage clients, drivers, and vehicles.
- Real-time Tracking: A map to monitor active vehicles.
- Reports: Generate performance and utilization reports.
- Profile: Users can view their account information.`,
  });

  return result.text;
}
