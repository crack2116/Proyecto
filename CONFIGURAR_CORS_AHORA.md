# ✅ Configurar CORS - Opción A

## 🎯 Pasos para Configurar CORS

Tu app ahora usa **Firebase Real**. Para que las imágenes funcionen, necesitas configurar CORS.

---

## 📥 Paso 1: Instalar Google Cloud SDK

### Descarga:
👉 **https://cloud.google.com/sdk/docs/install-windows**

1. Descarga el instalador
2. Ejecuta el archivo `.msi`
3. Sigue las instrucciones (deja todo por defecto)
4. Completa la instalación

**Tiempo:** ~3-5 minutos

---

## ⚙️ Paso 2: Autenticarte con Google

1. Abre **PowerShell** como **Administrador**
2. Ejecuta:
   ```powershell
   gcloud auth login
   ```
3. Se abrirá el navegador → **Selecciona tu cuenta de Google**
4. **Permite el acceso**

---

## 🎯 Paso 3: Configurar CORS

En PowerShell (mismo que arriba):
```powershell
gsutil cors set cors.json gs://studio-4560916840-4310c.firebasestorage.app
```

Deberías ver un mensaje de éxito.

---

## ✅ Paso 4: ¡Prueba!

1. **Recarga tu app:** http://localhost:9002
2. **Inicia sesión**
3. **Intenta subir una imagen de perfil**
4. **Debería funcionar** ✅

---

## 🆘 Si "gsutil no se reconoce"

Después de instalar:
1. Cierra y abre PowerShell de nuevo
2. O reinicia tu computadora

---

## 🎉 ¡Listo!

Después de configurar CORS, tu app:
- ✅ Login funciona con Firebase Real
- ✅ Imágenes se suben correctamente
- ✅ Todo guarda permanentemente en Firebase

---

## 📝 Archivos Necesarios

- ✅ `cors.json` - Ya existe en tu proyecto
- ✅ `storage.rules` - Ya desplegadas
- ✅ `src/firebase/index.ts` - Ya configurado para Firebase real

---

## 🚀 Ejecuta esto cuando termines de instalar:

```powershell
gcloud auth login
gsutil cors set cors.json gs://studio-4560916840-4310c.firebasestorage.app
```

Y luego prueba subir una imagen! 🎉

