import { ServicePerformanceChart } from "@/components/reports/service-performance-chart";
import { VehicleUtilizationChart } from "@/components/reports/vehicle-utilization-chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Reportes y Analíticas</h1>
        <p className="text-muted-foreground">Analiza el rendimiento y optimiza tus operaciones.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Rendimiento del Servicio</CardTitle>
                <CardDescription>Servicios a Tiempo vs. Retrasados (Últimos 6 Meses)</CardDescription>
            </CardHeader>
            <CardContent>
                <ServicePerformanceChart />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Utilización de Vehículos</CardTitle>
                <CardDescription>Porcentaje de Uso Semanal de Vehículos</CardDescription>
            </CardHeader>
            <CardContent>
                <VehicleUtilizationChart />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
