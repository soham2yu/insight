"use client"

import type React from "react"

import DashboardNav from "@/components/dashboard-nav"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useProfile } from "@/hooks/useProfile"
import { useAuth } from "@/hooks/useAuth"

export default function ProfilePage() {
  const { user } = useAuth()
  const { profile, loading, error, updateProfile } = useProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        company: profile.company || "",
        address: profile.address || "",
      })
    }
  }, [profile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    const { error } = await updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      address: formData.address,
    })

    if (error) {
      setSaveMessage("Failed to update profile")
    } else {
      setSaveMessage("Profile updated successfully!")
      setIsEditing(false)
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">Profile Settings</h1>

            {saveMessage && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-green-700">{saveMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Avatar Section */}
              <Card className="p-6 lg:col-span-1">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {formData.name ? formData.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-foreground text-center">
                    {loading ? 'Loading...' : formData.name || 'No name set'}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {loading ? 'Loading...' : formData.email || 'No email set'}
                  </p>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Change Avatar
                  </Button>
                </div>
              </Card>

              {/* Profile Form Section */}
              <Card className="p-6 lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    disabled={loading}
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Security Section */}
            <Card className="p-6 mt-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Security</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-foreground">Password</p>
                    <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
