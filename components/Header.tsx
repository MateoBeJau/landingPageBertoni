"use client";

import { useState, useEffect } from "react";
import { Menu, X, Camera } from "lucide-react";
import { useTenant } from "@/components/TenantProvider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const navLinksBeforeInstagram = [
  { label: "Início", hash: "#inicio" },
  { label: "Fotografia Única", hash: "#foto-unica" },
  { label: "Séries", hash: "#series" },
];

const navLinksAfterInstagram = [
  { label: "Sobre", hash: "#sobre" },
  { label: "Contato", hash: "#contato" },
];

const WHATSAPP_MESSAGE =
  "Olá! Gostaria de saber mais sobre o seu trabalho fotográfico e os formatos disponíveis para compra.";

export default function Header() {
  const tenant = useTenant();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const basePath = tenant.basePath || "";
  const homeHref = basePath || "/";
  const whatsappLink = buildWhatsAppUrl(tenant.whatsappNumber, WHATSAPP_MESSAGE);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-stone-950/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-linear-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href={`${homeHref}#inicio`}
            className="flex items-center gap-2 group"
            onClick={handleNavClick}
          >
            <Camera
              size={22}
              className="text-red-600 transition-transform group-hover:scale-110"
            />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-white font-semibold text-lg tracking-wide">
                {tenant.name}
              </span>
              <span className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-sans">
                {tenant.subtitle}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinksBeforeInstagram.map((link) => (
              <a
                key={link.hash}
                href={`${homeHref}${link.hash}`}
                className="text-stone-300 hover:text-white text-sm font-sans font-medium tracking-wide transition-colors duration-200 relative group"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: tenant.colorPrimary }}
                />
              </a>
            ))}
            {tenant.instagramUrl && (
              <a
                href={tenant.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-white text-sm font-sans font-medium tracking-wide transition-colors duration-200 relative group"
              >
                Instagram
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: tenant.colorPrimary }}
                />
              </a>
            )}
            {navLinksAfterInstagram.map((link) => (
              <a
                key={link.hash}
                href={`${homeHref}${link.hash}`}
                className="text-stone-300 hover:text-white text-sm font-sans font-medium tracking-wide transition-colors duration-200 relative group"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: tenant.colorPrimary }}
                />
              </a>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 hover:opacity-90 text-white text-sm font-sans font-medium px-4 py-2 rounded-sm tracking-wide transition-colors duration-200"
              style={{ backgroundColor: tenant.colorPrimary }}
            >
              Orçamento
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-sm hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-stone-950/98 backdrop-blur-md border-t border-stone-800 px-4 py-4 flex flex-col gap-1">
          {navLinksBeforeInstagram.map((link) => (
            <a
              key={link.hash}
              href={`${homeHref}${link.hash}`}
              onClick={handleNavClick}
              className="text-stone-300 hover:text-white hover:bg-white/5 text-sm font-sans font-medium tracking-wide py-3 px-3 rounded-sm transition-colors duration-200"
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
              className="text-stone-300 hover:text-white hover:bg-white/5 text-sm font-sans font-medium tracking-wide py-3 px-3 rounded-sm transition-colors duration-200"
            >
              Instagram
            </a>
          )}
          {navLinksAfterInstagram.map((link) => (
            <a
              key={link.hash}
              href={`${homeHref}${link.hash}`}
              onClick={handleNavClick}
              className="text-stone-300 hover:text-white hover:bg-white/5 text-sm font-sans font-medium tracking-wide py-3 px-3 rounded-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavClick}
            className="mt-2 hover:opacity-90 text-white text-sm font-sans font-medium px-4 py-3 rounded-sm tracking-wide transition-colors duration-200 text-center"
            style={{ backgroundColor: tenant.colorPrimary }}
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </header>
  );
}
