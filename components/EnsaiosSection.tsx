"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { buildWhatsAppLink } from "@/utils/whatsapp";

const ensaios = [
  {
    id: "retratos",
    title: "Retratos",
    subtitle: "A alma revelada pelo olhar",
    description:
      "Sessões de retrato que capturam a essência genuína de cada pessoa — sua história, seus contrastes, sua luz interior.",
    cover:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85",
    count: "Sob consulta",
  },
  {
    id: "celebracoes",
    title: "Celebrações",
    subtitle: "Momentos que merecem eternidade",
    description:
      "Casamentos, formaturas, aniversários e eventos especiais documentados com sensibilidade artística e atenção aos detalhes que importam.",
    cover:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85",
    count: "Sob consulta",
  },
  {
    id: "corporativo",
    title: "Corporativo & Editorial",
    subtitle: "Identidade visual com profundidade",
    description:
      "Imagens editoriais e corporativas que transcendem o convencional, construindo narrativas visuais poderosas para marcas e projetos.",
    cover:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85",
    count: "Sob consulta",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function EnsaiosSection() {
  return (
    <section id="ensaios" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block font-sans text-red-700 text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            Ensaios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-semibold mb-4">
            Ensaios Fotográficos
          </h2>
          <p className="font-sans text-stone-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Imagens que nascem do encontro — retratos, celebrações e histórias transformadas
            em arte fotográfica. Cada sessão é pensada para documentar ou revelar a beleza
            genuína de quem se entrega ao olhar da câmera.
          </p>
          <div className="w-12 h-0.5 bg-red-700 mx-auto mt-6" />
        </div>

        {/* Ensaios Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ensaios.map((ensaio, index) => (
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
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={ensaio.cover}
                  alt={ensaio.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  onContextMenu={(e) => e.preventDefault()}
                />
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
                  <span className="font-sans text-stone-400 text-xs">{ensaio.count}</span>
                  <a
                    href={buildWhatsAppLink(`Ensaio: ${ensaio.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 font-sans text-red-700 text-sm font-medium group-hover:gap-2 transition-all duration-200"
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
            Cada ensaio é único — entre em contato para conversarmos sobre o seu projeto
          </p>
          <a
            href={buildWhatsAppLink("Ensaio fotográfico")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm tracking-wide transition-colors duration-200"
          >
            <WhatsAppIcon size={15} />
            Agendar Ensaio via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
