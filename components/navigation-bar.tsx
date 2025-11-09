"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NavigationBar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  // Hide navbar on public pages
  const isPublicPage = pathname === "/" || pathname === "/login" || pathname === "/signup"

  if (isPublicPage && pathname !== "/") {
    return null
  }

  if (isPublicPage) {
    return null
  }

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg text-foreground">Tenant Insights</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/dashboard", label: "Dashboard" },
              { href: "/tenants", label: "Tenants" },
              { href: "/leases", label: "Leases" },
              { href: "/maintenance", label: "Maintenance" },
              { href: "/analytics", label: "Analytics" },
              { href: "/profile", label: "Profile" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant={isActive(item.href) ? "default" : "ghost"} className="text-sm">
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <Link href="/">
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
