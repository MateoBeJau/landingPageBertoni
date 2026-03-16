import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Info } from "lucide-react";
import { getTenantFromHeaders } from "@/lib/tenant";
import { TenantProvider } from "@/components/TenantProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedImage from "@/components/ProtectedImage";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default async function SeriePhotoPageByPath({
  params,
}: {
  params: Promise<{ slug: string; seriesSlug: string; photoId: string }>;
}) {
  const { slug, seriesSlug, photoId } = await params;
  const headersList = await headers();
  const tenant = await getTenantFromHeaders(headersList);

  if (!tenant) notFound();

  const serie = tenant.series.find((s) => s.slug === seriesSlug);
  if (!serie) notFound();

  const photo = serie.photos.find(
    (p) => p.id === photoId || (p as { id?: string }).id === photoId
  );
  if (!photo) notFound();

  const whatsappMsg = encodeURIComponent(
    `Olá, tenho interesse na foto "${photo.title}" (série ${serie.title}). Poderia me passar mais informações sobre valores e formatos disponíveis?`
  );
  const whatsappLink = `https://wa.me/${tenant.whatsappNumber}?text=${whatsappMsg}`;

  // When slug is "serie", path was /serie/... (custom domain) — basePath is empty
  const basePath = slug === "serie" ? "" : `/${slug}`;

  return (
    <TenantProvider tenant={tenant}>
      <Header />
      <main className="min-h-screen bg-stone-50 pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href={`${basePath}#series`}
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 font-sans text-sm transition-colors duration-200 group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Voltar para série
          </Link>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <ProtectedImage
            src={photo.imageSrc || photo.imageThumb || ""}
            alt={photo.title}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span
                  className="inline-block font-sans text-xs uppercase tracking-[0.25em] font-semibold mb-2"
                  style={{ color: tenant.colorPrimary }}
                >
                  {serie.title}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-semibold leading-tight">
                  {photo.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-stone-500 font-sans text-sm">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-stone-400" />
                    {photo.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-stone-400" />
                    {photo.year}
                  </span>
                </div>
              </div>

              <div className="bg-stone-100 rounded-sm p-4 border border-stone-200">
                <div className="flex items-start gap-2">
                  <Info size={15} className="text-stone-400 mt-0.5 shrink-0" />
                  <p className="font-sans text-stone-500 text-sm leading-relaxed">
                    Esta foto pode ser impressa em outros suportes e dimensões.
                    Consulte disponibilidade e condições personalizadas pelo
                    WhatsApp.{" "}
                    <span className="italic">
                      Sob consulta para obras exclusivas.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden">
                <div className="bg-stone-900 px-5 py-4">
                  <p className="font-sans text-stone-400 text-xs uppercase tracking-wider mb-1">
                    Disponível em
                  </p>
                  <p className="font-serif text-white text-lg font-semibold">
                    Impressão Fine Art
                  </p>
                </div>

                <div className="px-5 py-5">
                  <div className="border-t border-stone-100 pt-4">
                    <div className="mb-4">
                      <p className="font-serif text-stone-900 text-2xl font-semibold">
                        Sob consulta
                      </p>
                    </div>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full text-white font-sans font-bold text-sm px-5 py-3.5 rounded-sm tracking-wide transition-colors duration-200 shadow-md shadow-green-900/20"
                      style={{ backgroundColor: tenant.colorCta }}
                    >
                      <WhatsAppIcon size={18} />
                      CONSULTAR VIA WHATSAPP
                    </a>
                    <p className="font-sans text-stone-400 text-xs text-center mt-3 leading-relaxed">
                      Valores e formas de pagamento combinados diretamente via
                      WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </TenantProvider>
  );
}
