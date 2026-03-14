"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { Loader2, Plus, X } from "lucide-react";

interface ProjectFormData {
  title: string;
  location: string;
  year: string;
  category: string;
  cover_image: string;
  images: string[];
  description: string;
  full_description: string;
  tags: string[];
  featured: boolean;
}

const CATEGORIES = ["Residencial", "Comercial", "Cultural", "Paisajismo", "Urbanismo", "Otro"];
const EMPTY: ProjectFormData = {
  title: "",
  location: "",
  year: new Date().getFullYear().toString(),
  category: "Residencial",
  cover_image: "",
  images: [],
  description: "",
  full_description: "",
  tags: [],
  featured: false,
};

interface ProjectFormProps {
  projectId?: string;
  initial?: Partial<ProjectFormData>;
}

export default function ProjectForm({ projectId, initial }: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormData>({ ...EMPTY, ...initial });
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function set<K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      set("tags", [...form.tags, t]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    set("tags", form.tags.filter((t) => t !== tag));
  }

  function addGalleryImage(url: string) {
    if (url && !form.images.includes(url)) {
      set("images", [...form.images, url]);
    }
  }

  function removeGalleryImage(url: string) {
    set("images", form.images.filter((i) => i !== url));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!form.title.trim()) return setError("El título es obligatorio.");
    if (!form.cover_image) return setError("La imagen de portada es obligatoria.");

    setSaving(true);
    try {
      const url = projectId
        ? `/api/admin/projects/${projectId}`
        : "/api/admin/projects";
      const method = projectId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error al guardar");

      setSuccess(true);
      setTimeout(() => router.push("/admin/projects"), 1000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full bg-white border border-[#E8E0D5] text-[#2C2825] text-sm px-3 py-2.5 focus:outline-none focus:border-[#8C8279] placeholder:text-[#C4BAB0]";
  const labelClass = "block text-xs tracking-[0.12em] uppercase text-[#8C8279] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Mensajes */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3">
          ¡Guardado correctamente! Redirigiendo…
        </div>
      )}

      {/* Datos básicos */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Título *</label>
          <input
            className={inputClass}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Casa Horizonte"
          />
        </div>
        <div>
          <label className={labelClass}>Ubicación</label>
          <input
            className={inputClass}
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="Lima, Perú"
          />
        </div>
        <div>
          <label className={labelClass}>Año</label>
          <input
            className={inputClass}
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
            placeholder="2024"
            maxLength={4}
          />
        </div>
        <div>
          <label className={labelClass}>Categoría</label>
          <select
            className={inputClass}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Imagen de portada */}
      <ImageUpload
        label="Imagen de portada *"
        value={form.cover_image}
        onChange={(url) => set("cover_image", url)}
      />

      {/* Galería adicional */}
      <div>
        <label className={labelClass}>
          Imágenes adicionales ({form.images.length})
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {form.images.map((img, i) => (
            <div key={i} className="relative aspect-video group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`Imagen ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(img)}
                className="absolute top-1 right-1 bg-red-600 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Eliminar"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {/* Agregar imagen adicional */}
          <div className="aspect-video">
            <ImageUpload
              label=""
              value=""
              onChange={(url) => { if (url) addGalleryImage(url); }}
            />
          </div>
        </div>
      </div>

      {/* Descripciones */}
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Descripción corta (para la tarjeta)</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={2}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Vivienda unifamiliar con enfoque bioclimático."
          />
        </div>
        <div>
          <label className={labelClass}>Descripción completa (para el detalle)</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={5}
            value={form.full_description}
            onChange={(e) => set("full_description", e.target.value)}
            placeholder="Descripción detallada del proyecto…"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className={labelClass}>Etiquetas</label>
        <div className="flex gap-2 mb-2">
          <input
            className={`${inputClass} flex-1`}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); addTag(); }
            }}
            placeholder="Ej: Bioclimático"
          />
          <button
            type="button"
            onClick={addTag}
            className="border border-[#C4BAB0] px-3 text-[#8C8279] hover:border-[#8C8279] transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-xs border border-[#C4BAB0] text-[#8C8279] px-3 py-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-[#C4BAB0] hover:text-red-500"
                aria-label={`Quitar ${tag}`}
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Proyecto destacado */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => set("featured", e.target.checked)}
          className="w-4 h-4 accent-[#2C2825]"
        />
        <span className="text-sm text-[#5A534E]">Marcar como proyecto destacado</span>
      </label>

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#2C2825] text-[#FAF8F5] text-xs tracking-[0.15em] uppercase px-8 py-3 hover:bg-[#3D3733] transition-colors disabled:opacity-60"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          {saving ? "Guardando…" : projectId ? "Guardar cambios" : "Crear proyecto"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="text-xs tracking-[0.15em] uppercase px-6 py-3 border border-[#C4BAB0] text-[#8C8279] hover:border-[#8C8279] transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
