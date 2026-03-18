"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FolderOpen, User, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Inicio" },
  { href: "/admin/projects", icon: FolderOpen, label: "Proyectos" },
  { href: "/admin/about", icon: User, label: "Sobre mí" },
];

export default function AdminNav({ active }: { active: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [initials, setInitials] = useState("");
  const [open, setOpen] = useState(false);

  // Cerrar menú al navegar
  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    fetch("/api/admin/about")
      .then((r) => r.json())
      .then((d) => { if (d?.initials) setInitials(d.initials); })
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  const navLinks = (
    <>
      {links.map(({ href, icon: Icon, label }) => {
        const isActive = active === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors rounded-sm ${
              isActive
                ? "bg-[#3D3733] text-[#FAF8F5]"
                : "text-[#8C8279] hover:text-[#FAF8F5] hover:bg-[#3D3733]/50"
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* ── Sidebar desktop (md+) ───────────────────────────── */}
      <aside className="hidden md:flex w-56 shrink-0 bg-[#2C2825] min-h-screen flex-col">
        <div className="px-6 py-8 border-b border-[#3D3733]">
          <span className="font-display text-2xl tracking-widest text-[#FAF8F5] uppercase">
            {initials || "···"}
          </span>
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#5A534E] mt-1">
            Panel de administración
          </p>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">{navLinks}</nav>
        <div className="px-3 py-6 border-t border-[#3D3733]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#8C8279] hover:text-[#FAF8F5] w-full transition-colors"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Topbar móvil (< md) ─────────────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#2C2825] flex items-center justify-between px-4 h-14 border-b border-[#3D3733]">
        <span className="font-display text-xl tracking-widest text-[#FAF8F5] uppercase">
          {initials || "···"}
        </span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-[#8C8279] hover:text-[#FAF8F5] p-1"
          aria-label="Abrir menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Drawer móvil ────────────────────────────────────── */}
      {open && (
        <div className="md:hidden fixed inset-0 z-30" onClick={() => setOpen(false)}>
          <div
            className="absolute top-14 left-0 right-0 bg-[#2C2825] border-b border-[#3D3733] px-3 py-4 space-y-1 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks}
            <div className="pt-3 mt-3 border-t border-[#3D3733]">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#8C8279] hover:text-[#FAF8F5] w-full transition-colors"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
