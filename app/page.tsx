"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, CheckCircle2, Wrench, Users, TrendingUp, Shield, Star, ArrowRight, Home, FileText, Settings, Zap, BarChart3, PieChart, Activity, DollarSign, Calendar, UserCheck, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie } from 'recharts'

export default function LandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 35000 },
    { month: 'Mar', revenue: 48000, expenses: 33000 },
    { month: 'Apr', revenue: 61000, expenses: 38000 },
    { month: 'May', revenue: 55000, expenses: 36000 },
    { month: 'Jun', revenue: 67000, expenses: 40000 },
  ]

  const occupancyData = [
    { month: 'Jan', occupied: 85, vacant: 15 },
    { month: 'Feb', occupied: 88, vacant: 12 },
    { month: 'Mar', occupied: 82, vacant: 18 },
    { month: 'Apr', occupied: 91, vacant: 9 },
    { month: 'May', occupied: 89, vacant: 11 },
    { month: 'Jun', occupied: 93, vacant: 7 },
  ]

  const propertyTypesData = [
    { name: 'Apartments', value: 45, color: '#3b82f6' },
    { name: 'Houses', value: 30, color: '#10b981' },
    { name: 'Condos', value: 15, color: '#f59e0b' },
    { name: 'Commercial', value: 10, color: '#ef4444' },
  ]

  const maintenanceData = [
    { category: 'Plumbing', count: 45 },
    { category: 'Electrical', count: 32 },
    { category: 'HVAC', count: 28 },
    { category: 'General', count: 67 },
    { category: 'Emergency', count: 12 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="border-b border-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Tenant Insights</div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 relative">
        {/* Minimal Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Simple Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              AI-Powered Property Management
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Smart Property
              <span className="block text-slate-600 dark:text-slate-300">
                Management
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Streamline your rental business with intelligent automation, real-time insights, and predictive analytics.
            </motion.p>

            {/* Simple CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white border-0 transition-all duration-200 hover:shadow-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 transition-all duration-200">
                  Watch Demo
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {[
                { icon: CheckCircle2, text: "14-Day Free Trial", color: "text-blue-600" },
                { icon: CheckCircle2, text: "24/7 Support", color: "text-green-600" },
                { icon: CheckCircle2, text: "Cancel Anytime", color: "text-purple-600" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + idx * 0.1, duration: 0.5 }}
                  className="flex items-center justify-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`p-2 bg-slate-100 dark:bg-slate-700 rounded-full`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-center leading-tight">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-slate-400 rounded-full mt-2"
            ></motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Powerful Features for
              <span className="block text-slate-600 dark:text-slate-300">
                Property Management
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Streamline your rental business with intelligent automation, real-time insights, and predictive analytics.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: AlertCircle,
                title: "Smart Lease Alerts",
                description: "AI-powered notifications for renewals, expirations, and critical dates. Never miss important deadlines.",
                color: "text-blue-600",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: TrendingUp,
                title: "AI Risk Assessment",
                description: "Machine learning algorithms analyze tenant data to predict risks and ensure reliable occupancy.",
                color: "text-emerald-500",
                gradient: "from-emerald-500 to-teal-500"
              },
              {
                icon: Wrench,
                title: "Smart Maintenance",
                description: "Automated maintenance workflows with predictive analytics to prevent costly repairs.",
                color: "text-amber-500",
                gradient: "from-amber-500 to-orange-500"
              },
              {
                icon: Users,
                title: "Tenant Portal",
                description: "Self-service portal for tenants with payment processing, maintenance requests, and document access.",
                color: "text-purple-600",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption, compliance automation, and advanced access controls for your data.",
                color: "text-rose-500",
                gradient: "from-rose-500 to-red-500"
              },
              {
                icon: Zap,
                title: "Real-time Analytics",
                description: "Live dashboards with predictive insights, financial reports, and performance metrics.",
                color: "text-cyan-500",
                gradient: "from-cyan-500 to-blue-500"
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -12, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="p-8 h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`inline-flex p-4 rounded-xl bg-slate-100 dark:bg-slate-700 mb-6`}>
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Statistics & Charts Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-h2 font-heading text-slate-900 dark:text-white mb-4">Data-Driven Property Management</h2>
            <p className="text-body text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Real-time analytics and insights to optimize your rental business performance.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-8 h-8 text-emerald-500" />
                  <h3 className="text-h3 font-heading text-slate-900 dark:text-white">Revenue vs Expenses</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#0A84FF" fill="#0A84FF" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="expenses" stackId="2" stroke="#6A5AF9" fill="#6A5AF9" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Occupancy Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                  <h3 className="text-h3 font-heading text-slate-900 dark:text-white">Occupancy Rates</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="occupied" fill="#0A84FF" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="vacant" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Property Types Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <PieChart className="w-8 h-8 text-purple-600" />
                  <h3 className="text-h3 font-heading text-slate-900 dark:text-white">Property Portfolio</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={propertyTypesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {propertyTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {propertyTypesData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-slate-600 dark:text-slate-300">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Maintenance Requests Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-8 h-8 text-amber-500" />
                  <h3 className="text-h3 font-heading text-slate-900 dark:text-white">Maintenance Requests</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={maintenanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" stroke="#64748b" />
                    <YAxis dataKey="category" type="category" stroke="#64748b" width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="#22D3EE" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-h2 font-heading text-slate-900 dark:text-white mb-6">About Tenant Insights</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Founded in 2020, Tenant Insights is revolutionizing property management with cutting-edge AI technology.
                We empower landlords and property managers with intelligent tools that save time, reduce risks, and maximize profitability.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Our mission is to make property management simple, efficient, and profitable for everyone, from individual landlords
                to large property management companies.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Properties Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Happy Landlords</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Uptime</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-2 border-blue-200 dark:border-slate-600">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Home className="w-8 h-8 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Property-Centric Design</h3>
                      <p className="text-slate-600 dark:text-slate-300">Built by property managers, for property managers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Zap className="w-8 h-8 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">AI-Powered Insights</h3>
                      <p className="text-slate-600 dark:text-slate-300">Leverage machine learning for smarter decision-making.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Bank-Level Security</h3>
                      <p className="text-slate-600 dark:text-slate-300">Your data is protected with enterprise-grade security.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-h2 font-heading text-slate-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process.
            </p>
          </motion.div>

          {/* Process Flowchart */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border-2 border-slate-200 dark:border-slate-700"
            >
              <div className="grid md:grid-cols-5 gap-8 items-center">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    1
                  </div>
                  <Home className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Add Properties</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Import your portfolio</p>
                </div>

                {/* Arrow 1 */}
                <div className="hidden md:flex justify-center">
                  <ArrowRight className="w-8 h-8 text-blue-400" />
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    2
                  </div>
                  <UserCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Screen Tenants</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">AI risk assessment</p>
                </div>

                {/* Arrow 2 */}
                <div className="hidden md:flex justify-center">
                  <ArrowRight className="w-8 h-8 text-purple-400" />
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    3
                  </div>
                  <TrendingUp className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Optimize</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Maximize profits</p>
                </div>
              </div>

              {/* Process Details */}
              <div className="mt-12 grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-blue-50 dark:bg-slate-700 rounded-lg">
                  <Calendar className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Automated Workflows</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Lease renewals, rent collection, and maintenance alerts</p>
                </div>
                <div className="text-center p-6 bg-purple-50 dark:bg-slate-700 rounded-lg">
                  <BarChart3 className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                  <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Real-time Analytics</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Track occupancy, revenue, and maintenance costs</p>
                </div>
                <div className="text-center p-6 bg-cyan-50 dark:bg-slate-700 rounded-lg">
                  <Shield className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                  <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Compliance & Security</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Stay compliant with automated reporting</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                step: "01",
                title: "Set Up Your Properties",
                description: "Add your properties, units, and tenant information in our intuitive dashboard.",
                icon: Home,
                color: "bg-blue-600"
              },
              {
                step: "02",
                title: "Configure Automations",
                description: "Set up automated alerts, rent collection, and maintenance workflows.",
                icon: Settings,
                color: "bg-purple-600"
              },
              {
                step: "03",
                title: "Monitor & Optimize",
                description: "Track performance, analyze data, and optimize your rental business.",
                icon: TrendingUp,
                color: "bg-cyan-500"
              }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div key={idx} variants={fadeInUp} className="text-center">
                  <div className="relative">
                    <div className={`w-20 h-20 ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-lg`}>
                      {item.step}
                    </div>
                    {idx < 2 && (
                      <ArrowRight className="hidden md:block absolute top-10 -right-4 w-8 h-8 text-slate-400" />
                    )}
                  </div>
                  <Icon className="w-12 h-12 text-slate-600 dark:text-slate-300 mx-auto mb-4" />
                  <h3 className="text-h3 font-heading text-slate-900 dark:text-white mb-4">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-lg">{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-h2 font-heading text-slate-900 dark:text-white mb-4">What Our Users Say</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Join thousands of satisfied landlords who have transformed their property management.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Property Owner",
                content: "Tenant Insights has saved me hours every week. The automated rent collection and maintenance tracking are game-changers.",
                rating: 5,
                avatar: "SJ",
                location: "San Francisco, CA"
              },
              {
                name: "Michael Chen",
                role: "Property Manager",
                content: "The AI risk scoring helped me avoid a problematic tenant. This platform pays for itself in prevented issues alone.",
                rating: 5,
                avatar: "MC",
                location: "Austin, TX"
              },
              {
                name: "Emily Rodriguez",
                role: "Real Estate Investor",
                content: "Finally, a property management tool that actually understands the needs of landlords. Highly recommend!",
                rating: 5,
                avatar: "ER",
                location: "Miami, FL"
              }
            ].map((testimonial, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Verified User</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-h2 font-heading text-foreground mb-4">Powerful Dashboard</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get a complete overview of your properties at a glance with our intuitive dashboard.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-card border-2 border-primary/20 shadow-2xl">
              <div className="bg-gradient-to-br from-muted to-muted/50 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">Interactive Dashboard Preview</p>
                  <p className="text-sm text-muted-foreground mt-2">Real-time analytics and property insights</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-h2 font-heading text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about getting started.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border-2 border-border rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  How much does Tenant Insights cost?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg">
                  We offer flexible pricing starting at $29/month for basic plans, with enterprise options available.
                  All plans include a 14-day free trial with no credit card required.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-2 border-border rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  Is my data secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg">
                  Absolutely. We use bank-level encryption, regular security audits, and comply with GDPR and CCPA regulations.
                  Your tenant data is protected with the highest security standards.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-2 border-border rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  Can I import my existing property data?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg">
                  Yes! We support CSV imports and integrations with popular property management software.
                  Our team can also help with custom data migration for enterprise clients.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-2 border-border rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  What kind of support do you offer?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg">
                  We provide 24/7 customer support, comprehensive documentation, video tutorials, and dedicated account managers for enterprise clients.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of landlords who trust Tenant Insights to manage their properties efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all duration-200">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border border-slate-600 text-slate-300 hover:bg-slate-800 transition-all duration-200">
                  Watch Demo
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>14-Day Free Trial</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Tenant Insights</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Revolutionizing property management with AI-powered insights and automated workflows.
                Join thousands of landlords who trust us with their rental business.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Security</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                © 2024 Tenant Insights. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
                <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
