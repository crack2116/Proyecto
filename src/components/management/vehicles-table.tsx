"use client";
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "../ui/button";
  import { MoreHorizontal, PlusCircle, Loader2 } from "lucide-react";
  import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
  import { collection, query, doc } from "firebase/firestore";
  import type { Vehicle } from "@/lib/types";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { VehicleForm } from "./vehicle-form";
  import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
  import { deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates";
  import { useToast } from "@/hooks/use-toast";
  import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
  
  export function VehiclesTable() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const vehiclesQuery = useMemoFirebase(() => query(collection(firestore, "vehicles")), [firestore]);
    const { data: vehicles, isLoading } = useCollection<Vehicle>(vehiclesQuery);

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editingVehicle, setEditingVehicle] = React.useState<Vehicle | null>(null);

    const handleEdit = (vehicle: Vehicle) => {
        setEditingVehicle(vehicle);
        setDialogOpen(true);
    };

    const handleAddNew = () => {
        setEditingVehicle(null);
        setDialogOpen(true);
    };

    const handleDelete = (vehicleId: string) => {
        if (!firestore) {
            toast({ variant: "destructive", title: "Error", description: "Firestore no está disponible." });
            return;
        }
        const docRef = doc(firestore, "vehicles", vehicleId);
        deleteDocumentNonBlocking(docRef);
        toast({
            title: "Vehículo Eliminado",
            description: "El vehículo ha sido eliminado exitosamente.",
        });
    }

    const getStatusBadge = (status: string | undefined) => {
        if (!status) return <Badge className="bg-gray-500/20 text-gray-700 border-none">Sin estado</Badge>;
        
        const statusClass = status === "Disponible" 
            ? "bg-green-500/20 text-green-700"
            : status === "En Tránsito" 
            ? "bg-blue-500/20 text-blue-700"
            : status === "En Mantenimiento"
            ? "bg-amber-500/20 text-amber-700"
            : "bg-gray-500/20 text-gray-700";
            
        return (
            <Badge className={cn(statusClass, "border-none")}>
                {status}
            </Badge>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Vehículos</CardTitle>
                    <CardDescription>Lista de todos los vehículos registrados.</CardDescription>
                </div>
                <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Vehículo
                </Button>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                     <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Placa</TableHead>
                        <TableHead>Marca y Modelo</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Conductor Asignado</TableHead>
                        <TableHead>
                        <span className="sr-only">Acciones</span>
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {vehicles?.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                            <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
                            <TableCell>{vehicle.make} {vehicle.model}</TableCell>
                            <TableCell>{vehicle.vehicleType}</TableCell>
                            <TableCell>{getStatusBadge((vehicle as any).status)}</TableCell>
                            <TableCell>{vehicle.driverId ?? "No asignado"}</TableCell>
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
                                    <DropdownMenuItem onClick={() => handleEdit(vehicle)}>Editar</DropdownMenuItem>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">Eliminar</DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción no se puede deshacer. Esto eliminará permanentemente el vehículo.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(vehicle.id)} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                )}
            </CardContent>
             <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">{editingVehicle ? "Editar Vehículo" : "Agregar Nuevo Vehículo"}</DialogTitle>
                        <DialogDescription>
                           {editingVehicle ? "Actualiza los detalles del vehículo." : "Completa los detalles para registrar un nuevo vehículo."}
                        </DialogDescription>
                    </DialogHeader>
                    <VehicleForm setOpen={setDialogOpen} editingVehicle={editingVehicle} />
                </DialogContent>
            </Dialog>
        </Card>
    );
  }
