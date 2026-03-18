import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { getTenantSlug } from "@/lib/tenant";

// GET /api/admin/projects/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tenant = getTenantSlug();
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("tenant_slug", tenant)
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener proyecto" }, { status: 500 });
  }
}

// PUT /api/admin/projects/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tenant = getTenantSlug();
    const body = await request.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("projects")
      .update({
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
      })
      .eq("id", id)
      .eq("tenant_slug", tenant)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al actualizar proyecto" }, { status: 500 });
  }
}

// DELETE /api/admin/projects/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tenant = getTenantSlug();
    const supabase = createAdminClient();

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .eq("tenant_slug", tenant);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al eliminar proyecto" }, { status: 500 });
  }
}
