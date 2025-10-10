import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarInset,
    SidebarTrigger,
  } from "@/components/ui/sidebar";
  import { Truck, User } from "lucide-react";
  import { Nav } from "./nav";
  import { Header } from "./header";
  import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
  import { PlaceHolderImages } from "@/lib/placeholder-images";
  
  export function AppShell({ children }: { children: React.ReactNode }) {
    const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');
  
    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
                <Truck className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold font-headline text-sidebar-primary">Mewing</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Nav />
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent">
                <Avatar className="h-10 w-10">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint} />}
                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-sidebar-accent-foreground">Admin User</p>
                    <p className="text-xs text-sidebar-foreground/70">admin@mewing.com</p>
                </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    );
  }
  