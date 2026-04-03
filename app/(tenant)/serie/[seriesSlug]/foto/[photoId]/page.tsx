import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTenantFromHeaders } from "@/lib/tenant";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoDetailPageContent from "@/components/PhotoDetailPageContent";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default async function SeriePhotoPage({
  params,
}: {
  params: Promise<{ seriesSlug: string; photoId: string }>;
}) {
  const { seriesSlug, photoId: rawPhotoId } = await params;
  const photoId = decodeURIComponent(rawPhotoId).trim();
  const headersList = await headers();
  const tenant = await getTenantFromHeaders(headersList);

  if (!tenant) notFound();

  const serie = tenant.series.find((s) => s.slug === seriesSlug);
  if (!serie) notFound();

  const photo = serie.photos.find((p) => p.id === photoId);
  if (!photo) notFound();

  const whatsappMsg = `Olá, tenho interesse na foto "${photo.title}" (série ${serie.title}). Poderia me passar mais informações sobre valores e formatos disponíveis?`;
  const whatsappLink = buildWhatsAppUrl(tenant.whatsappNumber, whatsappMsg);

  const pathSlug = headersList.get("x-tenant-slug")?.trim();
  const homePath = pathSlug ? `/${pathSlug}` : "/";
  const backHref = `${homePath}#series`;

  return (
    <>
      <Header />
      <PhotoDetailPageContent
        colorPrimary={tenant.colorPrimary}
        colorCta={tenant.colorCta}
        imageSrc={photo.imageSrc || photo.imageThumb || ""}
        imageAlt={photo.title}
        eyebrow={serie.title}
        title={photo.title}
        location={photo.location}
        year={photo.year}
        description={null}
        format={null}
        printType={null}
        price={null}
        whatsappLink={whatsappLink}
        backHref={backHref}
        backLabel="Voltar para série"
      />
      <Footer />
    </>
  );
}
