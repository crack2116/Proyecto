"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFirestore } from "@/firebase";
import { addDocumentNonBlocking, setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Client } from "@/lib/types";
import { getSunatData } from "@/app/actions";
import { Loader2, Search } from "lucide-react";
import { toastMessages } from "@/lib/toast-messages";

const formSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio."),
  ruc: z.string().length(11, "El RUC debe tener 11 dígitos."),
  address: z.string().min(5, "La dirección es obligatoria."),
  contactName: z.string().min(2, "El nombre de contacto es obligatorio."),
  contactPhone: z.string().min(9, "El teléfono de contacto es obligatorio."),
  contactEmail: z.string().email("El correo electrónico no es válido."),
});

type ClientFormProps = {
    setOpen: (open: boolean) => void;
    editingClient: Client | null;
}

export function ClientForm({ setOpen, editingClient }: ClientFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isSearching, setIsSearching] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: editingClient || {
      name: "",
      ruc: "",
      address: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
    },
  });

  useEffect(() => {
    form.reset(editingClient || {
        name: "",
        ruc: "",
        address: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
    });
  }, [editingClient, form]);

  const handleRucSearch = async () => {
    const ruc = form.getValues("ruc");
    if (ruc.length !== 11) {
        toastMessages.client.error("Por favor, ingresa un RUC de 11 dígitos.");
        return;
    }
    
    setIsSearching(true);
    
    try {
        const result = await getSunatData(ruc);
        
        if (result.success && result.data) {
            form.setValue("name", result.data.razonSocial, { shouldValidate: true });
            form.setValue("address", result.data.direccion, { shouldValidate: true });
            toastMessages.success("Cliente Encontrado", `${result.data.razonSocial} - ${result.data.estado}`);
        } else {
            toastMessages.client.error(result.message || "No se pudo encontrar información del RUC. Verifica que sea correcto.");
        }
    } catch (error) {
        console.error("Error en búsqueda RUC:", error);
        toastMessages.client.error("Error de conexión. Por favor, intenta de nuevo o ingresa los datos manualmente.");
    } finally {
        setIsSearching(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        if (editingClient) {
            // Update existing client
            const clientDocRef = doc(firestore, "clients", editingClient.id);
            setDocumentNonBlocking(clientDocRef, values, { merge: true });
            toastMessages.client.updated();
        } else {
            // Add new client
            const clientsCollection = collection(firestore, "clients");
            addDocumentNonBlocking(clientsCollection, values);
            toastMessages.client.created();
        }
        
        form.reset();
        setOpen(false);
    } catch(error) {
        console.error("Error saving client: ", error);
        toastMessages.client.error("Ocurrió un error al guardar el cliente.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-2">
            <FormField
                control={form.control}
                name="ruc"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>RUC</FormLabel>
                    <FormControl>
                    <Input placeholder="Ej. 20123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="button" onClick={handleRucSearch} disabled={isSearching}>
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                <span className="ml-2">Buscar</span>
            </Button>
        </div>
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre o Razón Social</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Transportes del Norte S.A.C." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                    <Input placeholder="Ej. Av. Panamericana 123, Piura" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nombre de Contacto</FormLabel>
                <FormControl>
                    <Input placeholder="Ej. Juan Pérez" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Teléfono de Contacto</FormLabel>
                <FormControl>
                    <Input placeholder="Ej. 987654321" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email de Contacto</FormLabel>
                <FormControl>
                    <Input placeholder="Ej. contacto@empresa.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Guardando..." : "Guardar Cliente"}
        </Button>
      </form>
    </Form>
  );
}
