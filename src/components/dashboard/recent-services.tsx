import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Badge } from "@/components/ui/badge";
  import { serviceRequests } from "@/lib/data";
  import { cn } from "@/lib/utils";
  
  export function RecentServices() {
    const statusTranslations: { [key: string]: string } = {
        "Completed": "Completado",
        "In Progress": "En Progreso",
        "Pending": "Pendiente",
        "Cancelled": "Cancelado"
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {serviceRequests.slice(0, 5).map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <div className="font-medium">{request.client}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {request.destination}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    request.status === "Completed" && "bg-green-500/20 text-green-700",
                    request.status === "In Progress" && "bg-blue-500/20 text-blue-700",
                    request.status === "Pending" && "bg-yellow-500/20 text-yellow-700",
                    request.status === "Cancelled" && "bg-red-500/20 text-red-700",
                    "border-none"
                  )}
                >
                  {statusTranslations[request.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{request.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  