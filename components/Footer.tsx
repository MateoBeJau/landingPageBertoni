"use client";

import { Camera, Instagram, Facebook, Mail } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useTenant } from "@/components/TenantProvider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const navLinks = [
  { label: "Foto Única", hash: "#foto-unica" },
  { label: "Séries", hash: "#series" },
  { label: "BIO", hash: "#bio" },
  { label: "Contato", hash: "#contato" },
];

export default function Footer() {
  const tenant = useTenant();
  const homeHref = tenant.basePath || "/";
  const year = new Date().getFullYear();
  const whatsappLink = buildWhatsAppUrl(
    tenant.whatsappNumber,
    "Olá! Gostaria de saber mais sobre o seu trabalho fotográfico e os formatos disponíveis para compra."
  );

  const socialLinks = [
    ...(tenant.instagramUrl ? [{ icon: Instagram, label: "Instagram", href: tenant.instagramUrl }] : []),
    ...(tenant.facebookUrl ? [{ icon: Facebook, label: "Facebook", href: tenant.facebookUrl }] : []),
  ];

  return (
    <footer className="border-t border-stone-800/90 bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <Camera size={20} style={{ color: tenant.colorPrimary }} />
              <div>
                <p className="font-sans text-lg font-semibold tracking-tight text-white">
                  {tenant.name}
                </p>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-500">
                  {tenant.subtitle}
                </p>
              </div>
            </div>
            <p className="font-sans text-sm leading-relaxed text-stone-500">
              Fotografia autoral de {tenant.name}. Arte para impressão, coleção e
              decoração.
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-5 flex items-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-xl bg-stone-800/80 text-stone-400 transition-colors hover:bg-stone-700 hover:text-white"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
              Navegação
            </h4>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.hash}>
                  <a
                    href={`${homeHref}${link.hash}`}
                    className="inline-block rounded-md py-1.5 font-sans text-sm text-stone-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
              Informações
            </h4>
            <ul className="space-y-2.5">
              <li className="font-sans text-stone-400 text-sm">
                Porto Alegre, RS – Brasil
              </li>
              <li className="font-sans text-stone-400 text-sm">
                Impressões Fine Art
              </li>
              <li className="font-sans text-stone-400 text-sm">
                Papel e Canvas
              </li>
              <li className="font-sans text-stone-400 text-sm">
                Formatos sob encomenda
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
              Contato
            </h4>
            <div className="space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-stone-400 transition-colors hover:text-white"
              >
                <WhatsAppIcon size={15} className="shrink-0 text-[#25D366]" />
                <span className="font-sans text-sm">WhatsApp</span>
              </a>
              {tenant.email && (
                <a
                  href={`mailto:${tenant.email}`}
                  className="flex items-center gap-2.5 text-stone-400 transition-colors hover:text-white"
                >
                  <Mail size={15} className="shrink-0 text-stone-500" />
                  <span className="font-sans text-sm">{tenant.email}</span>
                </a>
              )}
            </div>

            <div className="mt-6 rounded-xl border border-stone-800/90 bg-stone-900/50 p-4">
              <p className="font-sans text-xs leading-relaxed text-stone-500">
                Direitos autorais reservados. Reprodução ou uso não autorizado
                das imagens é proibido por lei.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center font-sans text-xs text-stone-600 sm:text-left">
            © {year} {tenant.name}. Todos os direitos reservados.
          </p>
          <p className="text-center font-sans text-xs text-stone-600 sm:text-right">
            Porto Alegre · Rio Grande do Sul · Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
