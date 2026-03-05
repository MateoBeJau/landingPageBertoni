"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-stone-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <AdminSidebar />
      <div className="lg:pl-60">{children}</div>
    </div>
  );
}
