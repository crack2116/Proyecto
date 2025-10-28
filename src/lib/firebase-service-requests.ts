import { doc, updateDoc, deleteDoc, collection, addDoc } from "firebase/firestore";
import type { ServiceRequest } from "./types";

/**
 * Actualiza el estado de una solicitud de servicio
 */
export async function updateRequestStatus(
  firestore: any,
  requestId: string,
  newStatus: ServiceRequest['status']
): Promise<void> {
  try {
    const requestRef = doc(firestore, "serviceRequests", requestId);
    await updateDoc(requestRef, { status: newStatus });
    console.log(`Estado de solicitud ${requestId} actualizado a ${newStatus}`);
  } catch (error) {
    console.error("Error actualizando estado:", error);
    throw error;
  }
}

/**
 * Asigna un conductor a una solicitud
 */
export async function assignDriverToRequest(
  firestore: any,
  requestId: string,
  driverId: string
): Promise<void> {
  try {
    const requestRef = doc(firestore, "serviceRequests", requestId);
    await updateDoc(requestRef, { 
      driverId,
      status: "Assigned" 
    });
    console.log(`Conductor ${driverId} asignado a solicitud ${requestId}`);
  } catch (error) {
    console.error("Error asignando conductor:", error);
    throw error;
  }
}

/**
 * Asigna un vehículo a una solicitud
 */
export async function assignVehicleToRequest(
  firestore: any,
  requestId: string,
  vehicleId: string
): Promise<void> {
  try {
    const requestRef = doc(firestore, "serviceRequests", requestId);
    await updateDoc(requestRef, { 
      vehicleId
    });
    console.log(`Vehículo ${vehicleId} asignado a solicitud ${requestId}`);
  } catch (error) {
    console.error("Error asignando vehículo:", error);
    throw error;
  }
}

/**
 * Cancela una solicitud de servicio
 */
export async function cancelRequest(
  firestore: any,
  requestId: string
): Promise<void> {
  try {
    const requestRef = doc(firestore, "serviceRequests", requestId);
    await updateDoc(requestRef, { 
      status: "Cancelled"
    });
    console.log(`Solicitud ${requestId} cancelada`);
  } catch (error) {
    console.error("Error cancelando solicitud:", error);
    throw error;
  }
}

/**
 * Elimina una solicitud de servicio
 */
export async function deleteRequest(
  firestore: any,
  requestId: string
): Promise<void> {
  try {
    const requestRef = doc(firestore, "serviceRequests", requestId);
    await deleteDoc(requestRef);
    console.log(`Solicitud ${requestId} eliminada`);
  } catch (error) {
    console.error("Error eliminando solicitud:", error);
    throw error;
  }
}

/**
 * Actualiza una solicitud completa
 */
export async function updateRequest(
  firestore: any,
  requestId: string,
  updates: Partial<ServiceRequest>
): Promise<void> {
  try {
    const requestRef = doc(firestore, "serviceRequests", requestId);
    await updateDoc(requestRef, updates);
    console.log(`Solicitud ${requestId} actualizada`);
  } catch (error) {
    console.error("Error actualizando solicitud:", error);
    throw error;
  }
}

/**
 * Crea una nueva solicitud de servicio
 */
export async function createRequest(
  firestore: any,
  requestData: Omit<ServiceRequest, 'id'>
): Promise<void> {
  try {
    await addDoc(collection(firestore, "serviceRequests"), requestData);
    console.log("Nueva solicitud creada");
  } catch (error) {
    console.error("Error creando solicitud:", error);
    throw error;
  }
}

