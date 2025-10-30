import { Faq } from "@/components/support/faq";
import { SupportChat } from "@/components/support/support-chat";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Soporte y Asistencia</h1>
        <p className="text-muted-foreground">Encuentra respuestas a tus preguntas y obtén ayuda de nuestro asistente virtual.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <SupportChat />
        <Card>
          <CardHeader>
            <CardTitle>Preguntas Frecuentes</CardTitle>
            <CardDescription>Respuestas rápidas a las dudas más comunes.</CardDescription>
          </CardHeader>
          <CardContent>
              <Faq />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
