import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Maximize2, Layers } from "lucide-react";
import ProtectedImage from "@/components/ProtectedImage";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

type PhotoDetailPageContentProps = {
  colorPrimary: string;
  colorCta: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  location: string;
  year: number;
  description?: string | null;
  format?: string | null;
  printType?: string | null;
  price?: string | null;
  whatsappLink: string;
  backHref: string;
  backLabel: string;
};

function BackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/90 px-4 py-2.5 text-sm font-medium text-stone-600 shadow-sm backdrop-blur-sm transition-all hover:border-stone-300 hover:bg-white hover:text-stone-900"
    >
      <ArrowLeft
        size={16}
        className="shrink-0 opacity-70 transition-transform group-hover:-translate-x-0.5"
      />
      {label}
    </Link>
  );
}

export default function PhotoDetailPageContent({
  colorPrimary,
  colorCta,
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  location,
  year,
  description,
  format,
  printType,
  price,
  whatsappLink,
  backHref,
  backLabel,
}: PhotoDetailPageContentProps) {
  const paragraphs = description?.trim()
    ? description.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-stone-100/90 pb-16 pt-[5.5rem] sm:pb-24 md:pt-[6rem]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:gap-10">
          <header className="flex flex-col gap-6 sm:pt-2 sm:flex-row sm:items-start sm:justify-between">
            <BackLink href={backHref} label={backLabel} />
          </header>

          <figure className="mx-auto w-full">
            <ProtectedImage src={imageSrc} alt={imageAlt} />
          </figure>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 lg:gap-x-16">
            <div className="space-y-8 lg:col-span-7">
              <div className="space-y-5">
                <span
                  className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em]"
                  style={{ color: colorPrimary }}
                >
                  {eyebrow}
                </span>
                <h1 className="font-sans text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl lg:text-[2.625rem] lg:leading-[1.12]">
                  {title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-white px-3 py-1.5 text-xs text-stone-600 shadow-sm">
                    <MapPin size={13} className="text-stone-400" />
                    {location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-white px-3 py-1.5 text-xs text-stone-600 shadow-sm">
                    <Calendar size={13} className="text-stone-400" />
                    {year}
                  </span>
                </div>
              </div>

              {paragraphs.length > 0 && (
                <div className="max-w-2xl space-y-5 border-l-2 border-stone-200 pl-5 sm:pl-6">
                  {paragraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className="font-sans text-[0.9375rem] leading-[1.75] text-stone-600 sm:text-base whitespace-pre-line"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              <div className="rounded-sm border border-stone-200/80 bg-white p-5 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.07)] sm:p-6">
                <p className="font-sans text-sm leading-relaxed text-stone-500">
                  <span className="font-medium text-stone-700">
                    Edição fine art.
                  </span>{" "}
                  Outros suportes e medidas sob consulta. Valores e condições
                  combinados diretamente.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 overflow-hidden rounded-sm border border-stone-200/70 bg-white shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12)]">
                <div
                  className="h-1 w-full shrink-0"
                  style={{ backgroundColor: colorPrimary }}
                  aria-hidden
                />
                <div className="border-b border-stone-100 bg-linear-to-b from-stone-50/90 to-white px-6 py-5">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400">
                    Disponível como
                  </p>
                  <p className="mt-1.5 font-sans text-lg font-semibold text-stone-900">
                    Impressão fine art
                  </p>
                </div>

                <div className="space-y-5 px-6 py-6">
                  {format ? (
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-500">
                        <Maximize2 size={16} strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                          Tamanho
                        </p>
                        <p className="mt-0.5 font-sans text-sm font-medium text-stone-800">
                          {format}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {printType ? (
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-500">
                        <Layers size={16} strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                          Impressão
                        </p>
                        <p className="mt-0.5 font-sans text-sm font-medium text-stone-800">
                          {printType}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  <div className="border-t border-stone-100 pt-5">
                    {price ? (
                      <div className="mb-5">
                        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                          Investimento
                        </p>
                        <p className="mt-1 font-sans text-3xl font-semibold tracking-tight text-stone-900">
                          {price}
                        </p>
                        <p className="mt-1 font-sans text-xs text-stone-400">
                          Outros formatos sob consulta
                        </p>
                      </div>
                    ) : (
                      <p className="mb-5 font-sans text-xl font-semibold text-stone-900">
                        Sob consulta
                      </p>
                    )}

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 font-sans text-sm font-semibold tracking-wide text-white shadow-md shadow-black/10 transition-[transform,filter] hover:brightness-105 active:scale-[0.99]"
                      style={{
                        backgroundColor: colorCta,
                      }}
                    >
                      <WhatsAppIcon size={18} />
                      Consultar via WhatsApp
                    </a>
                    <p className="mt-3 text-center font-sans text-[11px] leading-relaxed text-stone-400">
                      Resposta personalizada com valores e opções de pagamento
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="border-t border-stone-200/80 pt-10">
            <BackLink href={backHref} label={backLabel} />
          </div>
        </div>
      </div>
    </main>
  );
}
