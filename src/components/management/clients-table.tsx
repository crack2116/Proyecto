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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";
import { useTableState } from "@/hooks/use-table-state";
import { TableFilters } from "@/components/ui/table-filters";
import { TablePagination } from "@/components/ui/table-pagination";
import { Protected } from "@/components/permissions/protected";
import { usePermissions } from "@/hooks/use-permissions";

  
  export function ClientsTable() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const { canCreate, canUpdate, canDelete } = usePermissions();
    const clientsQuery = useMemoFirebase(() => query(collection(firestore, "clients")), [firestore]);
    const { data: clients = [], isLoading } = useCollection<Client>(clientsQuery);
    
    // Hook para filtros y paginación
    const {
      paginatedData,
      totalPages,
      searchQuery,
      handleSearchChange,
      handlePageChange,
      handleItemsPerPageChange,
      totalItems,
      currentPage,
      itemsPerPage,
    } = useTableState<Client>({
      data: clients ?? [], // Asegurarse de que siempre sea un array
      searchFields: ["name", "ruc", "contactName", "contactEmail", "address"],
    });
    
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editingClient, setEditingClient] = React.useState<Client | null>(null);

    const handleEdit = (client: Client) => {
        setEditingClient(client);
        setDialogOpen(true);
    };

    const handleAddNew = () => {
        setEditingClient(null);
        setDialogOpen(true);
    };

    const handleDelete = (clientId: string) => {
        const docRef = doc(firestore, "clients", clientId);
        deleteDocumentNonBlocking(docRef);
        toast({
            title: "Cliente Eliminado",
            description: "El cliente ha sido eliminado exitosamente.",
        });
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Clientes</CardTitle>
                    <CardDescription>Lista de todos los clientes registrados.</CardDescription>
                </div>
                <Protected permission="clients:create">
                    <Button onClick={handleAddNew}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Agregar Cliente
                    </Button>
                </Protected>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                     <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                <>
                    <TableFilters
                        searchPlaceholder="Buscar por nombre, RUC, contacto o dirección..."
                        onSearchChange={handleSearchChange}
                        searchValue={searchQuery}
                    />
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
                    {paginatedData?.map((client) => (
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
                                    <Protected permission="clients:update">
                                        <DropdownMenuItem onClick={() => handleEdit(client)}>Editar</DropdownMenuItem>
                                    </Protected>
                                    <Protected permission="clients:delete">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">Eliminar</DropdownMenuItem>
                                            </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción no se puede deshacer. Esto eliminará permanentemente al cliente.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(client.id)} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </Protected>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
                </>
                )}
            </CardContent>
             <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">{editingClient ? "Editar Cliente" : "Agregar Nuevo Cliente"}</DialogTitle>
                        <DialogDescription>
                            {editingClient ? "Actualiza los detalles del cliente." : "Completa los detalles para registrar un nuevo cliente."}
                        </DialogDescription>
                    </DialogHeader>
                    <ClientForm setOpen={setDialogOpen} editingClient={editingClient} />
                </DialogContent>
            </Dialog>
        </Card>
    );
  }