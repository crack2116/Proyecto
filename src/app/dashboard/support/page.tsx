import { SupportChat } from "@/components/support/support-chat";
import { Faq } from "@/components/support/faq";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Robot } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Asistente de IA</h1>
        <p className="text-muted-foreground">Chatea con nuestro asistente virtual para obtener ayuda.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chat Component */}
        <div className="lg:col-span-2">
            <SupportChat />
        </div>

        {/* FAQ Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
              <CardDescription>Respuestas a las preguntas más comunes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Faq />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
