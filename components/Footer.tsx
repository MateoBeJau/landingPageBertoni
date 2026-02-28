import { Camera, Instagram, Facebook, Mail } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { buildWhatsAppLink } from "@/utils/whatsapp";

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/alvarobertoni",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com/alvarobertoni",
  },
];

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Individuais", href: "#individuais" },
  { label: "Séries", href: "#series" },
  { label: "Sobre", href: "#sobre" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-stone-950 border-t border-stone-800">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Camera size={20} className="text-red-600" />
              <div>
                <p className="font-serif text-white font-semibold text-lg">
                  Álvaro Bertoni
                </p>
                <p className="font-sans text-stone-500 text-[10px] uppercase tracking-[0.2em]">
                  Fotografia
                </p>
              </div>
            </div>
            <p className="font-sans text-stone-500 text-sm leading-relaxed">
              Registrando a alma do Rio Grande do Sul e do Brasil através da
              fotografia artística e comercial.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-sm bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors duration-200"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-stone-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-sans text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Informações
            </h4>
            <ul className="space-y-2.5">
              <li className="font-sans text-stone-400 text-sm">
                Porto Alegre, RS – Brasil
              </li>
              <li className="font-sans text-stone-400 text-sm">
                Impressões Fine Art
              </li>
              <li className="font-sans text-stone-400 text-sm">
                Papel e Canvas
              </li>
              <li className="font-sans text-stone-400 text-sm">
                Formatos sob encomenda
              </li>
              <li className="font-sans text-stone-500 text-xs mt-1 italic">
                Valores combinados via WhatsApp
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contato
            </h4>
            <div className="space-y-3">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-stone-400 hover:text-white transition-colors duration-200 group"
              >
                <WhatsAppIcon
                  size={15}
                  className="text-[#25D366] shrink-0"
                />
                <span className="font-sans text-sm">WhatsApp</span>
              </a>
              <a
                href="mailto:contato@alvarobertoni.com.br"
                className="flex items-center gap-2.5 text-stone-400 hover:text-white transition-colors duration-200"
              >
                <Mail size={15} className="text-stone-500 shrink-0" />
                <span className="font-sans text-sm">
                  contato@alvarobertoni.com.br
                </span>
              </a>
            </div>

            <div className="mt-5 bg-stone-900 border border-stone-800 rounded-sm p-3">
              <p className="font-sans text-stone-500 text-xs leading-relaxed">
                Direitos autorais reservados. Reprodução ou uso não autorizado
                das imagens é proibido por lei.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sans text-stone-600 text-xs">
            © {year} Álvaro Bertoni Fotografia. Todos os direitos reservados.
          </p>
          <p className="font-sans text-stone-700 text-xs">
            Porto Alegre · Rio Grande do Sul · Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
