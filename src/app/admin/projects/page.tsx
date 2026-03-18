"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { DbProject } from "@/types";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setError("No se pudieron cargar los proyectos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      setProjects((p) => p.filter((pr) => pr.id !== id));
    } catch {
      setError("Error al eliminar el proyecto.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="md:flex min-h-screen">
      <AdminNav active="/admin/projects" />

      <main className="flex-1 pt-14 md:pt-0 p-6 md:p-12">
        <div className="max-w-5xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-light text-[#2C2825]">
                Proyectos
              </h1>
              <p className="text-[#9B8E82] text-sm mt-1">
                {projects.length} proyecto{projects.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Link
              href="/admin/projects/new"
              className="self-start sm:self-auto flex items-center gap-2 bg-[#2C2825] text-[#FAF8F5] text-xs tracking-[0.15em] uppercase px-5 py-3 hover:bg-[#3D3733] transition-colors"
            >
              <Plus size={14} />
              Nuevo proyecto
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-24 text-[#C4BAB0]">
              <Loader2 size={24} className="animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-[#E8E0D5]">
              <p className="text-[#9B8E82] text-sm mb-4">
                Aún no tienes proyectos
              </p>
              <Link
                href="/admin/projects/new"
                className="text-xs tracking-[0.15em] uppercase text-[#2C2825] border-b border-[#2C2825] pb-0.5"
              >
                Crear el primero
              </Link>
            </div>
          ) : (
            <div className="bg-white border border-[#E8E0D5] overflow-hidden">
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className={`flex items-start gap-3 p-4 ${
                    i !== 0 ? "border-t border-[#F4F0EB]" : ""
                  } hover:bg-[#FAF8F5] transition-colors`}
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-11 md:w-16 md:h-12 relative shrink-0 bg-[#E8E0D5] overflow-hidden">
                    {project.cover_image && (
                      <Image
                        src={project.cover_image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                  </div>

                  {/* Info + acciones */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#2C2825] truncate">
                        {project.title}
                      </span>
                      {project.featured && (
                        <Star size={12} className="text-amber-400 shrink-0" fill="currentColor" />
                      )}
                    </div>
                    <p className="text-xs text-[#9B8E82] mt-0.5">
                      {project.category} · {project.location} · {project.year}
                    </p>
                    {/* Acciones — debajo en móvil, en línea en desktop */}
                    <div className="flex items-center gap-2 mt-2 md:mt-0 md:hidden">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="flex items-center gap-1 text-xs text-[#8C8279] hover:text-[#2C2825] border border-[#E8E0D5] hover:border-[#8C8279] px-2.5 py-1.5 transition-colors"
                      >
                        <Pencil size={11} />
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        disabled={deleting === project.id}
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 border border-[#E8E0D5] hover:border-red-300 px-2.5 py-1.5 transition-colors disabled:opacity-50"
                      >
                        {deleting === project.id ? (
                          <Loader2 size={11} className="animate-spin" />
                        ) : (
                          <Trash2 size={11} />
                        )}
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {/* Acciones desktop */}
                  <div className="hidden md:flex items-center gap-2 shrink-0">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="flex items-center gap-1.5 text-xs text-[#8C8279] hover:text-[#2C2825] border border-[#E8E0D5] hover:border-[#8C8279] px-3 py-1.5 transition-colors"
                    >
                      <Pencil size={12} />
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      disabled={deleting === project.id}
                      className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 border border-[#E8E0D5] hover:border-red-300 px-3 py-1.5 transition-colors disabled:opacity-50"
                      aria-label={`Eliminar ${project.title}`}
                    >
                      {deleting === project.id ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Trash2 size={12} />
                      )}
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
