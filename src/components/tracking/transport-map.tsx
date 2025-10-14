"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { TruckIcon, Loader2, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import type { Vehicle } from "@/lib/types";

export function TransportMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const firestore = useFirestore();
  const vehiclesQuery = useMemoFirebase(() => query(collection(firestore, "vehicles")), [firestore]);
  const { data: vehicles, isLoading, error } = useCollection<Vehicle & { lat: number, lng: number, status: string }>(vehiclesQuery);


  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center p-6">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-destructive mb-2">
            Configuración Requerida
          </h3>
          <p className="text-destructive-foreground">
            Falta la clave de API de Google Maps. Por favor, configura la variable de entorno NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center p-6">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-destructive mb-2">
            Error al Cargar Vehículos
          </h3>
          <p className="text-destructive-foreground">
            No se pudieron cargar los datos de los vehículos. Por favor, intenta de nuevo más tarde.
          </p>
        </div>
      </div>
    );
  }

  const position = { lat: -5.19449, lng: -80.63282 }; // Center of Piura

  return (
    <APIProvider apiKey={apiKey} language="es">
      <TooltipProvider>
        <Map
          defaultCenter={position}
          defaultZoom={12}
          mapId="mewing-transport-map"
          className="w-full h-full rounded-lg"
          disableDefaultUI={true}
        >
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : vehicles && vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
                <Tooltip key={vehicle.id}>
                <TooltipTrigger asChild>
                    <AdvancedMarker position={{ lat: vehicle.lat, lng: vehicle.lng }}>
                    <div className="p-2 bg-primary rounded-full shadow-lg">
                        <TruckIcon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    </AdvancedMarker>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-bold">Vehículo: {vehicle.licensePlate}</p>
                    <p>Conductor: {vehicle.driverId}</p>
                    <p>Estado: {vehicle.status}</p>
                </TooltipContent>
                </Tooltip>
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-6">
                <TruckIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No hay vehículos disponibles
                </h3>
                <p className="text-muted-foreground">
                  No se encontraron vehículos para mostrar en el mapa.
                </p>
              </div>
            </div>
          )}
        </Map>
      </TooltipProvider>
    </APIProvider>
  );
}
