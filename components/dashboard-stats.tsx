"use client"

import { Card } from "@/components/ui/card"
import { Users, Home, AlertCircle, CheckCircle2 } from "lucide-react"
import type { DashboardStats as DashboardStatsType } from "@/lib/types"

interface DashboardStatsProps {
  stats: DashboardStatsType
  loading?: boolean
}

export default function DashboardStats({ stats, loading }: DashboardStatsProps) {
  const cards = [
    { label: "Total Tenants", value: stats.totalTenants, icon: Users, color: "bg-blue-500/10" },
    { label: "Active Leases", value: stats.activeLeases, icon: Home, color: "bg-green-500/10" },
    { label: "Open Maintenance", value: stats.openMaintenance, icon: AlertCircle, color: "bg-yellow-500/10" },
    { label: "Occupancy Rate", value: `${stats.occupancyRate}%`, icon: CheckCircle2, color: "bg-emerald-500/10" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card key={idx} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{loading ? "--" : stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-foreground" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
