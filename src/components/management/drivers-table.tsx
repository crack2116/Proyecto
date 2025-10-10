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
  import type { Driver } from "@/lib/types";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { DriverForm } from "./driver-form";
  
  export function DriversTable() {
    const firestore = useFirestore();
    const driversQuery = useMemoFirebase(() => query(collection(firestore, "drivers")), [firestore]);
    const { data: drivers, isLoading } = useCollection<Driver>(driversQuery);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Conductores</CardTitle>
                    <CardDescription>Lista de todos los conductores registrados.</CardDescription>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Agregar Conductor
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle className="font-headline text-2xl">Agregar Nuevo Conductor</DialogTitle>
                            <DialogDescription>
                                Completa los detalles para registrar un nuevo conductor.
                            </DialogDescription>
                        </DialogHeader>
                        <DriverForm />
                    </DialogContent>
                </Dialog>
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
                            <TableHead>Nombre</TableHead>
                            <TableHead>N° de Licencia</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>
                            <span className="sr-only">Acciones</span>
                            </TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {drivers?.map((driver) => (
                            <TableRow key={driver.id}>
                                <TableCell className="font-medium">{driver.firstName} {driver.lastName}</TableCell>
                                <TableCell>{driver.licenseNumber}</TableCell>
                                <TableCell>{driver.contactPhone}</TableCell>
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
    