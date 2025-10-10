"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth, useFirestore } from "@/firebase";

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      const userDocRef = doc(firestore, "users", user.uid);
      setDocumentNonBlocking(userDocRef, {
        id: user.uid,
        username: user.email,
        role: values.role,
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
    <div className="grid gap-6">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                    <Input placeholder="usuario@mewing.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
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
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creando Cuenta..." : "Crear Cuenta"}
            </Button>
        </form>
        </Form>
    </div>
  );
}
