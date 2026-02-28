import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Álvaro Bertoni Fotografia | Rio Grande do Sul e Brasil",
  description:
    "Portfólio de fotografia artística e comercial de Álvaro Bertoni. Paisagens do pampa gaúcho, litoral, serra e retratos do Brasil. Adquira impressões de alta qualidade via WhatsApp.",
  keywords: [
    "fotografia gaúcha",
    "fotógrafo Rio Grande do Sul",
    "pampa gaúcho",
    "fotografia artística",
    "impressões fotográficas",
    "portfólio fotografia",
  ],
  openGraph: {
    title: "Álvaro Bertoni Fotografia",
    description: "Registrando a alma do Rio Grande do Sul e do Brasil",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
