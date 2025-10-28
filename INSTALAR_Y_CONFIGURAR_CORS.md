# ✅ Configurar Firebase Emulator - SOLUCIÓN RECOMENDADA

## 🎯 Por Qué Esta Opción

✅ **No necesitas instalar nada extra**  
✅ **Funciona perfecto para desarrollo**  
✅ **Sin problemas de CORS**  
✅ **Listo en 2 minutos**  

---

## 🚀 Pasos

### 1. Abre una nueva terminal y ejecuta:
```bash
npx firebase emulators:start
```

Esto iniciará:
- **Firebase Storage** en `localhost:9199`
- **Firebase Auth** en `localhost:9099`  
- **Firestore** en `localhost:8080`
- **Emulator UI** en `http://localhost:4000`

### 2. Deja esa terminal abierta

### 3. En OTRA terminal, ejecuta tu app:
```bash
npm run dev
```

### 4. ¡Listo! Ahora puedes subir imágenes sin error de CORS ✅

---

## 📝 Nota Importante

**Cuando quieras desplegar a producción**, tendrás que configurar CORS (opción 2 del archivo `SOLUCION_CORS_FINAL.md`), pero para desarrollo local esto es perfecto.

---

## 🔍 Ver Datos del Emulador

Ve a: **http://localhost:4000** para ver todos los datos (usuarios, storage, firestore) en una interfaz visual.

---

## ⚠️ Detener el Emulador

Cuando termines, en la terminal del emulador presiona: **Ctrl + C**
