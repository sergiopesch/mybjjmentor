
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Use the same client that's defined in the integration path
import { supabase as supabaseClient } from '@/integrations/supabase/client';

export const supabase = supabaseClient;
