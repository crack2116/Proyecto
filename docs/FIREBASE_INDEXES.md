# Firebase Indexes - Guía de Optimización

Este documento explica cómo optimizar las queries de Firestore utilizando índices compuestos.

## ¿Qué son los índices?

Los índices de Firestore mejoran el rendimiento de las queries que filtran, ordenan o buscan por múltiples campos. Sin índices, Firebase puede lanzar errores cuando intentas hacer queries complejas.

## Índices Definidos

El archivo `firestore.indexes.json` contiene las siguientes definiciones de índices:

### 1. **Vehículos** - Status y Última Actualización
- **Campos**: `status` (ASC), `lastUpdate` (DESC)
- **Uso**: Filtrar vehículos por estado y obtener los más recientes
- **Query ejemplo**: Vehículos "En Tránsito" ordenados por fecha

### 2. **Solicitudes de Servicio** - Status y Fecha
- **Campos**: `status` (ASC), `serviceDate` (DESC)
- **Uso**: Filtrar solicitudes por estado y ordenar por fecha
- **Query ejemplo**: Solicitudes "In Progress" ordenadas por fecha

### 3. **Solicitudes de Servicio** - Cliente y Fecha
- **Campos**: `clientId` (ASC), `serviceDate` (DESC)
- **Uso**: Buscar todas las solicitudes de un cliente específico
- **Query ejemplo**: Historial de solicitudes de un cliente

### 4. **Solicitudes de Servicio** - Conductor y Fecha
- **Campos**: `driverId` (ASC), `serviceDate` (DESC)
- **Uso**: Ver asignaciones de un conductor
- **Query ejemplo**: Servicios asignados a un conductor

### 5. **Clientes** - Nombre
- **Campos**: `name` (ASC)
- **Uso**: Búsqueda y ordenamiento por nombre
- **Query ejemplo**: Listar clientes alfabéticamente

### 6. **Conductores** - Status y Nombre
- **Campos**: `status` (ASC), `name` (ASC)
- **Uso**: Filtrar conductores disponibles y ordenar por nombre
- **Query ejemplo**: Conductores "Disponible" ordenados alfabéticamente

## Cómo Aplicar los Índices

### Opción 1: Firebase Console (Recomendado)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Firestore Database** → **Indexes**
4. Haz clic en **Add Index**
5. Copia la configuración desde `firestore.indexes.json`
6. Espera a que los índices se construyan (puede tomar varios minutos)

### Opción 2: CLI de Firebase

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Seleccionar proyecto
firebase use your-project-id

# Desplegar índices
firebase deploy --only firestore:indexes
```

### Opción 3: Script de Node.js

```bash
# Ejecutar script de despliegue
npm run deploy:indexes
```

## Verificación

Para verificar que los índices están activos:

1. Ve a Firebase Console → Firestore → Indexes
2. Deberías ver los índices con estado "Enabled"
3. Si hay índices con errores, revisa los logs en Firebase Console

## Queries Optimizadas

Después de aplicar los índices, estas queries serán más rápidas:

```typescript
// Query optimizada para vehículos en tránsito
const inTransitQuery = query(
  collection(firestore, "vehicles"),
  where("status", "==", "En Tránsito"),
  orderBy("lastUpdate", "desc")
);

// Query optimizada para solicitudes por cliente
const clientRequestsQuery = query(
  collection(firestore, "serviceRequests"),
  where("clientId", "==", clientId),
  orderBy("serviceDate", "desc")
);

// Query optimizada para solicitudes por conductor
const driverRequestsQuery = query(
  collection(firestore, "serviceRequests"),
  where("driverId", "==", driverId),
  orderBy("serviceDate", "desc")
);
```

## Mejores Prácticas

1. **Siempre define índices antes de desplegar a producción**
2. **Monitorea el uso de índices en Firebase Console**
3. **Elimina índices no utilizados para reducir costos**
4. **Documenta todos los índices nuevos en este archivo**

## Troubleshooting

### Error: "The query requires an index"
- Este error aparece cuando intentas hacer una query que requiere un índice no definido
- Copia el link que Firebase te proporciona
- Dispara el índice automáticamente desde el link
- O agrega manualmente la configuración a `firestore.indexes.json`

### Índices que tardan en crearse
- Los índices pueden tomar de 5 a 30 minutos en construirse
- Firebase notificará cuando estén listos
- Puedes monitorear el progreso en Firebase Console

## Mantenimiento

- Revisa los índices mensualmente
- Elimina índices no utilizados
- Actualiza este documento cuando agregues nuevos índices

