import { ServicePerformanceChart } from "@/components/reports/service-performance-chart";
import { VehicleUtilizationChart } from "@/components/reports/vehicle-utilization-chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">Analyze performance and optimize your operations.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Service Performance</CardTitle>
                <CardDescription>On-Time vs. Delayed Services (Last 6 Months)</CardDescription>
            </CardHeader>
            <CardContent>
                <ServicePerformanceChart />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Vehicle Utilization</CardTitle>
                <CardDescription>Weekly Vehicle Usage Percentage</CardDescription>
            </CardHeader>
            <CardContent>
                <VehicleUtilizationChart />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
