import { z } from "zod";

/**
 * Esquemas de validación con Zod para todos los modelos
 */

// ========== CLIENT ==========
export const clientSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, "Teléfono inválido"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  company: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

// ========== DRIVER ==========
export const driverSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, "Teléfono inválido"),
  licenseNumber: z.string().min(5, "Número de licencia inválido"),
  licenseType: z.enum(["A", "B", "C", "D"], {
    errorMap: () => ({ message: "Tipo de licencia inválido" }),
  }),
  experience: z.number().min(0, "La experiencia debe ser 0 o mayor"),
  status: z.enum(["Disponible", "En Viaje", "Fuera de Servicio"]),
});

export type DriverFormData = z.infer<typeof driverSchema>;

// ========== VEHICLE ==========
export const vehicleSchema = z.object({
  make: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  licensePlate: z.string().regex(/^[A-Z]{3}-\d{3}$/, "Formato de placa inválido (ej: ABC-123)"),
  vehicleType: z.string().min(1, "El tipo de vehículo es requerido"),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  color: z.string().min(1, "El color es requerido"),
  status: z.enum(["Disponible", "En Mantenimiento", "En Uso"]),
  driverId: z.string().optional(),
  route: z.array(z.object({
    lat: z.number(),
    lng: z.number(),
  })).optional(),
  currentRoutePointIndex: z.number().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  heading: z.number().optional(),
  speed: z.number().optional(),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;

// ========== SERVICE REQUEST ==========
export const serviceRequestSchema = z.object({
  clientId: z.string().min(1, "Cliente requerido"),
  pickupLocation: z.string().min(5, "Origen inválido"),
  destination: z.string().min(5, "Destino inválido"),
  serviceDate: z.date(),
  priority: z.enum(["Baja", "Media", "Alta"]),
  status: z.enum(["Pending", "Assigned", "In Progress", "Completed", "Cancelled"]),
  driverId: z.string().optional(),
  vehicleId: z.string().optional(),
  notes: z.string().optional(),
});

export type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;

// ========== USER ==========
export const userSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  role: z.enum(["admin", "manager", "viewer"]),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, "Teléfono inválido").optional(),
});

export type UserFormData = z.infer<typeof userSchema>;

// ========== SEARCH FILTER ==========
export const searchFilterSchema = z.object({
  query: z.string().optional(),
  status: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type SearchFilterData = z.infer<typeof searchFilterSchema>;

