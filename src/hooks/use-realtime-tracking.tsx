"use client";

import { useState, useEffect } from "react";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import type { Vehicle } from "@/lib/types";
import { collection, query } from "firebase/firestore";

// Extiende el tipo Vehicle para incluir los campos de tracking en tiempo real
type VehicleLocation = Vehicle & {
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
  lastUpdate: Date;
  route?: Array<{ lat: number; lng: number }>;
  currentRoutePointIndex?: number;
};

type UseRealtimeTrackingOptions = {
  enabled?: boolean;
};

/**
 * Hook para seguimiento en tiempo real de vehículos, conectado exclusivamente a Firebase.
 */
export function useRealtimeTracking(options: UseRealtimeTrackingOptions = {}) {
  const { enabled = true } = options;
  const [isActive, setIsActive] = useState(enabled);
  const firestore = useFirestore();

  // Crear una consulta de Firestore válida
  const vehiclesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "vehicles"));
  }, [firestore]);

  // Obtener datos directamente de Firebase usando la consulta
  const { data: firebaseVehicles, isLoading: isFirebaseLoading, error } = useDoc<VehicleLocation>(vehiclesQuery);

  const vehicles = (firebaseVehicles || []).map(v => ({
    ...v,
    lastUpdate: v.lastUpdate ? new Date(v.lastUpdate) : new Date(),
  }));

  useEffect(() => {
    setIsActive(enabled);
  }, [enabled]);

  return {
    vehicles,
    isActive,
    setIsActive,
    isLoading: isFirebaseLoading,
    error,
  };
}
