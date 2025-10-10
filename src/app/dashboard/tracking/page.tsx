import { TransportMap } from "@/components/tracking/transport-map";
import { Card, CardContent } from "@/components/ui/card";

export default function TrackingPage() {
    return (
      <div className="flex flex-col gap-8 h-[calc(100vh-10rem)]">
        <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Seguimiento en Tiempo Real</h1>
            <p className="text-muted-foreground">Monitorea todos los servicios activos en el mapa.</p>
        </div>
        <Card className="flex-grow">
          <CardContent className="p-0 h-full">
            <TransportMap />
          </CardContent>
        </Card>
      </div>
    );
  }
