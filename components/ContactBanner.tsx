"use client";

import { Shield } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useTenant } from "@/components/TenantProvider";

export default function ContactBanner() {
  const tenant = useTenant();

  const whatsappLink = `https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent(
    "Olá! Gostaria de saber mais sobre o seu trabalho fotográfico e os formatos disponíveis para compra."
  )}`;

  return (
    <section
      id="contato"
      className="py-12 md:py-16"
      style={{ backgroundColor: tenant.colorAccent }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full mb-5 overflow-hidden">
          <div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: tenant.colorAccent, filter: "brightness(0.85)" }}
          />
          <WhatsAppIcon size={22} className="text-white relative z-10" />
        </div>
        <h2 className="font-serif text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
          {tenant.contactTitle}
        </h2>
        <p className="font-sans text-orange-100 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
          {tenant.contactText}
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 hover:opacity-90 text-white font-sans font-bold text-sm sm:text-base px-7 sm:px-9 py-3.5 sm:py-4 rounded-sm tracking-wide transition-colors duration-200 shadow-lg shadow-black/20"
          style={{ backgroundColor: tenant.colorCta }}
        >
          <WhatsAppIcon size={18} />
          {tenant.contactCta || "SOLICITAR ORÇAMENTO"}
        </a>
        <div className="flex items-center justify-center gap-2 mt-4 text-orange-200">
          <Shield size={13} />
          <p className="font-sans text-xs">
            {tenant.contactSubtext || "Valores e formas de pagamento combinados diretamente via WhatsApp"}
          </p>
        </div>
      </div>
    </section>
  );
}
