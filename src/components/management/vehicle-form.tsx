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
  licensePlate: z.string().min(6, "La placa es obligatoria.").max(7, "La placa no debe exceder los 7 caracteres."),
  make: z.string().min(2, "La marca es obligatoria."),
  model: z.string().min(1, "El modelo es obligatorio."),
  vehicleType: z.string().min(3, "El tipo de vehículo es obligatorio."),
});

export function VehicleForm() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensePlate: "",
      make: "",
      model: "",
      vehicleType: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const vehiclesCollection = collection(firestore, "vehicles");
        await addDoc(vehiclesCollection, { ...values, driverId: null });
        
        toast({
            title: "Vehículo Agregado",
            description: "El nuevo vehículo ha sido registrado exitosamente.",
        });
        form.reset();
        // TODO: Close dialog after submission
    } catch(error) {
        console.error("Error adding vehicle: ", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Ocurrió un error al agregar el vehículo.",
          });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Placa del Vehículo</FormLabel>
                <FormControl>
                <Input placeholder="Ej. ABC-123" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                    <Input placeholder="Ej. Volvo" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                    <Input placeholder="Ej. FH" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <FormField
            control={form.control}
            name="vehicleType"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Tipo de Vehículo</FormLabel>
                <FormControl>
                    <Input placeholder="Ej. Camión, Furgoneta" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Agregando..." : "Agregar Vehículo"}
        </Button>
      </form>
    </Form>
  );
}
    