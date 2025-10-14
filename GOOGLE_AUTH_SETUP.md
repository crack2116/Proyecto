# Configuración de Google Authentication en Firebase

## Pasos para habilitar Google Auth en Firebase Console:

### 1. Acceder a Firebase Console
- Ve a [Firebase Console](https://console.firebase.google.com/)
- Selecciona tu proyecto: `studio-4560916840-4310c`

### 2. Habilitar Google Authentication
- En el menú lateral, haz clic en **"Authentication"**
- Ve a la pestaña **"Sign-in method"**
- Busca **"Google"** en la lista de proveedores
- Haz clic en **"Google"** y luego en **"Enable"**

### 3. Configurar Google Auth
- **Project support email**: Selecciona tu email de administrador
- **Project public-facing name**: `Mewing Transport` (o el nombre que prefieras)
- Haz clic en **"Save"**

### 4. Configurar dominios autorizados
- En la pestaña **"Settings"** de Authentication
- Ve a **"Authorized domains"**
- Asegúrate de que estén incluidos:
  - `localhost` (para desarrollo)
  - `studio-4560916840-4310c.firebaseapp.com` (dominio de Firebase)
  - Tu dominio personalizado si tienes uno

### 5. Verificar configuración
- La configuración debería verse así:
  ```
  Google: Enabled
  Project support email: tu-email@ejemplo.com
  Project public-facing name: Mewing Transport
  ```

## Código ya implementado:

El código para Google Auth ya está implementado en:
- `src/components/auth/login-form.tsx` - Función `handleGoogleSignIn()`
- Manejo de errores específicos para Google Auth
- Logs de debugging para troubleshooting

## Troubleshooting:

### Error: "operation-not-allowed"
- Google Auth no está habilitado en Firebase Console
- Sigue los pasos 1-3 arriba

### Error: "popup-blocked"
- El navegador bloqueó la ventana emergente
- Permite ventanas emergentes para este sitio

### Error: "popup-closed-by-user"
- El usuario cerró la ventana de login
- Intenta de nuevo

### Error: "account-exists-with-different-credential"
- Ya existe una cuenta con ese email usando otro método
- Usa el mismo método de autenticación o contacta al administrador

## Verificación:

Una vez configurado, el botón "Continuar con Google" debería:
1. Abrir una ventana emergente de Google
2. Permitir al usuario hacer login con su cuenta de Google
3. Redirigir al dashboard después del login exitoso
4. Mostrar un mensaje de bienvenida con el nombre del usuario
