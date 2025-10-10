"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const servicePerformanceData = [
    { month: 'Ene', onTime: 80, delayed: 20 },
    { month: 'Feb', onTime: 85, delayed: 15 },
    { month: 'Mar', onTime: 90, delayed: 10 },
    { month: 'Abr', onTime: 88, delayed: 12 },
    { month: 'May', onTime: 92, delayed: 8 },
    { month: 'Jun', onTime: 95, delayed: 5 },
];


export function ServicePerformanceChart() {
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
  )
}
