/**
 * Archivo de datos de proyectos.
 * Para agregar un nuevo proyecto, simplemente añade un nuevo objeto
 * al array siguiendo la misma estructura. No es necesario tocar
 * ningún otro archivo de código.
 */

export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  category: string;
  coverImage: string;
  images: string[];
  description: string;
  fullDescription: string;
  tags: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "casa-horizonte",
    title: "Casa Horizonte",
    location: "Lima, Perú",
    year: "2024",
    category: "Residencial",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    description: "Vivienda unifamiliar con enfoque bioclimático.",
    fullDescription:
      "Casa Horizonte es una vivienda unifamiliar diseñada con principios bioclimáticos, aprovechando la orientación solar y la ventilación natural para minimizar el consumo energético. El diseño integra materiales locales con una estética contemporánea limpia.",
    tags: ["Bioclimático", "Unifamiliar", "Contemporáneo"],
    featured: true,
  },
  {
    id: "estudio-celeste",
    title: "Estudio Celeste",
    location: "Miraflores, Lima",
    year: "2023",
    category: "Comercial",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
    ],
    description: "Oficina creativa para estudio de diseño gráfico.",
    fullDescription:
      "Un espacio de trabajo abierto y luminoso diseñado para un estudio de diseño gráfico. La paleta de colores neutros y la entrada de luz natural al techo crean un ambiente propicio para la creatividad. El mobiliario fue diseñado a medida para optimizar el flujo de trabajo.",
    tags: ["Oficina", "Interiorismo", "Diseño creativo"],
    featured: true,
  },
  {
    id: "pabellon-arena",
    title: "Pabellón Arena",
    location: "Paracas, Ica",
    year: "2023",
    category: "Cultural",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    ],
    description: "Pabellón de exposición integrado al paisaje desértico.",
    fullDescription:
      "Estructura temporal para exposiciones de arte en el desierto de Paracas. El diseño usa adobe reciclado y madera para dialogar con el terreno árido. La cubierta perforada genera patrones de sombra que cambian durante el día.",
    tags: ["Efímero", "Sostenible", "Cultural"],
  },
  {
    id: "apartamento-luz",
    title: "Apartamento Luz",
    location: "Barranco, Lima",
    year: "2022",
    category: "Residencial",
    coverImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80",
    ],
    description: "Renovación de apartamento con diseño de interiores minimalista.",
    fullDescription:
      "Renovación completa de un apartamento de 85 m² en el distrito bohemio de Barranco. Se abrió la planta para conectar cocina, comedor y sala en un solo espacio fluido. Los materiales elegidos —concreto pulido, madera de cedro y latón— crean una paleta cálida y atemporal.",
    tags: ["Renovación", "Minimalismo", "Interiorismo"],
  },
  {
    id: "jardin-calmo",
    title: "Jardín Calmo",
    location: "La Molina, Lima",
    year: "2022",
    category: "Paisajismo",
    coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80",
    ],
    description: "Diseño de jardín y áreas exteriores para vivienda privada.",
    fullDescription:
      "Proyecto de paisajismo para una residencia privada de 3000 m². El diseño articula zonas de descanso, huerto orgánico y jardín nativo, priorizando especies autóctonas de bajo consumo hídrico. Se incorporaron caminos de piedra y muros de contención en tierra compactada.",
    tags: ["Paisajismo", "Sostenible", "Exterior"],
  },
  {
    id: "cafe-terraza",
    title: "Café Terraza",
    location: "Cusco, Perú",
    year: "2021",
    category: "Comercial",
    coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&q=80",
    ],
    description: "Café y espacio cultural con vista a la Plaza de Armas.",
    fullDescription:
      "Proyecto de interiorismo y pequeña intervención arquitectónica en un local histórico del centro de Cusco. La terraza superior fue habilitada con estructura de acero y vidrio, respetando la normativa de conservación patrimonial. Capacidad para 60 comensales con doble ambiente.",
    tags: ["Patrimonio", "Gastronomía", "Terrazas"],
  },
];
