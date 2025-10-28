"use client";

import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { createSampleData } from "@/lib/sample-data";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Database, Trash2, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

export function DatabaseSeeder() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isAutoSeeding, setIsAutoSeeding] = useState(false);
  const [dataStatus, setDataStatus] = useState<'checking' | 'empty' | 'populated' | 'error'>('checking');
  const [dataCounts, setDataCounts] = useState({ clients: 0, drivers: 0, vehicles: 0, services: 0 });

  // Verificar datos existentes
  const checkExistingData = async () => {
    try {
      const [clientsSnapshot, driversSnapshot, vehiclesSnapshot, requestsSnapshot] = await Promise.all([
        getDocs(collection(firestore, "clients")),
        getDocs(collection(firestore, "drivers")),
        getDocs(collection(firestore, "vehicles")),
        getDocs(collection(firestore, "serviceRequests"))
      ]);

      const counts = {
        clients: clientsSnapshot.size,
        drivers: driversSnapshot.size,
        vehicles: vehiclesSnapshot.size,
        services: requestsSnapshot.size
      };

      setDataCounts(counts);

      const totalData = counts.clients + counts.drivers + counts.vehicles + counts.services;
      
      if (totalData === 0) {
        setDataStatus('empty');
        // Auto-poblar si no hay datos
        await autoSeedDatabase();
      } else {
        setDataStatus('populated');
      }
    } catch (error) {
      console.error('Error checking existing data:', error);
      setDataStatus('error');
    }
  };

  // Auto-poblar base de datos
  const autoSeedDatabase = async () => {
    setIsAutoSeeding(true);
    try {
      const { clients, drivers, vehicles, serviceRequests } = createSampleData();
      
      // Agregar clientes
      for (const client of clients) {
        await addDoc(collection(firestore, "clients"), client);
      }

      // Agregar conductores
      for (const driver of drivers) {
        await addDoc(collection(firestore, "drivers"), driver);
      }

      // Agregar vehículos
      for (const vehicle of vehicles) {
        await addDoc(collection(firestore, "vehicles"), vehicle);
      }

      // Agregar solicitudes de servicio
      for (const request of serviceRequests) {
        await addDoc(collection(firestore, "serviceRequests"), request);
      }

      setDataStatus('populated');
      setDataCounts({
        clients: clients.length,
        drivers: drivers.length,
        vehicles: vehicles.length,
        services: serviceRequests.length
      });

      toast({
        title: "✅ Base de Datos Poblada Automáticamente",
        description: `Se agregaron ${clients.length} clientes, ${drivers.length} conductores, ${vehicles.length} vehículos y ${serviceRequests.length} servicios.`,
      });

    } catch (error) {
      console.error("Error auto-seeding database:", error);
      setDataStatus('error');
      toast({
        variant: "destructive",
        title: "❌ Error",
        description: "Ocurrió un error al poblar automáticamente la base de datos.",
      });
    } finally {
      setIsAutoSeeding(false);
    }
  };

  // Verificar datos al cargar el componente
  useEffect(() => {
    checkExistingData();
  }, []);

  const seedDatabase = async () => {
    setIsSeeding(true);
    try {
      const { clients, drivers, vehicles, serviceRequests } = createSampleData();
      
      // Verificar si ya existen datos
      const clientsSnapshot = await getDocs(collection(firestore, "clients"));
      const driversSnapshot = await getDocs(collection(firestore, "drivers"));
      const vehiclesSnapshot = await getDocs(collection(firestore, "vehicles"));
      const requestsSnapshot = await getDocs(collection(firestore, "serviceRequests"));

      if (clientsSnapshot.size > 0 || driversSnapshot.size > 0 || 
          vehiclesSnapshot.size > 0 || requestsSnapshot.size > 0) {
        toast({
          variant: "destructive",
          title: "⚠️ Datos Existentes",
          description: "Ya existen datos en la base de datos. Usa 'Limpiar Base de Datos' primero si quieres empezar de nuevo.",
        });
        return;
      }

      // Agregar clientes
      for (const client of clients) {
        await addDoc(collection(firestore, "clients"), client);
      }

      // Agregar conductores
      for (const driver of drivers) {
        await addDoc(collection(firestore, "drivers"), driver);
      }

      // Agregar vehículos
      for (const vehicle of vehicles) {
        await addDoc(collection(firestore, "vehicles"), vehicle);
      }

      // Agregar solicitudes de servicio
      for (const request of serviceRequests) {
        await addDoc(collection(firestore, "serviceRequests"), request);
      }

      setDataStatus('populated');
      setDataCounts({
        clients: clients.length,
        drivers: drivers.length,
        vehicles: vehicles.length,
        services: serviceRequests.length
      });

      toast({
        title: "✅ Base de Datos Poblada",
        description: `Se agregaron ${clients.length} clientes, ${drivers.length} conductores, ${vehicles.length} vehículos y ${serviceRequests.length} servicios.`,
      });

    } catch (error) {
      console.error("Error seeding database:", error);
      toast({
        variant: "destructive",
        title: "❌ Error",
        description: "Ocurrió un error al poblar la base de datos.",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const clearDatabase = async () => {
    setIsClearing(true);
    try {
      // Nota: En un entorno de producción, esto debería ser más cuidadoso
      // Por ahora, solo mostramos un mensaje de advertencia
      toast({
        variant: "destructive",
        title: "⚠️ Función No Implementada",
        description: "La limpieza de base de datos debe hacerse manualmente desde Firebase Console por seguridad.",
      });
    } catch (error) {
      console.error("Error clearing database:", error);
      toast({
        variant: "destructive",
        title: "❌ Error",
        description: "Ocurrió un error al limpiar la base de datos.",
      });
    } finally {
      setIsClearing(false);
    }
  };

  const refreshData = async () => {
    await checkExistingData();
  };

  return (
    <div className="space-y-4 p-6 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2">
        <Database className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Gestión de Base de Datos</h3>
      </div>
      
      {/* Estado de la base de datos */}
      <div className="space-y-3">
        {dataStatus === 'checking' && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Verificando datos existentes...</span>
          </div>
        )}

        {dataStatus === 'empty' && (
          <div className="flex items-center gap-2 text-sm text-yellow-600">
            <AlertCircle className="h-4 w-4" />
            <span>Base de datos vacía - Poblando automáticamente...</span>
          </div>
        )}

        {dataStatus === 'populated' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Base de datos poblada correctamente</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>👥 Clientes: {dataCounts.clients}</div>
              <div>👨‍💼 Conductores: {dataCounts.drivers}</div>
              <div>🚛 Vehículos: {dataCounts.vehicles}</div>
              <div>📦 Servicios: {dataCounts.services}</div>
            </div>
          </div>
        )}

        {dataStatus === 'error' && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>Error al verificar datos - Intenta refrescar</span>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={seedDatabase}
          disabled={isSeeding || isAutoSeeding}
          className="gradient-primary hover:opacity-90 text-primary-foreground font-medium"
        >
          {isSeeding ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Poblando...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Poblar Base de Datos</span>
            </div>
          )}
        </Button>

        <Button
          onClick={refreshData}
          disabled={isSeeding || isAutoSeeding}
          variant="outline"
          className="hover:opacity-90"
        >
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refrescar</span>
          </div>
        </Button>

        <Button
          onClick={clearDatabase}
          disabled={isClearing || isAutoSeeding}
          variant="destructive"
          className="hover:opacity-90"
        >
          {isClearing ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Limpiando...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              <span>Limpiar Base de Datos</span>
            </div>
          )}
        </Button>

      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p><strong>Auto-poblamiento:</strong> Los datos se agregan automáticamente si la base de datos está vacía.</p>
        <p><strong>Poblar Base de Datos:</strong> Agrega datos de ejemplo manualmente (solo si está vacía).</p>
        <p><strong>Refrescar:</strong> Verifica el estado actual de la base de datos.</p>
        <p><strong>Limpiar Base de Datos:</strong> Elimina todos los datos existentes (requiere confirmación manual).</p>
      </div>
    </div>
  );
}