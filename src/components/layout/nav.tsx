"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Truck,
  Map,
  BarChart3,
  LifeBuoy,
  Users,
  UserCircle,
  BrainCircuit,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Protected } from "../permissions/protected";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Panel de Control" },
  { href: "/dashboard/requests", icon: Truck, label: "Solicitudes de Servicio" },
  { href: "/dashboard/management", icon: Users, label: "Gestión" },
  { href: "/dashboard/tracking", icon: Map, label: "Seguimiento en Tiempo Real" },
  { href: "/dashboard/reports", icon: BarChart3, label: "Reportes" },
  { 
    href: "/dashboard/management-ai", 
    icon: BrainCircuit, 
    label: "IA Gerencial",
    adminOnly: true 
  },
  { href: "/dashboard/support", icon: LifeBuoy, label: "Soporte" },
  { href: "/dashboard/profile", icon: UserCircle, label: "Mi Perfil" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const menuItem = (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
                className={cn(
                  pathname.startsWith(item.href)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:text-sidebar-foreground"
                )}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );

        if (item.adminOnly) {
          return <Protected key={item.href} requireAdmin>{menuItem}</Protected>;
        }
        
        return menuItem;
      })}
    </SidebarMenu>
  );
}
