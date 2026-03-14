"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects as staticProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/projects";
import type { DbProject } from "@/types";

// Convierte DbProject (Supabase snake_case) al formato Project del portafolio
function toProject(p: DbProject): Project {
  return {
    id: p.id,
    title: p.title,
    location: p.location,
    year: p.year,
    category: p.category,
    coverImage: p.cover_image,
    images: p.images ?? [],
    description: p.description,
    fullDescription: p.full_description,
    tags: p.tags ?? [],
    featured: p.featured,
  };
}

const categories = ["Todos", "Residencial", "Comercial", "Cultural", "Paisajismo", "Urbanismo", "Otro"];

interface ProjectsProps {
  dbProjects?: DbProject[];
}

export default function Projects({ dbProjects }: ProjectsProps) {
  const projectList: Project[] = dbProjects
    ? dbProjects.map(toProject)
    : staticProjects;

  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filtrar solo las categorías que tienen proyectos
  const usedCategories = ["Todos", ...new Set(projectList.map((p) => p.category))];
  const visibleCategories = categories.filter((c) => usedCategories.includes(c));

  const filtered =
    activeCategory === "Todos"
      ? projectList
      : projectList.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-28 md:py-36 bg-[#F4F0EB]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#9B8E82] mb-4">
            Trabajo reciente
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#2C2825] leading-tight">
            Proyectos
          </h2>
        </motion.div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap gap-3 mb-12">
          {visibleCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs tracking-[0.15em] uppercase px-5 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#2C2825] text-[#FAF8F5] border-[#2C2825]"
                  : "border-[#C4BAB0] text-[#8C8279] hover:border-[#8C8279] hover:text-[#2C2825]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de proyectos */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal de detalle */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
