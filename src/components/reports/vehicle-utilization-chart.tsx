"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

function generateHistoricalUtilization(selectedDate: Date) {
    // Generar datos variados según la fecha seleccionada
    const daysSinceEpoch = Math.floor(selectedDate.getTime() / (1000 * 60 * 60 * 24));
    const baseUtilization = 70 + (daysSinceEpoch % 15);
    
    const data = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() - i);
        // Usar función pseudoaleatoria basada en la fecha para ser determinística
        const seed = (daysSinceEpoch + i) * 9301 + 49297;
        const pseudoRandom = (seed % 233280) / 233280;
        const dayUtilization = baseUtilization + (Math.sin(daysSinceEpoch + i) * 5) + (pseudoRandom * 5);
        data.push({
            date: date.toISOString().split('T')[0],
            utilization: Math.round(dayUtilization),
        });
    }
    
    return data;
}

interface VehicleUtilizationChartProps {
    selectedDate?: Date;
}

export function VehicleUtilizationChart({ selectedDate = new Date() }: VehicleUtilizationChartProps) {
    const vehicleUtilizationData = generateHistoricalUtilization(selectedDate);
    const chartConfig = {
        utilization: {
          label: "Utilización (%)",
          color: "hsl(var(--primary))",
        },
      }

  return (
    <div id="vehicle-utilization-chart">
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
    </div>
  )
}
