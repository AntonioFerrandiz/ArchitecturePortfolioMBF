import AdminNav from "@/components/admin/AdminNav";
import { FolderOpen, User, ExternalLink } from "lucide-react";

export default async function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <AdminNav active="/admin/dashboard" />

      <main className="flex-1 p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl font-light text-[#2C2825] mb-2">
            Bienvenida 👋
          </h1>
          <p className="text-[#8C8279] text-sm mb-12">
            Desde aquí puedes gestionar todo el contenido de tu portafolio.
          </p>

          {/* Cards de acceso rápido */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <a
              href="/admin/projects"
              className="group bg-white border border-[#E8E0D5] p-6 hover:border-[#8C8279] transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#F4F0EB] flex items-center justify-center">
                  <FolderOpen size={18} className="text-[#8C8279]" />
                </div>
                <h2 className="text-sm font-medium text-[#2C2825] tracking-wide">
                  Proyectos
                </h2>
              </div>
              <p className="text-xs text-[#9B8E82] leading-relaxed">
                Añade, edita o elimina proyectos de tu portafolio. Cada proyecto
                incluye imágenes, descripción, ubicación y más.
              </p>
            </a>

            <a
              href="/admin/about"
              className="group bg-white border border-[#E8E0D5] p-6 hover:border-[#8C8279] transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#F4F0EB] flex items-center justify-center">
                  <User size={18} className="text-[#8C8279]" />
                </div>
                <h2 className="text-sm font-medium text-[#2C2825] tracking-wide">
                  Sobre mí
                </h2>
              </div>
              <p className="text-xs text-[#9B8E82] leading-relaxed">
                Actualiza tu foto, biografía, áreas de enfoque y datos de
                contacto (email, LinkedIn, Instagram).
              </p>
            </a>
          </div>

          {/* Ver portafolio */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[#8C8279] hover:text-[#2C2825] transition-colors border-b border-[#E8E0D5] hover:border-[#8C8279] pb-0.5"
          >
            <ExternalLink size={13} />
            Ver portafolio público
          </a>
        </div>
      </main>
    </div>
  );
}
