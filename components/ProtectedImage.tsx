"use client";

import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

interface Props {
  src: string;
  alt: string;
}

export default function ProtectedImage({ src, alt }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div
        className="group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-stone-200/50 ring-1 ring-stone-200/90 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)] transition-shadow hover:shadow-[0_24px_56px_-24px_rgba(0,0,0,0.3)]"
        onClick={() => setLightboxOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
        aria-label="Ampliar imagem"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="mx-auto block h-auto max-h-[min(85vh,1080px)] w-full max-w-full object-contain"
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 sm:text-xs">
          <ZoomIn size={14} strokeWidth={2} className="opacity-90" />
          Ampliar
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/96 p-4 backdrop-blur-[2px]"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/12 p-2.5 text-white transition-colors hover:bg-white/20"
            aria-label="Fechar"
            type="button"
          >
            <X size={26} strokeWidth={2} />
          </button>
          <p className="absolute left-4 top-4 z-10 max-w-[min(90vw,24rem)] truncate text-left text-xs font-medium text-white/70">
            {alt}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[min(92vh,1600px)] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}
    </>
  );
}
