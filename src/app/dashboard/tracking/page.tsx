import { TransportMap } from "@/components/tracking/transport-map";
import { Card, CardContent } from "@/components/ui/card";

export default function TrackingPage() {
    return (
      <div className="flex flex-col gap-8 h-[calc(100vh-10rem)]">
        <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Real-Time Tracking</h1>
            <p className="text-muted-foreground">Monitor all active services on the map.</p>
        </div>
        <Card className="flex-grow">
          <CardContent className="p-0 h-full">
            <TransportMap />
          </CardContent>
        </Card>
      </div>
    );
  }
