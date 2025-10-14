import Image from 'next/image';
import { Truck, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegisterForm } from '@/components/auth/register-form';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  const loginImage = PlaceHolderImages.find(p => p.id === 'login-background');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-lime-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative flex min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8 animate-fade-in">
            {/* Logo and Title */}
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl gradient-vibrant shadow-lg">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl font-bold font-headline gradient-vibrant bg-clip-text text-transparent">
                    Mewing Transport
                  </h1>
                  <p className="text-sm text-muted-foreground font-medium">Gestión Creativa</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold font-headline text-foreground">
                  ¡Bienvenido de vuelta!
                </h2>
                <p className="text-muted-foreground">
                  Accede a tu panel de control para gestionar tus servicios de transporte.
                </p>
              </div>
            </div>

            {/* Login/Register Tabs */}
            <Card className="shadow-modern-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50">
                    <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Iniciar Sesión
                    </TabsTrigger>
                    <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Crear Cuenta
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-4">
                    <LoginForm />
                  </TabsContent>
                  
                  <TabsContent value="register" className="space-y-4">
                    <RegisterForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-lime-100 to-green-100 dark:from-lime-900/20 dark:to-green-900/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-lime-600 dark:text-lime-400" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">Seguro</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">Tiempo Real</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">Colaborativo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 z-10"></div>
          {loginImage && (
            <Image
              src={loginImage.imageUrl}
              alt={loginImage.description}
              fill
              className="object-cover"
              data-ai-hint={loginImage.imageHint}
            />
          )}
          
          {/* Overlay Content */}
          <div className="relative z-20 flex flex-col justify-end p-12 text-white">
            <div className="space-y-6 animate-slide-up">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold font-headline leading-tight">
                  Transporte
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                    Creativo
                  </span>
                </h2>
                <p className="text-xl text-purple-100 leading-relaxed">
                  Gestiona tu flota con diseño innovador y tecnología de vanguardia.
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-purple-200">
                <ArrowRight className="h-5 w-5" />
                <span className="font-medium">Descubre todas las funcionalidades</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}