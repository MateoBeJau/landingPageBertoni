"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Tooltip card */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="bg-white rounded-sm shadow-2xl shadow-black/20 border border-stone-100 p-4 max-w-[220px]"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="font-sans font-semibold text-stone-900 text-sm">
                Fale com Álvaro
              </p>
              <button
                onClick={() => setShowTooltip(false)}
                className="text-stone-400 hover:text-stone-600 shrink-0 transition-colors"
                aria-label="Fechar"
              >
                <X size={14} />
              </button>
            </div>
            <p className="font-sans text-stone-500 text-xs leading-relaxed mb-3">
              Consultas, orçamentos e compras direto pelo WhatsApp. Resposta
              rápida!
            </p>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-semibold text-xs px-3 py-2.5 rounded-sm transition-colors duration-200"
            >
              <WhatsAppIcon size={13} />
              Iniciar conversa
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={() => setShowTooltip(!showTooltip)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="whatsapp-pulse w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-lg shadow-green-900/30 flex items-center justify-center transition-colors duration-200"
        aria-label="Abrir WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </motion.button>
    </div>
  );
}
