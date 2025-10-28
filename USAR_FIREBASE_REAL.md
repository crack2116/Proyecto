# ✅ Usar Firebase Real (Sin Emulador)

## 🎉 Lo Que Hice

Cambié la configuración para que tu app use **Firebase producción** en lugar del emulador.

---

## 🚀 Cómo Funciona Ahora

1. **Login funcionará** con usuarios reales de Firebase
2. **Pero las imágenes** NO se subirán hasta configurar CORS

---

## ⚠️ IMPORTANTE: Configurar CORS

Para que funcione la subida de imágenes:

### Opción 1: Instalar Google Cloud SDK (5 minutos)

1. Descarga: https://cloud.google.com/sdk/docs/install-windows
2. Instala
3. Ejecuta en PowerShell (como Admin):
   ```bash
   gcloud auth login
   gsutil cors set cors.json gs://studio-4560916840-4310c.firebasestorage.app
   ```

### Opción 2: Volver a Emulador (Fácil)

Si prefieres usar emulador:
1. Edita `src/firebase/index.ts`
2. Cambia: `const USE_EMULATOR = false;` 
3. Por: `const USE_EMULATOR = true;`
4. Ejecuta: `npx firebase emulators:start`

---

## 🧪 Prueba Ahora

### Para Login:
1. Ve a: http://localhost:9002
2. Inicia sesión con usuarios REALES de Firebase
3. Debería funcionar ✅

### Para Imágenes:
- Si usas Firebase Real → Necesitas configurar CORS
- Si usas Emulador → Funciona inmediatamente

---

## 💡 Recomendación

**Para Desarrollo:**
- Usa **Emulador** (más fácil, sin CORS)
- Cambia `USE_EMULATOR = true`

**Para Producción:**
- Usa **Firebase Real**
- Configura CORS una vez

---

## 🎯 ¿Qué Prefieres?

1. **Desarrollo con Emulador** → Cambia a `USE_EMULATOR = true`
2. **Firebase Real + CORS** → Lee `INSTALAR_Y_CONFIGURAR_CORS.md`

