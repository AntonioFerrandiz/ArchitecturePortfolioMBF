"use client";

import type { DbAbout } from "@/types";
import { DEFAULT_ABOUT } from "@/types";

export default function Footer({ about = DEFAULT_ABOUT }: { about?: DbAbout }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2C2825] border-t border-[#3D3733] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href="#hero"
          className="font-display text-lg tracking-widest text-[#C4BAB0] uppercase"
        >
          {about.initials}
        </a>

        <p className="text-[10px] tracking-[0.15em] uppercase text-[#5A534E] text-center">
          © {year} {about.name} · Todos los derechos reservados
        </p>

        <p className="text-[10px] tracking-[0.1em] text-[#3D3733]">
          Lima, Perú
        </p>
      </div>
    </footer>
  );
}
