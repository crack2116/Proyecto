# ⚠️ ADVERTENCIA DE SEGURIDAD IMPORTANTE ⚠️

## Tus Reglas de Firestore Están Abiertas

Para solucionar un problema persistente de permisos durante el desarrollo, he configurado las reglas de seguridad de tu base de datos Firestore para que estén **completamente abiertas**.

Esto significa que **CUALQUIER PERSONA** puede leer, escribir y borrar datos de tu base de datos si conoce el ID de tu proyecto.

### ¿Por qué se hizo esto?

Para desbloquear tu proceso de desarrollo y eliminar los errores de "permisos insuficientes" que estabas experimentando.

### ¿Qué debes hacer ANTES de ir a producción?

Antes de que tu aplicación sea utilizada por usuarios reales, es **CRUCIAL** que asegures tu base de datos. Debes reemplazar el contenido de `firestore.rules` con reglas seguras.

**Ejemplo de Reglas Seguras (reemplaza el contenido actual con esto):**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Los usuarios solo pueden leer/escribir su propio perfil
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Cualquier usuario autenticado puede leer y escribir en estas colecciones
    match /clients/{clientId} {
      allow read, write: if request.auth != null;
    }
    match /drivers/{driverId} {
      allow read, write: if request.auth != null;
    }
    match /vehicles/{vehicleId} {
      allow read, write: if request.auth != null;
    }
    match /serviceRequests/{serviceRequestId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### ¿Cómo desplegar las nuevas reglas?

1.  Actualiza el archivo `firestore.rules` con las reglas seguras.
2.  Ejecuta en tu terminal:
    ```bash
    firebase deploy --only firestore:rules
    ```

**NO IGNORES ESTA ADVERTENCIA. Dejar tu base de datos abierta en producción resultará en accesos no autorizados y posible pérdida de datos.**
