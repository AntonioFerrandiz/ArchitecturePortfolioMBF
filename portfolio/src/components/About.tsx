"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { DbAbout } from "@/types";
import { DEFAULT_ABOUT } from "@/types";

interface AboutProps { about?: DbAbout; }

export default function About({ about = DEFAULT_ABOUT }: AboutProps) {
  return (
    <section id="about" className="py-28 md:py-36 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E0D5]">
              <Image
                src={about.photo_url}
                alt={`${about.name}, arquitecta`}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Marco decorativo offset */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#C4BAB0] -z-10" />
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#9B8E82] mb-4">
              Sobre mí
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#2C2825] leading-tight mb-8">
              Arquitectura como
              <br />
              <span className="italic text-[#8C8279]">acto de cuidado</span>
            </h2>

            <div className="space-y-4 text-[#5A534E] font-light leading-relaxed mb-10">
              {about.bio.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Skills */}
            <div className="border-t border-[#E8E0D5] pt-8">
              <p className="text-xs tracking-[0.2em] uppercase text-[#C4BAB0] mb-5">
                Áreas de enfoque
              </p>
              <ul className="flex flex-wrap gap-3">
                {about.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-xs tracking-wide border border-[#C4BAB0] text-[#8C8279] px-4 py-2"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
