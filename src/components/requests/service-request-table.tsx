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
  import { MoreHorizontal, Loader2, AlertCircle, Copy, UserPlus, Edit, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import type { ServiceRequest } from "@/lib/types";
import { 
  updateRequestStatus, 
  assignDriverToRequest, 
  cancelRequest, 
  deleteRequest 
} from "@/lib/firebase-service-requests";
import { collection, query } from "firebase/firestore";
  
  export function ServiceRequestTable() {
    const { toast } = useToast();
    const firestore = useFirestore();

    const serviceRequestsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'serviceRequests'));
    }, [firestore]);

    const { data: serviceRequests, isLoading, error } = useDoc<ServiceRequest>(serviceRequestsQuery);

    const statusTranslations: { [key: string]: string } = {
        "Completed": "Completado",
        "In Progress": "En Progreso",
        "Pending": "Pendiente",
        "Assigned": "Asignado",
        "Cancelled": "Cancelado"
    }

    const getStatusBadge = (status: string | undefined) => {
        if (!status) return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300 border-none text-xs">Sin estado</Badge>;
        
        const translatedStatus = statusTranslations[status] || status;
        
        const statusClass = status === "Completed" 
            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
            : status === "In Progress" 
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
            : status === "Assigned"
            ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
            : status === "Pending"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
            : status === "Cancelled"
            ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
            : "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300";
            
        return (
            <Badge className={cn(statusClass, "border-none text-xs")} variant="outline">
                {translatedStatus}
            </Badge>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-destructive mb-2">
                                Error al Cargar Solicitudes
                            </h3>
                            <p className="text-destructive-foreground">
                                No se pudieron cargar las solicitudes de servicio. Por favor, intenta de nuevo más tarde.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                </CardContent>
            </Card>
        );
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
                    {serviceRequests && serviceRequests.length > 0 ? (
                        serviceRequests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.id.substring(0,7)}</TableCell>
                            <TableCell>{request.clientId}</TableCell>
                            <TableCell>
                                <div className="font-medium">{request.pickupLocation}</div>
                                <div className="text-sm text-muted-foreground">a {request.destination}</div>
                            </TableCell>
                            <TableCell>
                                {getStatusBadge(request.status)}
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
                                    <DropdownMenuItem 
                                        onClick={async () => {
                                            // Implementar la asignación de conductor
                                        }}
                                    >
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Asignar Conductor
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onClick={() => {
                                            toast({
                                                title: "Editar solicitud",
                                                description: `Funcionalidad de edición para solicitud ${request.id}`,
                                            });
                                        }}
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onClick={async () => {
                                            try {
                                                await navigator.clipboard.writeText(request.id);
                                                toast({
                                                    title: "ID copiado",
                                                    description: `ID de solicitud copiado al portapapeles`,
                                                });
                                            } catch (err) {
                                                toast({
                                                    title: "Error",
                                                    description: "No se pudo copiar el ID",
                                                    variant: "destructive",
                                                });
                                            }
                                        }}
                                    >
                                        <Copy className="mr-2 h-4 w-4" />
                                        Copiar ID
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onClick={async () => {
                                            // Implementar la cancelación
                                        }}
                                        className="text-destructive"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Cancelar
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                                <div className="text-center">
                                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                                        No hay solicitudes disponibles
                                    </h3>
                                    <p className="text-muted-foreground">
                                        No se encontraron solicitudes de servicio para mostrar.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
  }
