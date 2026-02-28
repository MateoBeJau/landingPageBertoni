import { Shield } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export default function ContactBanner() {
  return (
    <section className="bg-red-800 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-red-700 rounded-full mb-5">
          <WhatsAppIcon size={22} className="text-white" />
        </div>
        <h2 className="font-serif text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
          Interesse em alguma fotografia?
        </h2>
        <p className="font-sans text-red-200 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
          Entre em contato pelo WhatsApp para consultar valores, formatos de
          impressão disponíveis e formas de pagamento. Atendimento personalizado
          e resposta rápida!
        </p>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-white hover:bg-stone-100 text-red-800 font-sans font-bold text-sm sm:text-base px-7 sm:px-9 py-3.5 sm:py-4 rounded-sm tracking-wide transition-colors duration-200 shadow-lg"
        >
          <WhatsAppIcon size={18} />
          Solicitar Orçamento
        </a>
        <div className="flex items-center justify-center gap-2 mt-4 text-red-300">
          <Shield size={13} />
          <p className="font-sans text-xs">
            Valores e formas de pagamento combinados diretamente via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
