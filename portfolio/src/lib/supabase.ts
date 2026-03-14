import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Solo crea el cliente si ambas variables están presentes
let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!_supabase) _supabase = createClient(url, anonKey);
  return _supabase;
}

// Alias para compatibilidad: puede ser null si no hay config
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export function isSupabaseConfigured() {
  return !!(url && anonKey);
}
