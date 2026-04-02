"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Camera } from "lucide-react";
import { useTenant } from "@/components/TenantProvider";

const navLinksBeforeInstagram = [
  { label: "Fotografia Única", hash: "#foto-unica" },
  { label: "Séries", hash: "#series" },
];

const navLinksAfterInstagram = [
  { label: "Sobre", hash: "#sobre" },
  { label: "Contato", hash: "#contato" },
];

/** Rutas con fondo claro: barra oscura fija (evita degradado + texto gris ilegible). */
function isOnLightContentPage(pathname: string) {
  return pathname.includes("/foto/");
}

export default function Header() {
  const tenant = useTenant();
  const pathname = usePathname() || "";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const basePath = tenant.basePath || "";
  const homeHref = basePath || "/";
  const solidBar = scrolled || isOnLightContentPage(pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-[background,box-shadow,border-color] duration-300 ${
        solidBar
          ? "border-stone-800/80 bg-stone-950/95 shadow-sm shadow-black/10 backdrop-blur-md"
          : "border-transparent bg-linear-to-b from-black/60 via-black/25 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <a
            href={`${homeHref}#inicio`}
            className="group flex items-center gap-2.5 rounded-lg outline-offset-4 focus-visible:outline-2 focus-visible:outline-stone-400"
            onClick={handleNavClick}
          >
            <Camera
              size={22}
              className="shrink-0 transition-transform group-hover:scale-105"
              style={{ color: tenant.colorPrimary }}
            />
            <div className="flex flex-col leading-none">
              <span className="font-sans text-lg font-semibold tracking-tight text-white">
                {tenant.name}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-400">
                {tenant.subtitle}
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex lg:gap-8">
            {navLinksBeforeInstagram.map((link) => (
              <a
                key={link.hash}
                href={`${homeHref}${link.hash}`}
                className="group relative font-sans text-sm font-medium tracking-wide text-stone-200 transition-colors duration-200 hover:text-white"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: tenant.colorPrimary }}
                />
              </a>
            ))}
            {tenant.instagramUrl && (
              <a
                href={tenant.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative font-sans text-sm font-medium tracking-wide text-stone-200 transition-colors duration-200 hover:text-white"
              >
                Instagram
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: tenant.colorPrimary }}
                />
              </a>
            )}
            {navLinksAfterInstagram.map((link) => (
              <a
                key={link.hash}
                href={`${homeHref}${link.hash}`}
                className="group relative font-sans text-sm font-medium tracking-wide text-stone-200 transition-colors duration-200 hover:text-white"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: tenant.colorPrimary }}
                />
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-0.5 border-t border-stone-800/90 bg-stone-950/98 px-3 py-3 backdrop-blur-md">
          {navLinksBeforeInstagram.map((link) => (
            <a
              key={link.hash}
              href={`${homeHref}${link.hash}`}
              onClick={handleNavClick}
              className="rounded-lg px-3 py-3 font-sans text-sm font-medium tracking-wide text-stone-200 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          {tenant.instagramUrl && (
            <a
              href={tenant.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              className="rounded-lg px-3 py-3 font-sans text-sm font-medium tracking-wide text-stone-200 transition-colors hover:bg-white/5 hover:text-white"
            >
              Instagram
            </a>
          )}
          {navLinksAfterInstagram.map((link) => (
            <a
              key={link.hash}
              href={`${homeHref}${link.hash}`}
              onClick={handleNavClick}
              className="rounded-lg px-3 py-3 font-sans text-sm font-medium tracking-wide text-stone-200 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
