/**
 * Archivo de datos de proyectos — RAMA DEMO
 * Arquitecta: Valentina Ríos
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
    id: "casa-serena",
    title: "Casa Serena",
    location: "Bogotá, Colombiaa",
    year: "2024",
    category: "Residencial",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    description: "Vivienda unifamiliar con jardín central y materiales naturales.",
    fullDescription:
      "Casa Serena es una residencia de 320 m² diseñada para una familia en el norte de Bogotá. El proyecto organiza los espacios alrededor de un patio central abierto que regula la temperatura y aporta luz natural a todos los ambientes. Los materiales — piedra local, madera de guadua y concreto visto — generan una paleta cálida y atemporal.",
    tags: ["Residencial", "Patio central", "Materiales naturales"],
    featured: true,
  },
  {
    id: "estudio-norte",
    title: "Estudio Norte",
    location: "Medellín, Colombia",
    year: "2024",
    category: "Comercial",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
    ],
    description: "Espacio de coworking con identidad propia para comunidad creativa.",
    fullDescription:
      "Intervención de 450 m² en un edificio industrial de los años 70 en el barrio Laureles. El diseño conserva la estructura metálica original y añade mezzanines de madera que crean zonas de trabajo en distintos niveles. Capacidad para 80 personas con salas privadas, zona de eventos y terraza.",
    tags: ["Coworking", "Patrimonio industrial", "Comunidad"],
    featured: true,
  },
  {
    id: "pabellon-verde",
    title: "Pabellón Verde",
    location: "Cartagena, Colombia",
    year: "2023",
    category: "Cultural",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    ],
    description: "Pabellón temporal para festival de arte y arquitectura del Caribe.",
    fullDescription:
      "Estructura efímera diseñada para el Festival de Arte del Caribe. El pabellón usa bambú local y telas recicladas para crear un espacio sombreado de 200 m² que alberga exposiciones, charlas y performances. Fue montado y desmontado en 48 horas por un equipo local.",
    tags: ["Efímero", "Bambú", "Festival"],
  },
  {
    id: "apartamento-roble",
    title: "Apartamento Roble",
    location: "Ciudad de México, México",
    year: "2023",
    category: "Residencial",
    coverImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80",
    ],
    description: "Renovación de apartamento con énfasis en almacenamiento y luz.",
    fullDescription:
      "Renovación completa de un apartamento de 70 m² en la Colonia Roma. El reto principal era maximizar el almacenamiento sin sacrificar amplitud visual. La solución fue una pared de estantes del piso al techo en roble natural que recorre toda la zona social, combinada con una cocina abierta en blanco y latón.",
    tags: ["Renovación", "Almacenamiento", "Roma CDMX"],
  },
  {
    id: "cafe-botanico",
    title: "Café Botánico",
    location: "Bogotá, Colombia",
    year: "2022",
    category: "Comercial",
    coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&q=80",
    ],
    description: "Cafetería con jardín interior integrado al diseño del espacio.",
    fullDescription:
      "Proyecto de interiorismo para una cafetería de especialidad en el barrio Chapinero. El jardín interior —con más de 40 especies de plantas— es el protagonista del diseño. Las mesas se disponen entre la vegetación creando microambientes privados. Capacidad para 45 personas.",
    tags: ["Gastronomía", "Biofilia", "Chapinero"],
  },
  {
    id: "terraza-cielo",
    title: "Terraza Cielo",
    location: "Medellín, Colombia",
    year: "2022",
    category: "Paisajismo",
    coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80",
    ],
    description: "Jardín en terraza con huerto urbano para edificio residencial.",
    fullDescription:
      "Diseño de terraza de 180 m² en la cubierta de un edificio residencial de El Poblado. El proyecto integra zonas de descanso, huerto urbano productivo y jardín de plantas aromáticas. La selección de especies prioriza plantas nativas de clima medio que no requieren riego intensivo.",
    tags: ["Paisajismo", "Huerto urbano", "Terraza"],
  },
];
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
