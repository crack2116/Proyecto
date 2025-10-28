"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

function generateHistoricalData(selectedDate: Date) {
    // Generar datos variados según la fecha seleccionada
    const daysSinceEpoch = Math.floor(selectedDate.getTime() / (1000 * 60 * 60 * 24));
    const variation = daysSinceEpoch % 100;
    
    return [
        { month: 'Ene', onTime: 75 + (variation % 10), delayed: 25 - (variation % 10) },
        { month: 'Feb', onTime: 80 + (variation % 8), delayed: 20 - (variation % 8) },
        { month: 'Mar', onTime: 85 + (variation % 7), delayed: 15 - (variation % 7) },
        { month: 'Abr', onTime: 83 + (variation % 9), delayed: 17 - (variation % 9) },
        { month: 'May', onTime: 87 + (variation % 8), delayed: 13 - (variation % 8) },
        { month: 'Jun', onTime: 90 + (variation % 7), delayed: 10 - (variation % 7) },
    ];
}

interface ServicePerformanceChartProps {
    selectedDate?: Date;
}

export function ServicePerformanceChart({ selectedDate = new Date() }: ServicePerformanceChartProps) {
    const servicePerformanceData = generateHistoricalData(selectedDate);
    const chartConfig = {
        onTime: {
          label: "A Tiempo",
          color: "hsl(var(--primary))",
        },
        delayed: {
          label: "Retrasado",
          color: "hsl(var(--accent))",
        },
      }

  return (
    <div id="service-performance-chart">
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={servicePerformanceData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="onTime" fill="var(--color-onTime)" radius={4} />
                <Bar dataKey="delayed" fill="var(--color-delayed)" radius={4} />
            </BarChart>
        </ResponsiveContainer>
    </ChartContainer>
    </div>
  )
}
