"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useTenant } from "@/components/TenantProvider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
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
  return photos
    .filter((p) => p.category === category)
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

  const categoriesWithPhotos = useMemo(
    () =>
      tenant.categories
        .filter((c) => c !== "Todas")
        .filter((c) => tenant.photos.some((p) => p.category === c)),
    [tenant.categories, tenant.photos]
  );

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

  const whatsappGenericMessage =
    "Olá! Gostaria de saber mais sobre o seu trabalho fotográfico e os formatos disponíveis para compra.";
  const whatsappGenericHref = buildWhatsAppUrl(
    tenant.whatsappNumber,
    whatsappGenericMessage
  );

  return (
    <section id="foto-unica" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span
            className="inline-block font-sans text-xs uppercase tracking-[0.25em] font-semibold mb-3"
            style={{ color: tenant.colorPrimary }}
          >
            {tenant.sectionFotoUnicaBadge || "Portfólio"}
          </span>
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            {tenant.sectionFotoUnicaTitle || "Foto Única"}
          </h2>
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt=""
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
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
              <button
                type="button"
                aria-label="Anterior"
                disabled={carouselPhotos.length <= 1}
                onClick={() => goCarousel(-1)}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 shadow-md border border-stone-200 p-2 text-stone-800 hover:bg-white hidden sm:flex disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                aria-label="Próximo"
                disabled={carouselPhotos.length <= 1}
                onClick={() => goCarousel(1)}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 shadow-md border border-stone-200 p-2 text-stone-800 hover:bg-white hidden sm:flex disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronRight size={22} />
              </button>

              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300"
              >
                {carouselPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    ref={(el) => {
                      slideRefs.current[idx] = el;
                    }}
                    className="snap-center shrink-0 w-[min(100%,28rem)] sm:w-[26rem]"
                  >
                    <Link
                      href={`${basePath}/foto/${photo.slug}?category=${encodeURIComponent(selectedCategory)}`}
                      className="block group"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-stone-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            photo.imageThumb ||
                            photo.imageSrc ||
                            "/placeholder.svg"
                          }
                          alt={photo.title}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                      <p className="mt-3 text-center font-sans text-base font-medium text-stone-900 transition-colors group-hover:text-stone-600">
                        {photo.title}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12 md:mt-16">
          <p className="font-sans text-stone-500 text-sm mb-4">
            {tenant.sectionFotoUnicaSubtext ||
              "Valores e formatos combinados diretamente via WhatsApp"}
          </p>
          <a
            href={whatsappGenericHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-sans text-sm font-semibold tracking-wide text-white shadow-md shadow-black/10 transition-[filter,transform] hover:brightness-105 active:scale-[0.99]"
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
