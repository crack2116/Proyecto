# Guía de Despliegue en Firebase Hosting

## Despliegue Manual

### Opción 1: Desplegar desde tu computadora (Windows)

```bash
# 1. Instalar Firebase CLI globalmente (si no lo tienes)
npm install -g firebase-tools

# 2. Iniciar sesión en Firebase
firebase login

# 3. Inicializar el proyecto (si no está inicializado)
firebase init

# 4. Compilar el proyecto para producción
npm run build

# 5. Desplegar a Firebase Hosting
firebase deploy --only hosting
```

### Opción 2: Desplegar desde Firebase Console (Recomendado)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Hosting** en el menú lateral
4. Haz clic en **"Comenzar"**
5. Sigue el asistente de configuración
6. Conecta tu repositorio de GitHub
7. Configura el despliegue automático

### Opción 3: Despliegue Automático con GitHub Actions

Usa el archivo `.github/workflows/firebase-deploy.yml` para desplegar automáticamente cuando hagas push a `main`.

## Configuración Actual

- **Directorio de salida**: `out/` (archivos estáticos generados por Next.js)
- **Dominio**: Se asignará automáticamente como `.web.app` y `.firebaseapp.com`
- **Dominio personalizado**: Puedes agregar uno desde Firebase Console > Hosting

## Dominios Asignados

Después del despliegue, tu app estará disponible en:
- `tu-proyecto.web.app`
- `tu-proyecto.firebaseapp.com`

Y puedes agregar un dominio personalizado desde Firebase Console.

## Notas Importantes

⚠️ **Firebase Hosting** solo sirve archivos estáticos. Si tu app tiene:
- Server-side rendering (SSR)
- API routes dinámicas
- Funciones del servidor

Necesitas usar **Firebase App Hosting** en su lugar, que ya está configurado con `apphosting.yaml`.

Para App Hosting:
```bash
# Desplegar a App Hosting
firebase deploy --only apphosting
```

## Verificar el Despliegue

1. Ve a Firebase Console
2. Selecciona **Hosting**
3. Verás tu sitio desplegado con la URL
4. Haz clic para abrirlo

## Actualizar el Despliegue

Cada vez que hagas push a `main`, si configuraste CI/CD, se desplegará automáticamente.
Si no, ejecuta:

```bash
npm run build
firebase deploy --only hosting
```

