"use client"

import Link from "next/link"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Component as Globe } from "@/components/ui/interactive-globe"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react"

const storySteps = [
  {
    title: "Capture",
    text: "Unify properties, leases, tenants, and payments in one operating layer.",
  },
  {
    title: "Understand",
    text: "Track risk, occupancy, and cash flow in real time with decision-grade signals.",
  },
  {
    title: "Act",
    text: "Automate workflows and resolve issues faster with guided operations.",
  },
]

const features = [
  {
    icon: TrendingUp,
    title: "Portfolio Intelligence",
    text: "Performance snapshots for occupancy, renewals, and net operating income.",
  },
  {
    icon: Wrench,
    title: "Maintenance Control",
    text: "Prioritize requests, reduce downtime, and improve completion quality.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Ready",
    text: "Auditable records and structured controls for reliable governance.",
  },
]

const leaseCaptureData = [
  { month: "Jan", leases: 42 },
  { month: "Feb", leases: 48 },
  { month: "Mar", leases: 55 },
  { month: "Apr", leases: 61 },
  { month: "May", leases: 67 },
  { month: "Jun", leases: 74 },
]

const occupancyInsightData = [
  { month: "Jan", occupancy: 88 },
  { month: "Feb", occupancy: 89 },
  { month: "Mar", occupancy: 90 },
  { month: "Apr", occupancy: 92 },
  { month: "May", occupancy: 93 },
  { month: "Jun", occupancy: 95 },
]

const workflowActionData = [
  { name: "Automated", value: 72, color: "hsl(var(--primary))" },
  { name: "Manual", value: 28, color: "hsl(var(--muted-foreground))" },
]

export default function LandingPage() {
  const storyRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start 70%", "end 25%"],
  })
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold md:text-base">
            <Building2 className="size-4 text-primary" />
            Tenant Insights
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" className="rounded-full">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-primary/10 via-background to-background" />
          <div className="mx-auto grid min-h-[88vh] w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="size-3.5 text-primary" />
                Professional property operations platform
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                A modern operating system for property teams
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Run smarter portfolios with cleaner workflows, stronger oversight, and faster execution from lease to maintenance.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/signup">
                  <Button size="lg" className="rounded-full">
                    Start Free Trial
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button size="lg" variant="outline" className="rounded-full">
                    Explore Analytics
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-4 text-primary" /> 14-day trial</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-4 text-primary" /> No credit card</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-4 text-primary" /> Fast onboarding</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <Card className="relative overflow-hidden border-border/70 bg-card/90 p-4 shadow-2xl">
                <div className="absolute inset-x-10 top-0 h-24 rounded-full bg-primary/20 blur-3xl" />
                <div className="relative flex min-h-[420px] items-center justify-center rounded-xl border border-border/60 bg-background/60">
                  <Globe size={430} />
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <section ref={storyRef} className="relative border-b border-border/60 py-16 sm:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <p className="mb-3 text-sm font-medium text-primary">How it works</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Scroll the story of your operations
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                A focused system that turns fragmented tasks into one clear operating rhythm.
              </p>
            </div>

            <div className="relative pl-10">
              <div className="absolute left-2 top-2 h-[calc(100%-1rem)] w-px bg-border" />
              <motion.div style={{ height: progressHeight }} className="absolute left-2 top-2 w-px bg-primary" />

              <div className="space-y-14">
                {storySteps.map((step, index) => (
                  <motion.article
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className="relative"
                  >
                    <span className="absolute -left-9 top-2 inline-flex size-6 items-center justify-center rounded-full border border-primary/40 bg-background text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <Card className="border-border/70 bg-card/70 p-6">
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{step.text}</p>

                      <div className="mt-5 h-52 w-full rounded-lg border border-border/70 bg-background/80 p-3">
                        {index === 0 && (
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={leaseCaptureData}>
                              <defs>
                                <linearGradient id="leasesFill" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
                                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                              <Tooltip />
                              <Area type="monotone" dataKey="leases" stroke="hsl(var(--primary))" fill="url(#leasesFill)" strokeWidth={2} />
                            </AreaChart>
                          </ResponsiveContainer>
                        )}

                        {index === 1 && (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={occupancyInsightData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                              <Tooltip />
                              <Bar dataKey="occupancy" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        )}

                        {index === 2 && (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Tooltip />
                              <Pie data={workflowActionData} dataKey="value" nameKey="name" innerRadius={46} outerRadius={72} paddingAngle={4}>
                                {workflowActionData.map((entry) => (
                                  <Cell key={entry.name} fill={entry.color} />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </Card>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-3">
              <p className="text-sm font-medium text-primary">Core capabilities</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for daily execution</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title} className="border-border/70 bg-card/80 p-6 transition-transform duration-300 hover:-translate-y-1">
                    <div className="mb-4 inline-flex rounded-lg border border-border bg-background p-2.5">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.text}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <Clock3 className="size-3.5 text-primary" />
              Ready in days, not months
            </div>
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Redesign completed — now run a cleaner, faster workflow
            </h2>
            <p className="mt-4 text-muted-foreground">
              Move from fragmented tools to one cohesive platform for growth, reliability, and control.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/signup">
                <Button size="lg" className="rounded-full">Create Workspace</Button>
              </Link>
              <Link href="/help">
                <Button size="lg" variant="outline" className="rounded-full">Talk to Support</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 py-12">
          <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
            {[
              { label: "Average Occupancy", value: "95.2%", note: "+4.8% YoY" },
              { label: "Maintenance SLA", value: "18h", note: "Down from 31h" },
              { label: "Collection Rate", value: "98.7%", note: "Consistent 6 months" },
            ].map((metric) => (
              <Card key={metric.label} className="border-border/70 bg-card/70 p-5">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight">{metric.value}</p>
                <p className="mt-1 text-xs text-primary">{metric.note}</p>
              </Card>
            ))}
          </div>
        </section>

        <footer className="border-t border-border/60 py-10">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:px-6 md:flex-row lg:px-8">
            <p>© {new Date().getFullYear()} Tenant Insights. Built for professional property teams.</p>
            <div className="flex items-center gap-4">
              <Link href="/help" className="hover:text-foreground transition-colors">Support</Link>
              <Link href="/settings" className="hover:text-foreground transition-colors">Settings</Link>
              <Link href="/analytics" className="hover:text-foreground transition-colors">Analytics</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
