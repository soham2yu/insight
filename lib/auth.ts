import { auth } from './firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { supabase } from './supabase'

const formatAuthError = (error: any) => {
  const code = error?.code || ''
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/email-already-in-use':
      return 'This email is already registered. Try signing in instead.'
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 8 characters.'
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completion.'
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.'
    default:
      return error?.message || 'Authentication failed. Please try again.'
  }
}

const getSafeErrorMessage = (error: any, fallback: string) => {
  if (!error) return fallback
  if (typeof error === 'string') return error
  if (typeof error?.message === 'string' && error.message.trim()) return error.message
  if (typeof error?.error_description === 'string' && error.error_description.trim()) return error.error_description

  try {
    const serialized = JSON.stringify(error)
    if (serialized && serialized !== '{}') {
      return serialized
    }
  } catch {
    // ignore serialization errors
  }

  return fallback
}

const ensureSupabaseUserProfile = async (user: User) => {
  const email = user.email || user.providerData?.find((p) => p?.email)?.email || null
  if (!email) {
    return { error: 'No email was returned by your Google account. Please use a Google account with an email address.' }
  }

  const payload = {
    id: user.uid,
    email,
    name: user.displayName || email.split('@')[0],
  }

  const { error } = await supabase
    .from('users')
    .upsert([payload], { onConflict: 'id' })

  if (!error) return { error: null }

  const { data: existingById } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.uid)
    .maybeSingle()

  if (existingById?.id) {
    return { error: null }
  }

  const { data: existingByEmail } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (existingByEmail?.id && existingByEmail.id !== user.uid) {
    return {
      error:
        'An account already exists for this email with a different sign-in method. Please sign in with your original method and link Google from profile settings.',
    }
  }

  return { error: getSafeErrorMessage(error, 'Unable to sync your profile right now. Please try again.') }
}

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error: any) {
    return { user: null, error: formatAuthError(error) }
  }
}

export const signup = async (email: string, password: string, name: string) => {
  let user = null

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    user = userCredential.user

    // Create user profile in Supabase with minimal data
    const { error } = await supabase
      .from('users')
      .insert([
        {
          id: user.uid,
          email: user.email,
          name: name,
          created_at: new Date().toISOString(),
        }
      ])

    if (error) {
      console.error('Error creating user profile:', error.message || error)
      // If profile creation fails, delete the Firebase user to maintain consistency
      if (user) {
        try {
          await user.delete()
        } catch (deleteError) {
          console.error('Error deleting Firebase user after Supabase failure:', deleteError)
        }
      }
      return { user: null, error: `Failed to create user profile: ${error.message || 'Unknown error'}` }
    }

    return { user, error: null }
  } catch (error: any) {
    // If Firebase user was created but something else failed, clean it up
    if (user) {
      try {
        await user.delete()
      } catch (deleteError) {
        console.error('Error deleting Firebase user after failure:', deleteError)
      }
    }
    return { user: null, error: formatAuthError(error) }
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const { error } = await ensureSupabaseUserProfile(user)
    if (error) {
      console.error('Error upserting user profile:', error)
      return { user: null, error }
    }

    return { user, error: null }
  } catch (error: any) {
    return { user: null, error: formatAuthError(error) }
  }
}

export const signupWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const { error } = await ensureSupabaseUserProfile(user)
    if (error) {
      console.error('Error upserting user profile:', error)
      return { user: null, error }
    }

    return { user, error: null }
  } catch (error: any) {
    return { user: null, error: formatAuthError(error) }
  }
}
