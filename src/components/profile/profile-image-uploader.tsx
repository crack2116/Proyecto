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
      
      // Subir imagen
      const downloadURL = await uploadImage(storage, file, path);
      
      // Actualizar perfil de usuario en Firebase Auth
      await updateProfile(user, {
        photoURL: downloadURL,
      });

      toastMessages.success("Imagen Actualizada", "Tu foto de perfil ha sido actualizada exitosamente.");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      toastMessages.error("Error", "No se pudo subir la imagen. Por favor intenta de nuevo.");
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

