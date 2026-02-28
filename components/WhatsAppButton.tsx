"use client";

import { useState } from "react";
import { X } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Tooltip card */}
      {showTooltip && (
        <div className="bg-white rounded-sm shadow-2xl shadow-black/20 border border-stone-100 p-4 max-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="font-sans font-semibold text-stone-900 text-sm">
              Fale com Álvaro
            </p>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-stone-400 hover:text-stone-600 flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>
          <p className="font-sans text-stone-500 text-xs leading-relaxed mb-3">
            Consultas, orçamentos e compras direto pelo WhatsApp. Resposta rápida!
          </p>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-semibold text-xs px-3 py-2.5 rounded-sm transition-colors duration-200"
          >
            Iniciar conversa
          </a>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="whatsapp-pulse w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-lg shadow-green-900/30 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Abrir WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </button>
    </div>
  );
}
