import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://glphpjmmkvtxopmcqwak.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscGhwam1ta3Z0eG9wbWNxd2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMzkwMDcsImV4cCI6MjA3NzkxNTAwN30.-V_lfLyTlBQOPcwFg2Pt-83aiWGyOpMT6VsRYBl5XTs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
