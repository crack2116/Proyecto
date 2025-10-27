/**
 * Funciones para gestionar rutas de vehículos en Firebase
 */

import { Firestore, collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import { predefindedRoutes, assignRandomRoute, calculateDistance, calculateHeading } from "./vehicle-routes";

/**
 * Asigna rutas aleatorias a todos los vehículos en Firebase
 */
export async function assignRoutesToAllVehicles(firestore: Firestore) {
  console.log("📝 Asignando rutas a vehículos en Firebase...");
  
  const vehiclesRef = collection(firestore, "vehicles");
  const snapshot = await getDocs(vehiclesRef);

  if (snapshot.empty) {
    console.warn("⚠️ No se encontraron vehículos en Firebase");
    return;
  }

  const updates = snapshot.docs.map(async (vehicleDoc) => {
    const vehicleId = vehicleDoc.id;
    const vehicle = vehicleDoc.data();
    
    // Asignar ruta aleatoria
    const route = assignRandomRoute(vehicleId);
    const startingPoint = route.points[0];
    
    // Actualizar vehículo con ruta y posición inicial
    await updateDoc(doc(firestore, "vehicles", vehicleId), {
      route: route.points,
      currentRoutePointIndex: 0,
      lat: startingPoint.lat,
      lng: startingPoint.lng,
      status: "Disponible", // Inicialmente disponible
      speed: 0,
      heading: 0,
      lastUpdate: new Date(),
    });
    
    console.log(`✓ Vehículo ${vehicleId} asignado a ${route.name}`);
  });

  await Promise.all(updates);
  console.log("✅ Rutas asignadas a todos los vehículos");
}

/**
 * Simula el movimiento de vehículos "En Tránsito" a lo largo de sus rutas
 */
export async function simulateVehicleMovement(firestore: Firestore, intervalMs: number = 3000) {
  console.log("🚗 Simulando movimiento de vehículos...");
  
  const vehiclesRef = collection(firestore, "vehicles");
  const transitVehiclesQuery = query(vehiclesRef, where("status", "==", "En Tránsito"));
  const snapshot = await getDocs(transitVehiclesQuery);

  if (snapshot.empty) {
    console.log("⏭️  No hay vehículos en tránsito para simular");
    return;
  }

  const updates = snapshot.docs.map(async (vehicleDoc) => {
    const vehicleData = vehicleDoc.data();
    const vehicleId = vehicleDoc.id;
    
    const route = vehicleData.route as Array<{ lat: number; lng: number }>;
    let currentRoutePointIndex = vehicleData.currentRoutePointIndex || 0;
    const currentLat = vehicleData.lat;
    const currentLng = vehicleData.lng;

    if (!route || route.length < 2) {
      console.warn(`⚠️ Vehículo ${vehicleId} no tiene ruta válida`);
      return;
    }

    const currentPoint = route[currentRoutePointIndex];
    const nextPointIndex = (currentRoutePointIndex + 1) % route.length;
    const nextPoint = route[nextPointIndex];

    // Movimiento gradual hacia el siguiente punto
    const step = 0.03; // Velocidad del movimiento
    const newLat = currentLat + (nextPoint.lat - currentPoint.lat) * step;
    const newLng = currentLng + (nextPoint.lng - currentPoint.lng) * step;

    // Calcular distancia recorrida
    const distanceMoved = calculateDistance(currentLat, currentLng, newLat, newLng);
    // Simular velocidad realista (40-70 km/h)
    const simulatedSpeed = (distanceMoved / (intervalMs / 3600000)) * (30 + Math.random() * 40);

    // Calcular heading
    const newHeading = calculateHeading(currentLat, currentLng, newLat, newLng);

    // Si está cerca del siguiente punto, avanzar
    const distanceToNextPoint = calculateDistance(newLat, newLng, nextPoint.lat, nextPoint.lng);
    if (distanceToNextPoint < 0.05) {
      currentRoutePointIndex = nextPointIndex;
    }

    // Actualizar posición en Firebase
    await updateDoc(doc(firestore, "vehicles", vehicleId), {
      lat: newLat,
      lng: newLng,
      heading: newHeading,
      speed: simulatedSpeed,
      currentRoutePointIndex: currentRoutePointIndex,
      lastUpdate: new Date(),
    });
  });

  await Promise.all(updates);
  console.log(`✅ Movimiento simulado para ${snapshot.size} vehículos`);
}

/**
 * Marca algunos vehículos como "En Tránsito" para que se muevan
 */
export async function setRandomVehiclesInTransit(firestore: Firestore, percentage: number = 0.3) {
  console.log(`🔄 Marcando ~${Math.round(percentage * 100)}% de vehículos como 'En Tránsito'...`);
  
  const vehiclesRef = collection(firestore, "vehicles");
  const snapshot = await getDocs(vehiclesRef);

  const updates = snapshot.docs.map(async (vehicleDoc) => {
    const shouldBeInTransit = Math.random() < percentage;
    
    if (shouldBeInTransit) {
      await updateDoc(doc(firestore, "vehicles", vehicleDoc.id), {
        status: "En Tránsito",
      });
    }
  });

  await Promise.all(updates);
  console.log("✅ Vehículos marcados como 'En Tránsito'");
}

