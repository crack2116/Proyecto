"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

export function UserManagement() {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Usuarios del Sistema</CardTitle>
          <CardDescription>
            Crea y administra las cuentas de tus trabajadores.
          </CardDescription>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Crear Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">
                Crear Cuenta para Trabajador
              </DialogTitle>
              <DialogDescription>
                Completa los detalles para registrar un nuevo usuario en el sistema.
              </DialogDescription>
            </DialogHeader>
            <RegisterForm />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {/* Aquí puedes agregar una tabla para listar los usuarios existentes */}
        <div className="text-center text-muted-foreground py-8">
            <p>La tabla de usuarios se mostrará aquí.</p>
        </div>
      </CardContent>
    </Card>
  );
}
