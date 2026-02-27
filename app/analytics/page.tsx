"use client"

import { useState } from "react"
import DashboardNav from "@/components/dashboard-nav"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card } from "@/components/ui/card"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Filter } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const tenantTrendData = [
  { month: "Jan", active: 18, pending: 2 },
  { month: "Feb", active: 19, pending: 1 },
  { month: "Mar", active: 20, pending: 2 },
  { month: "Apr", active: 21, pending: 1 },
  { month: "May", active: 22, pending: 2 },
  { month: "Jun", active: 22, pending: 0 },
]

const maintenanceData = [
  { name: "Pending", value: 5, color: "#ef4444" },
  { name: "In Progress", value: 3, color: "#3b82f6" },
  { name: "Completed", value: 18, color: "#10b981" },
]

const leaseStatusData = [
  { month: "Jan", renewals: 2, expirations: 1 },
  { month: "Feb", renewals: 1, expirations: 2 },
  { month: "Mar", renewals: 3, expirations: 1 },
  { month: "Apr", renewals: 2, expirations: 2 },
  { month: "May", renewals: 1, expirations: 3 },
  { month: "Jun", renewals: 4, expirations: 2 },
]

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { title: "Overview", icon: BarChart3 },
    { title: "Revenue", icon: DollarSign },
    { title: "Tenants", icon: Users },
    { title: "Maintenance", icon: TrendingUp },
    { type: "separator" as const },
    { title: "Reports", icon: Calendar },
  ]

  const handleTabChange = (index: number) => {
    setActiveTab(index)
    // Here you could switch between different chart views based on the tab
    console.log("Switched to tab:", index)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4 md:mb-0">Analytics</h1>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background hover:bg-muted transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tenant Trends Chart */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Tenant Trends</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tenantTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="active" fill="var(--chart-1)" name="Active Tenants" />
                    <Bar dataKey="pending" fill="var(--chart-2)" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Maintenance Status Pie Chart */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Maintenance Status</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={maintenanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {maintenanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              {/* Lease Activity Chart */}
              <Card className="p-6 lg:col-span-2">
                <h2 className="text-lg font-semibold text-foreground mb-4">Lease Activity</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={leaseStatusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="renewals" stroke="var(--chart-1)" name="Renewals" strokeWidth={2} />
                    <Line
                      type="monotone"
                      dataKey="expirations"
                      stroke="var(--chart-3)"
                      name="Expirations"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
