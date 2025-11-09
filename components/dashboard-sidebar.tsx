"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Home, Users, FileText, Wrench, BarChart3,
  User, Settings, Bell, HelpCircle, LogOut,
  Building2, ChevronLeft, ChevronRight, Menu
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
    <Sidebar
  open={!isCollapsed}
  setOpen={(open) => setIsCollapsed(!open)}
  animate={true}
>
  <SidebarBody>
    <div className={cn(
      "flex flex-col flex-1 overflow-y-auto overflow-x-hidden transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>

          {/* Mobile Toggle */}
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

          {/* Logo / Brand */}
          <div className="flex items-center justify-between px-3 py-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>

              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary">Tenant</span>
                  <span className="text-xs text-muted-foreground -mt-1">Insights</span>
                </div>
              )}
            </div>

            {/* Collapse Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-6 h-6 p-0 hover:bg-muted"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* MAIN NAV */}
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
                          "flex items-center rounded-lg transition-all duration-300 relative",
                          isCollapsed
                            ? "justify-center px-0 py-2.5 gap-0"
                            : "px-3 py-3 gap-3 justify-start",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-foreground hover:bg-muted hover:shadow-sm"
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
                      className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </TooltipProvider>
              )
            })}
          </div>

          <Separator className="mx-3" />

          {/* SECONDARY NAV */}
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
                          "flex items-center rounded-lg transition-all duration-300",
                          isCollapsed
                            ? "justify-center px-0 py-2.5 gap-0"
                            : "px-3 py-3 gap-3 justify-start",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-foreground hover:bg-muted hover:shadow-sm"
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

        {/* USER SECTION */}
        <div className="mt-auto px-3 pb-4 w-[65px]">
          <Separator className="mb-4" />

          <Link href="/profile">
            <div className={cn(
              "flex items-center gap-3 rounded-lg hover:bg-muted transition-colors cursor-pointer",
              isCollapsed ? "justify-center px-0 py-2.5" : "px-3 py-3"
            )}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center p-[7px]">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>

              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">john@example.com</span>
                </div>
              )}
            </div>
          </Link>

          {/* QUICK ACTIONS */}
          {!isCollapsed && (
            <div className="flex gap-1 mt-3">
              <Button variant="ghost" size="sm" className="flex-1 h-8">
                <Bell className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm" className="flex-1 h-8">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </SidebarBody>
    </Sidebar>
  )
}
