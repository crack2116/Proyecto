import { Faq } from "@/components/support/faq";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Soporte</h1>
        <p className="text-muted-foreground">Encuentra respuestas a tus preguntas y obtén asistencia.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preguntas Frecuentes</CardTitle>
        </CardHeader>
        <CardContent>
            <Faq />
        </CardContent>
      </Card>
    </div>
  );
}
