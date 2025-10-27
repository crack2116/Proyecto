"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Vehicle = {
  id: string;
  make: string;
  model: string;
  licensePlate: string;
  vehicleType: string;
  driverId?: string;
  status: string;
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
  lastUpdate: Date;
};

interface ActiveVehiclesListProps {
  vehicles: Vehicle[];
}

const statusColors = {
  "En Tránsito": "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  "Disponible": "bg-green-500/20 text-green-700 dark:text-green-300",
  "En Mantenimiento": "bg-amber-500/20 text-amber-700 dark:text-amber-300",
};

export function ActiveVehiclesList({ vehicles }: ActiveVehiclesListProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('es-PE', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className="border-0 shadow-modern">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          Vehículos Activos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm truncate">{vehicle.licensePlate}</p>
                    <Badge className={cn(statusColors[vehicle.status as keyof typeof statusColors] || "bg-gray-500/20 text-gray-700", "border-none text-xs px-2 py-0")}>
                      {vehicle.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {vehicle.make} {vehicle.model}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{vehicle.driverId || "Sin conductor"}</span>
                    </div>
                    {vehicle.speed && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{vehicle.speed.toFixed(1)} km/h</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">
                  {formatTime(vehicle.lastUpdate)}
                </p>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground">En vivo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

