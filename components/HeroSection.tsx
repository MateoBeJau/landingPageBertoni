import Image from "next/image";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { ChevronDown } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=85"
          alt="Paisagem do pampa gaúcho ao entardecer"
          fill
          className="object-cover protected-image"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-700/90 text-white text-xs font-sans uppercase tracking-[0.2em] px-4 py-1.5 rounded-sm mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            Fotógrafo Profissional · RS & Brasil
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight mb-4 md:mb-6">
            Um olhar poético{" "}
            <br className="hidden sm:block" />
            <span className="text-stone-300">sobre o mundo</span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-stone-300 text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto md:mx-0">
            Imagens que atravessam culturas, paisagens e emoções. Fotografia
            autoral para quem busca beleza e originalidade na decoração.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-semibold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm tracking-wide transition-all duration-200 shadow-lg shadow-green-900/30 hover:shadow-xl hover:shadow-green-900/40 hover:-translate-y-0.5"
            >
              <WhatsAppIcon size={18} />
              Fale pelo WhatsApp
            </a>
            <a
              href="#individuais"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-sans font-medium text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm tracking-wide transition-all duration-200 border border-white/20 hover:border-white/40"
            >
              Ver Portfólio
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-stone-400">
        <span className="font-sans text-xs uppercase tracking-[0.2em]">
          Rolar
        </span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </section>
  );
}
