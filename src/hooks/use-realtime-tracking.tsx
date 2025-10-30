import { useState, useEffect, useCallback } from "react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import { createSampleData } from "@/lib/sample-data";

type VehicleLocation = {
  id: string;
  make: string;
  model: string;
  licensePlate: string;
  vehicleType: string;
  driverId?: string;
  status: string;
  lat: number;
  lng: number;
  heading?: number; // Dirección del vehículo
  speed?: number;
  lastUpdate: Date;
  route?: Array<{ lat: number; lng: number }>; // Ruta asignada
  currentRoutePointIndex?: number; // Índice actual en la ruta
};

type UseRealtimeTrackingOptions = {
  interval?: number; // Intervalo de actualización en ms
  enabled?: boolean; // Habilitar o deshabilitar tracking
  useFirebase?: boolean; // Usar Firebase en lugar de datos simulados
};

/**
 * Hook para seguimiento en tiempo real de vehículos
 */
export function useRealtimeTracking(options: UseRealtimeTrackingOptions = {}) {
  const { interval = 5000, enabled = true, useFirebase = false } = options; // Default to local data

  const [vehicles, setVehicles] = useState<VehicleLocation[]>([]);
  const [isActive, setIsActive] = useState(enabled);
  
  // Firebase connection (optional)
  const firestore = useFirestore();
  const vehiclesQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, "vehicles")) : null),
    [firestore]
  );
  const { data: firebaseVehicles, isLoading: isFirebaseLoading } = useCollection<VehicleLocation>(vehiclesQuery);
  
  // Local data generation
  const generateInitialData = useCallback(() => {
    const { vehicles: sampleVehicles } = createSampleData();
    const vehiclesWithLocation = sampleVehicles.map((v, i) => ({
      ...v,
      status: i % 3 === 0 ? "En Tránsito" : i % 3 === 1 ? "Disponible" : "En Mantenimiento",
      lat: -5.19449 + (Math.random() - 0.5) * 0.1,
      lng: -80.63282 + (Math.random() - 0.5) * 0.1,
      heading: Math.random() * 360,
      speed: Math.random() * 60,
      lastUpdate: new Date(),
    }));
    setVehicles(vehiclesWithLocation);
  }, []);

  // Use Firebase data if available and enabled
  useEffect(() => {
    if (useFirebase && firebaseVehicles) {
      setVehicles(firebaseVehicles.map(v => ({ ...v, lastUpdate: new Date() })));
    }
  }, [useFirebase, firebaseVehicles]);

  // Fallback to local data if Firebase is not used or fails
  useEffect(() => {
    if (!useFirebase) {
      generateInitialData();
    }
  }, [useFirebase, generateInitialData]);

  // Simulate movement for local data
  useEffect(() => {
    if (!isActive || useFirebase) {
      return;
    }

    const simulationInterval = setInterval(() => {
      setVehicles((prevVehicles) =>
        prevVehicles.map((v) => {
          if (v.status !== 'En Tránsito') return v;
          const speedKmS = (v.speed ?? 50) / 3600;
          const intervalSeconds = interval / 1000;
          const distance = speedKmS * intervalSeconds;
          const angleRad = ((v.heading ?? 0) - 90) * (Math.PI / 180);
          
          const latRad = v.lat * (Math.PI / 180);
          
          const deltaLat = distance * Math.sin(angleRad) / 111.32;
          const deltaLng = distance * Math.cos(angleRad) / (111.32 * Math.cos(latRad));

          return {
            ...v,
            lat: v.lat + deltaLat,
            lng: v.lng + deltaLng,
            heading: (v.heading ?? 0) + (Math.random() - 0.5) * 5,
            lastUpdate: new Date(),
          };
        })
      );
    }, interval);

    return () => clearInterval(simulationInterval);
  }, [isActive, interval, useFirebase]);

  return {
    vehicles,
    isActive,
    setIsActive,
    reset: generateInitialData,
    isLoading: useFirebase ? isFirebaseLoading : false,
  };
}
