"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Camera,
  LayoutDashboard,
  User,
  Palette,
  FileText,
  Image,
  Layers,
  BookOpen,
  LogOut,
  Menu,
  X,
  Key,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { href: "/panel", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/panel/perfil", label: "Perfil", icon: User },
  { href: "/panel/aparencia", label: "Aparência", icon: Palette },
  { href: "/panel/conteudo", label: "Conteúdo", icon: FileText },
  { href: "/panel/fotos", label: "Fotos", icon: Image },
  { href: "/panel/series", label: "Séries", icon: Layers },
  { href: "/panel/ensaios", label: "Ensaios", icon: BookOpen },
  { href: "/panel/senha", label: "Alterar Senha", icon: Key },
];

export default function PanelSidebar({
  tenantName,
  tenantDomain,
}: {
  tenantName?: string;
  tenantDomain?: string | null;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/panel/auth", { method: "DELETE" });
    window.location.href = "/panel/login";
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-stone-900 text-white">
      <div className="flex h-16 items-center gap-3 border-b border-stone-800 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-800">
          <Camera className="h-5 w-5 text-amber-400" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">
            {tenantName || "Meu Site"}
          </p>
          <p className="truncate text-[10px] text-stone-500">Painel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-stone-500">
          Menu
        </p>
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive(href, exact)
                ? "bg-stone-800 text-white"
                : "text-stone-400 hover:bg-stone-800/60 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="space-y-1 border-t border-stone-800 p-3">
        {tenantDomain && (
          <a
            href={`https://${tenantDomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-400 transition-colors hover:bg-stone-800/60 hover:text-white"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Ver meu site
          </a>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-400 transition-colors hover:bg-stone-800/60 hover:text-white"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sair
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-60 lg:flex-col">
        {sidebar}
      </aside>

      <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-stone-200 bg-white px-4 lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-stone-600 hover:bg-stone-100"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-stone-700" />
          <span className="text-sm font-semibold text-stone-900">
            {tenantName || "Meu Site"}
          </span>
        </div>
      </div>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-1 text-stone-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </div>
        </>
      )}
    </>
  );
}
