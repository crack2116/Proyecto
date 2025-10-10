"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useFirestore } from "@/firebase";
import { collection, serverTimestamp, doc, addDoc } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const formSchema = z.object({
  pickupLocation: z.string().min(1, "La ubicación de recogida es obligatoria"),
  destination: z.string().min(1, "El destino es obligatorio"),
  serviceDate: z.date({ required_error: "Se requiere una fecha." }),
  clientId: z.string().min(1, "El cliente es obligatorio"), // Assuming client is selected, for now a string
  specialRequirements: z.string().optional(),
});

type RequestFormProps = {
    setOpen: (open: boolean) => void;
};

export function RequestForm({ setOpen }: RequestFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: "",
      destination: "",
      specialRequirements: "",
      clientId: "Test Client", // Placeholder
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const serviceRequestsCollection = collection(firestore, "serviceRequests");
        addDocumentNonBlocking(serviceRequestsCollection, {
            ...values,
            serviceDate: values.serviceDate.toISOString(),
            requestDate: new Date().toISOString(),
            status: 'Pending'
        });

        toast({
            title: "Solicitud Enviada",
            description: "Tu nueva solicitud de servicio ha sido creada exitosamente.",
        });
        form.reset();
        setOpen(false);

    } catch (error) {
        console.error("Error creating service request:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Ocurrió un error al crear la solicitud.",
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="pickupLocation"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Ubicación de Recogida</FormLabel>
                <FormControl>
                    <Input placeholder="ej., Calle Principal 123, Piura" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Destino</FormLabel>
                <FormControl>
                    <Input placeholder="ej., Av. Mercado 456, Sullana" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="serviceDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha del Servicio</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0,0,0,0))
                    }
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Cliente</FormLabel>
                <FormControl>
                    {/* This should be a select component later */}
                    <Input placeholder="ID de cliente" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
            control={form.control}
            name="specialRequirements"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Requerimientos Especiales</FormLabel>
                <FormControl>
                    <Textarea placeholder="ej., Artículos frágiles, requiere refrigeración" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Enviando..." : "Enviar Solicitud"}
        </Button>
      </form>
    </Form>
  );
}