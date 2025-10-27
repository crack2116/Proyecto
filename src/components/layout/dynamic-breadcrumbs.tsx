"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Home } from "lucide-react";

/**
 * Mapeo de rutas a labels legibles
 */
const routeLabels: Record<string, string> = {
  "/": "Inicio",
  "/dashboard": "Panel de Control",
  "/dashboard/management": "Gestión",
  "/dashboard/management/clients": "Clientes",
  "/dashboard/management/drivers": "Conductores",
  "/dashboard/management/vehicles": "Vehículos",
  "/dashboard/tracking": "Seguimiento en Tiempo Real",
  "/dashboard/service-requests": "Solicitudes de Servicio",
  "/dashboard/reports": "Reportes",
  "/dashboard/support": "Soporte",
  "/dashboard/profile": "Mi Perfil",
};

export function DynamicBreadcrumbs() {
  const pathname = usePathname();
  
  // Si estamos en el root, no mostrar breadcrumbs
  if (pathname === "/" || !pathname) {
    return null;
  }
  
  // Dividir el pathname en segmentos
  const pathSegments = pathname.split("/").filter(Boolean);
  
  // Construir breadcrumbs
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;
    const label = routeLabels[path] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    
    return {
      path,
      label,
      isLast,
    };
  });
  
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.path} className="flex items-center">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.path}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

