import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTenantFromHeaders } from "@/lib/tenant";
import { TenantProvider } from "@/components/TenantProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoDetailPageContent from "@/components/PhotoDetailPageContent";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default async function PhotoPageByPath({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; photoSlug: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { photoSlug } = await params;
  const { category } = await searchParams;
  const headersList = await headers();
  const tenant = await getTenantFromHeaders(headersList);

  if (!tenant) notFound();

  const photo = tenant.photos.find((p) => p.slug === photoSlug);
  if (!photo) notFound();

  const whatsappMsg = `Olá, tenho interesse na foto "${photo.title}" do seu portfólio. Poderia me passar mais informações sobre valores e formatos disponíveis?`;
  const whatsappLink = buildWhatsAppUrl(tenant.whatsappNumber, whatsappMsg);

  const basePath = `/${tenant.slug}`;
  const backHref = category
    ? `${basePath}?category=${encodeURIComponent(category)}#foto-unica`
    : `${basePath}#foto-unica`;

  return (
    <TenantProvider tenant={tenant}>
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
    </TenantProvider>
  );
}
