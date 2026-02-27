"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, LogOut } from "lucide-react"

export default function DashboardNav() {
  const router = useRouter()

  const handleLogout = () => {
    // Add logout logic here (clear tokens, redirect to login, etc.)
    console.log("Logout clicked")
    // For now, just redirect to login page
    router.push("/login")
  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4 w-full">
        <Link href="/dashboard" className="text-2xl font-bold text-primary">
          Tenant Insights
        </Link>
        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              Profile
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
