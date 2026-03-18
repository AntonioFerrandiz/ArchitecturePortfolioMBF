import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { DEFAULT_ABOUT } from "@/types";
import type { DbAbout, DbProject } from "@/types";
import { createClient } from "@supabase/supabase-js";
import { projects as staticProjects } from "@/data/projects";

// Revalidar los datos cada 60 segundos
export const revalidate = 60;

function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function fetchAbout(): Promise<DbAbout> {
  try {
    const supabase = getPublicClient();
    if (!supabase) return DEFAULT_ABOUT;
    const tenant = process.env.TENANT_SLUG ?? "default";
    const { data } = await supabase
      .from("about")
      .select("*")
      .eq("tenant_slug", tenant)
      .limit(1)
      .single();
    return data ?? DEFAULT_ABOUT;
  } catch {
    return DEFAULT_ABOUT;
  }
}

async function fetchProjects(): Promise<DbProject[] | undefined> {
  try {
    const supabase = getPublicClient();
    if (!supabase) return undefined;
    const tenant = process.env.TENANT_SLUG ?? "default";
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("tenant_slug", tenant)
      .order("order_index", { ascending: true });
    if (!data || data.length === 0) return undefined;
    return data;
  } catch {
    return undefined;
  }
}

export default async function Home() {
  const [about, dbProjects] = await Promise.all([fetchAbout(), fetchProjects()]);

  return (
    <>
      <Navbar about={about} />
      <main>
        <Hero about={about} />
        <About about={about} />
        <Projects dbProjects={dbProjects} />
        <Contact about={about} />
      </main>
      <Footer about={about} />
    </>
  );
}
