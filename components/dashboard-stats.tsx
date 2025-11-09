"use client"

import { Card } from "@/components/ui/card"
import { Users, Home, AlertCircle, CheckCircle2 } from "lucide-react"

const stats = [
  { label: "Total Tenants", value: "24", icon: Users, color: "bg-blue-500/10" },
  { label: "Active Leases", value: "22", icon: Home, color: "bg-green-500/10" },
  { label: "Maintenance Issues", value: "5", icon: AlertCircle, color: "bg-yellow-500/10" },
  { label: "Completed Tasks", value: "18", icon: CheckCircle2, color: "bg-emerald-500/10" },
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card key={idx} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
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
