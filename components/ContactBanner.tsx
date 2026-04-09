"use client";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useTenant } from "@/components/TenantProvider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactBanner() {
  const tenant = useTenant();

  const whatsappLink = buildWhatsAppUrl(
    tenant.whatsappNumber,
    "Olá! Gostaria de saber mais sobre o seu trabalho fotográfico e as opções de impressão e curadoria."
  );

  const defaultTitle = "Interessado em alguma imagem?";
  const defaultBody =
    "Fale comigo pelo WhatsApp. Tiro dúvidas sobre tamanhos, valores e impressões (Fine Art, Canvas, papel fotográfico).\n\nAlém da venda de fotos, ofereço curadoria sob medida para decoração, publicidade, eventos, coleções empresariais e muito mais. Atendimento personalizado do início ao fim.";
  const title = (tenant.contactTitle && tenant.contactTitle.trim()) || defaultTitle;
  const bodyText = (tenant.contactText && tenant.contactText.trim()) || defaultBody;

  return (
    <section
      id="contato"
      className="relative overflow-hidden scroll-mt-24 py-16 md:py-20 lg:py-24"
      style={{
        backgroundColor: tenant.colorAccent,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/25 via-black/5 to-black/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: tenant.colorPrimary }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: "#fff" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-4xl lg:px-8">
        <div
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur-md md:mb-8"
          aria-hidden
        >
          <WhatsAppIcon size={26} className="text-white drop-shadow-sm" />
        </div>

        <p className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60 md:text-[11px]">
          Contato
        </p>
        <h2 className="mx-auto max-w-2xl font-sans text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-[2rem] md:leading-[1.2] lg:text-[2.25rem]">
          {title}
        </h2>
        <div className="mx-auto mt-4 max-w-2xl space-y-4 font-sans text-[0.9375rem] leading-[1.7] text-white/80 sm:mt-5 sm:text-base">
          {bodyText.split(/\n\n+/).map((p) => p.trim()).filter(Boolean).map((paragraph, i) => (
            <p key={i} className="whitespace-pre-line">{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-white shadow-lg shadow-black/15 transition-[transform,filter] hover:brightness-110 active:scale-[0.99] sm:px-10 sm:py-4 sm:text-[0.9375rem]"
            style={{ backgroundColor: tenant.colorCta }}
          >
            <WhatsAppIcon size={20} className="shrink-0 opacity-95" />
            <span>{tenant.contactCta || "Fale comigo pelo WhatsApp"}</span>
          </a>
          {tenant.contactSubtext?.trim() ? (
            <p className="max-w-md font-sans text-xs leading-relaxed text-white/55 sm:text-[13px]">
              {tenant.contactSubtext}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
