"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  src: string;
  alt: string;
}

export default function ProtectedImage({ src, alt }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div
        className="w-full overflow-hidden rounded-sm bg-stone-200 shadow-2xl mb-10 cursor-pointer"
        onClick={() => setLightboxOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
        aria-label="Ver imagen en grande"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="block w-full h-auto max-w-full rounded-sm"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      {/* Lightbox fullscreen */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar"
          >
            <X size={28} strokeWidth={2} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-sm"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}
    </>
  );
}
