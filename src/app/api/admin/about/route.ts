import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { DEFAULT_ABOUT } from "@/types";
import { getTenantSlug } from "@/lib/tenant";

// GET /api/admin/about
export async function GET() {
  try {
    const tenant = getTenantSlug();
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("about")
      .select("*")
      .eq("tenant_slug", tenant)
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return NextResponse.json(data ?? DEFAULT_ABOUT);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  }
}

// PUT /api/admin/about
export async function PUT(request: NextRequest) {
  try {
    const tenant = getTenantSlug();
    const body = await request.json();
    const supabase = createAdminClient();

    // Verificar si ya existe un registro para este tenant
    const { data: existing } = await supabase
      .from("about")
      .select("id")
      .eq("tenant_slug", tenant)
      .limit(1)
      .single();

    let result;
    if (existing?.id) {
      // Actualizar registro existente del tenant
      const { data, error } = await supabase
        .from("about")
        .update({
          name: body.name,
          initials: body.initials,
          role: body.role,
          subtitle: body.subtitle,
          bio: body.bio,
          photo_url: body.photo_url,
          skills: body.skills ?? [],
          email: body.email,
          linkedin_url: body.linkedin_url,
          linkedin_display: body.linkedin_display,
          instagram_url: body.instagram_url,
          instagram_display: body.instagram_display,
        })
        .eq("id", existing.id)
        .eq("tenant_slug", tenant)
        .select()
        .single();
      if (error) throw error;
      result = data;
    } else {
      // Insertar primer registro para este tenant
      const { data, error } = await supabase
        .from("about")
        .insert({
          tenant_slug: tenant,
          name: body.name,
          initials: body.initials,
          role: body.role,
          subtitle: body.subtitle,
          bio: body.bio,
          photo_url: body.photo_url,
          skills: body.skills ?? [],
          email: body.email,
          linkedin_url: body.linkedin_url,
          linkedin_display: body.linkedin_display,
          instagram_url: body.instagram_url,
          instagram_display: body.instagram_display,
        })
        .select()
        .single();
      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al guardar datos" }, { status: 500 });
  }
}
