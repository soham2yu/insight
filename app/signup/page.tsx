"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { SignUpPage } from "@/components/sign-up-page"
import { signup, signupWithGoogle } from "@/lib/auth"

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    const { user, error: authError } = await signup(email, password, name)

    if (authError) {
      setError(authError)
    } else if (user) {
      router.push("/complete-profile")
    }

    setIsLoading(false)
  }

  const handleGoogleSignUp = async () => {
    setError("")
    setIsLoading(true)

    const { user, error: authError } = await signupWithGoogle()

    if (authError) {
      setError(authError)
    } else if (user) {
      router.push("/complete-profile")
    }

    setIsLoading(false)
  }

  const handleSignIn = () => {
    router.push("/login")
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
    <SignUpPage
      title="Get Started"
      description="Create your account and start managing properties"
      heroImageSrc="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
      testimonials={testimonials}
      onSignUp={handleSignUp}
      onGoogleSignUp={handleGoogleSignUp}
      onSignIn={handleSignIn}
      error={error}
      isLoading={isLoading}
    />
  )
}
