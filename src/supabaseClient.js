import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project-id")) {
  console.warn(
    "Supabase configuration is incomplete or using placeholder values. " +
    "Please update VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your local .env file."
  );
}

// Fallback to avoid crash if env vars are not set yet
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);
