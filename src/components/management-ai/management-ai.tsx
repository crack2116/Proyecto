"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Lightbulb, TrendingUp, TrendingDown, Target, CheckCircle, BarChart, DollarSign, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import type { ServiceRequest } from "@/lib/types";
import { useMemo } from "react";
import { generateManagementInsights, ManagementInsightsOutput } from "@/ai/flows/management-insights-flow";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { googleAI } from '@genkit-ai/google-genai';

export function ManagementAI() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ManagementInsightsOutput | null>(null);

  const firestore = useFirestore();
  const serviceRequestsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "serviceRequests"))
  }, [firestore]);
  
  const { data: serviceRequests, isLoading: isLoadingData } = useDoc<ServiceRequest>(serviceRequestsQuery);

  const kpis = useMemo(() => {
    if (!serviceRequests) {
      return {
        totalServices: 0,
        punctualityRate: 0,
        vehicleUtilization: 0,
        inProgressServices: 0,
        pendingRequests: 0,
        revenue: { total: 0, growth: 0 },
      };
    }
    const completed = serviceRequests.filter(req => req.status === 'Completed').length;
    const totalWithStatus = serviceRequests.filter(req => req.status === 'Completed' || req.status === 'Cancelled').length;
    
    return {
      totalServices: serviceRequests.length,
      punctualityRate: totalWithStatus > 0 ? Math.round((completed / totalWithStatus) * 100) : 0,
      vehicleUtilization: 78, // Simulado por ahora
      inProgressServices: serviceRequests.filter(req => req.status === 'In Progress').length,
      pendingRequests: serviceRequests.filter(req => req.status === 'Pending').length,
      revenue: {
        total: completed * 150, // Simulado
        growth: 15.2, // Simulado
      }
    };
  }, [serviceRequests]);

  const handleGenerateAnalysis = async () => {
    setIsLoading(true);
    setAnalysis(null);
    try {
        const input = {
            totalServices: kpis.totalServices,
            punctualityRate: kpis.punctualityRate,
            vehicleUtilization: kpis.vehicleUtilization,
            inProgressServices: kpis.inProgressServices,
            pendingRequests: kpis.pendingRequests,
            revenueData: {
                total: kpis.revenue.total,
                growthPercentage: kpis.revenue.growth,
            },
        };

        const result = await generateManagementInsights(input);
        setAnalysis(result);

      toast({
        title: "Análisis generado",
        description: "La IA ha completado el análisis de los KPIs.",
      });
    } catch (error) {
      console.error("Error generating analysis:", error);
      toast({
        variant: "destructive",
        title: "Error de IA",
        description: "No se pudo completar el análisis. Intenta de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Columna de KPIs y control */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="shadow-modern border-0 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-900/50 dark:to-slate-800/50">
          <CardHeader>
            <CardTitle>Indicadores Clave (KPIs)</CardTitle>
            <CardDescription>Datos en tiempo real de la operación.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                    <BarChart className="h-5 w-5 text-primary" />
                    <span className="font-medium text-sm">Servicios Totales</span>
                </div>
                <span className="font-bold text-lg">{isLoadingData ? <Loader2 className="h-4 w-4 animate-spin"/> : kpis.totalServices}</span>
             </div>
             <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-sm">Tasa de Puntualidad</span>
                </div>
                <span className="font-bold text-lg">{isLoadingData ? <Loader2 className="h-4 w-4 animate-spin"/> : `${kpis.punctualityRate}%`}</span>
             </div>
             <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-blue-500" />
                    <span className="font-medium text-sm">Utilización de Flota</span>
                </div>
                <span className="font-bold text-lg">{kpis.vehicleUtilization}%</span>
             </div>
             <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-emerald-500" />
                    <span className="font-medium text-sm">Ingresos (Estimado)</span>
                </div>
                <span className="font-bold text-lg">S/ {kpis.revenue.total.toLocaleString()}</span>
             </div>
          </CardContent>
        </Card>
        <Button onClick={handleGenerateAnalysis} disabled={isLoading || isLoadingData} className="w-full h-12 text-lg gradient-blue text-primary-foreground hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analizando...
            </>
          ) : (
            <>
              <Lightbulb className="mr-2 h-5 w-5" />
              Generar Análisis Gerencial
            </>
          )}
        </Button>
      </div>

      {/* Columna de Análisis de IA */}
      <div className="lg:col-span-2">
        <Card className="shadow-modern border-0 min-h-[300px]">
          <CardHeader>
            <CardTitle>Análisis y Recomendaciones de la IA</CardTitle>
            <CardDescription>Insights estratégicos para la toma de decisiones.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary" />
                <p className="font-medium">La IA está analizando los datos...</p>
                <p className="text-sm">Esto puede tomar unos segundos.</p>
              </div>
            )}
            {!isLoading && !analysis && (
                 <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Listo para el análisis</AlertTitle>
                    <AlertDescription>
                        Haz clic en "Generar Análisis Gerencial" para obtener insights sobre tus KPIs. La IA procesará los datos y te dará un reporte estratégico.
                    </AlertDescription>
                </Alert>
            )}
            {analysis && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Resumen Ejecutivo</h3>
                  <p className="text-muted-foreground">{analysis.executiveSummary}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><TrendingUp className="text-green-500"/> Puntos Positivos</h3>
                        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                            {analysis.positivePoints.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><TrendingDown className="text-red-500"/> Áreas de Mejora</h3>
                        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                            {analysis.areasForImprovement.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2"><Target /> Recomendaciones Accionables</h3>
                  <div className="space-y-4">
                    {analysis.actionableRecommendations.map((rec, i) => (
                      <div key={i} className="p-4 border rounded-lg bg-muted/30">
                        <p className="font-semibold mb-1">{i + 1}. {rec.recommendation}</p>
                        <p className="text-sm text-muted-foreground italic mb-2">"{rec.justification}"</p>
                        <p className="text-xs font-medium text-primary">Impacto Esperado: {rec.expectedImpact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
