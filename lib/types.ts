export interface TenantPhoto {
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
}

export interface TenantSeriesPhoto {
  id: string;
  title: string;
  location: string;
  year: number;
  imageSrc: string;
  imageThumb: string;
  order: number;
}

export interface TenantSeries {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  cover: string;
  order: number;
  photos: TenantSeriesPhoto[];
}

export interface TenantEnsaio {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  cover: string;
  priceInfo: string;
  order: number;
}

export interface TenantConfig {
  id: string;
  slug: string;
  domain: string | null;
  /** Base path for path-based URLs (e.g. /juan). Empty for custom domain. */
  basePath?: string;

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

  stats: { value: string; label: string }[];
  categories: string[];

  instagramUrl: string | null;
  facebookUrl: string | null;

  metaTitle: string | null;
  metaDescription: string | null;

  photos: TenantPhoto[];
  series: TenantSeries[];
  ensaios: TenantEnsaio[];
}
