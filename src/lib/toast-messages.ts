import { toast } from "@/hooks/use-toast";

/**
 * Utilidad para mostrar mensajes de toast consistentes en toda la aplicación
 */

export const toastMessages = {
  // ========== CLIENTES ==========
  client: {
    created: () => toast({
      title: "✅ Cliente Creado",
      description: "El cliente ha sido registrado exitosamente.",
    }),
    updated: () => toast({
      title: "✅ Cliente Actualizado",
      description: "Los datos del cliente han sido actualizados.",
    }),
    deleted: () => toast({
      title: "✅ Cliente Eliminado",
      description: "El cliente ha sido eliminado exitosamente.",
    }),
    error: (message = "Ocurrió un error al procesar el cliente.") => toast({
      variant: "destructive",
      title: "❌ Error",
      description: message,
    }),
  },

  // ========== CONDUCTORES ==========
  driver: {
    created: () => toast({
      title: "✅ Conductor Registrado",
      description: "El conductor ha sido registrado exitosamente.",
    }),
    updated: () => toast({
      title: "✅ Conductor Actualizado",
      description: "Los datos del conductor han sido actualizados.",
    }),
    deleted: () => toast({
      title: "✅ Conductor Eliminado",
      description: "El conductor ha sido eliminado exitosamente.",
    }),
    error: (message = "Ocurrió un error al procesar el conductor.") => toast({
      variant: "destructive",
      title: "❌ Error",
      description: message,
    }),
  },

  // ========== VEHÍCULOS ==========
  vehicle: {
    created: () => toast({
      title: "✅ Vehículo Registrado",
      description: "El vehículo ha sido registrado exitosamente.",
    }),
    updated: () => toast({
      title: "✅ Vehículo Actualizado",
      description: "Los datos del vehículo han sido actualizados.",
    }),
    deleted: () => toast({
      title: "✅ Vehículo Eliminado",
      description: "El vehículo ha sido eliminado exitosamente.",
    }),
    error: (message = "Ocurrió un error al procesar el vehículo.") => toast({
      variant: "destructive",
      title: "❌ Error",
      description: message,
    }),
  },

  // ========== SOLICITUDES DE SERVICIO ==========
  serviceRequest: {
    created: () => toast({
      title: "✅ Solicitud Creada",
      description: "La solicitud de servicio ha sido creada exitosamente.",
    }),
    updated: () => toast({
      title: "✅ Solicitud Actualizada",
      description: "La solicitud ha sido actualizada exitosamente.",
    }),
    deleted: () => toast({
      title: "✅ Solicitud Eliminada",
      description: "La solicitud ha sido eliminada exitosamente.",
    }),
    assigned: (driverName: string) => toast({
      title: "✅ Conductor Asignado",
      description: `Conductor ${driverName} asignado a la solicitud.`,
    }),
    cancelled: () => toast({
      title: "✅ Solicitud Cancelada",
      description: "La solicitud ha sido cancelada exitosamente.",
      variant: "destructive",
    }),
    completed: () => toast({
      title: "✅ Servicio Completado",
      description: "El servicio ha sido marcado como completado.",
    }),
    error: (message = "Ocurrió un error al procesar la solicitud.") => toast({
      variant: "destructive",
      title: "❌ Error",
      description: message,
    }),
  },

  // ========== RUTAS Y TRACKING ==========
  tracking: {
    routesAssigned: (count: number) => toast({
      title: "✅ Rutas Asignadas",
      description: `Se han asignado rutas a ${count} vehículos.`,
    }),
    vehiclesInTransit: (count: number) => toast({
      title: "✅ Vehículos en Tránsito",
      description: `${count} vehículos han sido marcados como 'En Tránsito'.`,
    }),
    simulationStarted: () => toast({
      title: "▶️ Simulación Iniciada",
      description: "Los vehículos están moviéndose por sus rutas.",
    }),
    simulationStopped: () => toast({
      title: "⏸️ Simulación Detenida",
      description: "La simulación de movimiento ha sido detenida.",
    }),
    error: (message = "Ocurrió un error en el tracking.") => toast({
      variant: "destructive",
      title: "❌ Error",
      description: message,
    }),
  },

  // ========== BASE DE DATOS ==========
  database: {
    populated: (counts: { clients: number; drivers: number; vehicles: number; services: number }) => toast({
      title: "✅ Base de Datos Poblada",
      description: `${counts.clients} clientes, ${counts.drivers} conductores, ${counts.vehicles} vehículos y ${counts.services} servicios agregados.`,
    }),
    cleared: () => toast({
      title: "✅ Base de Datos Limpiada",
      description: "Todos los datos han sido eliminados.",
      variant: "destructive",
    }),
    error: (message = "Ocurrió un error en la operación.") => toast({
      variant: "destructive",
      title: "❌ Error",
      description: message,
    }),
  },

  // ========== AUTENTICACIÓN ==========
  auth: {
    signedIn: () => toast({
      title: "✅ Sesión Iniciada",
      description: "Bienvenido al sistema.",
    }),
    signedOut: () => toast({
      title: "👋 Sesión Cerrada",
      description: "Tu sesión ha sido cerrada exitosamente.",
    }),
    error: (message = "Error de autenticación.") => toast({
      variant: "destructive",
      title: "❌ Error",
      description: message,
    }),
  },

  // ========== GENÉRICOS ==========
  success: (title: string, description?: string) => toast({
    title: `✅ ${title}`,
    description,
  }),

  error: (title: string, description?: string) => toast({
    variant: "destructive",
    title: `❌ ${title}`,
    description,
  }),

  info: (title: string, description?: string) => toast({
    title: `ℹ️ ${title}`,
    description,
  }),

  warning: (title: string, description?: string) => toast({
    variant: "destructive",
    title: `⚠️ ${title}`,
    description,
  }),
};
