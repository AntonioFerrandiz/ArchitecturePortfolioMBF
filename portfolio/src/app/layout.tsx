import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maria Belen Ferrándiz — Arquitecta",
  description:
    "Portfolio profesional de Maria Belen Ferrándiz, arquitecta junior especializada en diseño residencial, bioclimático y de interiores en Lima, Perú.",
  keywords: ["arquitectura", "portafolio", "diseño", "Lima", "Perú", "bioclimático"],
  openGraph: {
    title: "Maria Belen Ferrándiz — Arquitecta",
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
