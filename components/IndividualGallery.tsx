"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, Variants } from "framer-motion";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { photos, Photo } from "@/data/photos";
import { buildWhatsAppLink } from "@/utils/whatsapp";

const categories = [
  "Todas",
  "Paisagens",
  "Urbano & Arquitetura",
  "Natureza",
  "Abstrato & Experimental",
  "Documental",
  "Artístico & Conceitual",
  "Detalhes & Texturas",
  "Sazonal & Temático",
];

function PhotoSlideFooter({ photo }: { photo: Photo }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-4 bg-stone-950/90 backdrop-blur-sm border-t border-stone-800">
      <div className="flex flex-col gap-1">
        <h3 className="font-serif text-white text-lg font-semibold">{photo.title}</h3>
        <div className="flex items-center gap-4 text-stone-400 text-sm font-sans">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            {photo.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {photo.year}
          </span>
        </div>
        {photo.description && (
          <p className="text-stone-400 text-sm font-sans mt-1 max-w-lg leading-relaxed hidden sm:block">
            {photo.description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/foto/${photo.id}`}
          className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-sans font-medium text-sm px-4 py-2.5 rounded-sm transition-colors duration-200 whitespace-nowrap border border-white/20"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={14} />
          Ver detalhes
        </Link>
        <a
          href={buildWhatsAppLink(photo.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-semibold text-sm px-5 py-2.5 rounded-sm transition-colors duration-200 whitespace-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          <WhatsAppIcon size={15} />
          Consultar
        </a>
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
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered =
    activeCategory === "Todas"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const slides = filtered.map((p) => ({
    src: p.src,
    alt: p.title,
  }));

  return (
    <section id="foto-unica" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block font-sans text-red-700 text-xs uppercase tracking-[0.25em] font-semibold mb-3">
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
          <div className="w-12 h-0.5 bg-red-700 mx-auto mt-6" />
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
                src={photo.thumb}
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
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm tracking-wide transition-colors duration-200"
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
            return <PhotoSlideFooter photo={photo} />;
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
