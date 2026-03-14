"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram } from "lucide-react";
import type { DbAbout } from "@/types";
import { DEFAULT_ABOUT } from "@/types";

interface ContactProps { about?: DbAbout; }

export default function Contact({ about = DEFAULT_ABOUT }: ContactProps) {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: about.email,
      href: `mailto:${about.email}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: about.linkedin_display,
      href: about.linkedin_url,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: about.instagram_display,
      href: about.instagram_url,
    },
  ];
  return (
    <section id="contact" className="py-28 md:py-36 bg-[#2C2825]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#8C8279] mb-4">
              Hablemos
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#FAF8F5] leading-tight mb-8">
              ¿Tienes un proyecto
              <br />
              <span className="italic text-[#C4BAB0]">en mente?</span>
            </h2>
            <p className="text-[#9B8E82] font-light leading-relaxed max-w-sm">
              Estoy disponible para colaboraciones, nuevos proyectos y consultas.
              No dudes en escribirme.
            </p>
          </motion.div>

          {/* Links de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {contactLinks.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-5 border-b border-[#3D3733] pb-6 hover:border-[#8C8279] transition-all duration-300"
              >
                <div className="w-10 h-10 border border-[#3D3733] flex items-center justify-center group-hover:border-[#8C8279] transition-colors duration-300 flex-shrink-0">
                  <Icon size={16} className="text-[#8C8279]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#5A534E] mb-0.5">
                    {label}
                  </p>
                  <p className="text-[#C4BAB0] text-sm font-light group-hover:text-[#FAF8F5] transition-colors duration-300">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
