import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Maximize2, Layers, Info } from "lucide-react";
import { photos } from "@/data/photos";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedImage from "@/components/ProtectedImage";

export function generateStaticParams() {
  return photos.map((photo) => ({ id: photo.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const photo = photos.find((p) => p.id === id);
  if (!photo) return { title: "Foto não encontrada" };
  return {
    title: `${photo.title} — Álvaro Sanguinetti Fotografia`,
    description: photo.description,
  };
}

export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const photo = photos.find((p) => p.id === id);

  if (!photo) notFound();

  const whatsappLink = buildWhatsAppLink(photo.title);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50 pt-20">
        {/* Back button */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/#foto-unica"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 font-sans text-sm transition-colors duration-200 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Voltar para galeria
          </Link>
        </div>

        {/* Main content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Photo */}
          <ProtectedImage src={photo.src} alt={photo.title} />

          {/* Info grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: main info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & location */}
              <div>
                {photo.category && (
                  <span className="inline-block font-sans text-red-700 text-xs uppercase tracking-[0.25em] font-semibold mb-2">
                    {photo.category}
                  </span>
                )}
                <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-semibold leading-tight">
                  {photo.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-stone-500 font-sans text-sm">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-stone-400" />
                    {photo.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-stone-400" />
                    {photo.year}
                  </span>
                </div>
              </div>

              {/* Description */}
              {photo.description && (
                <p className="font-sans text-stone-600 text-base leading-relaxed border-l-2 border-red-700 pl-4">
                  {photo.description}
                </p>
              )}

              {/* Additional info */}
              <div className="bg-stone-100 rounded-sm p-4 border border-stone-200">
                <div className="flex items-start gap-2 mb-2">
                  <Info size={15} className="text-stone-400 mt-0.5 shrink-0" />
                  <p className="font-sans text-stone-500 text-sm leading-relaxed">
                    Esta foto pode ser impressa em outros suportes e dimensões. Consulte
                    disponibilidade e condições personalizadas pelo WhatsApp.{" "}
                    <span className="italic">Sob consulta para obras exclusivas.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: purchase card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden">
                {/* Card header */}
                <div className="bg-stone-900 px-5 py-4">
                  <p className="font-sans text-stone-400 text-xs uppercase tracking-wider mb-1">
                    Disponível em
                  </p>
                  <p className="font-serif text-white text-lg font-semibold">
                    Impressão Fine Art
                  </p>
                </div>

                {/* Card body */}
                <div className="px-5 py-5 space-y-4">
                  {photo.format && (
                    <div className="flex items-start gap-3">
                      <Maximize2 size={16} className="text-stone-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-sans text-stone-400 text-xs uppercase tracking-wider mb-0.5">
                          Tamanho
                        </p>
                        <p className="font-sans text-stone-800 text-sm font-medium">
                          {photo.format}
                        </p>
                      </div>
                    </div>
                  )}

                  {photo.printType && (
                    <div className="flex items-start gap-3">
                      <Layers size={16} className="text-stone-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-sans text-stone-400 text-xs uppercase tracking-wider mb-0.5">
                          Tipo de impressão
                        </p>
                        <p className="font-sans text-stone-800 text-sm font-medium">
                          {photo.printType}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t border-stone-100 pt-4">
                    {photo.price ? (
                      <div className="mb-4">
                        <p className="font-sans text-stone-400 text-xs uppercase tracking-wider mb-1">
                          Preço
                        </p>
                        <p className="font-serif text-stone-900 text-3xl font-semibold">
                          {photo.price}
                        </p>
                        <p className="font-sans text-stone-400 text-xs mt-1">
                          Outros tamanhos sob consulta
                        </p>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <p className="font-serif text-stone-900 text-2xl font-semibold">
                          Sob consulta
                        </p>
                      </div>
                    )}

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-bold text-sm px-5 py-3.5 rounded-sm tracking-wide transition-colors duration-200 shadow-md shadow-green-900/20"
                    >
                      <WhatsAppIcon size={18} />
                      📲 CONSULTAR VIA WHATSAPP
                    </a>
                    <p className="font-sans text-stone-400 text-xs text-center mt-3 leading-relaxed">
                      Valores e formas de pagamento combinados diretamente via WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
