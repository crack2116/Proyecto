"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { vehicles } from "@/lib/data";
import { TruckIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TransportMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

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
          {vehicles.map((vehicle) => (
            <Tooltip key={vehicle.id}>
              <TooltipTrigger asChild>
                <AdvancedMarker position={{ lat: vehicle.lat, lng: vehicle.lng }}>
                  <div className="p-2 bg-primary rounded-full shadow-lg">
                    <TruckIcon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </AdvancedMarker>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-bold">Vehículo: {vehicle.id}</p>
                <p>Conductor: {vehicle.driver}</p>
                <p>Estado: {vehicle.status}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </Map>
      </TooltipProvider>
    </APIProvider>
  );
}
