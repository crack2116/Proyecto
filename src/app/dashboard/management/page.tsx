import { ClientsTable } from "@/components/management/clients-table";
import { DriversTable } from "@/components/management/drivers-table";
import { VehiclesTable } from "@/components/management/vehicles-table";
import { DatabaseSeeder } from "@/components/admin/database-seeder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Truck, Building, Database } from "lucide-react";

export default function ManagementPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Gestión</h1>
        <p className="text-muted-foreground">Administra clientes, conductores y vehículos.</p>
      </div>

      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="clients"><Building className="mr-2 h-4 w-4" />Clientes</TabsTrigger>
          <TabsTrigger value="drivers"><User className="mr-2 h-4 w-4" />Conductores</TabsTrigger>
          <TabsTrigger value="vehicles"><Truck className="mr-2 h-4 w-4" />Vehículos</TabsTrigger>
          <TabsTrigger value="database"><Database className="mr-2 h-4 w-4" />Base de Datos</TabsTrigger>
        </TabsList>
        <TabsContent value="clients">
            <ClientsTable />
        </TabsContent>
        <TabsContent value="drivers">
            <DriversTable />
        </TabsContent>
        <TabsContent value="vehicles">
            <VehiclesTable />
        </TabsContent>
        <TabsContent value="database">
            <DatabaseSeeder />
        </TabsContent>
      </Tabs>
    </div>
  );
}
