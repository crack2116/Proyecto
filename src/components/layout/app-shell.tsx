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
  import { useUser } from "@/firebase";
  
  export function AppShell({ children }: { children: React.ReactNode }) {
    const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');
    const { user } = useUser();
  
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
                    <AvatarImage src={user?.photoURL ?? userAvatar?.imageUrl} alt="User Avatar" />
                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-sidebar-accent-foreground">{user?.displayName ?? "Usuario"}</p>
                    <p className="text-xs text-sidebar-foreground/70">{user?.email}</p>
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
  