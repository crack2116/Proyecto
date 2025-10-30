import { ManagementAI } from "@/components/management-ai/management-ai";
import { Protected } from "@/components/permissions/protected";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function ManagementAIPage() {
  return (
    // Proteger la página entera para administradores
    <Protected requireAdmin fallback={
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Acceso Denegado</AlertTitle>
        <AlertDescription>
          No tienes permisos para acceder a esta sección.
        </AlertDescription>
      </Alert>
    }>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-headline font-bold tracking-tight">IA Gerencial</h1>
          <p className="text-muted-foreground">Análisis y recomendaciones estratégicas impulsadas por Gemini.</p>
        </div>
        <ManagementAI />
      </div>
    </Protected>
  );
}
