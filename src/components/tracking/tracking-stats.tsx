"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Navigation, Clock, MapPin } from "lucide-react";

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

interface TrackingStatsProps {
  vehicles: Vehicle[];
}

export function TrackingStats({ vehicles }: TrackingStatsProps) {
  const stats = {
    total: vehicles.length,
    inTransit: vehicles.filter(v => v.status === "En Tránsito").length,
    available: vehicles.filter(v => v.status === "Disponible").length,
    maintenance: vehicles.filter(v => v.status === "En Mantenimiento").length,
    avgSpeed: vehicles.reduce((sum, v) => sum + (v.speed || 0), 0) / vehicles.length || 0,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-0 shadow-modern">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Vehículos Totales
          </CardTitle>
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <Truck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            {stats.total}
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Monitoreando en tiempo real
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-0 shadow-modern">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
            En Tránsito
          </CardTitle>
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
            <Navigation className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-800 dark:text-green-200">
            {stats.inTransit}
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            Realizando servicios
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-0 shadow-modern">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
            Disponibles
          </CardTitle>
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">
            {stats.available}
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
            Listos para asignar
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-0 shadow-modern">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Velocidad Promedio
          </CardTitle>
          <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">
            {stats.avgSpeed.toFixed(1)} km/h
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
            En movimiento activo
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

