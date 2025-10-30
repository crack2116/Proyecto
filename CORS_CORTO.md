# ⚡ Configurar CORS - Guía Rápida

## 🔗 Enlace Directo
**https://console.cloud.google.com/storage/browser/studio-4560916840-4310c.appspot.com?project=studio-4560916840-4310c**

## 📋 Pasos (2 minutos)

1. **Haz clic en el enlace de arriba** (se abrió automáticamente)

2. **En Google Cloud Console:**
   - Busca y **haz clic en**: `studio-4560916840-4310c.appspot.com`
   - Ve a la pestaña **"Configuration"** (arriba)

3. **Busca la sección:** "Cross-origin resource sharing (CORS)"

4. **Haz clic en:** "Edit CORS configuration"

5. **Copia y pega esto:**
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

6. **Haz clic en "Save"**

7. **Recarga tu app** (Ctrl + Shift + R en tu aplicación)

8. **¡Prueba subir una imagen!** ✅

---

## 🎯 ¿No funciona?

- Asegúrate de estar en **Google Cloud Console** (no Firebase Console)
- El link es: console.cloud.google.com
- Busca "Configuration" arriba del bucket


