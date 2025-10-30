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
  const { enabled = true, useFirebase = true } = options; 

  const [vehicles, setVehicles] = useState<VehicleLocation[]>([]);
  const [isActive, setIsActive] = useState(enabled);
  
  // Firebase connection
  const firestore = useFirestore();
  const vehiclesQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, "vehicles")) : null),
    [firestore]
  );
  const { data: firebaseVehicles, isLoading: isFirebaseLoading } = useCollection<VehicleLocation>(vehiclesQuery);
  
  // Si usa Firebase, usar los datos de Firebase EN TIEMPO REAL
  useEffect(() => {
    if (useFirebase && firebaseVehicles) {
      const convertedVehicles = firebaseVehicles.map((veh: any) => ({
        ...veh,
        lastUpdate: veh.lastUpdate?.toDate?.() || new Date(),
      }));
      setVehicles(convertedVehicles);
    }
  }, [useFirebase, firebaseVehicles]);


  return {
    vehicles,
    isActive,
    setIsActive,
    reset: () => {},
    isLoading: useFirebase ? isFirebaseLoading : false,
  };
}
