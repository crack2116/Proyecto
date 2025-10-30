"use client";

import { useUser } from "@/firebase";
import { useMemo } from "react";
import type { UserRole, Permission } from "@/lib/permissions";
import { 
  hasPermission, 
  canCreate, 
  canUpdate, 
  canDelete,
  getRolePermissions,
  getRoleLabel,
  getRoleDescription 
} from "@/lib/permissions";

/**
 * Hook para gestionar permisos del usuario actual
 */
export function usePermissions() {
  const { user } = useUser();
  
  // Obtener rol del usuario desde metadata o default a 'viewer'
  const userRole: UserRole = useMemo(() => {
    if (!user) return "viewer";
    // Asignar 'admin' por defecto para el desarrollo. En un futuro se puede cambiar
    // a `(user as any).role || "viewer";` para leerlo de Firebase.
    return "admin";
  }, [user]);

  const permissions = useMemo(() => getRolePermissions(userRole), [userRole]);

  return {
    role: userRole,
    permissions,
    hasPermission: (permission: Permission) => hasPermission(userRole, permission),
    canCreate: (entity: "clients" | "drivers" | "vehicles" | "requests") => canCreate(userRole, entity),
    canUpdate: (entity: "clients" | "drivers" | "vehicles" | "requests") => canUpdate(userRole, entity),
    canDelete: (entity: "clients" | "drivers" | "vehicles" | "requests") => canDelete(userRole, entity),
    isAdmin: userRole === "admin",
    isManager: userRole === "manager" || userRole === "admin",
    isViewer: userRole === "viewer",
    getRoleLabel: () => getRoleLabel(userRole),
    getRoleDescription: () => getRoleDescription(userRole),
  };
}
