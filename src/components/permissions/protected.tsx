"use client";

import { ReactNode } from "react";
import { usePermissions } from "@/hooks/use-permissions";
import type { Permission } from "@/lib/permissions";

interface ProtectedProps {
  children: ReactNode;
  permission?: Permission;
  requireAdmin?: boolean;
  requireManager?: boolean;
  fallback?: ReactNode;
}

/**
 * Componente que muestra contenido solo si el usuario tiene los permisos necesarios
 */
export function Protected({ 
  children, 
  permission, 
  requireAdmin = false, 
  requireManager = false,
  fallback = null 
}: ProtectedProps) {
  const { hasPermission, isAdmin, isManager } = usePermissions();

  // Verificar permisos específicos
  if (permission && !hasPermission(permission)) {
    return <>{fallback}</>;
  }

  // Verificar rol admin
  if (requireAdmin && !isAdmin) {
    return <>{fallback}</>;
  }

  // Verificar rol manager o admin
  if (requireManager && !isManager) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Hook para usar permisos de forma condicional en componentes
 */
export function useCan(permission: Permission): boolean {
  const { hasPermission } = usePermissions();
  return hasPermission(permission);
}

