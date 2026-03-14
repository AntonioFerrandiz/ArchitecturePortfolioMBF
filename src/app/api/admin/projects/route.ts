import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

// GET /api/admin/projects — obtener todos los proyectos
export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener proyectos" }, { status: 500 });
  }
}

// POST /api/admin/projects — crear nuevo proyecto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    // Obtener el índice máximo para agregar al final
    const { data: last } = await supabase
      .from("projects")
      .select("order_index")
      .order("order_index", { ascending: false })
      .limit(1)
      .single();

    const orderIndex = last ? last.order_index + 1 : 0;

    const { data, error } = await supabase
      .from("projects")
      .insert({
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
