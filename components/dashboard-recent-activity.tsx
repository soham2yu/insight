"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, FileText, Users } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "lease_renewal",
    title: "Lease Renewal Alert",
    description: "Lease for 101 Main St expires in 30 days",
    icon: FileText,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "maintenance_resolved",
    title: "Maintenance Completed",
    description: "Plumbing issue at 456 Oak Ave has been resolved",
    icon: CheckCircle2,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    type: "maintenance_issue",
    title: "New Maintenance Request",
    description: "Tenant at 789 Pine St reported AC issues",
    icon: AlertCircle,
    timestamp: "1 day ago",
  },
  {
    id: 4,
    type: "tenant_added",
    title: "New Tenant",
    description: "John Smith moved in at 321 Elm Ave",
    icon: Users,
    timestamp: "2 days ago",
  },
]

export default function DashboardRecentActivity() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
              <Icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{activity.timestamp}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
