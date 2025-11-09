"use client"

import { useState } from "react"
import DashboardNav from "@/components/dashboard-nav"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardStats from "@/components/dashboard-stats"
import DashboardRecentActivity from "@/components/dashboard-recent-activity"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Home, Users, FileText, Wrench, BarChart3, Settings, Bell, Search } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { title: "Overview", icon: Home },
    { title: "Tenants", icon: Users },
    { title: "Leases", icon: FileText },
    { title: "Maintenance", icon: Wrench },
    { title: "Analytics", icon: BarChart3 },
    { type: "separator" as const },
    { title: "Settings", icon: Settings },
  ]

  const handleTabChange = (index: number) => {
    setActiveTab(index)
    console.log("Selected tab:", index)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4 md:mb-0">Dashboard</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="relative p-2 border border-border rounded-lg bg-background hover:bg-muted transition-colors">
                  <Bell className="w-4 h-4 text-foreground" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>

            <div className="mb-8">
              <ExpandableTabs
                tabs={tabs}
                className="w-full md:w-auto"
                activeColor="text-primary"
                onChange={handleTabChange}
              />
            </div>

            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DashboardRecentActivity />
              </div>
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted rounded transition-colors text-foreground">
                      Add New Tenant
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted rounded transition-colors text-foreground">
                      Create New Lease
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted rounded transition-colors text-foreground">
                      Log Maintenance Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
