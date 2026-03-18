import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { getTenantSlug } from "@/lib/tenant";

// GET /api/admin/projects — obtener todos los proyectos del tenant
export async function GET() {
  try {
    const tenant = getTenantSlug();
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("tenant_slug", tenant)
      .order("order_index", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener proyectos" }, { status: 500 });
  }
}

// POST /api/admin/projects — crear nuevo proyecto para el tenant
export async function POST(request: NextRequest) {
  try {
    const tenant = getTenantSlug();
    const body = await request.json();
    const supabase = createAdminClient();

    // Obtener el índice máximo para este tenant
    const { data: last } = await supabase
      .from("projects")
      .select("order_index")
      .eq("tenant_slug", tenant)
      .order("order_index", { ascending: false })
      .limit(1)
      .single();

    const orderIndex = last ? last.order_index + 1 : 0;

    const { data, error } = await supabase
      .from("projects")
      .insert({
        tenant_slug: tenant,
        title: body.title,
        location: body.location,
        year: body.year,
        category: body.category,
        cover_image: body.cover_image,
        images: body.images ?? [],
        description: body.description,
        full_description: body.full_description,
        tags: body.tags ?? [],
        featured: body.featured ?? false,
        order_index: orderIndex,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al crear proyecto" }, { status: 500 });
  }
}
