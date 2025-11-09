import { auth } from './firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { supabase } from './supabase'

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
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
    return { user: null, error: error.message || 'Failed to create account' }
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

    // Upsert user profile in Supabase
    const { error } = await supabase
      .from('users')
      .upsert([
        {
          id: user.uid,
          email: user.email,
          name: user.displayName || user.email?.split('@')[0],
        }
      ], { onConflict: 'id' })

    if (error) {
      console.error('Error upserting user profile:', error)
      return { user: null, error: `Failed to upsert user profile: ${error.message || 'Unknown error'}` }
    }

    return { user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

export const signupWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // Upsert user profile in Supabase (use upsert for consistency and to handle existing users)
    const { error } = await supabase
      .from('users')
      .upsert([
        {
          id: user.uid,
          email: user.email,
          name: user.displayName || user.email?.split('@')[0],
        }
      ], { onConflict: 'id' })

    if (error) {
      console.error('Error upserting user profile:', error)
      return { user: null, error: `Failed to upsert user profile: ${error.message || 'Unknown error'}` }
    }

    return { user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}
