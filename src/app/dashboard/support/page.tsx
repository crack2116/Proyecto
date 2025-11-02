import { SupportChat } from "@/components/support/support-chat";

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Asistente IA</h1>
        <p className="text-muted-foreground">Chatea con nuestro asistente virtual para resolver tus dudas.</p>
      </div>

      <SupportChat />
    </div>
  );
}
