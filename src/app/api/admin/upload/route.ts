import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE_MB = 8;

// POST /api/admin/upload — subir imagen al bucket de Supabase Storage
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se envió ningún archivo" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido. Usa JPG, PNG, WEBP o AVIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: `El archivo supera el máximo de ${MAX_SIZE_MB}MB` },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    // Nombre único y sin información sensible
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { data, error } = await supabase.storage
      .from("portfolio-images")
      .upload(fileName, file, { contentType: file.type, upsert: false });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio-images").getPublicUrl(data.path);

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al subir la imagen" }, { status: 500 });
  }
}
