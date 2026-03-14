import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { DEFAULT_ABOUT } from "@/types";

export const revalidate = 60;

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(DEFAULT_ABOUT);
  }
  try {
    const supabase = getSupabase()!;
    const { data, error } = await supabase.from("about").select("*").limit(1).single();
    if (error && error.code !== "PGRST116") throw error;
    return NextResponse.json(data ?? DEFAULT_ABOUT);
  } catch {
    return NextResponse.json(DEFAULT_ABOUT);
  }
}
