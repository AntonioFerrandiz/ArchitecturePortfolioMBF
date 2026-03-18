import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase-server";
import { getTenantSlugSafe } from "@/lib/tenant";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = createAdminClient();
    const tenant = getTenantSlugSafe();
    const { data } = await supabase
      .from("about")
      .select("initials, name")
      .eq("tenant_slug", tenant)
      .limit(1)
      .single();
    const label = data?.initials ?? data?.name ?? "Admin";
    return {
      title: `Admin — ${label} Arquitectura`,
      robots: "noindex, nofollow",
    };
  } catch {
    return { title: "Admin — Arquitectura", robots: "noindex, nofollow" };
  }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F0EB] font-sans">
      {children}
    </div>
  );
}
