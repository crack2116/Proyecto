"use client";

import { useState, useEffect } from "react";
import { useDoc } from "@/firebase";
import type { Vehicle } from "@/lib/types";

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

  // Obtener datos directamente de Firebase
  const { data: firebaseVehicles, isLoading: isFirebaseLoading, error } = useDoc<VehicleLocation>('vehicles');

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
