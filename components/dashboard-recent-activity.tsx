"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, FileText, Users } from "lucide-react"
import type { ActivityItem } from "@/hooks/useRealtimeDashboard"

interface DashboardRecentActivityProps {
  activities: ActivityItem[]
  loading?: boolean
}

const iconByType = {
  lease: FileText,
  maintenance: AlertCircle,
  tenant: Users,
} as const

const formatTimestamp = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

export default function DashboardRecentActivity({ activities, loading }: DashboardRecentActivityProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {loading && activities.length === 0 && (
          <p className="text-sm text-muted-foreground">Loading live activity...</p>
        )}

        {!loading && activities.length === 0 && (
          <p className="text-sm text-muted-foreground">No activity yet. New events will appear in real time.</p>
        )}

        {activities.map((activity) => {
          const Icon = iconByType[activity.type] ?? CheckCircle2
          return (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
              <Icon className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{formatTimestamp(activity.timestamp)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
