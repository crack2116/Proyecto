import Image from 'next/image';
import { Truck, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const loginImage = PlaceHolderImages.find(p => p.id === 'login-background');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-800">
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
                <div className="p-3 rounded-2xl gradient-blue shadow-lg">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl font-bold font-headline gradient-blue bg-clip-text text-transparent">
                    Mewing Transport
                  </h1>
                  <p className="text-sm text-muted-foreground font-medium">Gestión Profesional</p>
                </div>
              </div>
            </div>

            {/* Login Form Card */}
            <Card className="shadow-modern-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold font-headline text-foreground">¡Bienvenido de vuelta!</CardTitle>
                <CardDescription>
                  Accede a tu panel de control para gestionar tus servicios de transporte.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">Seguro</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800/20 dark:to-slate-700/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">Tiempo Real</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-slate-100 dark:from-blue-900/20 dark:to-slate-800/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">Colaborativo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-slate-600/20 z-10"></div>
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
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-slate-200">
                    Profesional
                  </span>
                </h2>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Gestiona tu flota con tecnología avanzada y diseño elegante.
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-blue-200">
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
