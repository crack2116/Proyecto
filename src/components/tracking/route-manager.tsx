"use client";

import { useState, useRef, useEffect } from "react";
import { useFirestore } from "@/firebase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, PlayCircle, PauseCircle, Loader2, Navigation } from "lucide-react";
import {
  assignRoutesToAllVehicles,
  simulateVehicleMovement,
  setRandomVehiclesInTransit,
} from "@/lib/firebase-vehicle-routes";

export function RouteManager() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isAssigning, setIsAssigning] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSettingTransit, setIsSettingTransit] = useState(false);
  const simulationInterval = useRef<NodeJS.Timeout | null>(null);

  // Limpiar intervalo al desmontar
  useEffect(() => {
    return () => {
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
    };
  }, []);

  const handleAssignRoutes = async () => {
    if (!firestore) {
      toast({ variant: "destructive", title: "Firestore no está disponible." });
      return;
    }
    setIsAssigning(true);
    try {
      await assignRoutesToAllVehicles(firestore);
      toast({
        title: "✅ Rutas Asignadas",
        description: "Se han asignado rutas predefinidas a todos los vehículos.",
      });
    } catch (error) {
      console.error("Error assigning routes:", error);
      toast({
        variant: "destructive",
        title: "❌ Error",
        description: "No se pudieron asignar las rutas.",
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const handleSetVehiclesInTransit = async () => {
    if (!firestore) {
      toast({ variant: "destructive", title: "Firestore no está disponible." });
      return;
    }
    setIsSettingTransit(true);
    try {
      await setRandomVehiclesInTransit(firestore, 0.4); // 40% en tránsito
      toast({
        title: "✅ Vehículos en Tránsito",
        description: "Se han marcado vehículos como 'En Tránsito' para que se muevan por las rutas.",
      });
    } catch (error) {
      console.error("Error setting vehicles in transit:", error);
      toast({
        variant: "destructive",
        title: "❌ Error",
        description: "No se pudieron marcar los vehículos.",
      });
    } finally {
      setIsSettingTransit(false);
    }
  };

  const toggleSimulation = () => {
    if (!firestore) {
      toast({ variant: "destructive", title: "Firestore no está disponible." });
      return;
    }
    if (isSimulating) {
      // Detener simulación
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
        simulationInterval.current = null;
      }
      setIsSimulating(false);
      toast({
        title: "⏸️ Simulación Detenida",
        description: "El movimiento de vehículos ha sido detenido.",
      });
    } else {
      // Iniciar simulación
      const intervalMs = 3000; // Actualizar cada 3 segundos
      simulationInterval.current = setInterval(async () => {
        await simulateVehicleMovement(firestore, intervalMs);
      }, intervalMs);
      
      setIsSimulating(true);
      toast({
        title: "▶️ Simulación Iniciada",
        description: "Los vehículos están moviéndose por sus rutas en tiempo real.",
      });
    }
  };

  return (
    <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
      <Button
        onClick={handleAssignRoutes}
        disabled={isAssigning || isSimulating || !firestore}
        variant="outline"
        size="sm"
        className="gap-2 border-blue-500 hover:bg-blue-500/10"
      >
        {isAssigning ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Asignando...
          </>
        ) : (
          <>
            <MapPin className="h-4 w-4" />
            Asignar Rutas
          </>
        )}
      </Button>

      <Button
        onClick={handleSetVehiclesInTransit}
        disabled={isSettingTransit || isSimulating || !firestore}
        variant="outline"
        size="sm"
        className="gap-2 border-green-500 hover:bg-green-500/10"
      >
        {isSettingTransit ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Configurando...
          </>
        ) : (
          <>
            <Navigation className="h-4 w-4" />
            Marcar en Tránsito
          </>
        )}
      </Button>

      <Button
        onClick={toggleSimulation}
        disabled={isAssigning || isSettingTransit || !firestore}
        variant={isSimulating ? "destructive" : "default"}
        size="sm"
        className="gap-2"
      >
        {isSimulating ? (
          <>
            <PauseCircle className="h-4 w-4" />
            Detener
          </>
        ) : (
          <>
            <PlayCircle className="h-4 w-4" />
            Iniciar Movimiento
          </>
        )}
      </Button>
    </div>
  );
}
