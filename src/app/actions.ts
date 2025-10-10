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
