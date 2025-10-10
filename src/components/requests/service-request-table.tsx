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
  import { Card, CardContent } from "../ui/card";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "../ui/button";
  import { MoreHorizontal, Loader2 } from "lucide-react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import type { ServiceRequest } from "@/lib/types";
  
  export function ServiceRequestTable() {
    const firestore = useFirestore();
    const serviceRequestsQuery = useMemoFirebase(() => query(collection(firestore, "serviceRequests")), [firestore]);
    const { data: serviceRequests, isLoading } = useCollection<ServiceRequest>(serviceRequestsQuery);

    const statusTranslations: { [key: string]: string } = {
        "Completed": "Completado",
        "In Progress": "En Progreso",
        "Pending": "Pendiente",
        "Cancelled": "Cancelado"
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>ID de Solicitud</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Detalles</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Conductor</TableHead>
                        <TableHead>
                        <span className="sr-only">Acciones</span>
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {serviceRequests && serviceRequests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.id.substring(0,7)}</TableCell>
                            <TableCell>{request.clientId}</TableCell>
                            <TableCell>
                                <div className="font-medium">{request.pickupLocation}</div>
                                <div className="text-sm text-muted-foreground">a {request.destination}</div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    className={cn(
                                        "text-xs",
                                        request.status === "Completed" && "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
                                        request.status === "In Progress" && "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
                                        request.status === "Pending" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
                                        request.status === "Cancelled" && "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
                                        "border-none"
                                    )}
                                    variant="outline"
                                >
                                    {statusTranslations[request.status]}
                                </Badge>
                            </TableCell>
                            <TableCell>{request.driverId ?? 'No Asignado'}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuItem>Asignar Conductor</DropdownMenuItem>
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
  }
  