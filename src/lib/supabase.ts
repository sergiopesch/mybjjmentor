
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Use the correct values from our Supabase project
const supabaseUrl = 'https://jniqpfmzaimktkvgjgfr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuaXFwZm16YWlta3RrdmdqZ2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMzkyNzYsImV4cCI6MjA1NzkxNTI3Nn0.bXYtNJq85vYexN56b4BFGOSSKNZhvC-uQGGcn3SxH4o';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
