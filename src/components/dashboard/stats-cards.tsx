"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { DollarSign, Truck, Users, CheckCircle, Clock, Loader2, AlertCircle, TrendingUp } from "lucide-react";
  import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
  import { useMemo } from "react";
  import type { ServiceRequest } from "@/lib/types";
  import { collection, query } from "firebase/firestore";
  
  export function StatsCards() {
    const firestore = useFirestore();
    const serviceRequestsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, "serviceRequests"));
    }, [firestore]);
    
    const { data: serviceRequests, isLoading, error } = useDoc<ServiceRequest>(serviceRequestsQuery);
    
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
      
      const completedThisMonth = serviceRequests.filter(req => req.status === 'Completed').length;
      
      const totalRevenue = serviceRequests.filter(req => req.status === 'Completed').length * 150;
      
      return {
        totalRevenue,
        inProgressServices,
        completedThisMonth,
        pendingRequests,
        revenueGrowth: 20.1,
        completionGrowth: 10
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift group border-0 shadow-modern bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Ingresos Totales</CardTitle>
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline text-green-800 dark:text-green-200">${stats.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                +{stats.revenueGrowth}% desde el último mes
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover-lift group border-0 shadow-modern bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Servicios en Curso</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
              <Truck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline text-blue-800 dark:text-blue-200">{stats.inProgressServices}</div>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                Actualmente en ruta
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover-lift group border-0 shadow-modern bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Servicios Completados (Mes)
            </CardTitle>
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
              <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline text-purple-800 dark:text-purple-200">+{stats.completedThisMonth}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-purple-600" />
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                +{stats.completionGrowth}% desde el último mes
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover-lift group border-0 shadow-modern bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Solicitudes Pendientes</CardTitle>
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
              <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline text-orange-800 dark:text-orange-200">{stats.pendingRequests}</div>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                Esperando asignación
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }