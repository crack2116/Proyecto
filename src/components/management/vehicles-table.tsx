"use client";
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
  import { collection, query } from "firebase/firestore";
  import type { Vehicle } from "@/lib/types";
  
  export function VehiclesTable() {
    const firestore = useFirestore();
    const vehiclesQuery = useMemoFirebase(() => query(collection(firestore, "vehicles")), [firestore]);
    const { data: vehicles, isLoading } = useCollection<Vehicle>(vehiclesQuery);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Vehículos</CardTitle>
                    <CardDescription>Lista de todos los vehículos registrados.</CardDescription>
                </div>
                <Button>
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
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                )}
            </CardContent>
        </Card>
    );
  }
  