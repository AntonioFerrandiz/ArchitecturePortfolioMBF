"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { Loader2, Plus, X } from "lucide-react";
import type { DbAbout } from "@/types";

interface AboutFormProps {
  initial: DbAbout;
}

export default function AboutForm({ initial }: AboutFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<DbAbout>(initial);
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function set<K extends keyof DbAbout>(key: K, value: DbAbout[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addSkill() {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) {
      set("skills", [...form.skills, s]);
    }
    setSkillInput("");
  }

  function removeSkill(skill: string) {
    set("skills", form.skills.filter((s) => s !== skill));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error al guardar");
      setForm(json);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      router.refresh();
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
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3">
          ¡Cambios guardados correctamente!
        </div>
      )}

      {/* Identidad */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Nombre completo</label>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Maria Belen Ferrándiz"
          />
        </div>
        <div>
          <label className={labelClass}>Iniciales (para logo)</label>
          <input
            className={inputClass}
            value={form.initials}
            onChange={(e) => set("initials", e.target.value)}
            placeholder="MBF"
            maxLength={5}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Rol / Especialidad</label>
          <input
            className={inputClass}
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            placeholder="Arquitecta · Lima, Perú"
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Frase principal (Hero)</label>
          <input
            className={inputClass}
            value={form.subtitle}
            onChange={(e) => set("subtitle", e.target.value)}
            placeholder="Diseño espacios que dialogan con la luz…"
          />
        </div>
      </div>

      {/* Foto */}
      <div className="max-w-sm">
        <ImageUpload
          label="Foto de perfil"
          value={form.photo_url}
          onChange={(url) => set("photo_url", url)}
        />
      </div>

      {/* Bio */}
      <div>
        <label className={labelClass}>Biografía (sección Sobre mí)</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={6}
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          placeholder="Cuéntale al mundo quién eres y cuál es tu enfoque arquitectónico…"
        />
        <p className="text-xs text-[#C4BAB0] mt-1">
          Separa párrafos con una línea en blanco.
        </p>
      </div>

      {/* Skills */}
      <div>
        <label className={labelClass}>Áreas de enfoque</label>
        <div className="flex gap-2 mb-2">
          <input
            className={`${inputClass} flex-1`}
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); addSkill(); }
            }}
            placeholder="Ej: Diseño residencial"
          />
          <button
            type="button"
            onClick={addSkill}
            className="border border-[#C4BAB0] px-3 text-[#8C8279] hover:border-[#8C8279] transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1 text-xs border border-[#C4BAB0] text-[#8C8279] px-3 py-1"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-1 text-[#C4BAB0] hover:text-red-500"
                aria-label={`Quitar ${skill}`}
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Contacto */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <label className={labelClass}>LinkedIn — URL completa</label>
          <input
            type="url"
            className={inputClass}
            value={form.linkedin_url}
            onChange={(e) => set("linkedin_url", e.target.value)}
            placeholder="https://linkedin.com/in/…"
          />
        </div>
        <div>
          <label className={labelClass}>LinkedIn — texto visible</label>
          <input
            className={inputClass}
            value={form.linkedin_display}
            onChange={(e) => set("linkedin_display", e.target.value)}
            placeholder="linkedin.com/in/tu-perfil"
          />
        </div>
        <div>
          <label className={labelClass}>Instagram — URL completa</label>
          <input
            type="url"
            className={inputClass}
            value={form.instagram_url}
            onChange={(e) => set("instagram_url", e.target.value)}
            placeholder="https://instagram.com/…"
          />
        </div>
        <div>
          <label className={labelClass}>Instagram — texto visible</label>
          <input
            className={inputClass}
            value={form.instagram_display}
            onChange={(e) => set("instagram_display", e.target.value)}
            placeholder="@tu_cuenta"
          />
        </div>
      </div>

      {/* Guardar */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#2C2825] text-[#FAF8F5] text-xs tracking-[0.15em] uppercase px-8 py-3 hover:bg-[#3D3733] transition-colors disabled:opacity-60"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
