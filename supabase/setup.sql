-- ============================================================
-- Supabase SQL Setup — Portafolio de Arquitectura (Multi-tenant)
-- Ejecuta este script en Supabase > SQL Editor
-- ============================================================

-- Tabla: proyectos
CREATE TABLE IF NOT EXISTS projects (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_slug   TEXT NOT NULL DEFAULT '',
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

-- Tabla: sobre mi (1 fila por tenant)
CREATE TABLE IF NOT EXISTS about (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_slug        TEXT NOT NULL DEFAULT '',
  name               TEXT NOT NULL DEFAULT '',
  initials           TEXT NOT NULL DEFAULT '',
  role               TEXT NOT NULL DEFAULT '',
  subtitle           TEXT NOT NULL DEFAULT '',
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

-- Indices para filtrado eficiente por tenant
CREATE INDEX IF NOT EXISTS projects_tenant_slug_idx ON projects(tenant_slug);
CREATE INDEX IF NOT EXISTS about_tenant_slug_idx    ON about(tenant_slug);

-- ============================================================
-- Migracion (si ya tienes datos existentes sin tenant_slug)
-- Ejecuta esto si la tabla ya existe con filas previas:
-- ============================================================
-- ALTER TABLE projects ADD COLUMN IF NOT EXISTS tenant_slug TEXT NOT NULL DEFAULT '';
-- ALTER TABLE about    ADD COLUMN IF NOT EXISTS tenant_slug TEXT NOT NULL DEFAULT '';
-- UPDATE projects SET tenant_slug = 'mariabelen' WHERE tenant_slug = '';
-- UPDATE about    SET tenant_slug = 'mariabelen' WHERE tenant_slug = '';

-- ============================================================
-- Bucket de Storage para imagenes
-- ============================================================
-- Crea un bucket llamado "portfolio-images" marcado como publico
-- en Supabase > Storage > New bucket
-- Nombre: portfolio-images
-- Public bucket: ON activado
-- ============================================================

-- Politicas de seguridad (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE about    ENABLE ROW LEVEL SECURITY;

-- Lectura publica
CREATE POLICY "projects_public_read"
  ON projects FOR SELECT USING (true);

CREATE POLICY "about_public_read"
  ON about FOR SELECT USING (true);

-- Escritura solo con service role (las API routes del admin lo usan)
-- El service role bypasea RLS automaticamente en Supabase.

-- ============================================================
-- Datos iniciales para Maria Belen (tenant: mariabelen)
-- Para agregar otro tenant, agrega otro INSERT con su tenant_slug.
-- ============================================================
INSERT INTO about (
  tenant_slug,
  name, initials, role, subtitle, bio, photo_url,
  skills, email, linkedin_url, linkedin_display, instagram_url, instagram_display
) VALUES (
  'mariabelen',
  'Maria Belen Ferrandiz',
  'MBF',
  'Arquitecta - Lima, Peru',
  'Diseno espacios que dialogan con la luz, el material y el entorno.',
  'Soy Maria Belen Ferrandiz, arquitecta de la Universidad Peruana de Ciencias Aplicadas. Me especializo en diseno residencial y de interiores con un enfoque bioclimatico y sensible al contexto.

Creo en una arquitectura que parte de la escucha: del lugar, del material y de quienes habitan el espacio. Cada proyecto es una oportunidad de crear algo duradero, honesto y bello.

Actualmente colaboro con estudios de Lima y desarrollo proyectos propios de pequena y mediana escala.',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
  ARRAY['Diseno residencial','Arquitectura bioclimatica','Interiorismo','Paisajismo','Intervencion patrimonial'],
  'mariabelen.ferrandiz@email.com',
  'https://www.linkedin.com/in/mar%C3%ADa-bel%C3%A9n-ferr%C3%A1ndiz-bendez%C3%BA-b8915a286/',
  'linkedin.com/in/mariabelenferrandiz',
  'https://www.instagram.com/belen.arquitectura/',
  '@belen.arquitectura'
) ON CONFLICT DO NOTHING;
