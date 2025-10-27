import { useState, useEffect, useCallback } from "react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";

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
};

type UseRealtimeTrackingOptions = {
  interval?: number; // Intervalo de actualización en ms
  enabled?: boolean; // Habilitar o deshabilitar tracking
  useFirebase?: boolean; // Usar Firebase en lugar de datos simulados
};

/**
 * Hook para seguimiento en tiempo real de vehículos
 * Puede usar Firebase (datos reales) o simulación
 */
export function useRealtimeTracking(options: UseRealtimeTrackingOptions = {}) {
  const { interval = 5000, enabled = true, useFirebase = false } = options;
  const [vehicles, setVehicles] = useState<VehicleLocation[]>([]);
  const [isActive, setIsActive] = useState(enabled);
  
  // Firebase connection
  const firestore = useFirestore();
  const vehiclesQuery = useMemoFirebase(
    () => query(collection(firestore, "vehicles")),
    [firestore]
  );
  const { data: firebaseVehicles, isLoading: isFirebaseLoading } = useCollection<VehicleLocation>(
    useFirebase ? vehiclesQuery : null
  );

  // Rutas predefinidas para simulación (por Piura, Perú)
  const routes = [
    {
      id: "V0001",
      points: [
        { lat: -5.19449, lng: -80.63282 },
        { lat: -5.20123, lng: -80.63890 },
        { lat: -5.21045, lng: -80.64567 },
        { lat: -5.21567, lng: -80.65123 },
        { lat: -5.22089, lng: -80.65678 },
        { lat: -5.22512, lng: -80.66234 },
      ],
    },
    {
      id: "V0002",
      points: [
        { lat: -5.20449, lng: -80.64282 },
        { lat: -5.19923, lng: -80.65012 },
        { lat: -5.19556, lng: -80.65834 },
        { lat: -5.19278, lng: -80.66567 },
        { lat: -5.19012, lng: -80.67234 },
      ],
    },
    {
      id: "V0003",
      points: [
        { lat: -5.18449, lng: -80.62282 },
        { lat: -5.17892, lng: -80.61890 },
        { lat: -5.17345, lng: -80.61567 },
        { lat: -5.16892, lng: -80.61234 },
        { lat: -5.16449, lng: -80.60890 },
      ],
    },
    {
      id: "V0004",
      points: [
        { lat: -5.21449, lng: -80.65282 },
        { lat: -5.21892, lng: -80.65923 },
        { lat: -5.22345, lng: -80.66567 },
        { lat: -5.22789, lng: -80.67123 },
      ],
    },
    {
      id: "V0005",
      points: [
        { lat: -5.19449, lng: -80.66282 },
        { lat: -5.18923, lng: -80.67012 },
        { lat: -5.18456, lng: -80.67734 },
        { lat: -5.18089, lng: -80.68345 },
      ],
    },
    {
      id: "V0006",
      points: [
        { lat: -5.18449, lng: -80.61282 },
        { lat: -5.19012, lng: -80.60678 },
        { lat: -5.19567, lng: -80.60123 },
        { lat: -5.20123, lng: -80.59567 },
      ],
    },
    {
      id: "V0007",
      points: [
        { lat: -5.20449, lng: -80.62282 },
        { lat: -5.21012, lng: -80.62890 },
        { lat: -5.21567, lng: -80.63456 },
        { lat: -5.22123, lng: -80.64012 },
      ],
    },
  ];

  // Inicializar vehículos
  const initializeVehicles = useCallback(() => {
    const initialVehicles: VehicleLocation[] = routes.map((route, index) => {
      const vehData = {
        V0001: { make: "Volvo", model: "FH16", licensePlate: "ABC-123", vehicleType: "Camión de Carga Pesada", driverId: "C0001", status: "En Tránsito" },
        V0002: { make: "Scania", model: "R450", licensePlate: "DEF-456", vehicleType: "Camión de Carga Pesada", driverId: "C0002", status: "En Tránsito" },
        V0003: { make: "Mercedes-Benz", model: "Actros 1845", licensePlate: "GHI-789", vehicleType: "Camión de Carga Pesada", driverId: "C0003", status: "En Mantenimiento" },
        V0004: { make: "MAN", model: "TGX 18.480", licensePlate: "JKL-012", vehicleType: "Camión de Carga Pesada", driverId: "C0004", status: "En Tránsito" },
        V0005: { make: "Iveco", model: "Stralis Hi-Way", licensePlate: "MNO-345", vehicleType: "Camión de Carga Pesada", driverId: "C0005", status: "En Tránsito" },
        V0006: { make: "Ford", model: "Cargo 816", licensePlate: "PQR-678", vehicleType: "Camión de Carga Media", driverId: "C0006", status: "Disponible" },
        V0007: { make: "Chevrolet", model: "NPR", licensePlate: "STU-901", vehicleType: "Camión de Carga Media", driverId: "C0007", status: "En Tránsito" },
      } as any;

      const data = vehData[route.id as keyof typeof vehData] || {
        make: "Unknown",
        model: "Unknown",
        licensePlate: route.id,
        vehicleType: "Vehículo",
        driverId: "Driver",
        status: "Disponible",
      };

      return {
        ...data,
        id: route.id,
        lat: route.points[0].lat,
        lng: route.points[0].lng,
        heading: 0,
        speed: 0,
        lastUpdate: new Date(),
      };
    });

    setVehicles(initialVehicles);
  }, []);

  // Actualizar posición de vehículo
  const updateVehiclePosition = useCallback(() => {
    setVehicles((prevVehicles) => {
      return prevVehicles.map((vehicle) => {
        const route = routes.find((r) => r.id === vehicle.id);
        if (!route || route.points.length < 2) return vehicle;

        // Encontrar posición actual en la ruta
        const currentIndex = route.points.findIndex(
          (point, index) =>
            index > 0 &&
            Math.abs(point.lat - vehicle.lat) < 0.01 &&
            Math.abs(point.lng - vehicle.lng) < 0.01
        );

        // Determinar próxima posición
        let nextIndex;
        if (currentIndex >= 0) {
          nextIndex = (currentIndex + 1) % route.points.length;
        } else {
          // Buscar el punto más cercano
          const distances = route.points.map((point, index) => ({
            index,
            dist: Math.sqrt(
              Math.pow(point.lat - vehicle.lat, 2) +
              Math.pow(point.lng - vehicle.lng, 2)
            ),
          }));
          const closest = distances.reduce((prev, curr) => (curr.dist < prev.dist ? curr : prev));
          nextIndex = (closest.index + 1) % route.points.length;
        }

        const nextPoint = route.points[nextIndex];

        // Calcular heading (dirección)
        const heading = Math.atan2(
          nextPoint.lat - vehicle.lat,
          nextPoint.lng - vehicle.lng
        ) * (180 / Math.PI);

        // Calcular distancia y velocidad simulada
        const distance = Math.sqrt(
          Math.pow(nextPoint.lat - vehicle.lat, 2) +
          Math.pow(nextPoint.lng - vehicle.lng, 2)
        ) * 111; // Convertir a km

        const speed = distance / (interval / 1000); // km/h

        // Movimiento progresivo hacia el siguiente punto
        const step = 0.01; // Distancia de cada paso
        let newLat = vehicle.lat;
        let newLng = vehicle.lng;

        if (distance > step) {
          const latStep = ((nextPoint.lat - vehicle.lat) / distance) * step;
          const lngStep = ((nextPoint.lng - vehicle.lng) / distance) * step;
          newLat = vehicle.lat + latStep;
          newLng = vehicle.lng + lngStep;
        } else {
          newLat = nextPoint.lat;
          newLng = nextPoint.lng;
        }

        return {
          ...vehicle,
          lat: newLat,
          lng: newLng,
          heading,
          speed: Math.round(speed * 100) / 100,
          lastUpdate: new Date(),
        };
      });
    });
  }, [interval]);

  // Inicializar vehículos al montar
  useEffect(() => {
    if (!useFirebase) {
      initializeVehicles();
    }
  }, [initializeVehicles, useFirebase]);

  // Si usa Firebase, usar los datos de Firebase EN TIEMPO REAL
  useEffect(() => {
    console.log("[TRACKING] useFirebase:", useFirebase, "firebaseVehicles:", firebaseVehicles?.length || 0);
    
    if (useFirebase && firebaseVehicles) {
      console.log("[TRACKING] Convirtiendo datos REALES de Firebase...");
      // Convertir datos de Firebase al formato esperado
      const convertedVehicles = firebaseVehicles.map((veh: any) => {
        // Si el vehículo no tiene lat/lng en Firebase, asignar coordenadas por defecto
        const hasLocation = veh.lat !== undefined && veh.lng !== undefined;
        
        // Simular estado y velocidad para algunos vehículos (si no están definidos)
        const currentStatus = veh.status || "Disponible";
        let simulatedStatus = currentStatus;
        let simulatedSpeed = 0;
        
        // Si el estado es "En Tránsito" o está vacío, simular velocidad
        if (currentStatus === "En Tránsito" || (!veh.speed && Math.random() > 0.5)) {
          simulatedStatus = "En Tránsito";
          simulatedSpeed = 30 + Math.random() * 40; // 30-70 km/h
        }
        
        return {
          id: veh.id,
          make: veh.make || "",
          model: veh.model || "",
          licensePlate: veh.licensePlate || "",
          vehicleType: veh.vehicleType || "",
          driverId: veh.driverId,
          status: simulatedStatus,
          lat: veh.lat || -5.19449,
          lng: veh.lng || -80.63282,
          heading: veh.heading || Math.random() * 360,
          speed: veh.speed || simulatedSpeed,
          lastUpdate: new Date(),
        };
      });
      console.log("[TRACKING] Vehículos REALES convertidos:", convertedVehicles.length);
      console.log("[TRACKING] En Tránsito:", convertedVehicles.filter(v => v.status === "En Tránsito").length);
      console.log("[TRACKING] Ejemplo de datos:", convertedVehicles[0]);
      setVehicles(convertedVehicles);
    }
  }, [useFirebase, firebaseVehicles]);

  // Actualizar posiciones en intervalo (solo para simulación sin Firebase)
  useEffect(() => {
    if (!isActive || useFirebase) {
      console.log("[TRACKING] Simulación DESHABILITADA - usando datos reales de Firebase");
      return;
    }

    console.log("[TRACKING] Iniciando simulación de movimiento...");
    const timer = setInterval(() => {
      updateVehiclePosition();
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, interval, updateVehiclePosition, useFirebase]);

  // Actualizar velocidad y estado cada cierto tiempo (para Firebase)
  useEffect(() => {
    if (!isActive || !useFirebase) return;

    console.log("[TRACKING] Iniciando simulación de estado y velocidad (datos híbridos)...");
    const timer = setInterval(() => {
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => {
          // 30% de probabilidad de que un vehículo esté en tránsito
          const shouldBeInTransit = Math.random() > 0.7;
          
          let newStatus = vehicle.status;
          let newSpeed = 0;
          
          if (shouldBeInTransit) {
            newStatus = "En Tránsito";
            newSpeed = 30 + Math.random() * 40; // 30-70 km/h
          } else {
            newStatus = "Disponible";
            newSpeed = 0;
          }
          
          return {
            ...vehicle,
            status: newStatus,
            speed: newSpeed,
            heading: vehicle.heading || Math.random() * 360,
            lastUpdate: new Date(),
          };
        })
      );
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, useFirebase, interval]);

  return {
    vehicles,
    isActive,
    setIsActive,
    reset: initializeVehicles,
    isLoading: useFirebase ? isFirebaseLoading : false,
  };
}

