"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { collection, addDoc } from "firebase/firestore";

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
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const formSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio."),
  ruc: z.string().length(11, "El RUC debe tener 11 dígitos."),
  address: z.string().min(5, "La dirección es obligatoria."),
  contactName: z.string().min(2, "El nombre de contacto es obligatorio."),
  contactPhone: z.string().min(9, "El teléfono de contacto es obligatorio."),
  contactEmail: z.string().email("El correo electrónico no es válido."),
});

export function ClientForm() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ruc: "",
      address: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const clientsCollection = collection(firestore, "clients");
        await addDoc(clientsCollection, values);
        
        toast({
            title: "Cliente Agregado",
            description: "El nuevo cliente ha sido registrado exitosamente.",
        });
        form.reset();
        // TODO: Close dialog after submission
    } catch(error) {
        console.error("Error adding client: ", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Ocurrió un error al agregar el cliente.",
          });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Transportes del Norte S.A.C." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
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
          {form.formState.isSubmitting ? "Agregando..." : "Agregar Cliente"}
        </Button>
      </form>
    </Form>
  );
}
    