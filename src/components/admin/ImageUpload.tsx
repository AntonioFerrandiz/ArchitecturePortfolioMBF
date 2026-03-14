"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Imagen",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error al subir");
      onChange(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <label className="block text-xs tracking-[0.12em] uppercase text-[#8C8279] mb-2">
        {label}
      </label>

      {value ? (
        <div className="relative group w-full aspect-video rounded-sm overflow-hidden bg-[#E8E0D5]">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            sizes="400px"
            unoptimized={value.startsWith("blob:")}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="opacity-0 group-hover:opacity-100 bg-[#FAF8F5] text-[#2C2825] text-xs px-4 py-2 transition-opacity"
            >
              Cambiar
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="opacity-0 group-hover:opacity-100 bg-red-600 text-white p-2 transition-opacity"
              aria-label="Eliminar imagen"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-[#C4BAB0] hover:border-[#8C8279] transition-colors cursor-pointer aspect-video flex flex-col items-center justify-center gap-2 bg-[#FAF8F5]"
        >
          {uploading ? (
            <Loader2 size={24} className="animate-spin text-[#8C8279]" />
          ) : (
            <>
              <Upload size={24} className="text-[#C4BAB0]" />
              <p className="text-xs text-[#9B8E82] text-center px-4">
                Haz clic o arrastra una imagen aquí
                <br />
                <span className="text-[#C4BAB0]">JPG, PNG, WEBP · máx. 8 MB</span>
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
