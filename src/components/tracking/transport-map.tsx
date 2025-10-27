"use client";

import dynamic from "next/dynamic";
import { TruckIcon, Loader2, AlertCircle } from "lucide-react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import type { Vehicle } from "@/lib/types";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

type VehicleWithLocation = Vehicle & { 
  lat: number; 
  lng: number; 
  status: string;
  driverId?: string;
  licensePlate?: string;
};

export function TransportMap() {
  const firestore = useFirestore();
  const vehiclesQuery = useMemoFirebase(
    () => query(collection(firestore, "vehicles")), 
    [firestore]
  );
  const { data: vehicles, isLoading, error } = useCollection<VehicleWithLocation>(vehiclesQuery);

  const center: [number, number] = [-5.19449, -80.63282];

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center p-6">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-destructive mb-2">
            Error al Cargar Vehículos
          </h3>
          <p className="text-destructive-foreground">
            No se pudieron cargar los datos de los vehículos.
          </p>
        </div>
      </div>
    );
  }

  const createVehicleIcon = () => {
    if (typeof window === "undefined") return null;
    const L = require("leaflet");
    
    return L.divIcon({
      className: "custom-vehicle-marker",
      html: `<div style="
        background: hsl(221, 83%, 53%);
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        border: 3px solid white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg style="transform: rotate(45deg);" width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5S5.17 15.5 6 15.5s1.5.67 1.5 1.5S6.83 18.5 6 18.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-muted">
      {typeof window !== "undefined" ? (
        <MapContainer
          center={center}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center z-[1000] bg-background/80">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Cargando vehículos...</p>
              </div>
            </div>
          ) : vehicles && vehicles.length > 0 ? (
            vehicles.map((vehicle) => {
              const vehicleIcon = createVehicleIcon();

              return (
                <Marker
                  key={vehicle.id}
                  position={[vehicle.lat, vehicle.lng]}
                  icon={vehicleIcon}
                >
                  <Popup>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <TruckIcon className="h-5 w-5 text-primary" />
                        {vehicle.licensePlate || vehicle.vehicleType}
                      </h3>
                      <div className="space-y-1 text-sm">
                        {vehicle.driverId && (
                          <p className="text-muted-foreground">
                            <span className="font-medium">Conductor:</span> {vehicle.driverId}
                          </p>
                        )}
                        <p className="text-muted-foreground">
                          <span className="font-medium">Vehículo:</span> {vehicle.make} {vehicle.model}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Estado:</span>{" "}
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {vehicle.status || "Disponible"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })
          ) : (
            <div className="absolute inset-0 flex items-center justify-center z-[1000]">
              <div className="text-center p-6 bg-background/80 rounded-lg">
                <TruckIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No hay vehículos disponibles
                </h3>
                <p className="text-muted-foreground text-sm">
                  No se encontraron vehículos para mostrar en el mapa.
                </p>
              </div>
            </div>
          )}
        </MapContainer>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}
