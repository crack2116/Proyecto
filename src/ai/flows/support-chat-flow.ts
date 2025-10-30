'use server';
/**
 * @fileOverview Flujo de IA para un chat de soporte conversacional.
 *
 * - supportChat - Mantiene una conversación para responder preguntas de soporte.
 * - Message - El tipo para un solo mensaje en el historial del chat.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;

const supportChatFlow = ai.defineFlow(
  {
    name: 'supportChatFlow',
    inputSchema: z.array(MessageSchema),
    outputSchema: MessageSchema,
  },
  async (history) => {
    const systemPrompt = `Eres un asistente virtual para "Mewing Transport Manager", una aplicación de gestión de logística y transporte. Tu rol es ayudar a los usuarios a entender y utilizar la aplicación.

      Funcionalidades de la aplicación:
      - Dashboard: Muestra estadísticas clave como ingresos, servicios en curso y completados.
      - Solicitudes de Servicio: Permite crear, ver y gestionar todas las solicitudes de transporte. Los estados son: Pendiente, Asignado, En Progreso, Completado, Cancelado.
      - Gestión: Administra Clientes, Conductores y Vehículos.
      - Seguimiento en Tiempo Real: Muestra la ubicación de los vehículos en un mapa.
      - Reportes: Genera reportes de rendimiento y utilización.
      - IA Gerencial: Ofrece análisis y recomendaciones estratégicas basadas en KPIs.
      - Perfil: Permite al usuario ver y editar su información.

      Instrucciones:
      - Sé amable, conciso y directo.
      - Responde únicamente sobre las funcionalidades de la aplicación "Mewing Transport Manager".
      - Si te preguntan algo que no tiene que ver con la aplicación, responde amablemente que solo puedes ayudar con temas relacionados al sistema de gestión de transporte.
      - No inventes funcionalidades que no existen.
      - Mantén las respuestas breves, idealmente en 2-3 frases.`;

    // Genkit espera un arreglo de mensajes; construimos uno con un mensaje "system" inicial
    const messages = [
      { role: 'system' as const, content: [{ text: systemPrompt }] },
      ...history.map((m) => ({ role: m.role as 'user' | 'model', content: [{ text: m.content }] })),
    ];

    const { output } = await ai.generate({
      messages,
      model: 'googleai/gemini-2.5-flash',
      config: {
        temperature: 0.5,
      },
    });

    const result: Message = {
      role: 'model',
      content: output.text ?? '',
    };

    return result;
  }
);

export async function supportChat(history: Message[]): Promise<Message> {
  return supportChatFlow(history);
}
