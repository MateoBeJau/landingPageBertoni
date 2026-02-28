"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Images, ChevronRight, MapPin, Calendar } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { series, PhotoSeries } from "@/data/series";
import { buildWhatsAppLink } from "@/utils/whatsapp";

function SeriesModal({
  serie,
  onClose,
}: {
  serie: PhotoSeries;
  onClose: () => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const slides = serie.photos.map((p) => ({ src: p.src, alt: p.title }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="min-h-screen py-8 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 pt-4">
              <div>
                <p className="font-sans text-red-500 text-xs uppercase tracking-[0.2em] mb-1">
                  Série Fotográfica
                </p>
                <h2 className="font-serif text-white text-2xl sm:text-3xl md:text-4xl font-semibold">
                  {serie.title}
                </h2>
                <p className="font-sans text-stone-400 text-sm sm:text-base mt-1">
                  {serie.subtitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-2 text-stone-400 hover:text-white hover:bg-white/10 rounded-sm transition-colors flex-shrink-0"
                aria-label="Fechar"
              >
                <X size={22} />
              </button>
            </div>

            {/* Description */}
            <p className="font-sans text-stone-400 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl border-l-2 border-red-700 pl-4">
              {serie.description}
            </p>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
              {serie.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setLightboxIndex(index)}
                  className="gallery-item group relative overflow-hidden rounded-sm bg-stone-800 cursor-pointer"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={photo.thumb}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="font-serif text-white text-sm font-medium">
                      {photo.title}
                    </p>
                    <p className="font-sans text-stone-300 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin size={10} />
                      {photo.location}
                    </p>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/60 text-stone-300 text-xs font-sans px-1.5 py-0.5 rounded-sm">
                    {index + 1}/{serie.photos.length}
                  </div>
                </div>
              ))}
            </div>

            {/* Buy CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-900 rounded-sm p-5 border border-stone-800">
              <div>
                <p className="font-serif text-white font-medium">
                  Interessado nesta série?
                </p>
                <p className="font-sans text-stone-400 text-sm mt-0.5">
                  Adquira a série completa ou prints avulsos com qualidade profissional.
                </p>
              </div>
              <a
                href={buildWhatsAppLink(serie.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm transition-colors duration-200 whitespace-nowrap"
              >
                <WhatsAppIcon size={16} />
                Adquirir via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox dentro do modal */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.99)", zIndex: 9999 } }}
        render={{
          slideFooter: ({ slide }) => {
            const idx = slides.findIndex((s) => s.src === slide.src);
            const photo = serie.photos[idx];
            if (!photo) return null;
            return (
              <div className="flex items-center justify-between gap-4 px-4 py-3 bg-stone-950/90 border-t border-stone-800">
                <div>
                  <p className="font-serif text-white text-base font-medium">{photo.title}</p>
                  <p className="font-sans text-stone-400 text-xs flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1"><MapPin size={11} />{photo.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={11} />{photo.year}</span>
                  </p>
                </div>
                <a
                  href={buildWhatsAppLink(`${photo.title} (série ${serie.title})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans text-xs font-semibold px-4 py-2 rounded-sm transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <WhatsAppIcon size={13} />
                  Comprar
                </a>
              </div>
            );
          },
        }}
      />
    </AnimatePresence>
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function SeriesGallery() {
  const [selectedSeries, setSelectedSeries] = useState<PhotoSeries | null>(null);

  return (
    <section id="series" className="py-20 md:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block font-sans text-red-700 text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            Séries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-semibold mb-4">
            Séries Fotográficas
          </h2>
          <p className="font-sans text-stone-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Conjuntos de fotografias que narram histórias e capturam a essência
            de lugares e culturas. Disponíveis em impressões avulsas ou como
            coleção completa.
          </p>
          <div className="w-12 h-0.5 bg-red-700 mx-auto mt-6" />
        </div>

        {/* Series Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {series.map((serie, index) => (
            <motion.div
              key={serie.slug}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              onClick={() => setSelectedSeries(serie)}
              className="group cursor-pointer bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100"
            >
              {/* Cover Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={serie.cover}
                  alt={serie.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* Photo count badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-sans px-2.5 py-1 rounded-sm">
                  <Images size={12} />
                  {serie.photos.length} fotos
                </div>
                {/* Bottom overlay text */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-white text-xl sm:text-2xl font-semibold">
                    {serie.title}
                  </h3>
                  <p className="font-sans text-stone-300 text-sm mt-0.5">
                    {serie.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5">
                <p className="font-sans text-stone-600 text-sm leading-relaxed line-clamp-2">
                  {serie.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-sans text-stone-400 text-xs">
                    Clique para explorar
                  </span>
                  <span className="flex items-center gap-1 font-sans text-red-700 text-sm font-medium group-hover:gap-2 transition-all duration-200">
                    Ver série
                    <ChevronRight size={15} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Series Modal */}
      <AnimatePresence>
        {selectedSeries && (
          <SeriesModal
            serie={selectedSeries}
            onClose={() => setSelectedSeries(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
