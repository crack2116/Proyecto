"use client";

import { usePermissions } from "@/hooks/use-permissions";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Eye } from "lucide-react";

export function UserRoleBadge() {
  const { role, getRoleLabel } = usePermissions();

  const roleConfig = {
    admin: { 
      icon: Shield, 
      className: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20",
      label: "Admin"
    },
    manager: { 
      icon: Users, 
      className: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
      label: "Gerente"
    },
    viewer: { 
      icon: Eye, 
      className: "bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20",
      label: "Visualizador"
    },
  };

  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="mr-1 h-3 w-3" />
      {config.label}
    </Badge>
  );
}

