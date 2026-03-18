import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valentina Ríos — Arquitecta",
  description:
    "Portfolio profesional de Valentina Ríos, arquitecta especializada en diseño residencial sostenible y proyectos de uso mixto en Bogotá, Colombia.",
  keywords: ["arquitectura", "portafolio", "diseño", "Bogotá", "Colombia", "sostenible"],
  openGraph: {
    title: "Valentina Ríos — Arquitecta",
    description: "Portfolio profesional de arquitectura.",
    type: "website",
  },
};

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
