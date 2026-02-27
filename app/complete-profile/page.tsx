"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useProfile } from "@/hooks/useProfile"

export default function CompleteProfilePage() {
  const { user } = useAuth()
  const { profile, loading, error, updateProfile } = useProfile()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
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

  // Redirect if not authenticated
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setSaveMessage("")

    const { error } = await updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      address: formData.address,
    })

    if (error) {
      setSaveMessage("Failed to save profile. Please try again.")
    } else {
      setSaveMessage("Profile completed successfully!")
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }

    setIsLoading(false)
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Tell us a bit more about yourself to get the most out of your experience
          </p>
        </div>

        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            saveMessage.includes("successfully")
              ? "bg-green-500/10 border border-green-500/20"
              : "bg-red-500/10 border border-red-500/20"
          }`}>
            <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
              saveMessage.includes("successfully") ? "text-green-600" : "text-red-600"
            }`} />
            <span className={`text-sm ${
              saveMessage.includes("successfully") ? "text-green-700" : "text-red-700"
            }`}>
              {saveMessage}
            </span>
          </div>
        )}

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2"
                  placeholder="Enter your email"
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
                  className="mt-2"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-2"
                  placeholder="Enter your company name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="mt-2"
                placeholder="Enter your address"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                className="flex-1"
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Skip for Now
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Complete Profile"}
              </Button>
            </div>
          </form>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            You can always update your profile later from the settings page
          </p>
        </div>
      </div>
    </div>
  )
}
