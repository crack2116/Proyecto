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

const formSchema = z.object({
  firstName: z.string().min(2, "El nombre es obligatorio."),
  lastName: z.string().min(2, "El apellido es obligatorio."),
  licenseNumber: z.string().min(5, "El número de licencia es obligatorio."),
  contactPhone: z.string().min(9, "El teléfono de contacto es obligatorio."),
});

export function DriverForm() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      licenseNumber: "",
      contactPhone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const driversCollection = collection(firestore, "drivers");
        await addDoc(driversCollection, values);
        
        toast({
            title: "Conductor Agregado",
            description: "El nuevo conductor ha sido registrado exitosamente.",
        });
        form.reset();
        // TODO: Close dialog after submission
    } catch(error) {
        console.error("Error adding driver: ", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Ocurrió un error al agregar el conductor.",
          });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                    <Input placeholder="Ej. Luis" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                    <Input placeholder="Ej. Gonzales" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <FormField
            control={form.control}
            name="licenseNumber"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Número de Licencia</FormLabel>
                <FormControl>
                    <Input placeholder="Ej. Q12345678" {...field} />
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
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Agregando..." : "Agregar Conductor"}
        </Button>
      </form>
    </Form>
  );
}
    