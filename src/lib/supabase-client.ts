
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const supabaseUrl = 'https://jniqpfmzaimktkvgjgfr.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuaXFwZm16YWlta3RrdmdqZ2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMzkyNzYsImV4cCI6MjA1NzkxNTI3Nn0.bXYtNJq85vYexN56b4BFGOSSKNZhvC-uQGGcn3SxH4o'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export type SupabaseClient = typeof supabase
