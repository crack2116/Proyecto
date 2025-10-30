"use client";

import { useUser, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
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

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  
  const { data: userProfileData } = useDoc<UserProfile>(userProfileRef!);

  const userProfile = useMemo(() => {
    if (!userProfileData || userProfileData.length === 0) return null;
    return userProfileData[0];
  }, [userProfileData]);

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
