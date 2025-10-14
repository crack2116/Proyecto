"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Loader2, Search, CheckCircle, XCircle, AlertTriangle, HelpCircle } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { addDocumentNonBlocking, setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Driver } from "@/lib/types";
import { useEffect } from "react";
import { getDniData, verifyLicenseStatus } from "@/app/actions";

const formSchema = z.object({
  dni: z.string().min(8, {
    message: "El DNI debe tener 8 dígitos.",
  }).max(8, {
    message: "El DNI debe tener exactamente 8 dígitos.",
  }),
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
  const [isSearchingDni, setIsSearchingDni] = useState(false);
  const [isVerifyingLicense, setIsVerifyingLicense] = useState(false);
  const [licenseStatus, setLicenseStatus] = useState<'active' | 'expired' | 'suspended' | 'unknown' | null>(null);
  const [licenseDetails, setLicenseDetails] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: editingDriver || {
      dni: "",
      firstName: "",
      lastName: "",
      licenseNumber: "",
      contactPhone: "",
    },
  });

  useEffect(() => {
    form.reset(editingDriver || {
        dni: "",
        firstName: "",
        lastName: "",
        licenseNumber: "",
        contactPhone: "",
    });
    setLicenseStatus(null);
    setLicenseDetails(null);
  }, [editingDriver, form]);

  const handleDniSearch = async () => {
    const dni = form.getValues("dni");
    if (!dni || dni.length !== 8) {
      toast({
        variant: "destructive",
        title: "⚠️ DNI Inválido",
        description: "El DNI debe tener exactamente 8 dígitos.",
      });
      return;
    }

    setIsSearchingDni(true);
    try {
      const result = await getDniData(dni);
      if (result.success && result.data) {
        form.setValue("firstName", result.data.nombres);
        form.setValue("lastName", `${result.data.apellidoPaterno} ${result.data.apellidoMaterno}`.trim());
        
        toast({
          title: "✅ Datos Encontrados",
          description: `Datos cargados para: ${result.data.nombresCompletos}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "⚠️ Error en la Búsqueda",
          description: result.message || "No se pudo encontrar información del DNI. Verifica que sea correcto.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Error de Conexión",
        description: "Error de conexión. Por favor, intenta de nuevo o ingresa los datos manualmente.",
      });
    } finally {
      setIsSearchingDni(false);
    }
  };

  const handleLicenseVerification = async () => {
    const licenseNumber = form.getValues("licenseNumber");
    if (!licenseNumber || licenseNumber.length < 5) {
      toast({
        variant: "destructive",
        title: "⚠️ Licencia Inválida",
        description: "El número de licencia debe tener al menos 5 caracteres.",
      });
      return;
    }

    setIsVerifyingLicense(true);
    try {
      const result = await verifyLicenseStatus(licenseNumber);
      if (result.success && result.status) {
        setLicenseStatus(result.status);
        setLicenseDetails(result.details);
        
        const statusMessages = {
          active: "✅ Licencia Activa",
          expired: "❌ Licencia Vencida",
          suspended: "⚠️ Licencia Suspendida",
          unknown: "❓ Estado Desconocido"
        };
        
        toast({
          title: statusMessages[result.status],
          description: result.details ? `Categoría: ${result.details.category} | Vence: ${result.details.expirationDate}` : "Verificación completada",
        });
      } else {
        toast({
          variant: "destructive",
          title: "⚠️ Error en la Verificación",
          description: result.message || "No se pudo verificar el estado de la licencia.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Error de Conexión",
        description: "Error de conexión. Por favor, intenta de nuevo.",
      });
    } finally {
      setIsVerifyingLicense(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const driverData = {
          ...values,
          licenseStatus: licenseStatus || 'unknown',
          fechaRegistro: new Date().toISOString(),
        };

        if (editingDriver) {
            const driverDocRef = doc(firestore, "drivers", editingDriver.id);
            setDocumentNonBlocking(driverDocRef, driverData, { merge: true });
            toast({
                title: "Conductor Actualizado",
                description: "Los datos del conductor han sido actualizados.",
            });
        } else {
            const driversCollection = collection(firestore, "drivers");
            addDocumentNonBlocking(driversCollection, driverData);
            toast({
                title: "Conductor Agregado",
                description: "El nuevo conductor ha sido registrado exitosamente.",
            });
        }
        form.reset();
        setLicenseStatus(null);
        setLicenseDetails(null);
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
        {/* DNI Field with Search Button */}
        <FormField
          control={form.control}
          name="dni"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">DNI</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input 
                    placeholder="12345678" 
                    className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                    {...field} 
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={handleDniSearch}
                  disabled={isSearchingDni || !field.value || field.value.length !== 8}
                  className="h-11 px-4 gradient-primary hover:opacity-90 text-primary-foreground font-medium transition-all duration-200"
                >
                  {isSearchingDni ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Nombres</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ej. Luis" 
                    className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                    {...field} 
                  />
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
                <FormLabel className="text-sm font-medium">Apellidos</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ej. Gonzales" 
                    className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* License Number Field with Verification */}
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Número de Licencia</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input 
                    placeholder="Ej. Q12345678" 
                    className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                    {...field} 
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={handleLicenseVerification}
                  disabled={isVerifyingLicense || !field.value || field.value.length < 5}
                  className="h-11 px-4 gradient-primary hover:opacity-90 text-primary-foreground font-medium transition-all duration-200"
                >
                  {isVerifyingLicense ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* License Status Display */}
              {licenseStatus && (
                <div className="mt-2 flex items-center gap-2">
                  {licenseStatus === 'active' && (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        Licencia Activa
                      </Badge>
                    </>
                  )}
                  {licenseStatus === 'expired' && (
                    <>
                      <XCircle className="h-4 w-4 text-red-600" />
                      <Badge variant="outline" className="text-red-600 border-red-200">
                        Licencia Vencida
                      </Badge>
                    </>
                  )}
                  {licenseStatus === 'suspended' && (
                    <>
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                        Licencia Suspendida
                      </Badge>
                    </>
                  )}
                  {licenseStatus === 'unknown' && (
                    <>
                      <HelpCircle className="h-4 w-4 text-gray-600" />
                      <Badge variant="outline" className="text-gray-600 border-gray-200">
                        Estado Desconocido
                      </Badge>
                    </>
                  )}
                  {licenseDetails && (
                    <span className="text-xs text-muted-foreground">
                      Categoría: {licenseDetails.category} | Vence: {licenseDetails.expirationDate}
                    </span>
                  )}
                </div>
              )}
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Teléfono de Contacto</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ej. 987654321" 
                  className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full h-11 gradient-primary hover:opacity-90 text-primary-foreground font-medium transition-all duration-200 hover-lift mt-4" 
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Guardando...</span>
            </div>
          ) : (
            "Guardar Conductor"
          )}
        </Button>
      </form>
    </Form>
  );
}