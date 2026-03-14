import AdminNav from "@/components/admin/AdminNav";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="flex min-h-screen">
      <AdminNav active="/admin/projects" />

      <main className="flex-1 p-8 md:p-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-light text-[#2C2825] mb-2">
            Nuevo proyecto
          </h1>
          <p className="text-[#9B8E82] text-sm mb-10">
            Completa los datos del proyecto. Puedes editar todo esto después.
          </p>
          <ProjectForm />
        </div>
      </main>
    </div>
  );
}
