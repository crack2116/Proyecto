"use client";

import { TransportMap } from "@/components/tracking/transport-map";
import { TrackingStats } from "@/components/tracking/tracking-stats";
import { ActiveVehiclesList } from "@/components/tracking/active-vehicles-list";
import { RouteManager } from "@/components/tracking/route-manager";
import { Card, CardContent } from "@/components/ui/card";
import { useRealtimeTracking } from "@/hooks/use-realtime-tracking";
import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

export default function TrackingPage() {
  const { vehicles, isActive, setIsActive, isLoading, error } = useRealtimeTracking({ enabled: true });
  
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | undefined>();

  const handleVehicleClick = (vehicle: any) => {
    setSelectedVehicleId(vehicle.id);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-destructive">
          <AlertCircle className="h-6 w-6 mr-2" />
          <p>Error al cargar los datos de los vehículos.</p>
        </div>
      );
    }

    return (
      <div className="grid gap-6 lg:grid-cols-3 flex-grow min-h-0" style={{ height: "600px" }}>
        <div className="lg:col-span-2 h-full">
          <Card className="h-full border-0 shadow-modern flex flex-col">
            <CardContent className="p-0 h-full flex-1 min-h-0">
              <TransportMap 
                vehicles={vehicles}
                isActive={isActive}
                onToggleActive={setIsActive}
                selectedVehicleId={selectedVehicleId}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 h-full flex flex-col">
          <ActiveVehiclesList 
            vehicles={vehicles}
            onVehicleClick={handleVehicleClick}
            selectedVehicleId={selectedVehicleId}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-6rem)]">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Seguimiento en Tiempo Real</h1>
        <p className="text-muted-foreground">Monitorea todos los servicios activos en el mapa.</p>
      </div>

      <TrackingStats vehicles={vehicles} />
      
      {/* Comentado temporalmente para simplificar la UI y enfocarse en la conexión de datos */}
      {/* <RouteManager /> */}
      
      {renderContent()}
    </div>
  );
}
