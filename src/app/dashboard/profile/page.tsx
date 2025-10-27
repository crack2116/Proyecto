"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/firebase";
import { User, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserRoleBadge } from "@/components/layout/user-role-badge";

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Mi Perfil</h1>
        <p className="text-muted-foreground">Información de tu cuenta y configuración.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información del Perfil */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-modern">
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Datos de tu cuenta de usuario.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar y Nombre */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={user?.photoURL ?? undefined} alt="Avatar" />
                  <AvatarFallback className="text-2xl">
                    <User />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{user?.displayName || "Usuario"}</h2>
                  <div className="mt-2">
                    <UserRoleBadge />
                  </div>
                </div>
              </div>

              {/* Información */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="text-base font-semibold">{user?.email || "No especificado"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                    <p className="text-base font-semibold">No especificado</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Ubicación</p>
                    <p className="text-base font-semibold">Piura, Perú</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Fecha de Registro</p>
                    <p className="text-base font-semibold">
                      {user?.metadata.creationTime 
                        ? new Date(user.metadata.creationTime).toLocaleDateString('es-PE')
                        : "No disponible"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Privacidad y Seguridad</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tu cuenta está protegida con autenticación de Firebase. Puedes cambiar tu contraseña en cualquier momento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar de Acciones */}
        <div className="space-y-6">
          <Card className="border-0 shadow-modern">
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 rounded-lg border hover:bg-accent transition-colors text-left">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Editar Perfil</p>
                    <p className="text-sm text-muted-foreground">Actualizar información</p>
                  </div>
                </div>
              </button>

              <button className="w-full p-3 rounded-lg border hover:bg-accent transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Cambiar Contraseña</p>
                    <p className="text-sm text-muted-foreground">Actualizar seguridad</p>
                  </div>
                </div>
              </button>

              <button className="w-full p-3 rounded-lg border hover:bg-accent transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Configuración</p>
                    <p className="text-sm text-muted-foreground">Preferencias</p>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-modern">
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Servicios Gestionados</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Clientes Activos</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Vehículos Activos</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

