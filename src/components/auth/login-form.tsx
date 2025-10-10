"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/firebase";

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
import { Separator } from "../ui/separator";

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
});

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
        {...props}
      >
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        />
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.355-11.297-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z"
        />
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.245,44,30.028,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        />
      </svg>
    )
  }

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleAuthError = (error: any) => {
    console.error("Firebase Auth Error:", error);
    let errorMessage = "Ocurrió un error al intentar iniciar sesión.";
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = 'El correo electrónico o la contraseña son incorrectos.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'El formato del correo electrónico no es válido.';
        break;
      case 'auth/invalid-credential':
          errorMessage = 'Las credenciales proporcionadas son inválidas.';
          break;
      case 'auth/popup-closed-by-user':
          errorMessage = 'Se cerró la ventana de inicio de sesión. Por favor, intenta de nuevo.';
          break;
      default:
        errorMessage = 'Error de autenticación. Por favor, intenta de nuevo.';
        break;
    }
    toast({
      variant: "destructive",
      title: "Error de Autenticación",
      description: errorMessage,
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Inicio de Sesión Exitoso",
        description: "¡Bienvenido de nuevo!",
      });
      router.push("/dashboard");
    } catch (error: any) {
        handleAuthError(error);
    }
  }

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        toast({
            title: "Inicio de Sesión Exitoso",
            description: "¡Bienvenido!",
          });
        router.push('/dashboard');
    } catch (error) {
        handleAuthError(error);
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
                    <Input placeholder="admin@mewing.com" {...field} />
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
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
            </Button>
        </form>
        </Form>
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">O continúa con</span>
            </div>
        </div>
        <Button variant="outline" onClick={handleGoogleSignIn}>
            <GoogleIcon className="mr-2 h-4 w-4" />
            Google
        </Button>
    </div>
  );
}
