"use client";

import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export default function ProtectedImage({ src, alt }: Props) {
  return (
    <div className="relative w-full overflow-hidden rounded-sm bg-stone-200 shadow-2xl mb-10">
      <div className="relative" style={{ aspectRatio: "4/3" }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
          priority
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}
