// Tipos compartidos entre admin y portafolio público

export interface DbProject {
  id: string;
  title: string;
  location: string;
  year: string;
  category: string;
  cover_image: string;
  images: string[];
  description: string;
  full_description: string;
  tags: string[];
  featured: boolean;
  order_index: number;
  created_at: string;
}

export interface DbAbout {
  id: string;
  name: string;
  initials: string;
  role: string;
  subtitle: string;
  bio: string;
  photo_url: string;
  skills: string[];
  email: string;
  linkedin_url: string;
  linkedin_display: string;
  instagram_url: string;
  instagram_display: string;
}

// Valores por defecto — datos de la arquitecta demo
export const DEFAULT_ABOUT: DbAbout = {
  id: "",
  name: "Valentina Ríos",
  initials: "VR",
  role: "Arquitecta · Bogotá, Colombia",
  subtitle: "Creo espacios que equilibran\nfunción, belleza y sostenibilidad.",
  bio: "Soy Valentina Ríos, arquitecta egresada de la Universidad de Los Andes. Me especializo en diseño residencial contemporáneo y proyectos de uso mixto con un enfoque sostenible y centrado en las personas.\n\nMi trabajo parte de entender el lugar y a quienes lo habitarán. Cada proyecto es una conversación entre el entorno, los materiales y la vida cotidiana.\n\nActualmente trabajo de manera independiente en Bogotá y colaboro con estudios en Medellín y Ciudad de México.",
  photo_url:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
  skills: [
    "Diseño residencial",
    "Proyectos sostenibles",
    "Uso mixto",
    "Interiorismo",
    "Consultoría de obra",
  ],
  email: "valentina.rios@email.com",
  linkedin_url: "https://linkedin.com/in/valentinarios",
  linkedin_display: "linkedin.com/in/valentinarios",
  instagram_url: "https://instagram.com/valentina.arquitectura",
  instagram_display: "@valentina.arquitectura",
};
