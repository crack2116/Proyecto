"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { DollarSign, Truck, Users, CheckCircle, Clock, Loader2, AlertCircle } from "lucide-react";
  import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
  import { collection, query, where } from "firebase/firestore";
  import { useMemo } from "react";
  import type { ServiceRequest } from "@/lib/types";
  
  export function StatsCards() {
    const firestore = useFirestore();
    
    // Query for all service requests
    const serviceRequestsQuery = useMemoFirebase(() => 
      query(collection(firestore, "serviceRequests")), 
      [firestore]
    );
    
    const { data: serviceRequests, isLoading, error } = useCollection<ServiceRequest>(serviceRequestsQuery);
    
    // Calculate statistics from real data
    const stats = useMemo(() => {
      if (!serviceRequests) {
        return {
          totalRevenue: 0,
          inProgressServices: 0,
          completedThisMonth: 0,
          pendingRequests: 0,
          revenueGrowth: 0,
          completionGrowth: 0
        };
      }
      
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const inProgressServices = serviceRequests.filter(req => req.status === 'In Progress').length;
      const pendingRequests = serviceRequests.filter(req => req.status === 'Pending').length;
      
      // For demo purposes, we'll calculate completed services this month
      // In a real app, you'd have completion dates
      const completedThisMonth = serviceRequests.filter(req => req.status === 'Completed').length;
      
      // Mock revenue calculation (in a real app, you'd have pricing data)
      const totalRevenue = serviceRequests.filter(req => req.status === 'Completed').length * 150; // $150 per completed service
      
      return {
        totalRevenue,
        inProgressServices,
        completedThisMonth,
        pendingRequests,
        revenueGrowth: 20.1, // Mock growth percentage
        completionGrowth: 10 // Mock growth percentage
      };
    }, [serviceRequests]);
    
    if (error) {
      return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error</CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-destructive">
                  Error al cargar datos
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
    
    if (isLoading) {
      return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cargando...</CardTitle>
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">
                  Cargando datos...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
    
    return (
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.revenueGrowth}% desde el último mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Servicios en Curso</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgressServices}</div>
            <p className="text-xs text-muted-foreground">
              Actualmente en ruta
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Servicios Completados (Mes)
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.completedThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.completionGrowth}% desde el último mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solicitudes Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              Esperando asignación
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  