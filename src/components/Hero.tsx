"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { DbAbout } from "@/types";
import { DEFAULT_ABOUT } from "@/types";

interface HeroProps { about?: DbAbout; }

export default function Hero({ about = DEFAULT_ABOUT }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] overflow-hidden"
    >
      {/* Línea decorativa izquierda */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-24 bg-[#C4BAB0]" />
        <span
          className="text-[10px] tracking-[0.25em] uppercase text-[#C4BAB0] rotate-90 origin-center my-4 whitespace-nowrap"
        >
          Portafolio 2026
        </span>
        <div className="w-px h-24 bg-[#C4BAB0]" />
      </div>

      {/* Contenido central */}
      <div className="text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs tracking-[0.3em] uppercase text-[#9B8E82] mb-6"
        >
          {about.role}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-[#2C2825] leading-none tracking-tight mb-8"
        >
          {about.name.split(" ").slice(0, -1).join(" ")}
          <br />
          <span className="italic font-light text-[#8C8279]">{about.name.split(" ").slice(-1)[0]}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg font-light text-[#8C8279] tracking-wide mb-12 max-w-md mx-auto"
        >
          {about.subtitle.split("\n").map((line, i) => (
            <span key={i}>{line}{i < about.subtitle.split("\n").length - 1 && <br />}</span>
          ))}
        </motion.p>

        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="inline-block border border-[#2C2825] text-[#2C2825] text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-[#2C2825] hover:text-[#FAF8F5] transition-all duration-400"
        >
          Ver proyectos
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-[#C4BAB0]"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>

      {/* Fondo decorativo sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, #E8E0D520 0%, transparent 60%)",
        }}
      />
    </section>
  );
}
