"use client";

import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { createSampleData } from "@/lib/sample-data";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Database, Trash2, CheckCircle } from "lucide-react";

export function DatabaseSeeder() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

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

  return (
    <div className="space-y-4 p-6 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2">
        <Database className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Gestión de Base de Datos</h3>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Usa estas herramientas para poblar la base de datos con datos de ejemplo o limpiarla.
      </p>

      <div className="flex gap-3">
        <Button
          onClick={seedDatabase}
          disabled={isSeeding}
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
          onClick={clearDatabase}
          disabled={isClearing}
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
        <p><strong>Poblar Base de Datos:</strong> Agrega 15 clientes, 10 conductores, 10 vehículos y 10 servicios de ejemplo.</p>
        <p><strong>Limpiar Base de Datos:</strong> Elimina todos los datos existentes (requiere confirmación manual).</p>
      </div>
    </div>
  );
}
