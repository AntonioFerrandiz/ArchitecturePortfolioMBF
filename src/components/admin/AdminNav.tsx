"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FolderOpen, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Inicio" },
  { href: "/admin/projects", icon: FolderOpen, label: "Proyectos" },
  { href: "/admin/about", icon: User, label: "Sobre mí" },
];

export default function AdminNav({ active }: { active: string }) {
  const router = useRouter();
  const [initials, setInitials] = useState("");

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

  return (
    <aside className="w-56 shrink-0 bg-[#2C2825] min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-[#3D3733]">
        <span className="font-display text-2xl tracking-widest text-[#FAF8F5] uppercase">
          {initials || "···"}
        </span>
        <p className="text-[10px] tracking-[0.15em] uppercase text-[#5A534E] mt-1">
          Panel de administración
        </p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-6 space-y-1">
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
      </nav>

      {/* Logout */}
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
  );
}
