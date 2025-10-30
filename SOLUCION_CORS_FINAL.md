# ✅ Cómo Configurar CORS - 3 Opciones

## 🎯 Opción 1: Usar Firebase Emulator (RECOMENDADO - Más Fácil)

**Ventaja:** No necesitas instalar Google Cloud SDK

### Pasos:

1. **Ejecuta el emulador local:**
   ```bash
   npx firebase emulators:start
   ```

2. **En otra terminal, modifica tu app para usar el emulador:**
   
   Edita: `src/firebase/config.ts`
   ```typescript
   export const firebaseConfig = {
     "projectId": "studio-4560916840-4310c",
     "appId": "1:277272711271:web:cbaf677c28d6e2541f84c2",
     "apiKey": "AIzaSyB_J8I-7ySJsU4Q6W7ikQVhBBLxtROE8bE",
     "authDomain": "localhost",  // CAMBIAR
     "storageBucket": "localhost:9199",  // CAMBIAR
     // ... resto igual
   };
   ```

3. **Tu app funcionará sin errores de CORS** ✅

---

## 🎯 Opción 2: Configurar CORS con Google Cloud SDK

**Ventaja:** Funciona en producción

### Pasos:

1. **Descarga Google Cloud SDK:**
   - Ve a: https://cloud.google.com/sdk/docs/install-windows
   - Descarga e instala

2. **Ejecuta en PowerShell (como Admin):**
   ```bash
   gcloud auth login
   gsutil cors set cors.json gs://studio-4560916840-4310c.firebasestorage.app
   ```

3. **Listo** ✅

---

## 🎯 Opción 3: Usar Google Cloud Console (Manual)

**Ventaja:** No necesitas instalar nada (pero es complicado)

### Pasos:

1. Ve a: https://console.cloud.google.com/storage/browser/studio-4560916840-4310c.firebasestorage.app
2. Haz clic en el bucket
3. Pestaña **"Configuration"**
4. Busca **"Cross-origin resource sharing (CORS)"** (haz scroll hacia abajo)
5. Haz clic en **"Edit"**
6. Pega el contenido de `cors.json`
7. Guarda

---

## 🚀 Mi Recomendación

**Usa Opción 1 (Firebase Emulator)** - Es la más fácil y funciona perfecto para desarrollo.

¿Quieres que te configure el emulador? Solo dime y lo hago.


