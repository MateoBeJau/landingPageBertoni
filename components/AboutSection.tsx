"use client";

import Image from "next/image";
import { Camera, Award, MapPin } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useTenant } from "@/components/TenantProvider";

const defaultHighlights = [
  { icon: Camera, label: "15+ anos de experiência", desc: "Fotografando o Sul e o Brasil" },
  { icon: Award, label: "Impressões de alta qualidade", desc: "Papel Fine Art e Canvas" },
  { icon: MapPin, label: "Porto Alegre, RS", desc: "Atendimento em todo o Brasil" },
];

export default function AboutSection() {
  const tenant = useTenant();
  const highlights = (tenant.aboutHighlights && tenant.aboutHighlights.length >= 3)
    ? defaultHighlights.map((d, i) => ({ ...d, label: tenant.aboutHighlights![i].label, desc: tenant.aboutHighlights![i].desc }))
    : defaultHighlights;
  const whatsappLink = `https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent(
    "Olá! Gostaria de saber mais sobre o seu trabalho fotográfico e os formatos disponíveis para compra."
  )}`;

  return (
    <section id="sobre" className="py-20 md:py-28 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "4/5" }}>
              {tenant.aboutImage ? (
                <Image
                  src={tenant.aboutImage}
                  alt={`${tenant.name}, fotógrafo profissional`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover protected-image"
                />
              ) : (
                <div className="absolute inset-0 bg-stone-800" />
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 to-transparent" />
            </div>
            {/* Decorative frame */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full border rounded-sm -z-10"
              style={{ borderColor: `${tenant.colorPrimary}40` }}
            />
            {/* Experience badge */}
            <div className="absolute bottom-6 left-6 bg-stone-950/95 backdrop-blur-sm border border-stone-800 rounded-sm px-4 py-3">
              <p className="font-serif text-white text-2xl font-semibold">{tenant.aboutYears || "15+"}</p>
              <p className="font-sans text-stone-400 text-xs uppercase tracking-wider">{tenant.aboutYearsLabel || "Anos fotografando"}</p>
            </div>
          </div>

          {/* Text side */}
          <div className="lg:pl-4">
            <span
              className="inline-block font-sans text-xs uppercase tracking-[0.25em] font-semibold mb-3"
              style={{ color: tenant.colorPrimary }}
            >
              {tenant.aboutSectionLabel || "Sobre o Fotógrafo"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-semibold mb-6 leading-tight">
              {tenant.name}
            </h2>
            <div className="w-10 h-0.5 mb-6" style={{ backgroundColor: tenant.colorPrimary }} />

            <div className="space-y-4 font-sans text-stone-400 text-base leading-relaxed">
              {tenant.aboutText1 && <p>{tenant.aboutText1}</p>}
              {tenant.aboutText2 && <p>{tenant.aboutText2}</p>}
              {tenant.aboutText3 && <p>{tenant.aboutText3}</p>}
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {highlights.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 border border-stone-800 rounded-sm p-4">
                  <item.icon size={18} className="mb-1" style={{ color: tenant.colorPrimary }} />
                  <p className="font-sans text-white text-sm font-medium">{item.label}</p>
                  <p className="font-sans text-stone-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white font-sans font-semibold text-sm px-6 py-3.5 rounded-sm tracking-wide transition-colors duration-200 hover:opacity-90"
                style={{ backgroundColor: tenant.colorCta }}
              >
                <WhatsAppIcon size={16} />
                {tenant.aboutCtaContact || "Entrar em Contato"}
              </a>
              <a
                href="#foto-unica"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-sans font-medium text-sm px-6 py-3.5 rounded-sm tracking-wide transition-colors duration-200 border border-stone-700 hover:border-stone-500"
              >
                {tenant.aboutCtaPortfolio || "Ver Portfólio"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
