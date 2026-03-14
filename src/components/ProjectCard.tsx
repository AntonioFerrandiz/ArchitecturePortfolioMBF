"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E0D5] mb-4">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#C4BAB0] text-xs tracking-widest uppercase">Sin imagen</span>
          </div>
        )}

        {/* Overlay en hover */}
        <div className="absolute inset-0 bg-[#2C2825]/0 group-hover:bg-[#2C2825]/30 transition-all duration-500 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[#FAF8F5] text-xs tracking-[0.2em] uppercase border border-[#FAF8F5] px-5 py-2">
            Ver más
          </span>
        </div>

        {/* Categoría badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#FAF8F5]/90 text-[#8C8279] text-[10px] tracking-[0.15em] uppercase px-3 py-1">
            {project.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-display text-xl font-light text-[#2C2825] mb-2 group-hover:text-[#8C8279] transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex items-center gap-4 text-[#9B8E82] text-xs mb-2">
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {project.year}
          </span>
        </div>
        <p className="text-sm text-[#8C8279] font-light leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.article>
  );
}
