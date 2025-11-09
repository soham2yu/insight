import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'

interface Profile {
  id: string
  email: string
  name: string
  phone?: string
  company?: string
  address?: string
  created_at: string
}

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchProfile()
    } else {
      setProfile(null)
      setLoading(false)
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.uid)
        .single()

      if (error) {
        setError(error.message)
      } else {
        setProfile(data)
      }
    } catch (err) {
      setError('Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return { error: 'No user or profile found' }

    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.uid)

      if (error) {
        return { error: error.message }
      }

      // Update local state
      setProfile({ ...profile, ...updates })
      return { error: null }
    } catch (err) {
      return { error: 'Failed to update profile' }
    }
  }

  return { profile, loading, error, updateProfile, refetch: fetchProfile }
}
