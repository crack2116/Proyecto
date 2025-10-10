"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const vehicleUtilizationData = [
    { date: '2024-06-01', utilization: 75 },
    { date: '2024-06-02', utilization: 78 },
    { date: '2024-06-03', utilization: 80 },
    { date: '2024-06-04', utilization: 82 },
    { date: '2024-06-05', utilization: 79 },
    { date: '2024-06-06', utilization: 85 },
    { date: '2024-06-07', utilization: 88 },
];

export function VehicleUtilizationChart() {
    const chartConfig = {
        utilization: {
          label: "Utilización (%)",
          color: "hsl(var(--primary))",
        },
      }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vehicleUtilizationData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString('es-ES', { day: 'numeric', month: 'short'})}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="utilization" stroke="var(--color-utilization)" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    </ChartContainer>
  )
}
