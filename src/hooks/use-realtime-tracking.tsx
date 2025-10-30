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

// Forzar el uso de datos locales para resolver el problema de conexión
const FORCE_LOCAL_DATA = true;

const { vehicles: sampleVehiclesData } = createSampleData();

/**
 * Hook para seguimiento en tiempo real de vehículos
 * Puede usar Firebase (datos reales) o simulación
 */
export function useRealtimeTracking(options: UseRealtimeTrackingOptions = {}) {
  const { interval = 5000, enabled = true } = options;
  const useFirebase = options.useFirebase && !FORCE_LOCAL_DATA;

  const [vehicles, setVehicles] = useState<VehicleLocation[]>([]);
  const [isActive, setIsActive] = useState(enabled);
  
  // Firebase connection
  const firestore = useFirestore();
  const vehiclesQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, "vehicles")) : null),
    [firestore]
  );
  const { data: firebaseVehicles, isLoading: isFirebaseLoading } = useCollection<VehicleLocation>(
    useFirebase ? vehiclesQuery : null
  );

  const initializeVehicles = useCallback(() => {
    const initialVehicles = sampleVehiclesData.map(v => ({
      ...v,
      lat: -5.19449 + (Math.random() - 0.5) * 0.1,
      lng: -80.63282 + (Math.random() - 0.5) * 0.1,
      status: Math.random() > 0.5 ? "En Tránsito" : "Disponible",
      heading: 0,
      speed: 0,
      lastUpdate: new Date(),
    }));
    setVehicles(initialVehicles as VehicleLocation[]);
  }, []);

  // Si usa Firebase, usar los datos de Firebase EN TIEMPO REAL
  useEffect(() => {
    if (useFirebase && firebaseVehicles) {
      const convertedVehicles = firebaseVehicles.map((veh: any) => ({
        ...veh,
        lastUpdate: veh.lastUpdate?.toDate?.() || new Date(),
      }));
      setVehicles(convertedVehicles);
    } else if (!useFirebase) {
      initializeVehicles();
    }
  }, [useFirebase, firebaseVehicles, initializeVehicles]);


  return {
    vehicles,
    isActive,
    setIsActive,
    reset: initializeVehicles,
    isLoading: useFirebase ? isFirebaseLoading : false,
  };
}
