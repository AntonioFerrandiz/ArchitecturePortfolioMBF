-- ============================================================
-- Supabase SQL Setup — Portafolio de Arquitectura
-- Ejecuta este script en Supabase > SQL Editor
-- ============================================================

-- Tabla: proyectos
CREATE TABLE IF NOT EXISTS projects (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT NOT NULL,
  location      TEXT NOT NULL DEFAULT '',
  year          TEXT NOT NULL DEFAULT '',
  category      TEXT NOT NULL DEFAULT 'Residencial',
  cover_image   TEXT NOT NULL DEFAULT '',
  images        TEXT[] DEFAULT '{}',
  description   TEXT NOT NULL DEFAULT '',
  full_description TEXT NOT NULL DEFAULT '',
  tags          TEXT[] DEFAULT '{}',
  featured      BOOLEAN DEFAULT false,
  order_index   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: sobre mí (siempre 1 fila)
CREATE TABLE IF NOT EXISTS about (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name               TEXT NOT NULL DEFAULT 'Maria Belen Ferrándiz',
  initials           TEXT NOT NULL DEFAULT 'MBF',
  role               TEXT NOT NULL DEFAULT 'Arquitecta · Lima, Perú',
  subtitle           TEXT NOT NULL DEFAULT 'Diseño espacios que dialogan con la luz, el material y el entorno.',
  bio                TEXT NOT NULL DEFAULT '',
  photo_url          TEXT NOT NULL DEFAULT '',
  skills             TEXT[] DEFAULT '{}',
  email              TEXT NOT NULL DEFAULT '',
  linkedin_url       TEXT NOT NULL DEFAULT '',
  linkedin_display   TEXT NOT NULL DEFAULT '',
  instagram_url      TEXT NOT NULL DEFAULT '',
  instagram_display  TEXT NOT NULL DEFAULT '',
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Bucket de Storage para imágenes
-- ============================================================
-- Crea un bucket llamado "portfolio-images" marcado como público
-- en Supabase > Storage > New bucket
-- Nombre: portfolio-images
-- Public bucket: ✅ activado
-- ============================================================

-- Políticas de seguridad (Row Level Security)
-- Solo el service role (admin) puede escribir.
-- Lectura pública para el portafolio.

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE about    ENABLE ROW LEVEL SECURITY;

-- Lectura pública
CREATE POLICY "projects_public_read"
  ON projects FOR SELECT USING (true);

CREATE POLICY "about_public_read"
  ON about FOR SELECT USING (true);

-- Escritura solo con service role (las API routes del admin lo usan)
-- No es necesario crear políticas para esto porque el service role
-- bypasea RLS automáticamente en Supabase.

-- ============================================================
-- Datos iniciales (opcional — el admin los puede editar luego)
-- ============================================================
INSERT INTO about (
  name, initials, role, subtitle, bio, photo_url,
  skills, email, linkedin_url, linkedin_display, instagram_url, instagram_display
) VALUES (
  'Maria Belen Ferrándiz',
  'MBF',
  'Arquitecta · Lima, Perú',
  'Diseño espacios que dialogan con la luz, el material y el entorno.',
  'Soy Maria Belen Ferrándiz, arquitecta de la Universidad Peruana de Ciencias Aplicadas. Me especializo en diseño residencial y de interiores con un enfoque bioclimático y sensible al contexto.

Creo en una arquitectura que parte de la escucha: del lugar, del material y de quienes habitan el espacio. Cada proyecto es una oportunidad de crear algo duradero, honesto y bello.

Actualmente colaboro con estudios de Lima y desarrollo proyectos propios de pequeña y mediana escala.',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
  ARRAY['Diseño residencial','Arquitectura bioclimática','Interiorismo','Paisajismo','Intervención patrimonial'],
  'mariabelen.ferrandiz@email.com',
  'https://www.linkedin.com/in/mar%C3%ADa-bel%C3%A9n-ferr%C3%A1ndiz-bendez%C3%BA-b8915a286/',
  'linkedin.com/in/mariabelenferrandiz',
  'https://www.instagram.com/belen.arquitectura/',
  '@belen.arquitectura'
) ON CONFLICT DO NOTHING;
