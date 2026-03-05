import { prisma } from "./prisma";
import { TenantConfig } from "./types";

export async function getTenantByDomain(
  hostname: string
): Promise<TenantConfig | null> {
  const cleanHost = hostname.replace(/:\d+$/, "").toLowerCase();
  const withoutWww = cleanHost.startsWith("www.") ? cleanHost.slice(4) : cleanHost;

  const tenant = await prisma.tenant.findFirst({
    where: {
      active: true,
      OR: [
        { domain: cleanHost },
        { domain: withoutWww },
        { slug: withoutWww.split(".")[0] },
      ],
    },
    include: {
      photos: {
        where: { active: true },
        orderBy: { order: "asc" },
      },
      series: {
        where: { active: true },
        orderBy: { order: "asc" },
        include: {
          photos: { orderBy: { order: "asc" } },
        },
      },
      ensaios: {
        where: { active: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!tenant) return null;

  return mapTenantToConfig(tenant);
}

export async function getTenantBySlug(
  slug: string
): Promise<TenantConfig | null> {
  const tenant = await prisma.tenant.findFirst({
    where: { active: true, slug: slug.trim().toLowerCase() },
    include: {
      photos: {
        where: { active: true },
        orderBy: { order: "asc" },
      },
      series: {
        where: { active: true },
        orderBy: { order: "asc" },
        include: {
          photos: { orderBy: { order: "asc" } },
        },
      },
      ensaios: {
        where: { active: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!tenant) return null;

  return mapTenantToConfig(tenant);
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
      const fromTenant = tenant.categories.split(",").map((c) => c.trim()).filter(Boolean);
      const fromPhotos = tenant.photos.map((p) => p.category).filter((c): c is string => !!c?.trim());
      return [...new Set([...fromTenant, ...fromPhotos])].sort();
    })(),
    instagramUrl: tenant.instagramUrl,
    facebookUrl: tenant.facebookUrl,
    metaTitle: tenant.metaTitle,
    metaDescription: tenant.metaDescription,
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

export async function getTenantFromHeaders(headers: Headers): Promise<TenantConfig | null> {
  const host = headers.get("x-tenant-host") || headers.get("host") || "localhost";
  const pathSlug = headers.get("x-tenant-slug");

  let tenant = await getTenantByDomain(host);
  if (!tenant && pathSlug) {
    tenant = await getTenantBySlug(pathSlug);
  }
  return tenant;
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
