import type { Metadata } from "next";
import "./globals.css";
import { createClient } from "@supabase/supabase-js";

async function fetchAboutMeta() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const tenant = process.env.TENANT_SLUG;
  if (!url || !key || !tenant) return null;
  try {
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from("about")
      .select("name, role")
      .eq("tenant_slug", tenant)
      .limit(1)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const about = await fetchAboutMeta();
  const name = about?.name ?? "Arquitecta";
  const role = about?.role ?? "Arquitectura";
  return {
    title: `${name} — ${role}`,
    description: `Portfolio profesional de ${name}, ${role}.`,
    keywords: ["arquitectura", "portafolio", "diseño"],
    openGraph: {
      title: `${name} — ${role}`,
      description: `Portfolio profesional de ${name}.`,
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
