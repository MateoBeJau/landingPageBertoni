"use client";

import Image from "next/image";
import { useTenant } from "@/components/TenantProvider";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const tenant = useTenant();

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={tenant.heroImage}
          alt="Paisagem do pampa gaúcho ao entardecer"
          fill
          className="object-cover protected-image"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/40 to-black/72" />
        <div className="absolute inset-0 bg-linear-to-r from-black/45 via-black/15 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-black/15" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div
            className="mx-auto mb-6 flex w-fit items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-sans font-medium uppercase tracking-[0.18em] text-white/95 md:mb-8 md:px-5 md:py-2 md:text-[11px] md:tracking-[0.22em]"
            style={{ backgroundColor: `${tenant.colorPrimary}D9` }}
          >
            <span className="size-1.5 shrink-0 rounded-full bg-white/90" />
            {tenant.heroBadge}
          </div>

          <h1 className="mb-4 font-sans text-4xl font-semibold leading-[1.14] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:text-5xl sm:leading-[1.12] md:mb-6 md:text-6xl lg:text-7xl">
            {tenant.heroTitle}
          </h1>

          <div className="mx-auto mb-10 max-w-2xl space-y-4 font-sans text-base leading-relaxed text-stone-100/95 drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)] sm:text-lg md:mb-12 md:text-xl md:leading-relaxed">
            {tenant.heroSubtitle
              .split(/\n\n+/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((paragraph, i) => (
                <p key={i} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
          </div>

          <a
            href="#foto-unica"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("foto-unica")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex justify-center"
            aria-label={tenant.heroScrollLabel || "Rolar para ver o portfólio"}
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/55 backdrop-blur-sm transition-colors hover:border-white/25 hover:text-white/90">
              <ChevronDown size={22} strokeWidth={1.75} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
