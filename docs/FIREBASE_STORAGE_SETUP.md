# Configuración de Firebase Storage

## Problema: Error de CORS

Si ves errores como:
```
Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/...' has been blocked by CORS policy
```

Esto significa que Firebase Storage no está habilitado o configurado correctamente.

## Solución

### Opción 1: Habilitar Storage desde Firebase Console (RECOMENDADO)

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto: `studio-4560916840-4310c`
3. En el menú lateral, busca **"Storage"**
4. Haz clic en **"Get started"** o **"Empezar"**
5. Selecciona **"Start in test mode"** (para desarrollo)
6. Elige una región (ej: `us-central` o `southamerica-east1`)
7. Haz clic en **"Done"**

### Opción 2: Desplegar reglas desde la terminal

Después de habilitar Storage:

```bash
# 1. Login
npx firebase login

# 2. Seleccionar proyecto
npx firebase use studio-4560916840-4310c

# 3. Desplegar reglas
npx firebase deploy --only storage
```

## Configurar CORS para Storage

Si el problema persiste después de habilitar Storage, necesitas configurar CORS:

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Selecciona tu proyecto: `studio-4560916840-4310c`
3. Ve a **Storage** > **Buckets**
4. Selecciona el bucket: `studio-4560916840-4310c.appspot.com`
5. Haz clic en **"Configuration"** o **"Edit bucket"**
6. En la sección **"CORS configuration"**, agrega:

```json
[
  {
    "origin": ["http://localhost:9002", "http://localhost:3000"],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
    "responseHeader": ["Content-Type", "Authorization"],
    "maxAgeSeconds": 3600
  }
]
```

## Verificar que Storage está habilitado

1. Ve a Firebase Console
2. Storage → Files
3. Deberías ver el interface de Storage

Si no aparece la opción "Storage" en el menú, necesita ser habilitado manualmente.

## Alternativa: Usar Imágenes URL temporales

Si no puedes habilitar Storage ahora, puedes usar URLs de imágenes externas temporalmente hasta que se configure correctamente.

