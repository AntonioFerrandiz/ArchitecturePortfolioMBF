import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — MBF Arquitectura",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F0EB] font-sans">
      {children}
    </div>
  );
}
