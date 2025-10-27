# Despliegue en Render.com (Alternativa a Firebase)

## ✅ Ventajas de Render
- Doming personalizados gratuitos
- SSL automático
- Despliegue automático desde GitHub
- Fácil de configurar

## 🚀 Pasos para Desplegar

### 1. Registrar en Render
1. Ve a https://render.com
2. Crea una cuenta con GitHub
3. Conecta tu repositorio

### 2. Crear un Static Site
1. En el dashboard, clic en **"New +"**
2. Selecciona **"Static Site"**
3. Conecta tu repositorio: `crack2116/Proyecto`

### 3. Configurar el Build
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Environment**: `Production`

### 4. Configurar Dominio Personalizado
1. Ve a tu sitio en Render
2. Clic en **"Settings"**
3. Scroll down a **"Custom Domains"**
4. Agrega tu dominio (ej: `mewing-transport.com`)
5. Render te dará registros DNS para configurar

### 5. Configurar DNS
Ve a tu proveedor de dominio (GoDaddy, Namecheap, etc.) y agrega los registros que Render te proporcionó:
- Tipo CNAME: `mewing-transport.com` → `tu-app.onrender.com`
- O registrar tipo A según instrucciones

¡Listo! Tu sitio estará en tu dominio personalizado con SSL automático.

## 📝 Alternativas

### Vercel (Recomendado para Next.js)
1. Ve a https://vercel.com
2. Importa tu repositorio de GitHub
3. Vercel detectará Next.js automáticamente
4. Agrega dominio personalizado en Settings > Domains

### Netlify
1. Ve a https://netlify.com
2. Conecta GitHub
3. Configura build: `npm run build` y output: `out`
4. Agrega dominio personalizado

### GitHub Pages (Gratis, pero con límites)
Requiere configuración especial de Next.js export.

