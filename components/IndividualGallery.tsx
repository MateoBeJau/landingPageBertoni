"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, Variants } from "framer-motion";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useTenant } from "@/components/TenantProvider";
import type { TenantPhoto } from "@/lib/types";

function PhotoSlideFooter({
  photo,
  whatsappNumber,
  basePath = "",
}: {
  photo: TenantPhoto;
  whatsappNumber: string;
  basePath?: string;
}) {
  const whatsappMessage = `Olá, tenho interesse na foto "${photo.title}" do seu portfólio. Poderia me passar mais informações sobre valores e formatos disponíveis?`;
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent sm:bg-stone-950/90 sm:backdrop-blur-sm sm:border-t sm:border-stone-800">
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-white text-sm sm:text-lg font-semibold truncate">{photo.title}</h3>
          <div className="flex items-center gap-2 sm:gap-3 text-stone-400 text-[11px] sm:text-sm font-sans">
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {photo.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {photo.year}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link
            href={`${basePath}/foto/${photo.slug}`}
            className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white font-sans font-medium text-[11px] sm:text-sm px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-sm transition-colors duration-200 whitespace-nowrap border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={12} />
            <span className="hidden sm:inline">Ver detalhes</span>
            <span className="sm:hidden">Ver</span>
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-semibold text-[11px] sm:text-sm px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-sm transition-colors duration-200 whitespace-nowrap"
            onClick={(e) => e.stopPropagation()}
          >
            <WhatsAppIcon size={13} />
            <span className="hidden sm:inline">Consultar</span>
            <span className="sm:hidden">WA</span>
          </a>
        </div>
      </div>
    </div>
  );
}

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
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const categoryList = (tenant.categories.length > 0 ? tenant.categories : [])
    .filter((c) => c !== "Todas");
  const categories = ["Todas", ...categoryList];
  const [activeCategory, setActiveCategory] = useState("Todas");

  const filtered =
    activeCategory === "Todas"
      ? tenant.photos
      : tenant.photos.filter((p) => p.category === activeCategory);

  const slides = filtered
    .filter((p) => p.imageSrc || p.imageThumb)
    .map((p) => ({
      src: p.imageSrc || p.imageThumb,
      alt: p.title,
    }));

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
            Portfólio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-semibold mb-4">
            Foto Única
          </h2>
          <p className="font-sans text-stone-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Cada imagem carrega um instante decisivo, uma luz encontrada, uma emoção congelada no
            tempo. Disponíveis para impressão em fine art, com curadoria de acabamento e suporte sob
            medida para cada obra.
          </p>
          <p className="font-sans text-stone-400 text-sm max-w-2xl mx-auto leading-relaxed mt-3">
            Disponíveis em diferentes formatos, tamanhos e suportes com qualidade premium — papel
            fine art, canvas ou papel fotográfico.
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

        {/* Photo Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {filtered.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              onClick={() => setLightboxIndex(index)}
              className="gallery-item group relative overflow-hidden rounded-sm bg-stone-100 cursor-pointer"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={photo.imageThumb || photo.imageSrc || "/placeholder.svg"}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onContextMenu={(e) => e.preventDefault()}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
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
                <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.category}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="font-sans text-stone-500 text-sm mb-4">
            Valores e formatos combinados diretamente via WhatsApp
          </p>
          <a
            href={whatsappGenericHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm tracking-wide transition-colors duration-200"
            style={{ backgroundColor: tenant.colorCta }}
          >
            <WhatsAppIcon size={15} />
            Consultar Valores
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
        render={{
          slideFooter: ({ slide }) => {
            const idx = slides.findIndex((s) => s.src === slide.src);
            const photo = filtered[idx];
            if (!photo) return null;
            return (
              <PhotoSlideFooter
                photo={photo}
                whatsappNumber={tenant.whatsappNumber}
                basePath={tenant.basePath || ""}
              />
            );
          },
        }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.97)" },
        }}
        carousel={{ finite: false }}
      />
    </section>
  );
}
