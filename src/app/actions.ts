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
      console.log(`Datos recibidos de ${apiUrl}:`, data); // Log para debugging
      
      // Procesar respuesta según el formato de cada API con mapeo robusto
      if (apiUrl.includes('api.sunat.dev')) {
        return { 
          success: true, 
          data: {
            ruc: data.ruc || data.numeroDocumento || ruc,
            razonSocial: data.razon_social || data.razonSocial || data.nombreRazonSocial || data.nombre || 'N/A',
            direccion: data.direccion || data.domicilio_fiscal || data.direccionCompleta || 'N/A',
            estado: data.estado || data.estadoContribuyente || 'N/A',
            condicion: data.condicion || data.condicionContribuyente || 'N/A',
          }
        };
      } else if (apiUrl.includes('apis.net.pe')) {
        return { 
          success: true, 
          data: {
            ruc: data.numeroDocumento || data.ruc || ruc,
            razonSocial: data.nombreRazonSocial || data.razonSocial || data.razon_social || 'N/A',
            direccion: data.direccionCompleta || data.direccion || data.domicilio_fiscal || 'N/A',
            estado: data.estado || data.estadoContribuyente || 'N/A',
            condicion: data.condicion || data.condicionContribuyente || 'N/A',
          }
        };
      } else if (apiUrl.includes('ruc.com.pe')) {
        return { 
          success: true, 
          data: {
            ruc: data.ruc || data.numeroDocumento || ruc,
            razonSocial: data.razon_social || data.razonSocial || data.nombreRazonSocial || 'N/A',
            direccion: data.domicilio_fiscal || data.direccion || data.direccionCompleta || 'N/A',
            estado: data.estado || data.estadoContribuyente || 'N/A',
            condicion: data.condicion || data.condicionContribuyente || 'N/A',
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
    message: "No se pudo obtener información del RUC. Verifica que sea correcto o ingresa los datos manualmente." 
  };
}