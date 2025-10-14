"use server";

import { virtualAssistantProvidesSupport } from "@/ai/flows/virtual-assistant-provides-support";

export async function askVirtualAssistant(
  history: Array<{ role: "user" | "model"; content: string }>,
  query: string
) {
  try {
    const response = await virtualAssistantProvidesSupport({ query });
    return {
      success: true,
      message: response.response,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "I'm sorry, I'm having trouble connecting. Please try again later.",
    };
  }
}

type SunatData = {
  success: boolean;
  data?: {
    ruc: string;
    razonSocial: string;
    direccion: string;
    estado: string;
    condicion: string;
  };
  message?: string;
};

export async function getSunatData(ruc: string): Promise<SunatData> {
  if (!ruc || ruc.length !== 11) {
    return { success: false, message: "El RUC debe tener 11 dígitos." };
  }

  // Lista de APIs de respaldo para consulta RUC
  const apis = [
    `https://api.sunat.dev/ruc/${ruc}`,
    `https://api.apis.net.pe/v1/ruc?numero=${ruc}`,
    `https://ruc.com.pe/api/v1/ruc/${ruc}`,
  ];

  for (const apiUrl of apis) {
    try {
      console.log(`Intentando con API: ${apiUrl}`);
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        // Timeout de 10 segundos
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        console.log(`API ${apiUrl} falló con status: ${response.status}`);
        continue; // Intentar siguiente API
      }

      const data = await response.json();
      
      // Procesar respuesta según el formato de cada API
      if (apiUrl.includes('api.sunat.dev')) {
        return { 
          success: true, 
          data: {
            ruc: data.ruc,
            razonSocial: data.razon_social,
            direccion: data.direccion,
            estado: data.estado,
            condicion: data.condicion,
          }
        };
      } else if (apiUrl.includes('apis.net.pe')) {
        return { 
          success: true, 
          data: {
            ruc: data.numeroDocumento,
            razonSocial: data.razonSocial,
            direccion: data.direccion,
            estado: data.estado,
            condicion: data.condicion,
          }
        };
      } else if (apiUrl.includes('ruc.com.pe')) {
        return { 
          success: true, 
          data: {
            ruc: data.ruc,
            razonSocial: data.razon_social,
            direccion: data.direccion,
            estado: data.estado,
            condicion: data.condicion,
          }
        };
      }
    } catch (error) {
      console.log(`Error con API ${apiUrl}:`, error);
      continue; // Intentar siguiente API
    }
  }

  // Si todas las APIs fallan, devolver error
  return { 
    success: false, 
    message: "Todas las APIs de consulta RUC están temporalmente no disponibles. Por favor, ingresa los datos manualmente." 
  };
}
