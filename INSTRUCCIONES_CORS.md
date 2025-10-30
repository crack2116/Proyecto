# 🔧 Instrucciones para Configurar CORS

## 📍 Opción 1: Google Cloud Console (RECOMENDADO - Más Fácil)

### Paso 1: Abre Google Cloud Console
👉 Haz clic en este enlace directo:
**https://console.cloud.google.com/storage/browser/studio-4560916840-4310c.appspot.com?project=studio-4560916840-4310c**

### Paso 2: Configura CORS
1. Una vez en Google Cloud Console, **haz clic en el nombre de tu bucket**: `studio-4560916840-4310c.appspot.com`
2. Arriba verás varias pestañas: **Overview**, **Objects**, **Permissions**, **Configuration**, etc.
3. Haz clic en **"Configuration"** (Configuración)
4. Desplázate hasta la sección **"Cross-origin resource sharing (CORS)"**
5. Haz clic en **"Edit"** o **"Add CORS configuration"**
6. **Copia y pega** el siguiente JSON (está en el archivo `cors-config.json`):

```json
[
  {
    "origin": ["http://localhost:9002", "http://localhost:3000"],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
    "responseHeader": ["Content-Type", "Authorization", "Content-Length"],
    "maxAgeSeconds": 3600
  }
]
```

7. Haz clic en **"Save"** (Guardar)

### Paso 3: ¡Listo! Prueba tu aplicación
1. Recarga tu aplicación (Ctrl + Shift + R)
2. Intenta subir una imagen de perfil
3. El error de CORS debería desaparecer ✅

---

## 📍 Opción 2: Usar Firebase CLI (Requiere instalación)

### Si prefieres usar la línea de comandos:

1. **Instala Google Cloud SDK** (si no lo tienes):
   - Descarga desde: https://cloud.google.com/sdk/docs/install

2. **Autentícate**:
   ```bash
   gcloud auth login
   ```

3. **Aplica la configuración CORS**:
   ```bash
   gsutil cors set cors-config.json gs://studio-4560916840-4310c.appspot.com
   ```

---

## 🎯 Enlace Directo al Bucket:

**https://console.cloud.google.com/storage/browser/studio-4560916840-4310c.appspot.com?project=studio-4560916840-4310c**

---

## 📝 Qué hace esta configuración CORS?

Esta configuración permite que tu aplicación web (que corre en `localhost:9002` o `localhost:3000`) haga solicitudes al bucket de Firebase Storage para:
- ✅ Subir archivos (POST)
- ✅ Descargar archivos (GET)
- ✅ Actualizar archivos (PUT)
- ✅ Eliminar archivos (DELETE)

Sin esta configuración, el navegador bloquea las solicitudes por seguridad (política de CORS).

---

## ❓ ¿Problemas?

Si no encuentras la opción de CORS:
1. Asegúrate de estar en Google Cloud Console (no Firebase Console)
2. Usa el enlace directo de arriba
3. Si no funciona, intenta navegar manualmente:
   - Ve a https://console.cloud.google.com
   - Selecciona el proyecto `studio-4560916840-4310c`
   - Ve a **Storage** > **Browser**
   - Haz clic en el bucket


