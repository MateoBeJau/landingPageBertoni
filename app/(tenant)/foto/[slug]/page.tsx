import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTenantFromHeaders } from "@/lib/tenant";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoDetailPageContent from "@/components/PhotoDetailPageContent";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function homePathFromHeaders(headersList: Headers): string {
  const pathSlug = headersList.get("x-tenant-slug")?.trim();
  return pathSlug ? `/${pathSlug}` : "/";
}

export default async function PhotoPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const raw = (await params).slug;
  const slug = decodeURIComponent(raw).trim();
  const { category } = await searchParams;
  const headersList = await headers();
  const tenant = await getTenantFromHeaders(headersList);

  if (!tenant) notFound();

  const photo =
    tenant.photos.find((p) => p.slug === slug) ||
    tenant.photos.find((p) => p.id === slug);
  if (!photo) notFound();

  const whatsappMsg = `Olá, tenho interesse na foto "${photo.title}" do seu portfólio. Poderia me passar mais informações sobre valores e formatos disponíveis?`;
  const whatsappLink = buildWhatsAppUrl(tenant.whatsappNumber, whatsappMsg);

  const home = homePathFromHeaders(headersList);
  const backHref = category
    ? `${home}?category=${encodeURIComponent(category)}#foto-unica`
    : `${home}#foto-unica`;

  return (
    <>
      <Header />
      <PhotoDetailPageContent
        colorPrimary={tenant.colorPrimary}
        colorCta={tenant.colorCta}
        imageSrc={photo.imageSrc || photo.imageThumb || ""}
        imageAlt={photo.title}
        eyebrow={photo.category || "Obra"}
        title={photo.title}
        location={photo.location}
        year={photo.year}
        description={photo.description}
        format={photo.format}
        printType={photo.printType}
        price={photo.price}
        whatsappLink={whatsappLink}
        backHref={backHref}
        backLabel="Voltar para galeria"
      />
      <Footer />
    </>
  );
}
