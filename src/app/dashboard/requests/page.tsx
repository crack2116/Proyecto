"use client";

import React from "react";
import { ServiceRequestTable } from "@/components/requests/service-request-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { RequestForm } from "@/components/requests/request-form";
  

export default function ServiceRequestsPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Solicitudes de Servicio</h1>
            <p className="text-muted-foreground">Gestiona y asigna todas las solicitudes de transporte.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Crear Nueva Solicitud
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Nueva Solicitud de Servicio</DialogTitle>
                    <DialogDescription>
                        Completa los detalles a continuación para crear una nueva solicitud de servicio de transporte.
                    </DialogDescription>
                </DialogHeader>
                <RequestForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
      </div>

      <ServiceRequestTable />
    </div>
  );
}