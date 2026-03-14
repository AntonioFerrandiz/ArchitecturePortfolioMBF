import AdminNav from "@/components/admin/AdminNav";
import AboutForm from "@/components/admin/AboutForm";
import { createAdminClient } from "@/lib/supabase-server";
import { DEFAULT_ABOUT } from "@/types";

export default async function AboutAdminPage() {
  let about = DEFAULT_ABOUT;
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("about").select("*").limit(1).single();
    if (data) about = data;
  } catch {
    // Si Supabase no está configurado, usamos los valores por defecto
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav active="/admin/about" />

      <main className="flex-1 p-8 md:p-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-light text-[#2C2825] mb-2">
            Sobre mí
          </h1>
          <p className="text-[#9B8E82] text-sm mb-10">
            Actualiza tu información personal, foto y datos de contacto.
            Los cambios se reflejarán en el portafolio inmediatamente.
          </p>
          <AboutForm initial={about} />
        </div>
      </main>
    </div>
  );
}
