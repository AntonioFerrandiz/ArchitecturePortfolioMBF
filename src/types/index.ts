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

// Valores por defecto que coinciden con el contenido actual del portafolio
export const DEFAULT_ABOUT: DbAbout = {
  id: "",
  name: "Maria Belen Ferrándiz",
  initials: "MBF",
  role: "Arquitecta · Lima, Perú",
  subtitle: "Diseño espacios que dialogan con la luz,\nel material y el entorno.",
  bio: "Soy Maria Belen Ferrándiz, arquitecta de la Universidad Peruana de Ciencias Aplicadas. Me especializo en diseño residencial y de interiores con un enfoque bioclimático y sensible al contexto.\n\nCreo en una arquitectura que parte de la escucha: del lugar, del material y de quienes habitan el espacio. Cada proyecto es una oportunidad de crear algo duradero, honesto y bello.\n\nActualmente colaboro con estudios de Lima y desarrollo proyectos propios de pequeña y mediana escala.",
  photo_url:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  skills: [
    "Diseño residencial",
    "Arquitectura bioclimática",
    "Interiorismo",
    "Paisajismo",
    "Intervención patrimonial",
  ],
  email: "mariabelen.ferrandiz@email.com",
  linkedin_url:
    "https://www.linkedin.com/in/mar%C3%ADa-bel%C3%A9n-ferr%C3%A1ndiz-bendez%C3%BA-b8915a286/",
  linkedin_display: "linkedin.com/in/mariabelenferrandiz",
  instagram_url: "https://www.instagram.com/belen.arquitectura/",
  instagram_display: "@belen.arquitectura",
};
