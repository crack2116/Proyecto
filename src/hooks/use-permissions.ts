"use client";

import { useUser, useDoc, useMemoFirebase, useFirestore } from "@/firebase";
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
import type { UserProfile } from "@/lib/types";
import { doc } from "firebase/firestore";

/**
 * Hook para gestionar permisos del usuario actual
 */
export function usePermissions() {
  const { user } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(
    () => (user ? doc(firestore, "users", user.uid) : null),
    [user, firestore]
  );
  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);
  
  const userRole: UserRole = useMemo(() => {
    if (!user || !userProfile) return "viewer";
    return userProfile.role || "viewer";
  }, [user, userProfile]);

  const permissions = useMemo(() => getRolePermissions(userRole), [userRole]);

  return {
    role: userRole,
    permissions,
    hasPermission: (permission: Permission) => hasPermission(userRole, permission),
    canCreate: (entity: "clients" | "drivers" | "vehicles" | "requests") => canCreate(userRole, entity),
    canUpdate: (entity: "clients" | "drivers" | "vehicles" | "requests") => canUpdate(userRole, entity),
    canDelete: (entity: "clients" | "drivers" | "vehicles" | "requests") => canDelete(userRole, entity),
    isAdmin: userRole === "administrator",
    isManager: userRole === "assistant", // Mapping manager to assistant
    isAssistant: userRole === "assistant",
    isViewer: userRole === "viewer",
    getRoleLabel: () => getRoleLabel(userRole),
    getRoleDescription: () => getRoleDescription(userRole),
  };
}
