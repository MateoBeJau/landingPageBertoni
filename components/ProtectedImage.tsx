"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { shouldOptimizeNextImage } from "@/lib/should-optimize-image";

interface Props {
  src: string;
  alt: string;
}

export default function ProtectedImage({ src, alt }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const optimized = shouldOptimizeNextImage(src);

  return (
    <>
      <div
        className="group relative w-full cursor-pointer overflow-hidden rounded-sm bg-stone-200/50 ring-1 ring-stone-200/80 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_16px_44px_-20px_rgba(0,0,0,0.24)]"
        onClick={() => setLightboxOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
        aria-label="Ampliar imagem"
      >
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1280}
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="mx-auto block h-auto max-h-[min(85vh,1080px)] w-full max-w-full object-contain"
          unoptimized={!optimized}
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
          <Image
            src={src}
            alt={alt}
            width={2400}
            height={1600}
            sizes="100vw"
            className="max-h-[min(92vh,1600px)] max-w-full object-contain"
            unoptimized={!optimized}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}
    </>
  );
}
