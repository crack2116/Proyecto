import { ref, uploadBytes, getDownloadURL, deleteObject, FirebaseStorage } from "firebase/storage";

/**
 * Sube una imagen a Firebase Storage
 * @param storage Instancia de Firebase Storage
 * @param file El archivo de imagen a subir
 * @param path La ruta donde guardar (ej: "profiles/user123.jpg")
 * @returns URL de descarga de la imagen
 */
export async function uploadImage(storage: FirebaseStorage, file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  
  try {
    // Subir el archivo
    await uploadBytes(storageRef, file);
    
    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

/**
 * Elimina una imagen de Firebase Storage
 * @param storage Instancia de Firebase Storage
 * @param path La ruta de la imagen a eliminar
 */
export async function deleteImage(storage: FirebaseStorage, path: string): Promise<void> {
  const storageRef = ref(storage, path);
  
  try {
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}

/**
 * Genera una ruta única para una imagen de perfil
 * @param userId ID del usuario
 * @param filename Nombre del archivo
 */
export function getProfileImagePath(userId: string, filename: string): string {
  const ext = filename.split('.').pop();
  const timestamp = Date.now();
  return `profiles/${userId}_${timestamp}.${ext}`;
}

