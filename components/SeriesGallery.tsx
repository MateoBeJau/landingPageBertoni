"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { shouldOptimizeNextImage } from "@/lib/should-optimize-image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Images, ChevronRight, MapPin, Calendar } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useTenant } from "@/components/TenantProvider";
import type { TenantSeries, TenantConfig } from "@/lib/types";

import { buildWhatsAppUrl as buildWspUrl } from "@/lib/whatsapp";

function buildWhatsAppUrl(whatsappNumber: string, context?: string): string {
  const message = context
    ? `Olá, tenho interesse na foto "${context}" do seu portfólio. Poderia me passar mais informações sobre valores e formatos disponíveis?`
    : `Olá! Gostaria de saber mais sobre o seu trabalho fotográfico e os formatos disponíveis para compra.`;
  return buildWspUrl(whatsappNumber, message);
}

function SeriesModal({
  serie,
  tenant,
  onClose,
}: {
  serie: TenantSeries;
  tenant: TenantConfig;
  onClose: () => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const hasPhotos = serie.photos.some((p) => p.imageSrc || p.imageThumb);
  const displayPhotos = hasPhotos
    ? serie.photos
    : serie.cover
      ? [{ id: "cover", title: serie.title, location: "", year: 0, imageSrc: serie.cover, imageThumb: serie.cover, order: 0 }]
      : [];
  const slides = displayPhotos
    .filter((p) => p.imageSrc || p.imageThumb)
    .map((p, i) => ({ src: p.imageSrc || p.imageThumb, alt: p.title || `Photo ${i + 1}` }));

  /** Foto da galeria individual (slug + categoria para URL igual ao carrossel). */
  const resolveGalleryPhoto = (
    photo: (typeof displayPhotos)[number]
  ): { slug: string; category: string | null } | null => {
    const linkedSlug =
      "slug" in photo && photo.slug && String(photo.slug).trim()
        ? String(photo.slug).trim()
        : null;
    if (linkedSlug) {
      const p = tenant.photos.find((x) => x.slug === linkedSlug);
      return {
        slug: linkedSlug,
        category: p?.category?.trim() ? p.category : null,
      };
    }
    const spSrc = (photo.imageSrc || "").trim();
    const spThumb = (photo.imageThumb || "").trim();
    const srcOk = spSrc.length > 0 && spSrc !== "/placeholder.svg";
    const thumbOk = spThumb.length > 0 && spThumb !== "/placeholder.svg";
    const hasUsableUrl = srcOk || thumbOk;
    const byUrl = hasUsableUrl
      ? tenant.photos.find(
          (p) =>
            p.imageSrc === photo.imageSrc ||
            p.imageSrc === photo.imageThumb ||
            p.imageThumb === photo.imageSrc ||
            p.imageThumb === photo.imageThumb
        )
      : undefined;
    if (byUrl?.slug?.trim()) {
      return {
        slug: byUrl.slug.trim(),
        category: byUrl.category?.trim() ? byUrl.category : null,
      };
    }
    const photoTitle = photo.title?.trim() || "";
    if (!photoTitle) return null;
    const byTitleLocation = tenant.photos.find((p) => {
      if (p.title.trim().toLowerCase() !== photoTitle.toLowerCase()) return false;
      const pLoc = p.location?.trim().toLowerCase() || "";
      const sLoc = photo.location?.trim().toLowerCase() || "";
      return !pLoc || !sLoc || pLoc === sLoc;
    });
    if (!byTitleLocation?.slug?.trim()) return null;
    return {
      slug: byTitleLocation.slug.trim(),
      category: byTitleLocation.category?.trim()
        ? byTitleLocation.category
        : null,
    };
  };

  const getDetailHref = (photo: (typeof displayPhotos)[number]) => {
    const basePath = tenant.basePath || "";
    const g = resolveGalleryPhoto(photo);
    if (g?.slug?.trim()) {
      const slug = g.slug.trim();
      const existsInGallery = tenant.photos.some((p) => p.slug === slug);
      if (existsInGallery) {
        const q = g.category
          ? `?category=${encodeURIComponent(g.category)}`
          : "";
        return `${basePath}/foto/${slug}${q}`;
      }
    }
    if (photo.id && photo.id !== "cover") {
      return `${basePath}/serie/${serie.slug}/foto/${photo.id}`;
    }
    return null;
  };

  // Bloquear scroll; restaurar main tras un retardo para evitar mouseup en "Foto única".
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const mainEl = document.querySelector("main");
    const prevMainPe = mainEl?.style.pointerEvents ?? "";
    if (mainEl) mainEl.style.pointerEvents = "none";
    return () => {
      document.body.style.overflow = prevOverflow;
      window.setTimeout(() => {
        if (!document.querySelector("[data-series-modal-root]") && mainEl) {
          mainEl.style.pointerEvents = prevMainPe;
        }
      }, 320);
    };
  }, []);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape" && lightboxIndex < 0) onClose(); },
    [onClose, lightboxIndex]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="series-modal"
        data-series-modal-root
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-sm overflow-y-auto"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="min-h-screen py-8 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 pt-4">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.2em] mb-1" style={{ color: tenant.colorPrimary }}>
                  {tenant.sectionSeriesModalLabel || "Série Fotográfica"}
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
                className="ml-4 p-2 text-stone-400 hover:text-white hover:bg-white/10 rounded-sm transition-colors shrink-0"
                aria-label="Fechar"
              >
                <X size={22} />
              </button>
            </div>

            {/* Description */}
            <p className="font-sans text-stone-400 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl border-l-2 pl-4" style={{ borderColor: tenant.colorPrimary }}>
              {serie.description}
            </p>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
              {displayPhotos.map((photo, index) => {
                const href = getDetailHref(photo);
                const cellClass = "gallery-item group relative overflow-hidden rounded-sm bg-stone-800 cursor-pointer";
                const cellStyle = { aspectRatio: "4/3" as const };
                const content = (
                  <>
                    <Image
                      src={photo.imageThumb || photo.imageSrc || "/placeholder.svg"}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onContextMenu={(e) => e.preventDefault()}
                      unoptimized={!shouldOptimizeNextImage(
                        photo.imageThumb || photo.imageSrc || "/placeholder.svg"
                      )}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                      {index + 1}/{displayPhotos.length}
                    </div>
                  </>
                );

                return href ? (
                  <Link
                    key={photo.id || `photo-${index}`}
                    href={href}
                    className={`relative block ${cellClass}`}
                    style={cellStyle}
                  >
                    {content}
                  </Link>
                ) : (
                  <div
                    key={photo.id || `photo-${index}`}
                    onClick={() => setLightboxIndex(index)}
                    className={`relative ${cellClass}`}
                    style={cellStyle}
                  >
                    {content}
                  </div>
                );
              })}
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
                href={buildWhatsAppUrl(tenant.whatsappNumber, serie.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm transition-colors duration-200 whitespace-nowrap"
                style={{ backgroundColor: tenant.colorCta }}
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
        key="series-lightbox"
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.99)", zIndex: 9999 } }}
        render={{
          slideFooter: ({ slide }) => {
            const idx = slides.findIndex((s) => s.src === slide.src);
            const photo = displayPhotos[idx];
            if (!photo) return null;
            return (
              <div className="flex items-center justify-between gap-4 px-4 py-3 bg-stone-950/90 border-t border-stone-800">
                <div>
                  <p className="font-serif text-white text-base font-medium">{photo.title}</p>
                  {(photo.location || photo.year) && (
                    <p className="font-sans text-stone-400 text-xs flex items-center gap-3 mt-0.5">
                      {photo.location && <span className="flex items-center gap-1"><MapPin size={11} />{photo.location}</span>}
                      {photo.year && <span className="flex items-center gap-1"><Calendar size={11} />{photo.year}</span>}
                    </p>
                  )}
                </div>
                <a
                  href={buildWhatsAppUrl(tenant.whatsappNumber, `${photo.title} (série ${serie.title})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 text-white font-sans text-xs font-semibold px-4 py-2 rounded-sm transition-colors"
                  style={{ backgroundColor: tenant.colorCta }}
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
    </AnimatePresence>,
    document.body
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
  const tenant = useTenant();
  const [selectedSeries, setSelectedSeries] = useState<TenantSeries | null>(null);

  return (
    <section id="series" className="py-20 md:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-semibold">
            {tenant.sectionSeriesTitle || "Séries Fotográficas"}
          </h2>
          {tenant.sectionSeriesDesc ? (
            <p className="font-sans text-stone-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
              {tenant.sectionSeriesDesc}
            </p>
          ) : null}
          <div className="w-12 h-0.5 mx-auto mt-6" style={{ backgroundColor: tenant.colorPrimary }} />
        </div>

        {/* Series Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {tenant.series.map((serie, index) => (
            <motion.div
              key={serie.id || serie.slug || `serie-${index}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              onClick={() => setSelectedSeries(serie)}
              className="group cursor-pointer bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100"
            >
              {/* Cover Image */}
              <div className="relative overflow-hidden bg-stone-200" style={{ aspectRatio: "16/9" }}>
                {serie.cover ? (
                  <Image
                    src={serie.cover}
                    alt={serie.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onContextMenu={(e) => e.preventDefault()}
                    unoptimized={!shouldOptimizeNextImage(serie.cover)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                    <Images className="h-16 w-16 opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
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
                    {tenant.sectionSeriesClique || "Clique para explorar"}
                  </span>
                  <span className="flex items-center gap-1 font-sans text-sm font-medium group-hover:gap-2 transition-all duration-200" style={{ color: tenant.colorPrimary }}>
                    {tenant.sectionSeriesVerSerie || "Ver série"}
                    <ChevronRight size={15} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal no portal (evita cliques a atravessar para Foto única) */}
      {selectedSeries ? (
        <SeriesModal
          serie={selectedSeries}
          tenant={tenant}
          onClose={() => setSelectedSeries(null)}
        />
      ) : null}
    </section>
  );
}
