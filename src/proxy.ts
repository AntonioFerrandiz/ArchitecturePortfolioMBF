import { NextRequest, NextResponse } from "next/server";

// Rutas del admin que son públicas (no requieren sesión)
const PUBLIC_PATHS = ["/admin", "/api/admin/login", "/api/admin/logout"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir login page y login/logout API
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Verificar sesión para todo /admin/* y /api/admin/*
  const sessionToken = request.cookies.get("admin_session")?.value;
  const expectedToken = process.env.ADMIN_SESSION_TOKEN;

  const isAuthenticated =
    !!sessionToken && !!expectedToken && sessionToken === expectedToken;

  if (!isAuthenticated) {
    // Las API routes responden 401
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    // Las páginas redirigen al login
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
