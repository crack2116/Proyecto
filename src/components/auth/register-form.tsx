"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth, useFirestore } from "@/firebase";
import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { getDniData } from "@/app/actions";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const formSchema = z.object({
  dni: z.string().min(8, {
    message: "El DNI debe tener 8 dígitos.",
  }).max(8, {
    message: "El DNI debe tener exactamente 8 dígitos.",
  }),
  nombres: z.string().min(2, {
    message: "Los nombres son obligatorios.",
  }),
  apellidoPaterno: z.string().min(2, {
    message: "El apellido paterno es obligatorio.",
  }),
  apellidoMaterno: z.string().min(2, {
    message: "El apellido materno es obligatorio.",
  }),
  fechaNacimiento: z.string().min(1, {
    message: "La fecha de nacimiento es obligatoria.",
  }).refine((val) => {
    const fecha = new Date(val);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fecha.getFullYear();
    return edad >= 18 && edad <= 100;
  }, {
    message: "Debes ser mayor de 18 años y menor de 100 años.",
  }),
  direccion: z.string().min(10, {
    message: "La dirección debe tener al menos 10 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
  role: z.enum(["administrator", "assistant"], {
    required_error: "Debes seleccionar un rol.",
  }),
});

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const [isSearchingDni, setIsSearchingDni] = useState(false);
  const [edadCalculada, setEdadCalculada] = useState<number | null>(null);

  // Función para calcular edad desde fecha de nacimiento
  const calcularEdad = (fechaNacimiento: string) => {
    if (!fechaNacimiento) {
      setEdadCalculada(null);
      return;
    }
    
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    
    // Ajustar si aún no ha cumplido años este año
    const mesActual = hoy.getMonth();
    const mesNacimiento = nacimiento.getMonth();
    const diaActual = hoy.getDate();
    const diaNacimiento = nacimiento.getDate();
    
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--;
    }
    
    setEdadCalculada(edad);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dni: "",
      nombres: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      fechaNacimiento: "",
      direccion: "",
      email: "",
      password: "",
    },
  });

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
          form.setValue("nombres", result.data.nombres);
          form.setValue("apellidoPaterno", result.data.apellidoPaterno);
          form.setValue("apellidoMaterno", result.data.apellidoMaterno);
          
          // Llenar edad si está disponible
          if (result.data.edad) {
            form.setValue("edad", result.data.edad);
          }
          
          // Llenar dirección si está disponible
          if (result.data.direccion) {
            form.setValue("direccion", result.data.direccion);
          }
          
          const camposCompletados = [];
          if (result.data.edad) camposCompletados.push("edad");
          if (result.data.direccion) camposCompletados.push("dirección");
          
          const mensajeExtra = camposCompletados.length > 0 
            ? ` También se completó: ${camposCompletados.join(", ")}.`
            : " Por favor, completa manualmente la edad y dirección.";
          
          toast({
            title: "✅ Datos Encontrados",
            description: `Datos cargados para: ${result.data.nombresCompletos}.${mensajeExtra}`,
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      const userDocRef = doc(firestore, "users", user.uid);
      setDocumentNonBlocking(userDocRef, {
        id: user.uid,
        username: user.email,
        dni: values.dni,
        nombres: values.nombres,
        apellidoPaterno: values.apellidoPaterno,
        apellidoMaterno: values.apellidoMaterno,
        nombresCompletos: `${values.nombres} ${values.apellidoPaterno} ${values.apellidoMaterno}`.trim(),
        fechaNacimiento: values.fechaNacimiento,
        edad: new Date().getFullYear() - new Date(values.fechaNacimiento).getFullYear(),
        direccion: values.direccion,
        role: values.role,
        fechaRegistro: new Date().toISOString(),
      }, {});

      if (values.role === 'administrator') {
        const adminRoleRef = doc(firestore, "roles_admin", user.uid);
        setDocumentNonBlocking(adminRoleRef, {
          id: user.uid,
          username: user.email,
          role: 'administrator',
        }, {});
      }

      toast({
        title: "Cuenta Creada Exitosamente",
        description: "¡Bienvenido! Serás redirigido a tu panel de control.",
      });
      router.push("/dashboard");

    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      let errorMessage = "Ocurrió un error al registrar la cuenta.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo electrónico ya está en uso.';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es demasiado débil.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El formato del correo electrónico no es válido.';
          break;
        default:
          errorMessage = 'Error de registro. Por favor, intenta de nuevo.';
          break;
      }
      toast({
        variant: "destructive",
        title: "Error de Registro",
        description: errorMessage,
      });
    }
  }

  return (
    <div className="space-y-6">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            
            {/* Nombres Field */}
            <FormField
            control={form.control}
            name="nombres"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-sm font-medium">Nombres</FormLabel>
                <FormControl>
                    <Input 
                      placeholder="Ej. Juan Carlos" 
                      className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                      {...field} 
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            {/* Apellido Paterno Field */}
            <FormField
            control={form.control}
            name="apellidoPaterno"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-sm font-medium">Apellido Paterno</FormLabel>
                <FormControl>
                    <Input 
                      placeholder="Ej. Pérez" 
                      className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                      {...field} 
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            {/* Apellido Materno Field */}
            <FormField
            control={form.control}
            name="apellidoMaterno"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-sm font-medium">Apellido Materno</FormLabel>
                <FormControl>
                    <Input 
                      placeholder="Ej. González" 
                      className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                      {...field} 
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            {/* Fecha de Nacimiento Field */}
            <FormField
            control={form.control}
            name="fechaNacimiento"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-sm font-medium">Fecha de Nacimiento</FormLabel>
                <FormControl>
                    <Input 
                      type="date"
                      className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        calcularEdad(e.target.value);
                      }}
                    />
                </FormControl>
                {edadCalculada && (
                  <p className="text-sm text-muted-foreground">
                    Edad calculada: {edadCalculada} años
                  </p>
                )}
                <FormMessage />
                </FormItem>
            )}
            />
            
            {/* Dirección Field */}
            <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-sm font-medium">Dirección</FormLabel>
                <FormControl>
                    <Input 
                      placeholder="Ej. Av. Principal 123, Lima, Perú" 
                      className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                      {...field} 
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            {/* Email Field */}
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-sm font-medium">Correo Electrónico</FormLabel>
                <FormControl>
                    <Input 
                      placeholder="usuario@mewing.com" 
                      className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                      {...field} 
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            {/* Password Field */}
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-sm font-medium">Contraseña</FormLabel>
                <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors" 
                      {...field} 
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            {/* Role Field */}
            <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-sm font-medium">Rol</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors">
                        <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="administrator">Administrador</SelectItem>
                    <SelectItem value="assistant">Asistente</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            
            <Button 
              type="submit" 
              className="w-full h-11 gradient-primary hover:opacity-90 text-primary-foreground font-medium transition-all duration-200 hover-lift" 
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creando Cuenta...</span>
                </div>
              ) : (
                "Crear Cuenta"
              )}
            </Button>
        </form>
        </Form>
    </div>
  );
}
