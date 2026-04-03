"use client";

import Image from "next/image";
import { shouldOptimizeNextImage } from "@/lib/should-optimize-image";
import { motion, Variants } from "framer-motion";
import { ChevronRight, BookOpen } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useTenant } from "@/components/TenantProvider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function EnsaiosSection() {
  const tenant = useTenant();

  if (!tenant.ensaios?.length) {
    return null;
  }

  return (
    <section id="ensaios" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className="inline-block font-sans text-xs uppercase tracking-[0.25em] font-semibold mb-3"
            style={{ color: tenant.colorPrimary }}
          >
            {tenant.sectionEnsaiosBadge || "Ensaios"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-semibold mb-4">
            {tenant.sectionEnsaiosTitle || "Ensaios Fotográficos"}
          </h2>
          <p className="font-sans text-stone-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {tenant.sectionEnsaiosDesc || "Imagens que nascem do encontro — retratos, celebrações e histórias transformadas em arte fotográfica. Cada sessão é pensada para documentar ou revelar a beleza genuína de quem se entrega ao olhar da câmera."}
          </p>
          <div
            className="w-12 h-0.5 mx-auto mt-6"
            style={{ backgroundColor: tenant.colorPrimary }}
          />
        </div>

        {/* Ensaios Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tenant.ensaios.map((ensaio, index) => (
            <motion.div
              key={ensaio.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group cursor-pointer bg-stone-50 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100"
            >
              {/* Cover Image */}
              <div className="relative overflow-hidden bg-stone-200" style={{ aspectRatio: "4/3" }}>
                {ensaio.cover ? (
                  <Image
                    src={ensaio.cover}
                    alt={ensaio.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onContextMenu={(e) => e.preventDefault()}
                    unoptimized={!shouldOptimizeNextImage(ensaio.cover)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                    <BookOpen className="h-16 w-16 opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-white text-xl sm:text-2xl font-semibold">
                    {ensaio.title}
                  </h3>
                  <p className="font-sans text-stone-300 text-sm mt-0.5">{ensaio.subtitle}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5">
                <p className="font-sans text-stone-600 text-sm leading-relaxed line-clamp-2">
                  {ensaio.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-sans text-stone-400 text-xs">{ensaio.priceInfo}</span>
                  <a
                    href={buildWhatsAppUrl(
                      tenant.whatsappNumber,
                      `Olá, tenho interesse no ensaio "${ensaio.title}". Poderia me passar mais informações sobre valores e formato?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 font-sans text-sm font-medium group-hover:gap-2 transition-all duration-200"
                    style={{ color: tenant.colorPrimary }}
                  >
                    Consultar
                    <ChevronRight size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="font-sans text-stone-500 text-sm mb-4">
            {tenant.sectionEnsaiosCtaSubtext || "Cada ensaio é único — entre em contato para conversarmos sobre o seu projeto"}
          </p>
          <a
            href={buildWhatsAppUrl(
              tenant.whatsappNumber,
              "Olá! Gostaria de agendar um ensaio fotográfico."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm tracking-wide transition-colors duration-200 hover:opacity-90"
            style={{ backgroundColor: tenant.colorCta }}
          >
            <WhatsAppIcon size={15} />
            {tenant.sectionEnsaiosCta || "Agendar Ensaio via WhatsApp"}
          </a>
        </div>
      </div>
    </section>
  );
}
