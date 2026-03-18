"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initials, setInitials] = useState("");

  useEffect(() => {
    fetch("/api/public/about")
      .then((r) => r.json())
      .then((d) => { if (d?.initials) setInitials(d.initials); })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Error al iniciar sesión");
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-display text-4xl tracking-widest text-[#2C2825] uppercase">
            {initials || "···"}
          </span>
          <p className="text-xs tracking-[0.2em] uppercase text-[#9B8E82] mt-2">
            Panel de administración
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 text-center">
              {error}
            </div>
          )}

          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              autoComplete="current-password"
              className="w-full bg-white border border-[#E8E0D5] text-[#2C2825] text-sm px-4 py-3 pr-10 focus:outline-none focus:border-[#8C8279] placeholder:text-[#C4BAB0]"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C4BAB0] hover:text-[#8C8279]"
              aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full flex items-center justify-center gap-2 bg-[#2C2825] text-[#FAF8F5] text-xs tracking-[0.2em] uppercase py-3.5 hover:bg-[#3D3733] transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="text-center text-[10px] text-[#C4BAB0] tracking-wide mt-8">
          <a href="/" className="hover:text-[#8C8279] transition-colors">
            ← Volver al portafolio
          </a>
        </p>
      </div>
    </div>
  );
}
