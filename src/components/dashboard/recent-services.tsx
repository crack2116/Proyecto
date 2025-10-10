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
  import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
  import { collection, query, limit } from "firebase/firestore";
  import type { ServiceRequest } from "@/lib/types";
import { Loader2 } from "lucide-react";
  
  export function RecentServices() {
    const firestore = useFirestore();
    const serviceRequestsQuery = useMemoFirebase(() => query(collection(firestore, "serviceRequests"), limit(5)), [firestore]);
    const { data: serviceRequests, isLoading } = useCollection<ServiceRequest>(serviceRequestsQuery);

    const statusTranslations: { [key: string]: string } = {
        "Completed": "Completado",
        "In Progress": "En Progreso",
        "Pending": "Pendiente",
        "Cancelled": "Cancelado"
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
          {serviceRequests && serviceRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <div className="font-medium">{request.clientId}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {request.destination}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    request.status === "Completed" && "bg-green-500/20 text-green-700",
                    request.status === "In Progress" && "bg-blue-500/20 text-blue-700",
                    request.status === "Pending" && "bg-yellow-500/20 text-yellow-700",
                    request.status === "Cancelled" && "bg-red-500/20 text-red-700",
                    "border-none"
                  )}
                >
                  {statusTranslations[request.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{new Date(request.serviceDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  