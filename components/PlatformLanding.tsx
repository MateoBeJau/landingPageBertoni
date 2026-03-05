"use client";

import Link from "next/link";
import {
  Camera,
  Globe,
  LayoutDashboard,
  Image,
  Shield,
  Zap,
  Smartphone,
  Palette,
} from "lucide-react";

export default function PlatformLanding() {
  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Hero - Propuesta de valor */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-stone-950 to-stone-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.15),transparent)]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-amber-400/90 text-xs font-sans uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-8 border border-amber-500/30 bg-amber-950/30">
            <Camera className="w-4 h-4" />
            Plataforma SaaS para fotógrafos
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6">
            Tu sitio web de fotografía
            <br />
            <span className="text-amber-400">en minutos, no en semanas</span>
          </h1>
          <p className="font-sans text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Landing profesional para cada fotógrafo. Dominio propio o URL incluida.
            Galerías, series, ensaios y WhatsApp integrado. Sin código, sin complicaciones.
          </p>
          <p className="font-sans text-stone-500 text-sm mb-10">
            Ideal para estudios, agencias o fotógrafos independientes que quieren vender online.
          </p>
          <div className="flex justify-center">
            <Link
              href="/panel/login"
              className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-sans font-semibold px-8 py-4 rounded-sm tracking-wide transition-colors shadow-lg shadow-amber-900/30"
            >
              <LayoutDashboard className="w-5 h-5" />
              Acceder al Panel
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-center mb-4 text-white">
            Todo lo que necesitas para vender tu trabajo
          </h2>
          <p className="font-sans text-stone-500 text-center mb-16 max-w-2xl mx-auto">
            Una solución completa para gestionar múltiples fotógrafos o tu propio portafolio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-900/50 transition-colors">
              <Globe className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="font-serif text-xl font-semibold mb-2 text-white">
                Tu dominio o tu ruta
              </h3>
              <p className="font-sans text-stone-400 text-sm leading-relaxed">
                Cada fotógrafo puede usar su dominio (ej. juanfotografo.com) o una URL
                tipo plataforma.com/juan si aún no tiene dominio propio.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-900/50 transition-colors">
              <Image className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="font-serif text-xl font-semibold mb-2 text-white">
                Galerías y series
              </h3>
              <p className="font-sans text-stone-400 text-sm leading-relaxed">
                Foto única, series fotográficas y ensaios. Sube imágenes, edita textos
                y organiza todo desde un panel intuitivo.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-900/50 transition-colors">
              <Smartphone className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="font-serif text-xl font-semibold mb-2 text-white">
                WhatsApp integrado
              </h3>
              <p className="font-sans text-stone-400 text-sm leading-relaxed">
                Los visitantes contactan directo por WhatsApp. Consultas por foto,
                series o ensaios. Sin formularios ni emails.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-900/50 transition-colors">
              <Palette className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="font-serif text-xl font-semibold mb-2 text-white">
                Personalizable
              </h3>
              <p className="font-sans text-stone-400 text-sm leading-relaxed">
                Colores, textos, imágenes y secciones. Cada fotógrafo define su estilo
                sin tocar código.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-900/50 transition-colors">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="font-serif text-xl font-semibold mb-2 text-white">
                Rápido y responsive
              </h3>
              <p className="font-sans text-stone-400 text-sm leading-relaxed">
                Sitios optimizados para móvil y desktop. Carga rápida y diseño
                profesional listo para usar.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-900/50 transition-colors">
              <Shield className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="font-serif text-xl font-semibold mb-2 text-white">
                Multi-tenant
              </h3>
              <p className="font-sans text-stone-400 text-sm leading-relaxed">
                Un solo admin gestiona múltiples fotógrafos. Cada uno con su sitio,
                su panel y sus credenciales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-800 bg-stone-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-4 text-white">
            ¿Listo para empezar?
          </h2>
          <p className="font-sans text-stone-500 mb-8">
            Accede a tu panel para gestionar tu sitio y galerías.
          </p>
          <Link
            href="/panel/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-sans font-medium bg-amber-600 hover:bg-amber-500 text-white transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Acceder al Panel
          </Link>
        </div>
      </section>
    </div>
  );
}
