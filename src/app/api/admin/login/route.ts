import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionToken = process.env.ADMIN_SESSION_TOKEN;

    if (!adminPassword || !sessionToken) {
      return NextResponse.json(
        { error: "Servidor mal configurado. Verifica las variables de entorno." },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      // Pequeño delay para dificultar fuerza bruta
      await new Promise((r) => setTimeout(r, 500));
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
