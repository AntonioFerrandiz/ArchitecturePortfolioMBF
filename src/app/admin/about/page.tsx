import AdminNav from "@/components/admin/AdminNav";
import AboutForm from "@/components/admin/AboutForm";

export const dynamic = "force-dynamic";
import { createAdminClient } from "@/lib/supabase-server";
import { DEFAULT_ABOUT } from "@/types";
import { getTenantSlug } from "@/lib/tenant";

export default async function AboutAdminPage() {
  let about = DEFAULT_ABOUT;
  try {
    const tenant = getTenantSlug();
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("about")
      .select("*")
      .eq("tenant_slug", tenant)
      .limit(1)
      .single();
    if (data) about = data;
  } catch {
    // Si Supabase no está configurado, usamos los valores por defecto
  }

  return (
    <div className="md:flex min-h-screen">
      <AdminNav active="/admin/about" />

      <main className="flex-1 pt-14 md:pt-0 p-6 md:p-12">
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
