"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { TruckIcon, Loader2 } from "lucide-react";
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
  const { data: vehicles, isLoading } = useCollection<Vehicle & { lat: number, lng: number, status: string }>(vehiclesQuery);


  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <p className="text-destructive-foreground bg-destructive p-4 rounded-md">
          Falta la clave de API de Google Maps.
        </p>
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
          ) : (
            vehicles?.map((vehicle) => (
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
          )}
        </Map>
      </TooltipProvider>
    </APIProvider>
  );
}
