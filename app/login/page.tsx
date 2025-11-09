"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { SignInPage } from "@/components/sign-in-page"
import { loginWithGoogle } from "@/lib/auth"
import { login } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const { user, error: authError } = await login(email, password)

    if (authError) {
      setError(authError)
    } else if (user) {
      // Check if user has completed their profile
      const { data: profile } = await supabase
        .from('users')
        .select('name, phone, company, address')
        .eq('id', user.uid)
        .single()

      // If profile is incomplete (missing required fields), redirect to complete profile
      if (!profile?.name) {
        router.push("/complete-profile")
      } else {
        router.push("/dashboard")
      }
    }

    setIsLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setIsLoading(true)

    const { user, error: authError } = await loginWithGoogle()

    if (authError) {
      setError(authError)
    } else if (user) {
      // Check if user has completed their profile
      const { data: profile } = await supabase
        .from('users')
        .select('name, phone, company, address')
        .eq('id', user.uid)
        .single()

      // If profile is incomplete (missing required fields), redirect to complete profile
      if (!profile?.name) {
        router.push("/complete-profile")
      } else {
        router.push("/dashboard")
      }
    }

    setIsLoading(false)
  }

  const handleResetPassword = () => {
    // Implement reset password logic here
    console.log("Reset password clicked")
  }

  const handleCreateAccount = () => {
    router.push("/signup")
  }

  const testimonials = [
    {
      avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      name: "John Smith",
      handle: "@johnsmith",
      text: "This platform has revolutionized how I manage my properties. Highly recommended!",
    },
    {
      avatarSrc: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      name: "Sarah Johnson",
      handle: "@sarahj",
      text: "The analytics and tenant insights are game-changing for property management.",
    },
    {
      avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      name: "Mike Davis",
      handle: "@miked",
      text: "Streamlined maintenance tracking saves me hours every week.",
    },
  ]

  return (
    <SignInPage
      title="Welcome Back"
      description="Access your account and continue managing your properties"
      heroImageSrc="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
      testimonials={testimonials}
      onSignIn={handleSignIn}
      onGoogleSignIn={handleGoogleSignIn}
      onResetPassword={handleResetPassword}
      onCreateAccount={handleCreateAccount}
      error={error}
      isLoading={isLoading}
    />
  )
}
