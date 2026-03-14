"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImage, setCurrentImage] = useState(0);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const prevImage = () =>
    setCurrentImage((i) => (i === 0 ? project.images.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentImage((i) => (i === project.images.length - 1 ? 0 : i + 1));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2C2825]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative bg-[#FAF8F5] w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10"
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-5 right-5 z-20 text-[#8C8279] hover:text-[#2C2825] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Galería de imágenes */}
        <div className="relative aspect-[16/9] bg-[#E8E0D5] overflow-hidden">
          {project.images[currentImage] ? (
            <Image
              src={project.images[currentImage]}
              alt={`${project.title} — imagen ${currentImage + 1}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[#C4BAB0] text-xs tracking-widest uppercase">Sin imagen</span>
            </div>
          )}

          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                aria-label="Imagen anterior"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] p-2 transition-colors"
              >
                <ChevronLeft size={18} className="text-[#2C2825]" />
              </button>
              <button
                onClick={nextImage}
                aria-label="Imagen siguiente"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] p-2 transition-colors"
              >
                <ChevronRight size={18} className="text-[#2C2825]" />
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    aria-label={`Ver imagen ${i + 1}`}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === currentImage ? "bg-[#FAF8F5]" : "bg-[#FAF8F5]/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Contenido */}
        <div className="p-8 md:p-12">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#9B8E82] block mb-2">
                {project.category}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#2C2825]">
                {project.title}
              </h2>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <span className="flex items-center gap-1 text-xs text-[#9B8E82] justify-end">
                <MapPin size={12} />
                {project.location}
              </span>
              <span className="flex items-center gap-1 text-xs text-[#9B8E82] justify-end">
                <Calendar size={12} />
                {project.year}
              </span>
            </div>
          </div>

          <p className="text-[#5A534E] font-light leading-relaxed mb-8">
            {project.fullDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.15em] uppercase border border-[#C4BAB0] text-[#9B8E82] px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
