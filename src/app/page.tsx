import Image from 'next/image';
import { Truck } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegisterForm } from '@/components/auth/register-form';

export default function LoginPage() {
  const loginImage = PlaceHolderImages.find(p => p.id === 'login-background');

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Truck className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold font-headline">Mewing Transport</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Accede a tu cuenta o regístrate para gestionar tus servicios de transporte.
            </p>
          </div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Crear Cuenta</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <LoginForm />
            </TabsContent>
            <TabsContent value="register">
                <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {loginImage && (
             <Image
                src={loginImage.imageUrl}
                alt={loginImage.description}
                fill
                className="object-cover"
                data-ai-hint={loginImage.imageHint}
             />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-10 left-10 text-white">
            <h2 className="font-headline text-4xl font-bold">Confiable. Eficiente. a Tiempo.</h2>
            <p className="mt-2 text-lg">Tu solución completa de gestión de transporte.</p>
        </div>
      </div>
    </div>
  );
}
