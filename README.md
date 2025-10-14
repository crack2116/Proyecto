# Mewing Transport Manager

Sistema de gestión integral para empresas de transporte con asistente virtual inteligente.

## 🚀 Características Principales

- **Gestión Completa**: Clientes, conductores, vehículos y solicitudes de servicio
- **Seguimiento en Tiempo Real**: Mapa interactivo con ubicación de vehículos
- **Asistente Virtual**: IA integrada para soporte al cliente y consultas frecuentes
- **Dashboard Analítico**: Estadísticas y métricas en tiempo real
- **Autenticación Segura**: Firebase Auth con Google OAuth
- **Integración SUNAT**: Consulta automática de RUC para clientes peruanos

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15, React 18, TypeScript
- **UI**: Tailwind CSS, shadcn/ui, Lucide Icons
- **Backend**: Firebase (Firestore, Auth, Hosting)
- **IA**: Google Genkit con Gemini 2.5 Flash
- **Mapas**: Google Maps API
- **Formularios**: React Hook Form + Zod

## 📋 Prerrequisitos

- Node.js 18+ 
- Cuenta de Firebase
- Google Maps API Key
- Google AI API Key

## ⚙️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/mewing-transport-manager.git
   cd mewing-transport-manager
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env.local
   ```
   
   Edita `.env.local` con tus credenciales:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
   
   # Google Maps API Key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_google_maps_key
   
   # Google AI API Key
   GOOGLE_AI_API_KEY=tu_google_ai_key
   ```

4. **Configurar Firebase**
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
   - Habilita Authentication (Email/Password y Google)
   - Crea una base de datos Firestore
   - Configura las reglas de seguridad (incluidas en `firestore.rules`)

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

6. **Ejecutar asistente IA (opcional)**
   ```bash
   npm run genkit:dev
   ```

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── dashboard/         # Páginas del dashboard
│   └── actions.ts         # Server Actions
├── components/            # Componentes React
│   ├── auth/             # Autenticación
│   ├── dashboard/        # Dashboard
│   ├── management/      # Gestión de datos
│   ├── support/         # Soporte y IA
│   ├── tracking/        # Seguimiento
│   └── ui/              # Componentes base
├── firebase/             # Configuración Firebase
├── ai/                   # Configuración IA
└── lib/                  # Utilidades y tipos
```

## 🔐 Seguridad

- Autenticación con Firebase Auth
- Reglas de Firestore para control de acceso
- Validación de formularios con Zod
- Manejo seguro de variables de entorno

## 🚀 Despliegue

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Vercel
```bash
npm run build
# Conectar con Vercel y configurar variables de entorno
```

## 📱 Funcionalidades

### Dashboard
- Estadísticas en tiempo real
- Servicios recientes
- Métricas de rendimiento

### Gestión
- **Clientes**: CRUD completo con validación SUNAT
- **Conductores**: Gestión de personal
- **Vehículos**: Control de flota
- **Solicitudes**: Procesamiento de servicios

### Seguimiento
- Mapa en tiempo real
- Ubicación de vehículos
- Estado de servicios

### Soporte
- Chat con asistente IA
- FAQ automático
- Soporte 24/7

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

## 🎯 Roadmap

- [ ] Notificaciones push
- [ ] Reportes avanzados
- [ ] Integración con GPS
- [ ] App móvil
- [ ] Facturación automática

---

Desarrollado con ❤️ para optimizar la gestión de transporte.
