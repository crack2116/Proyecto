import { Faq } from "@/components/support/faq";
import { ChatAssistant } from "@/components/support/chat-assistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Support</h1>
        <p className="text-muted-foreground">Find answers to your questions and get assistance.</p>
      </div>

      <Tabs defaultValue="assistant" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="assistant">Virtual Assistant</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="assistant">
          <Card>
            <CardContent className="p-0">
                <ChatAssistant />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="faq">
          <Card>
            <CardContent className="p-6">
                <Faq />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
