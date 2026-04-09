import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";
import { TenantConfig } from "./types";
import { TENANT_PUBLIC_TAG } from "./revalidate-public";

/** Solo columnas que consume la landing / mapTenantToConfig (sin timestamps ni relaciones extra). */
const tenantPublicSelect = {
  id: true,
  slug: true,
  domain: true,
  name: true,
  subtitle: true,
  whatsappNumber: true,
  email: true,
  maxPhotos: true,
  colorPrimary: true,
  colorAccent: true,
  colorCta: true,
  heroTitle: true,
  heroSubtitle: true,
  heroImage: true,
  heroBadge: true,
  aboutTitle: true,
  aboutText1: true,
  aboutText2: true,
  aboutText3: true,
  aboutImage: true,
  contactTitle: true,
  contactText: true,
  stat1Value: true,
  stat1Label: true,
  stat2Value: true,
  stat2Label: true,
  stat3Value: true,
  stat3Label: true,
  stat4Value: true,
  stat4Label: true,
  categories: true,
  instagramUrl: true,
  facebookUrl: true,
  metaTitle: true,
  metaDescription: true,
  sectionFotoUnicaBadge: true,
  sectionFotoUnicaTitle: true,
  sectionFotoUnicaDesc: true,
  sectionFotoUnicaDesc2: true,
  sectionFotoUnicaCta: true,
  sectionFotoUnicaSubtext: true,
  sectionSeriesBadge: true,
  sectionSeriesTitle: true,
  sectionSeriesDesc: true,
  sectionSeriesModalLabel: true,
  sectionSeriesVerSerie: true,
  sectionSeriesClique: true,
  sectionEnsaiosBadge: true,
  sectionEnsaiosTitle: true,
  sectionEnsaiosDesc: true,
  sectionEnsaiosCta: true,
  sectionEnsaiosCtaSubtext: true,
  heroCtaWhatsApp: true,
  heroCtaPortfolio: true,
  heroScrollLabel: true,
  contactCta: true,
  contactSubtext: true,
  aboutSectionLabel: true,
  aboutYears: true,
  aboutYearsLabel: true,
  aboutCtaContact: true,
  aboutCtaPortfolio: true,
  aboutHighlights: true,
  photos: {
    where: { active: true },
    orderBy: { order: "asc" as const },
    select: {
      id: true,
      title: true,
      slug: true,
      location: true,
      year: true,
      description: true,
      category: true,
      imageSrc: true,
      imageThumb: true,
      price: true,
      format: true,
      printType: true,
      order: true,
    },
  },
  series: {
    where: { active: true },
    orderBy: { order: "asc" as const },
    select: {
      id: true,
      title: true,
      slug: true,
      subtitle: true,
      description: true,
      cover: true,
      order: true,
      photos: {
        orderBy: { order: "asc" as const },
        select: {
          id: true,
          title: true,
          location: true,
          year: true,
          imageSrc: true,
          imageThumb: true,
          order: true,
          photo: { select: { slug: true } },
        },
      },
    },
  },
  ensaios: {
    where: { active: true },
    orderBy: { order: "asc" as const },
    select: {
      id: true,
      title: true,
      slug: true,
      subtitle: true,
      description: true,
      cover: true,
      priceInfo: true,
      order: true,
    },
  },
} as const;

async function fetchTenantRowFromDb(host: string, pathSlug: string) {
  const trimmedHost = host.trim();
  if (trimmedHost) {
    const cleanHost = trimmedHost.replace(/:\d+$/, "").toLowerCase();
    const withoutWww = cleanHost.startsWith("www.")
      ? cleanHost.slice(4)
      : cleanHost;

    const tenant = await prisma.tenant.findFirst({
      where: {
        active: true,
        OR: [
          { domain: cleanHost },
          { domain: withoutWww },
          { slug: withoutWww.split(".")[0] },
        ],
      },
      select: tenantPublicSelect,
    });
    if (tenant) return tenant;
  }

  if (pathSlug.trim()) {
    return prisma.tenant.findFirst({
      where: { active: true, slug: pathSlug.trim().toLowerCase() },
      select: tenantPublicSelect,
    });
  }

  return null;
}

function mapTenantToConfig(tenant: {
  id: string;
  slug: string;
  domain: string | null;
  name: string;
  subtitle: string;
  whatsappNumber: string;
  email: string | null;
  maxPhotos: number;
  colorPrimary: string;
  colorAccent: string;
  colorCta: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroBadge: string;
  aboutTitle: string | null;
  aboutText1: string | null;
  aboutText2: string | null;
  aboutText3: string | null;
  aboutImage: string | null;
  contactTitle: string;
  contactText: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
  categories: string;
  instagramUrl: string | null;
  facebookUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  photos: Array<{
    id: string;
    title: string;
    slug: string;
    location: string;
    year: number;
    description: string | null;
    category: string | null;
    imageSrc: string;
    imageThumb: string;
    price: string | null;
    format: string | null;
    printType: string | null;
    order: number;
  }>;
  series: Array<{
    id: string;
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    cover: string;
    order: number;
    photos: Array<{
      id: string;
      title: string;
      location: string;
      year: number;
      imageSrc: string;
      imageThumb: string;
      order: number;
      photo?: { slug: string } | null;
    }>;
  }>;
  ensaios: Array<{
    id: string;
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    cover: string;
    priceInfo: string;
    order: number;
  }>;
}): TenantConfig {
  return {
    id: tenant.id,
    slug: tenant.slug,
    domain: tenant.domain,
    name: tenant.name,
    subtitle: tenant.subtitle,
    whatsappNumber: tenant.whatsappNumber,
    email: tenant.email,
    maxPhotos: tenant.maxPhotos,
    colorPrimary: tenant.colorPrimary,
    colorAccent: tenant.colorAccent,
    colorCta: tenant.colorCta,
    heroTitle: tenant.heroTitle,
    heroSubtitle: tenant.heroSubtitle,
    heroImage: tenant.heroImage,
    heroBadge: tenant.heroBadge,
    aboutTitle: tenant.aboutTitle,
    aboutText1: tenant.aboutText1,
    aboutText2: tenant.aboutText2,
    aboutText3: tenant.aboutText3,
    aboutImage: tenant.aboutImage,
    contactTitle: tenant.contactTitle,
    contactText: tenant.contactText,
    stats: [
      { value: tenant.stat1Value, label: tenant.stat1Label },
      { value: tenant.stat2Value, label: tenant.stat2Label },
      { value: tenant.stat3Value, label: tenant.stat3Label },
      { value: tenant.stat4Value, label: tenant.stat4Label },
    ],
    categories: (() => {
      const fromTenant = tenant.categories
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      const fromPhotos = tenant.photos
        .map((p) => p.category)
        .filter((c): c is string => !!c?.trim());
      return [...new Set([...fromTenant, ...fromPhotos])].sort();
    })(),
    instagramUrl: tenant.instagramUrl,
    facebookUrl: tenant.facebookUrl,
    metaTitle: tenant.metaTitle,
    metaDescription: tenant.metaDescription,
    sectionFotoUnicaBadge:
      String((tenant as Record<string, unknown>).sectionFotoUnicaBadge ?? "") ||
      null,
    sectionFotoUnicaTitle:
      String((tenant as Record<string, unknown>).sectionFotoUnicaTitle ?? "") ||
      null,
    sectionFotoUnicaDesc:
      String((tenant as Record<string, unknown>).sectionFotoUnicaDesc ?? "") ||
      null,
    sectionFotoUnicaDesc2:
      String((tenant as Record<string, unknown>).sectionFotoUnicaDesc2 ?? "") ||
      null,
    sectionFotoUnicaCta:
      String((tenant as Record<string, unknown>).sectionFotoUnicaCta ?? "") ||
      null,
    sectionFotoUnicaSubtext:
      String((tenant as Record<string, unknown>).sectionFotoUnicaSubtext ?? "") ||
      null,
    sectionSeriesBadge:
      String((tenant as Record<string, unknown>).sectionSeriesBadge ?? "") ||
      null,
    sectionSeriesTitle:
      String((tenant as Record<string, unknown>).sectionSeriesTitle ?? "") || null,
    sectionSeriesDesc:
      String((tenant as Record<string, unknown>).sectionSeriesDesc ?? "") || null,
    sectionSeriesModalLabel:
      String((tenant as Record<string, unknown>).sectionSeriesModalLabel ?? "") ||
      null,
    sectionSeriesVerSerie:
      String((tenant as Record<string, unknown>).sectionSeriesVerSerie ?? "") ||
      null,
    sectionSeriesClique:
      String((tenant as Record<string, unknown>).sectionSeriesClique ?? "") ||
      null,
    sectionEnsaiosBadge:
      String((tenant as Record<string, unknown>).sectionEnsaiosBadge ?? "") ||
      null,
    sectionEnsaiosTitle:
      String((tenant as Record<string, unknown>).sectionEnsaiosTitle ?? "") ||
      null,
    sectionEnsaiosDesc:
      String((tenant as Record<string, unknown>).sectionEnsaiosDesc ?? "") ||
      null,
    sectionEnsaiosCta:
      String((tenant as Record<string, unknown>).sectionEnsaiosCta ?? "") || null,
    sectionEnsaiosCtaSubtext:
      String((tenant as Record<string, unknown>).sectionEnsaiosCtaSubtext ?? "") ||
      null,
    heroCtaWhatsApp:
      String((tenant as Record<string, unknown>).heroCtaWhatsApp ?? "") || null,
    heroCtaPortfolio:
      String((tenant as Record<string, unknown>).heroCtaPortfolio ?? "") || null,
    heroScrollLabel:
      String((tenant as Record<string, unknown>).heroScrollLabel ?? "") || null,
    contactCta: String((tenant as Record<string, unknown>).contactCta ?? "") || null,
    contactSubtext:
      String((tenant as Record<string, unknown>).contactSubtext ?? "") || null,
    aboutSectionLabel:
      String((tenant as Record<string, unknown>).aboutSectionLabel ?? "") || null,
    aboutYears: String((tenant as Record<string, unknown>).aboutYears ?? "") || null,
    aboutYearsLabel:
      String((tenant as Record<string, unknown>).aboutYearsLabel ?? "") || null,
    aboutCtaContact:
      String((tenant as Record<string, unknown>).aboutCtaContact ?? "") || null,
    aboutCtaPortfolio:
      String((tenant as Record<string, unknown>).aboutCtaPortfolio ?? "") || null,
    aboutHighlights: Array.isArray((tenant as Record<string, unknown>).aboutHighlights)
      ? ((tenant as Record<string, unknown>).aboutHighlights as Array<{
          label: string;
          desc: string;
        }>)
      : null,
    photos: tenant.photos.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      location: p.location,
      year: p.year,
      description: p.description,
      category: p.category,
      imageSrc: p.imageSrc,
      imageThumb: p.imageThumb,
      price: p.price,
      format: p.format,
      printType: p.printType,
      order: p.order,
    })),
    series: tenant.series.map((s) => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      subtitle: s.subtitle,
      description: s.description,
      cover: s.cover,
      order: s.order,
      photos: s.photos.map((sp) => ({
        id: sp.id,
        title: sp.title,
        location: sp.location,
        year: sp.year,
        imageSrc: sp.imageSrc,
        imageThumb: sp.imageThumb,
        order: sp.order,
        slug: sp.photo?.slug ?? null,
      })),
    })),
    ensaios: tenant.ensaios.map((e) => ({
      id: e.id,
      title: e.title,
      slug: e.slug,
      subtitle: e.subtitle,
      description: e.description,
      cover: e.cover,
      priceInfo: e.priceInfo,
      order: e.order,
    })),
  };
}

/**
 * Dedup por request (React.cache) + cache de datos (unstable_cache).
 * Mutaciones deben llamar revalidateTenantPublic() para invalidar el tag.
 */
const PUBLIC_TENANT_REVALIDATE_SECONDS = 300;

const getTenantCachedByKeys = cache(async (host: string, pathSlug: string) => {
  return unstable_cache(
    async () => {
      const row = await fetchTenantRowFromDb(host, pathSlug);
      return row ? mapTenantToConfig(row) : null;
    },
    ["tenant-public", host, pathSlug],
    {
      revalidate: PUBLIC_TENANT_REVALIDATE_SECONDS,
      tags: [TENANT_PUBLIC_TAG],
    }
  )();
});

export async function getTenantFromHeaders(
  headers: Headers
): Promise<TenantConfig | null> {
  const host = headers.get("x-tenant-host") || headers.get("host") || "localhost";
  const pathSlug = headers.get("x-tenant-slug") ?? "";
  return getTenantCachedByKeys(host, pathSlug);
}

export async function getTenantByDomain(
  hostname: string
): Promise<TenantConfig | null> {
  return getTenantCachedByKeys(hostname, "");
}

export async function getTenantBySlug(
  slug: string
): Promise<TenantConfig | null> {
  return getTenantCachedByKeys("", slug.trim().toLowerCase());
}

export async function getTenantById(id: string) {
  return prisma.tenant.findUnique({
    where: { id },
    include: {
      photos: { orderBy: { order: "asc" } },
      series: {
        orderBy: { order: "asc" },
        include: { photos: { orderBy: { order: "asc" } } },
      },
      ensaios: { orderBy: { order: "asc" } },
    },
  });
}
