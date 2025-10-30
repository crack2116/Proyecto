"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Badge } from "@/components/ui/badge";
  import { cn } from "@/lib/utils";
  import { useDoc } from "@/firebase";
  import type { ServiceRequest } from "@/lib/types";
import { Loader2 } from "lucide-react";
  
  export function RecentServices() {
    const { data: serviceRequests, isLoading } = useDoc<ServiceRequest>('serviceRequests');

    const statusTranslations: { [key: string]: string } = {
        "Completed": "Completado",
        "In Progress": "En Progreso",
        "Pending": "Pendiente",
        "Assigned": "Asignado",
        "Cancelled": "Cancelado"
    }

    const getStatusBadge = (status: string | undefined) => {
        if (!status) return <Badge className="bg-gray-500/20 text-gray-700 border-none">Sin estado</Badge>;
        
        const translatedStatus = statusTranslations[status] || status;
        
        const statusClass = status === "Completed" 
            ? "bg-green-500/20 text-green-700"
            : status === "In Progress" 
            ? "bg-blue-500/20 text-blue-700"
            : status === "Assigned"
            ? "bg-purple-500/20 text-purple-700"
            : status === "Pending"
            ? "bg-yellow-500/20 text-yellow-700"
            : status === "Cancelled"
            ? "bg-red-500/20 text-red-700"
            : "bg-gray-500/20 text-gray-700";
            
        return (
            <Badge className={cn(statusClass, "border-none")}>
                {translatedStatus}
            </Badge>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {serviceRequests && serviceRequests.slice(0,5).map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <div className="font-medium">{request.clientId}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {request.destination}
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(request.status)}
              </TableCell>
              <TableCell className="text-right">{new Date(request.serviceDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  