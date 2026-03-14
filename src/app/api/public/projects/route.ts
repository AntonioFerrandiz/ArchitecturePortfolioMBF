import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { projects as staticProjects } from "@/data/projects";

export const revalidate = 60;

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(staticProjects);
  }
  try {
    const supabase = getSupabase()!;
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data && data.length > 0 ? data : staticProjects);
  } catch {
    return NextResponse.json(staticProjects);
  }
}
