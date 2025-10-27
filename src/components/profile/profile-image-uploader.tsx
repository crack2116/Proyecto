"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, User } from "lucide-react";
import { useStorage } from "@/firebase";
import { useUser } from "@/firebase";
import { uploadImage, getProfileImagePath } from "@/lib/firebase-storage";
import { toastMessages } from "@/lib/toast-messages";
import { updateProfile } from "firebase/auth";

export function ProfileImageUploader() {
  const { user } = useUser();
  const storage = useStorage();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      toastMessages.error("Error", "Por favor selecciona un archivo de imagen válido.");
      return;
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toastMessages.error("Error", "La imagen debe ser menor a 5MB.");
      return;
    }

    setUploading(true);

    try {
      // Generar ruta única
      const path = getProfileImagePath(user.uid, file.name);
      
      console.log("Intentando subir imagen...", { path, storage });
      
      // Subir imagen
      const downloadURL = await uploadImage(storage, file, path);
      
      console.log("Imagen subida exitosamente:", downloadURL);
      
      // Actualizar perfil de usuario en Firebase Auth
      await updateProfile(user, {
        photoURL: downloadURL,
      });

      toastMessages.success("Imagen Actualizada", "Tu foto de perfil ha sido actualizada exitosamente.");
    } catch (error: any) {
      console.error("Error uploading profile image:", error);
      
      // Mostrar mensaje de error más específico
      let errorMessage = "No se pudo subir la imagen. Por favor intenta de nuevo.";
      
      if (error?.code === 'storage/unauthorized') {
        errorMessage = "No tienes permisos para subir imágenes. Verifica tus reglas de Storage.";
      } else if (error?.code === 'storage/canceled') {
        errorMessage = "La subida fue cancelada.";
      } else if (error?.message?.includes('CORS')) {
        errorMessage = "Error de CORS. Verifica las reglas de Storage y el bucket configurado.";
      } else if (error?.message?.includes('network')) {
        errorMessage = "Error de red. Verifica tu conexión a internet.";
      }
      
      toastMessages.error("Error", errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-24 w-24 border-4 border-primary/20">
        <AvatarImage src={user?.photoURL ?? undefined} alt="Avatar" />
        <AvatarFallback className="text-2xl">
          <User />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h2 className="text-2xl font-bold">{user?.displayName || "Usuario"}</h2>
        <div className="mt-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Cambiar Foto
              </>
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

