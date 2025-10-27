# Despliegue en Vercel (La Mejor Opción para Next.js)

## ✅ ¿Por qué Vercel?
- Creado por los mismos creadores de Next.js
- Optimización automática de Next.js
- Dominio personalizado gratuito
- SSL automático
- Despliegue desde GitHub en 30 segundos

## 🚀 Pasos Rápidos (30 segundos)

### 1. Ir a Vercel
1. Ve a https://vercel.com
2. Haz clic en **"Start Deploying"**
3. Inicia sesión con GitHub

### 2. Importar Proyecto
1. Vercel detectará automáticamente tu repositorio `crack2116/Proyecto`
2. Clic en **"Import"**
3. Vercel configurará todo automáticamente (Next.js detectado)
4. Clic en **"Deploy"**

¡Listo! Tu app estará en `proyecto.vercel.app`

### 3. Agregar Dominio Personalizado
1. Ve a tu proyecto en Vercel
2. Clic en **"Settings"**
3. Clic en **"Domains"**
4. Agrega tu dominio (ej: `mewing-transport.com`)
5. Agrega los registros DNS que Vercel te indique en tu proveedor de dominio

### 4. Configurar DNS
En tu proveedor de dominio (donde compraste el dominio):
- Agrega un registro CNAME: `mewing-transport.com` → `cname.vercel-dns.com`
- O registros A según las instrucciones de Vercel

## 🎉 ¡Listo!
Tu sitio estará disponible en tu dominio personalizado con SSL automático.

## 📝 Nota sobre Configuración

Para Next.js con export estático, la configuración actual (`output: 'export'`) está correcta.

Si quieres usar SSR completo (más potente), necesitamos cambiar la configuración de vuelta.

