/**
 * Sanitiza el número de WhatsApp: solo dígitos (código país + número).
 * Evita que espacios, guiones o + causen que el link abra "compartir" en vez de WhatsApp.
 */
export function sanitizeWhatsAppNumber(number: string): string {
  return (number || "").replace(/\D/g, "");
}

/**
 * Construye la URL de WhatsApp para abrir chat directo.
 * Usa api.whatsapp.com (mejor compatibilidad en Safari/móvil que wa.me en algunos dispositivos).
 */
export function buildWhatsAppUrl(number: string, message: string): string {
  const clean = sanitizeWhatsAppNumber(number);
  if (!clean) return "#";
  return `https://api.whatsapp.com/send?phone=${clean}&text=${encodeURIComponent(message)}`;
}
