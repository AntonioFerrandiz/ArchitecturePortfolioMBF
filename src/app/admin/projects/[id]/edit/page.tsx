import { notFound } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import ProjectForm from "@/components/admin/ProjectForm";
import { createAdminClient } from "@/lib/supabase-server";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;

  let project = null;
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();
    project = data;
  } catch {
    // Supabase no configurado — se puede editar igual con form vacío
  }

  if (project === undefined) notFound();

  // Mapear snake_case → camelCase para el formulario
  const initial = project
    ? {
        title: project.title,
        location: project.location,
        year: project.year,
        category: project.category,
        cover_image: project.cover_image,
        images: project.images ?? [],
        description: project.description,
        full_description: project.full_description,
        tags: project.tags ?? [],
        featured: project.featured ?? false,
      }
    : undefined;

  return (
    <div className="flex min-h-screen">
      <AdminNav active="/admin/projects" />

      <main className="flex-1 p-8 md:p-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-light text-[#2C2825] mb-2">
            Editar proyecto
          </h1>
          {project && (
            <p className="text-[#9B8E82] text-sm mb-10">{project.title}</p>
          )}
          <ProjectForm projectId={id} initial={initial} />
        </div>
      </main>
    </div>
  );
}
