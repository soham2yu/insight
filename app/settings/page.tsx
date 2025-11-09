"use client"

import DashboardNav from "@/components/dashboard-nav"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Palette, Database } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Data
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button>Save Changes</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Company Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue="ABC Property Management" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyAddress">Address</Label>
                      <Input id="companyAddress" defaultValue="123 Main St, City, State 12345" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button>Update Company Info</Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Lease Renewals</h3>
                        <p className="text-sm text-muted-foreground">Get notified about upcoming lease renewals</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Maintenance Requests</h3>
                        <p className="text-sm text-muted-foreground">Receive alerts for new maintenance issues</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Payment Reminders</h3>
                        <p className="text-sm text-muted-foreground">Notifications for overdue payments</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive email summaries</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Password & Security</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enable 2FA</h3>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Theme & Display</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select defaultValue="system">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">Eastern Time</SelectItem>
                          <SelectItem value="pst">Pacific Time</SelectItem>
                          <SelectItem value="gmt">GMT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Data Management</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Export Data</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Download all your property and tenant data
                      </p>
                      <Button variant="outline">Export All Data</Button>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2 text-destructive">Danger Zone</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete your account and all associated data
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
