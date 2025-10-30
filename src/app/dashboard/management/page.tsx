import { ClientsTable } from "@/components/management/clients-table";
import { DriversTable } from "@/components/management/drivers-table";
import { VehiclesTable } from "@/components/management/vehicles-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Truck, Building, Users } from "lucide-react";
import { UserManagement } from "@/components/management/user-management";

export default function ManagementPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Gestión</h1>
        <p className="text-muted-foreground">Administra clientes, conductores, vehículos y usuarios.</p>
      </div>

      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-3xl">
          <TabsTrigger value="clients"><Building className="mr-2 h-4 w-4" />Clientes</TabsTrigger>
          <TabsTrigger value="drivers"><User className="mr-2 h-4 w-4" />Conductores</TabsTrigger>
          <TabsTrigger value="vehicles"><Truck className="mr-2 h-4 w-4" />Vehículos</TabsTrigger>
          <TabsTrigger value="users"><Users className="mr-2 h-4 w-4" />Usuarios</TabsTrigger>
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
        <TabsContent value="users">
            <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
