# ✅ Verificar que el Login Funciona

## 🎯 IMPORTANTE: El mensaje NO bloquea el inicio de sesión

El mensaje sobre "Firebase Dynamic Links" es solo **información**. NO afecta:
- ✅ Inicio de sesión con email/password
- ✅ Inicio de sesión con Google
- ✅ Subida de imágenes

---

## 🧪 Cómo Probar el Login

### Paso 1: Iniciar Emulador (Terminal 1)
```bash
npx firebase emulators:start
```

Espera hasta que veas: `✔ All emulators ready!`

### Paso 2: Iniciar tu App (Terminal 2)
```bash
npm run dev
```

### Paso 3: Probar Login
1. Ve a: http://localhost:9002
2. Usa estos datos (del emulador):
   - Email: `admin@mewing.com`
   - Password: `admin123`

O crea un nuevo usuario:
- Email: Tu email
- Password: Tu contraseña (min 6 caracteres)
- Haz clic en "Registrarse"

---

## 🚨 Si No Funciona el Login

### Verifica estos puntos:

1. **¿El emulador está corriendo?**
   - Debe mostrar "All emulators ready"

2. **¿Tu app está corriendo?**
   - Debe estar en http://localhost:9002

3. **¿Ves algún error en la consola?**
   - Abre DevTools (F12)
   - Busca errores en rojo

---

## 🔍 Errores Comunes

### Error: "auth/emulator-config"
**Solución:** El emulador no está corriendo. Ejecuta `npx firebase emulators:start`

### Error: "auth/invalid-email"
**Solución:** Usa un formato de email válido (ej: `test@test.com`)

### Error: "auth/weak-password"
**Solución:** Usa una contraseña de al menos 6 caracteres

---

## ✅ Si Funciona

1. Verás "Inicio de Sesión Exitoso"
2. Serás redirigido a `/dashboard`
3. Verás tu perfil

---

## 📝 Datos del Emulador

Puedes ver los usuarios en: http://localhost:4000

---

¿Tu app está corriendo ahora? ¿Qué pasa cuando intentas iniciar sesión?

