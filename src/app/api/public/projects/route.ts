import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { projects as staticProjects } from "@/data/projects";
import { getTenantSlugSafe } from "@/lib/tenant";

export const revalidate = 60;

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(staticProjects);
  }
  try {
    const tenant = getTenantSlugSafe();
    const supabase = getSupabase()!;
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("tenant_slug", tenant)
      .order("order_index", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data && data.length > 0 ? data : staticProjects);
  } catch {
    return NextResponse.json(staticProjects);
  }
}
