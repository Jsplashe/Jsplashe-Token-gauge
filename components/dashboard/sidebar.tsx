"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Home,
  Search,
  PlusCircle,
  User,
  LogOut,
  Moon,
  Sun,
  Settings,
  Heart,
  ShieldCheck,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useSupabase } from "@/lib/supabase/provider"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function Sidebar() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const { session, signOut } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()

  // Mock admin status for demo purposes
  const isAdmin = session?.user?.email?.includes("admin") || false

  const handleLogout = async () => {
    try {
      await signOut()

      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/login")
    } catch (error: any) {
      toast({
        title: "Error",
        description: "There was a problem signing out.",
        variant: "destructive",
      })
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Explore Projects",
      href: "/explore",
      icon: Search,
    },
    {
      title: "Submit Project",
      href: "/submit",
      icon: PlusCircle,
    },
    {
      title: "My Watchlist",
      href: "/watchlist",
      icon: Heart,
    },
    {
      title: "My Profile",
      href: "/profile",
      icon: User,
    },
  ]

  // Admin items only shown to admin users
  const adminItems = [
    {
      title: "Admin Dashboard",
      href: "/admin",
      icon: ShieldCheck,
    },
    {
      title: "Project Verification",
      href: "/admin/verification",
      icon: ShieldCheck,
    },
    {
      title: "User Management",
      href: "/admin/users",
      icon: ShieldCheck,
    },
  ]

  return (
    <SidebarProvider>
      <SidebarComponent variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TokenGauge</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            {/* Admin section - only visible to admin users */}
            {isAdmin && (
              <>
                <div className="mt-6 mb-2 px-2">
                  <div className="text-xs font-semibold text-muted-foreground">ADMIN</div>
                </div>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </>
            )}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{session?.user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{session?.user?.email?.split("@")[0] || "Demo User"}</p>
                <p className="text-xs text-muted-foreground truncate">{session?.user?.email || "demo@example.com"}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-2 py-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>

            <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </SidebarFooter>

        <SidebarTrigger />
      </SidebarComponent>
    </SidebarProvider>
  )
}

