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

  try {
    const response = await fetch(`https://api.sunat.dev/ruc/${ruc}`);
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'No se encontró el RUC.' };
    }
    const data = await response.json();
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
  } catch (error) {
    console.error("Error fetching SUNAT data:", error);
    return { success: false, message: "Error al conectar con el servicio de consulta RUC." };
  }
}
