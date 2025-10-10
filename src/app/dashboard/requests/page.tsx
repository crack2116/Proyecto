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
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Service Requests</h1>
            <p className="text-muted-foreground">Manage and assign all transport requests.</p>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Request
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">New Service Request</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to create a new transport service request.
                    </DialogDescription>
                </DialogHeader>
                <RequestForm />
            </DialogContent>
        </Dialog>
      </div>

      <ServiceRequestTable />
    </div>
  );
}
