import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  CheckSquare,
  User,
  LogOut,
  Menu,
  Bell,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// ✅ IMPORT YOUR LOGO HERE
import taskpilotLogo from "@/assets/taskpilot-logo.png";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        {/* LOGO + BRAND */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg overflow-hidden">
            <img
              src={taskpilotLogo}
              alt="TaskPilot Logo"
              className="h-6 w-6 object-contain"
            />
          </div>

          <div>
            <span className="font-heading font-bold text-lg tracking-tight text-foreground">
              Task<span className="text-primary">Pilot</span>
            </span>
            <p className="text-xs text-muted-foreground">Pro</p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <a
                  data-testid={`nav-${item.name.toLowerCase()}`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* USER FOOTER */}
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors group">
          <Avatar className="h-9 w-9 ring-2 ring-sidebar-border">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-sm font-semibold">
              {user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-sidebar-foreground">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className="h-full fixed w-64">
          <SidebarContent />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-10 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* MOBILE SIDEBAR */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            {/* SEARCH */}
            <div className="relative w-80 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-10 bg-muted/40 border border-border/50 focus:border-primary/50 focus:bg-background transition-all placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-primary rounded-full ring-2 ring-background animate-pulse" />
            </Button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
