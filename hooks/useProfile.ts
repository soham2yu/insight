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
        .maybeSingle()

      if (error) {
        setError(error.message)
      } else if (!data) {
        const bootstrapProfile = {
          id: user.uid,
          email: user.email || '',
          name: user.displayName || user.email?.split('@')[0] || '',
        }

        const { data: createdProfile, error: createError } = await supabase
          .from('users')
          .upsert([bootstrapProfile], { onConflict: 'id' })
          .select('*')
          .maybeSingle()

        if (createError) {
          setError(createError.message)
        } else {
          setProfile(createdProfile)
          setError(null)
        }
      } else {
        setProfile(data)
        setError(null)
      }
    } catch (err) {
      setError('Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No authenticated user found' }

    try {
      const baseProfile = {
        id: user.uid,
        email: updates.email || profile?.email || user.email || '',
        name: updates.name || profile?.name || user.displayName || user.email?.split('@')[0] || '',
      }

      const payload = {
        ...baseProfile,
        ...updates,
      }

      const { data, error } = await supabase
        .from('users')
        .upsert([payload], { onConflict: 'id' })
        .select('*')
        .maybeSingle()

      if (error) {
        return { error: error.message }
      }

      // Update local state
      if (data) {
        setProfile(data)
      }
      return { error: null }
    } catch (err) {
      return { error: 'Failed to update profile' }
    }
  }

  return { profile, loading, error, updateProfile, refetch: fetchProfile }
}
