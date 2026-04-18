"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { shouldOptimizeNextImage } from "@/lib/should-optimize-image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useTenant } from "@/components/TenantProvider";
import type { TenantPhoto } from "@/lib/types";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const MAX_CATEGORY_CARDS = 8;

function photosForCategory(
  photos: TenantPhoto[],
  category: string
): TenantPhoto[] {
  const cat = category.trim();
  return photos
    .filter((p) => (p.category?.trim() || "") === cat)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export default function IndividualGallery() {
  const tenant = useTenant();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const basePath = tenant.basePath || "";
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  /** Categorias do tenant + categorias usadas nas fotos (como no painel). */
  const categoriesWithPhotos = useMemo(() => {
    const fromConfig = tenant.categories
      .map((c) => c.trim())
      .filter((c) => c.length > 0 && c !== "Todas");
    const fromPhotos = [
      ...new Set(
        tenant.photos
          .map((p) => p.category?.trim())
          .filter((c): c is string => Boolean(c && c.length > 0))
      ),
    ];
    const merged = [...new Set([...fromConfig, ...fromPhotos])].sort((a, b) =>
      a.localeCompare(b, "pt", { sensitivity: "base" })
    );
    return merged.filter((c) =>
      tenant.photos.some((p) => (p.category?.trim() || "") === c)
    );
  }, [tenant.categories, tenant.photos]);

  const displayedCategories = useMemo(
    () => categoriesWithPhotos.slice(0, MAX_CATEGORY_CARDS),
    [categoriesWithPhotos]
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null
  );
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categoriesWithPhotos.includes(cat)) {
      setSelectedCategory(cat);
    } else if (!cat || !categoriesWithPhotos.includes(cat)) {
      setSelectedCategory(null);
    }
  }, [searchParams, categoriesWithPhotos]);

  const selectCategory = useCallback(
    (cat: string) => {
      setSelectedCategory(cat);
      router.replace(
        `${pathname}?category=${encodeURIComponent(cat)}#foto-unica`,
        { scroll: false }
      );
    },
    [router, pathname]
  );

  const clearCategory = useCallback(() => {
    setSelectedCategory(null);
    router.replace(`${pathname}#foto-unica`, { scroll: false });
  }, [router, pathname]);

  const carouselPhotos = selectedCategory
    ? photosForCategory(tenant.photos, selectedCategory)
    : [];

  useEffect(() => {
    setCarouselIndex(0);
    if (carouselRef.current && carouselPhotos.length > 0) {
      carouselRef.current.scrollTo({ left: 0, behavior: "auto" });
    }
  }, [selectedCategory, carouselPhotos.length]);

  const goCarousel = (dir: -1 | 1) => {
    const n = carouselPhotos.length;
    if (n === 0) return;
    setCarouselIndex((i) => {
      const next = (i + dir + n) % n;
      requestAnimationFrame(() => {
        slideRefs.current[next]?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      });
      return next;
    });
  };

  const goCarouselToIndex = useCallback((index: number) => {
    const n = carouselPhotos.length;
    if (n === 0) return;
    const next = ((index % n) + n) % n;
    setCarouselIndex(next);
    requestAnimationFrame(() => {
      slideRefs.current[next]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    });
  }, [carouselPhotos.length]);

  const carouselScrollRaf = useRef<number | null>(null);
  const onCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    if (carouselScrollRaf.current != null) return;
    carouselScrollRaf.current = requestAnimationFrame(() => {
      carouselScrollRaf.current = null;
      const track = carouselRef.current;
      if (!track) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slideRefs.current.forEach((slide, i) => {
        if (!slide) return;
        const mid = slide.offsetLeft + slide.offsetWidth / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setCarouselIndex(best);
    });
  }, []);

  return (
    <section id="foto-unica" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            {tenant.sectionFotoUnicaTitle || "Foto Única"}
          </h2>
          <span
            className="mt-3 inline-block font-sans text-xs uppercase tracking-[0.25em] font-semibold"
            style={{ color: tenant.colorPrimary }}
          >
            {tenant.sectionFotoUnicaBadge || "Portfólio"}
          </span>
        </div>

        {categoriesWithPhotos.length === 0 ? (
          <p className="text-center font-sans text-stone-500 text-sm">
            Nenhuma categoria com fotos por enquanto.
          </p>
        ) : !selectedCategory ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5"
          >
            {displayedCategories.map((cat) => {
              const ordered = photosForCategory(tenant.photos, cat);
              const cover = ordered[0];
              if (!cover) return null;
              const img = cover.imageThumb || cover.imageSrc || "/placeholder.svg";
              return (
                <motion.button
                  key={cat}
                  type="button"
                  variants={itemVariants}
                  onClick={() => selectCategory(cat)}
                  className="group relative overflow-hidden rounded-sm bg-stone-100 text-left aspect-[4/3] w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-400"
                >
                  <span className="absolute inset-x-0 top-0 z-20 bg-linear-to-b from-black/75 via-black/40 to-transparent px-4 pt-4 pb-10">
                    <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-white drop-shadow-sm">
                      {cat}
                    </span>
                  </span>
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={!shouldOptimizeNextImage(img)}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none" />
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center sm:justify-start">
              <button
                type="button"
                onClick={clearCategory}
                className="inline-flex items-center gap-2 font-sans text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                <ChevronLeft size={18} className="shrink-0" />
                Voltar às categorias
              </button>
            </div>

            <div className="relative">
              <p className="mb-3 text-center font-sans text-xs text-stone-500 sm:hidden">
                Deslize para ver mais fotos
              </p>
              <button
                type="button"
                aria-label="Anterior"
                disabled={carouselPhotos.length <= 1}
                onClick={() => goCarousel(-1)}
                className="absolute left-0 top-[42%] z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/95 text-stone-800 shadow-md sm:left-1 sm:size-10 hover:bg-white disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft size={21} />
              </button>
              <button
                type="button"
                aria-label="Próximo"
                disabled={carouselPhotos.length <= 1}
                onClick={() => goCarousel(1)}
                className="absolute right-0 top-[42%] z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/95 text-stone-800 shadow-md sm:right-1 sm:size-10 hover:bg-white disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronRight size={21} />
              </button>

              <div
                ref={carouselRef}
                onScroll={onCarouselScroll}
                className="flex snap-x snap-mandatory scroll-pb-2 scroll-px-3 gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 sm:scroll-px-0 [&::-webkit-scrollbar]:hidden"
              >
                {carouselPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    ref={(el) => {
                      slideRefs.current[idx] = el;
                    }}
                    className="w-[min(88vw,28rem)] shrink-0 snap-center sm:w-[26rem]"
                  >
                    <Link
                      href={`${basePath}/foto/${photo.slug}?category=${encodeURIComponent(selectedCategory)}`}
                      className="block group"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-stone-100">
                        <Image
                          src={
                            photo.imageThumb ||
                            photo.imageSrc ||
                            "/placeholder.svg"
                          }
                          alt={photo.title}
                          fill
                          sizes="(max-width: 640px) 88vw, 26rem"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized={!shouldOptimizeNextImage(
                            photo.imageThumb ||
                              photo.imageSrc ||
                              "/placeholder.svg"
                          )}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/30 to-transparent p-3 pt-10 sm:hidden">
                          <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-white/95">
                            Toque para ver em detalhe
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-center font-sans text-base font-medium text-stone-900 transition-colors group-hover:text-stone-600">
                        {photo.title}
                      </p>
                      <span
                        className="mt-2 flex items-center justify-center gap-1.5 font-sans text-sm font-medium sm:hidden"
                        style={{ color: tenant.colorPrimary }}
                      >
                        <span>Abrir página da foto</span>
                        <ExternalLink size={15} strokeWidth={2} className="opacity-90" />
                      </span>
                    </Link>
                  </div>
                ))}
              </div>

              {carouselPhotos.length > 1 ? (
                <div
                  className="mt-4 flex justify-center gap-1.5 sm:hidden"
                  role="tablist"
                  aria-label="Posição no carrossel"
                >
                  {carouselPhotos.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === carouselIndex}
                      aria-label={`Ir para foto ${i + 1}`}
                      onClick={() => goCarouselToIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === carouselIndex
                          ? "w-6 bg-stone-800"
                          : "w-1.5 bg-stone-300"
                      }`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
