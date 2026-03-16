"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useTenant } from "@/components/TenantProvider";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function IndividualGallery() {
  const tenant = useTenant();
  const basePath = tenant.basePath || "";
  const categoryList = (tenant.categories.length > 0 ? tenant.categories : [])
    .filter((c) => c !== "Todas");
  const categories = [...categoryList, "Todas"];
  const defaultCategory = categoryList.length > 0 ? categoryList[0] : "Todas";
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  const filtered =
    activeCategory === "Todas"
      ? tenant.photos
      : tenant.photos.filter((p) => p.category === activeCategory);

  const whatsappGenericMessage =
    "Olá! Gostaria de saber mais sobre o seu trabalho fotográfico e os formatos disponíveis para compra.";
  const whatsappGenericHref = `https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent(whatsappGenericMessage)}`;

  return (
    <section id="foto-unica" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className="inline-block font-sans text-xs uppercase tracking-[0.25em] font-semibold mb-3"
            style={{ color: tenant.colorPrimary }}
          >
            {tenant.sectionFotoUnicaBadge || "Portfólio"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-semibold mb-4">
            {tenant.sectionFotoUnicaTitle || "Foto Única"}
          </h2>
          <p className="font-sans text-stone-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {tenant.sectionFotoUnicaDesc || "Cada imagem carrega um instante decisivo, uma luz encontrada, uma emoção congelada no tempo. Disponíveis para impressão em fine art, com curadoria de acabamento e suporte sob medida para cada obra."}
          </p>
          <p className="font-sans text-stone-400 text-sm max-w-2xl mx-auto leading-relaxed mt-3">
            {tenant.sectionFotoUnicaDesc2 || "Disponíveis em diferentes formatos, tamanhos e suportes com qualidade premium — papel fine art, canvas ou papel fotográfico."}
          </p>
          <div
            className="w-12 h-0.5 mx-auto mt-6"
            style={{ backgroundColor: tenant.colorPrimary }}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-sm px-4 py-1.5 rounded-sm border transition-all duration-200 tracking-wide ${
                activeCategory === cat
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid - cuadradas uniformes */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {filtered.map((photo) => (
            <Link
              key={photo.id}
              href={`${basePath}/foto/${photo.slug}`}
              className="block aspect-square"
            >
              <motion.div
                variants={itemVariants}
                className="gallery-item group relative overflow-hidden rounded-sm bg-stone-100 cursor-pointer h-full w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.imageThumb || photo.imageSrc || "/placeholder.svg"}
                  alt={photo.title}
                  className="block w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  onContextMenu={(e) => e.preventDefault()}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <p className="font-serif text-white text-sm font-medium leading-tight">
                    {photo.title}
                  </p>
                  <p className="font-sans text-stone-300 text-xs mt-0.5 flex items-center gap-1">
                    <MapPin size={10} />
                    {photo.location}
                  </p>
                </div>
                {/* Category badge */}
                {photo.category && (
                  <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {photo.category}
                  </span>
                )}
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="font-sans text-stone-500 text-sm mb-4">
            {tenant.sectionFotoUnicaSubtext || "Valores e formatos combinados diretamente via WhatsApp"}
          </p>
          <a
            href={whatsappGenericHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm tracking-wide transition-colors duration-200"
            style={{ backgroundColor: tenant.colorCta }}
          >
            <WhatsAppIcon size={15} />
            {tenant.sectionFotoUnicaCta || "Consultar Valores"}
          </a>
        </div>
      </div>
    </section>
  );
}
