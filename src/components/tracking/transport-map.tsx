"use client";
import "leaflet/dist/leaflet.css";
import { TruckIcon, PlayCircle, PauseCircle, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

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

interface TransportMapProps {
  vehicles?: Vehicle[];
  isActive?: boolean;
  onToggleActive?: (active: boolean) => void;
}

export function TransportMap({ 
  vehicles = [],
  isActive = true,
  onToggleActive 
}: TransportMapProps = {}) {
  const [isMapReady, setIsMapReady] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const center: [number, number] = [-5.19449, -80.63282];

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    console.log("useEffect ejecutado - mapContainerRef.current:", !!mapContainerRef.current);
    
    const initMap = async () => {
      if (!mapContainerRef.current) {
        console.warn("mapContainerRef.current es null");
        return;
      }

      if (mapInstanceRef.current) {
        console.warn("Mapa ya inicializado");
        return;
      }

      try {
        console.log("Inicializando mapa...");
        const L = await import("leaflet");
        const container = mapContainerRef.current;
        
        console.log("Dimensiones del contenedor:", {
          width: container.offsetWidth,
          height: container.offsetHeight
        });

        // Esperar a que el contenedor tenga altura
        if (container.offsetHeight === 0) {
          console.warn("El contenedor no tiene altura, reintentando...");
          setTimeout(initMap, 200);
          return;
        }

        if ((container as any)._leaflet_id) {
          console.warn("El contenedor ya tiene un mapa");
          return;
        }

        console.log("Creando mapa Leaflet...");
        const map = L.default.map(container, {
          center: center,
          zoom: 12,
        });

        console.log("Agregando capa de tiles...");
        L.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        mapInstanceRef.current = map;
        setIsMapReady(true);
        console.log("Mapa inicializado correctamente");
      } catch (error) {
        console.error("Error al inicializar el mapa:", error);
      }
    };

    // Pequeño delay para asegurar que el DOM está listo
    const timer = setTimeout(() => {
      initMap();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        console.log("Destruyendo mapa...");
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setIsMapReady(false);
      }
    };
  }, [center]);

  // Función para actualizar o crear marcadores
  useEffect(() => {
    if (isMapReady && vehicles && vehicles.length > 0 && mapInstanceRef.current) {
      const updateMarkers = async () => {
        const L = (await import("leaflet")).default;
        
        vehicles.forEach((vehicle) => {
          // Buscar si el marcador ya existe
          const existingMarker = markersRef.current.find(
            (m: any) => m.vehicleId === vehicle.id
          );

          if (existingMarker) {
            // Actualizar posición con animación
            existingMarker.setLatLng([vehicle.lat, vehicle.lng]);
            
            // Actualizar rotación del icono según el heading
            const rotation = vehicle.heading ? vehicle.heading - 45 : 0;
            existingMarker.setIcon(L.divIcon({
              className: "custom-vehicle-marker",
              html: `<div style="
                background: hsl(221, 83%, 53%);
                width: 40px;
                height: 40px;
                border-radius: 50% 50% 50% 0;
                border: 3px solid white;
                box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                transform: rotate(${rotation}deg);
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
            }));
            
            // Actualizar popup
            const popupContent = `
              <div style="padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 8px;">
                  ${vehicle.licensePlate}
                </h3>
                <p style="margin: 4px 0;">Conductor: ${vehicle.driverId || "N/A"}</p>
                <p style="margin: 4px 0;">Vehículo: ${vehicle.make} ${vehicle.model}</p>
                <p style="margin: 4px 0;">Estado: ${vehicle.status}</p>
                ${vehicle.speed ? `<p style="margin: 4px 0;">Velocidad: ${vehicle.speed.toFixed(1)} km/h</p>` : ""}
                <p style="margin: 4px 0; font-size: 10px; color: #666;">
                  Actualizado: ${new Date(vehicle.lastUpdate).toLocaleTimeString()}
                </p>
              </div>
            `;
            existingMarker.setPopupContent(popupContent);
          } else {
            // Crear nuevo marcador
            const vehicleIcon = L.divIcon({
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

            const marker = L.marker([vehicle.lat, vehicle.lng], { 
              icon: vehicleIcon,
            });
            // Asignar ID personalizado al marcador
            (marker as any).vehicleId = vehicle.id;
            marker.addTo(mapInstanceRef.current);
            markersRef.current.push(marker);

            const popupContent = `
              <div style="padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 8px;">
                  ${vehicle.licensePlate}
                </h3>
                <p style="margin: 4px 0;">Conductor: ${vehicle.driverId || "N/A"}</p>
                <p style="margin: 4px 0;">Vehículo: ${vehicle.make} ${vehicle.model}</p>
                <p style="margin: 4px 0;">Estado: ${vehicle.status}</p>
                ${vehicle.speed ? `<p style="margin: 4px 0;">Velocidad: ${vehicle.speed.toFixed(1)} km/h</p>` : ""}
                <p style="margin: 4px 0; font-size: 10px; color: #666;">
                  Actualizado: ${new Date(vehicle.lastUpdate).toLocaleTimeString()}
                </p>
              </div>
            `;
            marker.bindPopup(popupContent);
          }
        });
      };
      
      updateMarkers();
    }
  }, [isMapReady, vehicles]);

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
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
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-muted relative">
      {/* Controles de tracking */}
      <div className="absolute top-4 right-4 z-[1000] flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <Button
          size="sm"
          variant={isActive ? "default" : "secondary"}
          onClick={() => onToggleActive?.(!isActive)}
          className="gap-2"
        >
          {isActive ? (
            <>
              <PauseCircle className="h-4 w-4" />
              Pausar
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4" />
              Reanudar
            </>
          )}
        </Button>
        <div className="flex items-center gap-2 px-2">
          <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-xs text-muted-foreground">
            {isActive ? 'En vivo' : 'Pausado'}
          </span>
        </div>
      </div>

      {/* Estado de carga sobre el mapa */}
      {!isMapReady && (
        <div className="absolute inset-0 flex items-center justify-center z-[900] bg-background/50">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Cargando mapa...</p>
          </div>
        </div>
      )}

      {/* Contenedor del mapa - SIEMPRE se renderiza para que el ref funcione */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full"
        style={{ height: "100%", minHeight: "500px" }}
      />
    </div>
  );
}