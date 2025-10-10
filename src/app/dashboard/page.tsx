import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Truck, Users } from "lucide-react";
import { RecentServices } from "@/components/dashboard/recent-services";
import { StatsCards } from "@/components/dashboard/stats-cards";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Panel de Control</h1>
            <p className="text-muted-foreground">Resumen de tus operaciones de transporte.</p>
        </div>
      <StatsCards />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Solicitudes de Servicio Recientes</CardTitle>
            </CardHeader>
            <CardContent>
                <RecentServices />
            </CardContent>
        </Card>
        {/* Placeholder for another chart or component */}
        <Card>
            <CardHeader>
                <CardTitle>Actividad del Conductor</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Monitoreo de la actividad del conductor próximamente.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
