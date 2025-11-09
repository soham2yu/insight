"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Home,
  Users,
  FileText,
  Wrench,
  BarChart3,
  User,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  Building2,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" />, badge: null },
  { href: "/tenants", label: "Tenants", icon: <Users className="w-5 h-5" />, badge: "4" },
  { href: "/leases", label: "Leases", icon: <FileText className="w-5 h-5" />, badge: "2" },
  { href: "/maintenance", label: "Maintenance", icon: <Wrench className="w-5 h-5" />, badge: "3" },
  { href: "/analytics", label: "Analytics", icon: <BarChart3 className="w-5 h-5" />, badge: null },
]

const secondaryNavItems = [
  { href: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  { href: "/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  { href: "/help", label: "Help & Support", icon: <HelpCircle className="w-5 h-5" /> },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <Sidebar open={!isCollapsed} setOpen={(open) => setIsCollapsed(!open)} animate={true}>
      <SidebarBody>
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Toggle Button for Mobile */}
          <div className="md:hidden flex justify-end p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-8 h-8 p-0"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
          {/* Logo/Brand Section */}
          <div className="flex items-center justify-between px-3 py-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-lg font-bold text-primary">Tenant</span>
                  <span className="text-xs text-muted-foreground -mt-1">Insights</span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-6 h-6 p-0 hover:bg-muted transition-colors flex-shrink-0"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>

          {/* Main Navigation */}
          <div className="flex flex-col gap-1 px-3 py-4">
            {!isCollapsed && (
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                Main
              </div>
            )}
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

              return (
                <TooltipProvider key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarLink
                        link={item}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group relative",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-foreground hover:bg-muted hover:shadow-sm",
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right" className={isCollapsed ? "block" : "hidden"}>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                  {item.badge && !isCollapsed && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </TooltipProvider>
              )
            })}
          </div>

          <Separator className="mx-3" />

          {/* Secondary Navigation */}
          <div className="flex flex-col gap-1 px-3 py-4">
            {!isCollapsed && (
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                Support
              </div>
            )}
            {secondaryNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

              return (
                <TooltipProvider key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarLink
                        link={item}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-foreground hover:bg-muted hover:shadow-sm",
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right" className={isCollapsed ? "block" : "hidden"}>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="mt-auto px-3 pb-4">
          <Separator className="mb-4" />
          <Link href="/profile">
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors duration-300 group cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground truncate">John Doe</span>
                  <span className="text-xs text-muted-foreground truncate">john@example.com</span>
                </div>
              )}
            </div>
          </Link>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="flex gap-1 mt-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 h-8 px-2 hover:bg-muted transition-colors duration-200"
                    >
                      <Bell className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 h-8 px-2 hover:bg-muted transition-colors duration-200"
                      onClick={() => {
                        // Handle logout
                        console.log("Logout clicked")
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </SidebarBody>
    </Sidebar>
  )
}
