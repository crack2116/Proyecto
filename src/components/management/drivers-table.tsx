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
  import { useDoc } from "@/firebase";
  import type { Driver } from "@/lib/types";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { DriverForm } from "./driver-form";
  import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
  import { deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates";
  import { useToast } from "@/hooks/use-toast";
  import { doc } from "firebase/firestore";
  
  export function DriversTable() {
    const { toast } = useToast();
    const { data: drivers, isLoading } = useDoc<Driver>('drivers');

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editingDriver, setEditingDriver] = React.useState<Driver | null>(null);

    const handleEdit = (driver: Driver) => {
        setEditingDriver(driver);
        setDialogOpen(true);
    };

    const handleAddNew = () => {
        setEditingDriver(null);
        setDialogOpen(true);
    };

    const handleDelete = (driverId: string) => {
        // Implementar eliminación
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Conductores</CardTitle>
                    <CardDescription>Lista de todos los conductores registrados.</CardDescription>
                </div>
                <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Conductor
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
                                        <DropdownMenuItem onClick={() => handleEdit(driver)}>Editar</DropdownMenuItem>
                                        <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">Eliminar</DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción no se puede deshacer. Esto eliminará permanentemente al conductor.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(driver.id)} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
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
                        <DialogTitle className="font-headline text-2xl">{editingDriver ? "Editar Conductor" : "Agregar Nuevo Conductor"}</DialogTitle>
                        <DialogDescription>
                            {editingDriver ? "Actualiza los detalles del conductor." : "Completa los detalles para registrar un nuevo conductor."}
                        </DialogDescription>
                    </DialogHeader>
                    <DriverForm setOpen={setDialogOpen} editingDriver={editingDriver} />
                </DialogContent>
            </Dialog>
        </Card>
    );
  }
