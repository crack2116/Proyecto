"use client";

import { TransportMap } from "@/components/tracking/transport-map";
import { TrackingStats } from "@/components/tracking/tracking-stats";
import { ActiveVehiclesList } from "@/components/tracking/active-vehicles-list";
import { Card, CardContent } from "@/components/ui/card";
import { useRealtimeTracking } from "@/hooks/use-realtime-tracking";

export default function TrackingPage() {
  const { vehicles, isActive, setIsActive } = useRealtimeTracking({
    interval: 3000,
    enabled: true,
  });

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-6rem)]">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Seguimiento en Tiempo Real</h1>
        <p className="text-muted-foreground">Monitorea todos los servicios activos en el mapa.</p>
      </div>

      {/* Estadísticas en tiempo real */}
      <TrackingStats vehicles={vehicles} />

      {/* Mapa y lista de vehículos */}
      <div className="grid gap-6 lg:grid-cols-3 flex-grow min-h-0" style={{ height: "600px" }}>
        {/* Mapa - Ocupa 2 columnas en desktop */}
        <div className="lg:col-span-2 h-full">
          <Card className="h-full border-0 shadow-modern flex flex-col">
            <CardContent className="p-0 h-full flex-1 min-h-0">
              <TransportMap 
                vehicles={vehicles}
                isActive={isActive}
                onToggleActive={setIsActive}
              />
            </CardContent>
          </Card>
        </div>

        {/* Lista de vehículos activos */}
        <div className="lg:col-span-1 h-full flex flex-col">
          <ActiveVehiclesList vehicles={vehicles} />
        </div>
      </div>
    </div>
  );
}
