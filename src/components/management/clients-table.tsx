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
  import type { Client } from "@/lib/types";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ClientForm } from "./client-form";

  
  export function ClientsTable() {
    const firestore = useFirestore();
    const clientsQuery = useMemoFirebase(() => query(collection(firestore, "clients")), [firestore]);
    const { data: clients, isLoading } = useCollection<Client>(clientsQuery);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Clientes</CardTitle>
                    <CardDescription>Lista de todos los clientes registrados.</CardDescription>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Agregar Cliente
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                            <DialogTitle className="font-headline text-2xl">Agregar Nuevo Cliente</DialogTitle>
                            <DialogDescription>
                                Completa los detalles para registrar un nuevo cliente.
                            </DialogDescription>
                        </DialogHeader>
                        <ClientForm />
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
                        <TableHead>RUC</TableHead>
                        <TableHead>Contacto</TableHead>
                        <TableHead>Dirección</TableHead>
                        <TableHead>
                            <span className="sr-only">Acciones</span>
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {clients?.map((client) => (
                        <TableRow key={client.id}>
                            <TableCell className="font-medium">{client.name}</TableCell>
                            <TableCell>{client.ruc}</TableCell>
                            <TableCell>
                                <div className="font-medium">{client.contactName}</div>
                                <div className="text-sm text-muted-foreground">{client.contactEmail}</div>
                            </TableCell>
                            <TableCell>{client.address}</TableCell>
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
    