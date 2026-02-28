// Replace with the photographer's actual WhatsApp number (country code + number, no spaces or dashes)
export const WHATSAPP_NUMBER = "5551958888939";

export function buildWhatsAppLink(context?: string): string {
  const message = context
    ? `Olá, tenho interesse na foto "${context}" do seu portfólio. Poderia me passar mais informações sobre valores e formatos disponíveis?`
    : `Olá! Gostaria de saber mais sobre o seu trabalho fotográfico e os formatos disponíveis para compra.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
