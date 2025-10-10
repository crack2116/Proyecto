"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Truck,
  Map,
  BarChart3,
  LifeBuoy,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/requests", icon: Truck, label: "Service Requests" },
  { href: "/dashboard/tracking", icon: Map, label: "Real-Time Tracking" },
  { href: "/dashboard/reports", icon: BarChart3, label: "Reports" },
  { href: "/dashboard/support", icon: LifeBuoy, label: "Support" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.label}
              className={cn(
                pathname === item.href
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:text-sidebar-foreground"
              )}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
