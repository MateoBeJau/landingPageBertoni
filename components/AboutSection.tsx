import Image from "next/image";
import { Camera, Award, MapPin } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { buildWhatsAppLink } from "@/utils/whatsapp";

const highlights = [
  { icon: Camera, label: "15+ anos de experiência", desc: "Fotografando o Sul e o Brasil" },
  { icon: Award, label: "Impressões de alta qualidade", desc: "Papel Fine Art e Canvas" },
  { icon: MapPin, label: "Porto Alegre, RS", desc: "Atendimento em todo o Brasil" },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "4/5" }}>
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85"
                alt="Álvaro Sanguinetti, fotógrafo profissional"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover protected-image"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 to-transparent" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-red-700/40 rounded-sm -z-10" />
            {/* Experience badge */}
            <div className="absolute bottom-6 left-6 bg-stone-950/95 backdrop-blur-sm border border-stone-800 rounded-sm px-4 py-3">
              <p className="font-serif text-white text-2xl font-semibold">15+</p>
              <p className="font-sans text-stone-400 text-xs uppercase tracking-wider">Anos fotografando</p>
            </div>
          </div>

          {/* Text side */}
          <div className="lg:pl-4">
            <span className="inline-block font-sans text-red-600 text-xs uppercase tracking-[0.25em] font-semibold mb-3">
              Sobre o Fotógrafo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-semibold mb-6 leading-tight">
              Álvaro Sanguinetti
            </h2>
            <div className="w-10 h-0.5 bg-red-700 mb-6" />

            <div className="space-y-4 font-sans text-stone-400 text-base leading-relaxed">
              <p>
                Nascido e criado no Rio Grande do Sul, desenvolvi desde cedo uma
                profunda conexão com a paisagem, a cultura e o povo gaúcho. A
                fotografia tornou-se a minha forma de preservar e compartilhar
                essa identidade única com o mundo.
              </p>
              <p>
                Ao longo de mais de 15 anos de trabalho, percorri os campos do
                pampa, as encostas da Serra Gaúcha, o litoral e as fronteiras do
                estado, além de expedições pelo Brasil — do cerrado ao pantanal,
                das chapadas ao litoral nordestino.
              </p>
              <p>
                Cada imagem que produzo nasce de uma escuta atenta ao lugar e ao
                momento. Acredito que a fotografia de qualidade deve emocionar,
                contar uma história e resistir ao tempo — por isso todas as
                impressões são feitas com materiais de alto padrão para durar
                décadas.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {highlights.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 border border-stone-800 rounded-sm p-4">
                  <item.icon size={18} className="text-red-600 mb-1" />
                  <p className="font-sans text-white text-sm font-medium">{item.label}</p>
                  <p className="font-sans text-stone-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-semibold text-sm px-6 py-3.5 rounded-sm tracking-wide transition-colors duration-200"
              >
                <WhatsAppIcon size={16} />
                Entrar em Contato
              </a>
              <a
                href="#individuais"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-sans font-medium text-sm px-6 py-3.5 rounded-sm tracking-wide transition-colors duration-200 border border-stone-700 hover:border-stone-500"
              >
                Ver Portfólio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
