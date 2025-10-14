import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentServices } from "@/components/dashboard/recent-services";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Truck, MapPin, Clock, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline text-foreground">
          Panel de Control
        </h1>
        <p className="text-muted-foreground">
          Bienvenido de vuelta. Aquí tienes un resumen de tu operación de transporte.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Services - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-headline">
                <Truck className="h-5 w-5 text-primary" />
                Solicitudes de Servicio Recientes
              </CardTitle>
              <CardDescription>
                Últimas solicitudes y su estado actual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentServices />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-headline">
                <TrendingUp className="h-5 w-5 text-primary" />
                Acciones Rápidas
              </CardTitle>
              <CardDescription>
                Gestiona tu operación de manera eficiente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
                      <Truck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Nueva Solicitud</p>
                      <p className="text-xs text-muted-foreground">Crear servicio</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">Rápido</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
                      <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Gestionar Clientes</p>
                      <p className="text-xs text-muted-foreground">Ver todos</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">Gestión</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30 transition-colors">
                      <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Seguimiento</p>
                      <p className="text-xs text-muted-foreground">En tiempo real</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">Live</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-headline">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Estado del Sistema
              </CardTitle>
              <CardDescription>
                Monitoreo en tiempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium">Servicios Activos</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">12</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">Vehículos Online</span>
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">8/10</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-sm font-medium">Pendientes</span>
                  </div>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-200">3</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Tiempo Promedio</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">2.5h</Badge>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Última actualización: hace 2 minutos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
