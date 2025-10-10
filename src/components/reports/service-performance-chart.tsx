"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { servicePerformanceData } from "@/lib/data"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export function ServicePerformanceChart() {
    const chartConfig = {
        onTime: {
          label: "On-Time",
          color: "hsl(var(--primary))",
        },
        delayed: {
          label: "Delayed",
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
