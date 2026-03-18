import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { DEFAULT_ABOUT } from "@/types";
import { getTenantSlugSafe } from "@/lib/tenant";

export const revalidate = 60;

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(DEFAULT_ABOUT);
  }
  try {
    const tenant = getTenantSlugSafe();
    const supabase = getSupabase()!;
    const { data, error } = await supabase
      .from("about")
      .select("*")
      .eq("tenant_slug", tenant)
      .limit(1)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return NextResponse.json(data ?? DEFAULT_ABOUT);
  } catch {
    return NextResponse.json(DEFAULT_ABOUT);
  }
}
