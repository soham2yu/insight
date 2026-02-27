"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { analyticsApi, leasesApi, maintenanceApi, tenantsApi } from "@/lib/api"
import type { DashboardStats } from "@/lib/types"

export interface ActivityItem {
  id: string
  type: "lease" | "maintenance" | "tenant"
  title: string
  description: string
  timestamp: string
}

const defaultStats: DashboardStats = {
  totalProperties: 0,
  totalTenants: 0,
  activeLeases: 0,
  openMaintenance: 0,
  monthlyRevenue: 0,
  occupancyRate: 0,
}

export function useRealtimeDashboard(intervalMs = 15000) {
  const [stats, setStats] = useState<DashboardStats>(defaultStats)
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const buildActivityFeed = useCallback(async () => {
    const [leasesRes, maintenanceRes, tenantsRes] = await Promise.all([
      leasesApi.getAll({ limit: 5, sortBy: "created_at", sortOrder: "desc" }),
      maintenanceApi.getAll({ limit: 5, sortBy: "created_at", sortOrder: "desc" }),
      tenantsApi.getAll({ limit: 5, sortBy: "created_at", sortOrder: "desc" }),
    ])

    const leaseRows = Array.isArray(leasesRes.data) ? leasesRes.data : []
    const maintenanceRows = Array.isArray(maintenanceRes.data) ? maintenanceRes.data : []
    const tenantRows = Array.isArray(tenantsRes.data) ? tenantsRes.data : []

    const leaseItems: ActivityItem[] = leaseRows.map((item: any) => ({
      id: `lease-${item.id}`,
      type: "lease",
      title: `Lease ${item.status === "active" ? "Active" : "Updated"}`,
      description: `Unit ${item.unit_number || "N/A"} • $${item.monthly_rent || 0}/month`,
      timestamp: item.updated_at || item.created_at,
    }))

    const maintenanceItems: ActivityItem[] = maintenanceRows.map((item: any) => ({
      id: `maintenance-${item.id}`,
      type: "maintenance",
      title: `Maintenance ${item.status?.replace("_", " ") || "Update"}`,
      description: `${item.title || "Issue"} • ${item.priority || "normal"} priority`,
      timestamp: item.updated_at || item.created_at || item.reported_date,
    }))

    const tenantItems: ActivityItem[] = tenantRows.map((item: any) => ({
      id: `tenant-${item.id}`,
      type: "tenant",
      title: "Tenant Profile Added",
      description: `${item.first_name || ""} ${item.last_name || ""}`.trim() || item.email || "Tenant",
      timestamp: item.updated_at || item.created_at,
    }))

    return [...leaseItems, ...maintenanceItems, ...tenantItems]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 6)
  }, [])

  const fetchRealtimeData = useCallback(async () => {
    setError(null)

    const [{ data: analyticsPayload, error: analyticsError }, activityFeed] = await Promise.all([
      analyticsApi.getDashboardData(),
      buildActivityFeed(),
    ])

    if (analyticsError || !analyticsPayload) {
      setError(analyticsError || "Unable to load dashboard data")
      return
    }

    setStats(analyticsPayload.dashboardStats || defaultStats)
    setActivities(activityFeed)
    setLastUpdated(new Date())
  }, [buildActivityFeed])

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoading(true)
      await fetchRealtimeData()
      if (mounted) setLoading(false)
    }

    load()

    const timer = setInterval(() => {
      fetchRealtimeData()
    }, intervalMs)

    const onFocus = () => {
      fetchRealtimeData()
    }

    window.addEventListener("focus", onFocus)

    return () => {
      mounted = false
      clearInterval(timer)
      window.removeEventListener("focus", onFocus)
    }
  }, [fetchRealtimeData, intervalMs])

  const freshnessLabel = useMemo(() => {
    if (!lastUpdated) return "Never synced"
    return `Updated ${lastUpdated.toLocaleTimeString()}`
  }, [lastUpdated])

  return {
    stats,
    activities,
    loading,
    error,
    lastUpdated,
    freshnessLabel,
    refresh: fetchRealtimeData,
  }
}
