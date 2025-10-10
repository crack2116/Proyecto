"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

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
import { addDocumentNonBlocking, setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Driver } from "@/lib/types";
import { useEffect } from "react";

const formSchema = z.object({
  firstName: z.string().min(2, "El nombre es obligatorio."),
  lastName: z.string().min(2, "El apellido es obligatorio."),
  licenseNumber: z.string().min(5, "El número de licencia es obligatorio."),
  contactPhone: z.string().min(9, "El teléfono de contacto es obligatorio."),
});

type DriverFormProps = {
    setOpen: (open: boolean) => void;
    editingDriver: Driver | null;
}

export function DriverForm({ setOpen, editingDriver }: DriverFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: editingDriver || {
      firstName: "",
      lastName: "",
      licenseNumber: "",
      contactPhone: "",
    },
  });

  useEffect(() => {
    form.reset(editingDriver || {
        firstName: "",
        lastName: "",
        licenseNumber: "",
        contactPhone: "",
    });
  }, [editingDriver, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        if (editingDriver) {
            const driverDocRef = doc(firestore, "drivers", editingDriver.id);
            setDocumentNonBlocking(driverDocRef, values, { merge: true });
            toast({
                title: "Conductor Actualizado",
                description: "Los datos del conductor han sido actualizados.",
            });
        } else {
            const driversCollection = collection(firestore, "drivers");
            addDocumentNonBlocking(driversCollection, values);
            toast({
                title: "Conductor Agregado",
                description: "El nuevo conductor ha sido registrado exitosamente.",
            });
        }
        form.reset();
        setOpen(false);
    } catch(error) {
        console.error("Error saving driver: ", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Ocurrió un error al guardar el conductor.",
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
            {form.formState.isSubmitting ? "Guardando..." : "Guardar Conductor"}
        </Button>
      </form>
    </Form>
  );
}