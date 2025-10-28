/**
 * Utilidad para actualizar las coordenadas de vehículos en Firebase
 * Distribuye los vehículos por diferentes ubicaciones en Piura
 */

import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const vehicleLocations = [
  // Zona Norte de Piura
  { id: "V0001", lat: -5.19449, lng: -80.63282, address: "Av. Grau - Centro" },
  { id: "V0002", lat: -5.19723, lng: -80.63890, address: "Av. Sánchez Cerro" },
  { id: "V0003", lat: -5.20456, lng: -80.64567, address: "Av. Don Bosco" },
  
  // Zona Centro
  { id: "V0004", lat: -5.19012, lng: -80.62545, address: "Centro Histórico" },
  { id: "V0005", lat: -5.18567, lng: -80.62034, address: "Plaza de Armas" },
  { id: "V0006", lat: -5.19234, lng: -80.63567, address: "Mercado Central" },
  
  // Zona Sur
  { id: "V0007", lat: -5.20890, lng: -80.64012, address: "Aeropuerto" },
  { id: "V0008", lat: -5.21567, lng: -80.65234, address: "Terminal Terrestre" },
  { id: "V0009", lat: -5.21034, lng: -80.64890, address: "Zona Industrial" },
  { id: "V0010", lat: -5.20512, lng: -80.64345, address: "Universidad" },
];

/**
 * Actualiza las coordenadas de todos los vehículos en Firebase
 */
export async function updateVehiclesLocations(firestore: any) {
  try {
    const vehiclesSnapshot = await getDocs(collection(firestore, "vehicles"));
    
    const updates = vehiclesSnapshot.docs.map(async (vehicleDoc) => {
      const vehicleData = vehicleDoc.data();
      const vehicleLocation = vehicleLocations.find(loc => loc.id === vehicleDoc.id);
      
      if (vehicleLocation) {
        await updateDoc(doc(firestore, "vehicles", vehicleDoc.id), {
          lat: vehicleLocation.lat,
          lng: vehicleLocation.lng,
        });
        console.log(`Actualizado vehículo ${vehicleDoc.id} a ubicación: ${vehicleLocation.address}`);
      }
    });
    
    await Promise.all(updates);
    console.log("Todas las coordenadas de vehículos actualizadas");
  } catch (error) {
    console.error("Error actualizando coordenadas:", error);
    throw error;
  }
}

/**
 * Agrega coordenadas a un vehículo específico
 */
export async function updateVehicleLocation(
  firestore: any,
  vehicleId: string,
  lat: number,
  lng: number
): Promise<void> {
  try {
    const vehicleRef = doc(firestore, "vehicles", vehicleId);
    await updateDoc(vehicleRef, { lat, lng });
    console.log(`Vehículo ${vehicleId} actualizado a: ${lat}, ${lng}`);
  } catch (error) {
    console.error("Error actualizando ubicación del vehículo:", error);
    throw error;
  }
}

