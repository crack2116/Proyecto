/**
 * Sistema de permisos y roles de usuario
 */

export type UserRole = "admin" | "manager" | "viewer";

export type Permission =
  | "clients:read"
  | "clients:create"
  | "clients:update"
  | "clients:delete"
  | "drivers:read"
  | "drivers:create"
  | "drivers:update"
  | "drivers:delete"
  | "vehicles:read"
  | "vehicles:create"
  | "vehicles:update"
  | "vehicles:delete"
  | "requests:read"
  | "requests:create"
  | "requests:update"
  | "requests:delete"
  | "requests:assign"
  | "requests:cancel"
  | "tracking:view"
  | "tracking:control"
  | "reports:view"
  | "reports:export"
  | "users:manage"
  | "database:manage";

/**
 * Mapeo de roles a permisos
 */
export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    // Clientes
    "clients:read",
    "clients:create",
    "clients:update",
    "clients:delete",
    // Conductores
    "drivers:read",
    "drivers:create",
    "drivers:update",
    "drivers:delete",
    // Vehículos
    "vehicles:read",
    "vehicles:create",
    "vehicles:update",
    "vehicles:delete",
    // Solicitudes
    "requests:read",
    "requests:create",
    "requests:update",
    "requests:delete",
    "requests:assign",
    "requests:cancel",
    // Tracking
    "tracking:view",
    "tracking:control",
    // Reportes
    "reports:view",
    "reports:export",
    // Usuarios
    "users:manage",
    // Base de datos
    "database:manage",
  ],
  manager: [
    // Clientes
    "clients:read",
    "clients:create",
    "clients:update",
    // Conductores
    "drivers:read",
    "drivers:create",
    "drivers:update",
    // Vehículos
    "vehicles:read",
    "vehicles:update",
    // Solicitudes
    "requests:read",
    "requests:create",
    "requests:update",
    "requests:assign",
    "requests:cancel",
    // Tracking
    "tracking:view",
    "tracking:control",
    // Reportes
    "reports:view",
    "reports:export",
  ],
  viewer: [
    // Solo lectura
    "clients:read",
    "drivers:read",
    "vehicles:read",
    "requests:read",
    "tracking:view",
    "reports:view",
  ],
};

/**
 * Verifica si un rol tiene un permiso específico
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

/**
 * Obtiene todos los permisos de un rol
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return rolePermissions[role] ?? [];
}

/**
 * Verifica si un rol tiene acceso a crear entidades
 */
export function canCreate(role: UserRole, entity: "clients" | "drivers" | "vehicles" | "requests"): boolean {
  return hasPermission(role, `${entity}:create` as Permission);
}

/**
 * Verifica si un rol tiene acceso a actualizar entidades
 */
export function canUpdate(role: UserRole, entity: "clients" | "drivers" | "vehicles" | "requests"): boolean {
  return hasPermission(role, `${entity}:update` as Permission);
}

/**
 * Verifica si un rol tiene acceso a eliminar entidades
 */
export function canDelete(role: UserRole, entity: "clients" | "drivers" | "vehicles" | "requests"): boolean {
  return hasPermission(role, `${entity}:delete` as Permission);
}

/**
 * Obtiene el label legible de un rol
 */
export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    admin: "Administrador",
    manager: "Gerente",
    viewer: "Visualizador",
  };
  return labels[role];
}

/**
 * Obtiene la descripción de un rol
 */
export function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    admin: "Acceso completo al sistema. Puede gestionar todo incluyendo usuarios y base de datos.",
    manager: "Puede gestionar clientes, conductores, vehículos y solicitudes. Puede asignar y cancelar servicios.",
    viewer: "Solo lectura. Puede ver información pero no puede crear, editar o eliminar.",
  };
  return descriptions[role];
}

