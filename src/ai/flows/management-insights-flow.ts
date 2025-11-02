'use server';
/**
 * @fileOverview Flujo de IA que genera insights y recomendaciones gerenciales.
 *
 * - generateManagementInsights - Genera análisis y sugerencias para la gerencia.
 * - ManagementInsightsInput - El tipo de entrada para la función.
 * - ManagementInsightsOutput - El tipo de salida de la función.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const ManagementInsightsInputSchema = z.object({
  totalServices: z.number().describe('Cantidad total de servicios en el período.'),
  punctualityRate: z.number().describe('Tasa de puntualidad como porcentaje (ej. 85 para 85%).'),
  vehicleUtilization: z.number().describe('Tasa de utilización de vehículos como porcentaje.'),
  inProgressServices: z.number().describe('Cantidad de servicios actualmente en progreso.'),
  pendingRequests: z.number().describe('Cantidad de solicitudes pendientes de asignación.'),
  revenueData: z.object({
    total: z.number().describe('Ingresos totales del período.'),
    growthPercentage: z.number().describe('Porcentaje de crecimiento de ingresos comparado con el período anterior.'),
  }),
});
export type ManagementInsightsInput = z.infer<typeof ManagementInsightsInputSchema>;

const ManagementInsightsOutputSchema = z.object({
  executiveSummary: z.string().describe('Un resumen ejecutivo de 2-3 frases sobre el estado general del negocio.'),
  positivePoints: z.array(z.string()).describe('Lista de 2-3 puntos positivos o fortalezas clave identificadas en los datos.'),
  areasForImprovement: z.array(z.string()).describe('Lista de 2-3 áreas de mejora o debilidades críticas identificadas.'),
  actionableRecommendations: z.array(z.object({
    recommendation: z.string().describe('Una recomendación específica y accionable.'),
    justification: z.string().describe('La justificación basada en datos para esa recomendación.'),
    expectedImpact: z.string().describe('El impacto esperado al implementar la recomendación (ej. "Aumento de la eficiencia en un 15%").'),
  })).describe('Una lista de 3 recomendaciones concretas para la gerencia.'),
});
export type ManagementInsightsOutput = z.infer<typeof ManagementInsightsOutputSchema>;

export async function generateManagementInsights(input: ManagementInsightsInput): Promise<ManagementInsightsOutput> {
  return managementInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'managementInsightsPrompt',
  input: {schema: ManagementInsightsInputSchema},
  output: {schema: ManagementInsightsOutputSchema},
  prompt: `Eres un consultor de negocios experto en la industria del transporte y la logística, trabajando para "Mewing Transport Manager". Tu tarea es analizar los siguientes KPIs (Key Performance Indicators) y generar un reporte conciso y accionable para la gerencia.

### KPIs del Período Actual:
- **Servicios Totales**: {{{totalServices}}}
- **Tasa de Puntualidad**: {{{punctualityRate}}}%
- **Utilización de Vehículos**: {{{vehicleUtilization}}}%
- **Ingresos Totales**: S/ {{{revenueData.total}}}
- **Crecimiento de Ingresos**: {{{revenueData.growthPercentage}}}%
- **Servicios en Progreso**: {{{inProgressServices}}}
- **Solicitudes Pendientes**: {{{pendingRequests}}}

### Tu Tarea:
Basándote en estos datos, genera el siguiente análisis en formato JSON:
1.  **Resumen Ejecutivo**: Un resumen breve y directo del estado actual del negocio.
2.  **Puntos Positivos**: Identifica 2 o 3 fortalezas clave. ¿Qué está funcionando bien?
3.  **Áreas de Mejora**: Identifica 2 o 3 debilidades o áreas de oportunidad críticas. ¿Dónde hay problemas o potencial no explotado?
4.  **Recomendaciones Accionables**: Proporciona 3 recomendaciones específicas que la gerencia pueda implementar. Para cada recomendación, incluye una justificación basada en los datos y el impacto esperado.

Sé directo, profesional y enfócate en dar valor estratégico. Usa un lenguaje claro y de negocios.`,
});

const managementInsightsFlow = ai.defineFlow(
  {
    name: 'managementInsightsFlow',
    inputSchema: ManagementInsightsInputSchema,
    outputSchema: ManagementInsightsOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
      prompt: {
        ...prompt,
        input,
      },
      model: 'gemini-pro',
    });
    // When an output schema is defined, Genkit returns a parsed object in the 'output' property.
    return output!;
  }
);
