export interface Photo {
  id: string;
  title: string;
  location: string;
  year: number;
  src: string;
  thumb: string;
  description?: string;
  category?: string;
  price?: string;
  format?: string;
  printType?: string;
}

export const photos: Photo[] = [
  {
    id: "pampa-entardecer",
    title: "Entardecer no Pampa",
    location: "Alegrete, RS",
    year: 2024,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85",
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75",
    description:
      "A luz dourada do fim de tarde sobre as planícies do pampa, onde o horizonte se funde com o céu numa paleta de infinitos ocres e carmesins.",
    category: "Paisagens",
    price: "R$ 1.200,00",
    format: "120 cm × 80 cm",
    printType: "Fine art em papel algodão 300g",
  },
  {
    id: "cavalos-liberdade",
    title: "Liberdade no Campo",
    location: "Quaraí, RS",
    year: 2024,
    src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=85",
    thumb: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=75",
    description:
      "Cavalos galopando livres pelas coxilhas — uma cena que condensa movimento, força e a amplidão do campo aberto.",
    category: "Natureza",
    price: "R$ 980,00",
    format: "100 cm × 70 cm",
    printType: "Fine art em papel algodão 300g",
  },
  {
    id: "litoral-gaucho",
    title: "Litoral Gaúcho",
    location: "Torres, RS",
    year: 2023,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=85",
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75",
    description:
      "As praias selvagens do litoral norte gaúcho, com suas falésias basálticas e mar revolto em tons de cobalto e espuma.",
    category: "Paisagens",
    price: "R$ 1.100,00",
    format: "120 cm × 80 cm",
    printType: "Canvas",
  },
  {
    id: "campo-nativo",
    title: "Campo Nativo",
    location: "Bagé, RS",
    year: 2024,
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=85",
    thumb: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=75",
    description:
      "A imensidão verde do campo nativo — uma meditação visual sobre a quietude e o tempo que escorre devagar no interior.",
    category: "Paisagens",
    price: "R$ 950,00",
    format: "100 cm × 70 cm",
    printType: "Fine art em papel algodão 300g",
  },
  {
    id: "neblina-floresta",
    title: "Neblina na Floresta",
    location: "Serra Gaúcha, RS",
    year: 2023,
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&q=85",
    thumb: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=75",
    description:
      "A neblina envolve os pinheiros criando uma atmosfera mística — a floresta como portal entre o real e o onírico.",
    category: "Natureza",
    price: "R$ 1.050,00",
    format: "80 cm × 120 cm",
    printType: "Fine art em papel algodão 300g",
  },
  {
    id: "reflexo-lago",
    title: "Reflexo no Lago",
    location: "Lago dos Quadros, RS",
    year: 2023,
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1400&q=85",
    thumb: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=75",
    description:
      "O espelho d'água reflete as cores do amanhecer — natureza como artista, duplicando o mundo em silêncio.",
    category: "Abstrato & Experimental",
    price: "R$ 890,00",
    format: "80 cm × 80 cm",
    printType: "Fine art em papel algodão 300g",
  },
  {
    id: "cerrado-chapada",
    title: "Cerrado Brasileiro",
    location: "Chapada dos Veadeiros, GO",
    year: 2022,
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=85",
    thumb: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=75",
    description:
      "A vida exuberante do cerrado brasileiro — árvores retorcidas, cores vibrantes e uma biodiversidade que desafia a lógica.",
    category: "Natureza",
    price: "R$ 1.200,00",
    format: "120 cm × 80 cm",
    printType: "Canvas",
  },
  {
    id: "vale-do-rio",
    title: "Vale do Rio Pelotas",
    location: "Rio Pelotas, RS",
    year: 2024,
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1400&q=85",
    thumb: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=75",
    description:
      "O cânion do Rio Pelotas — fronteira natural entre estados, abismo de beleza esculpido em milhões de anos de paciência geológica.",
    category: "Paisagens",
    price: "R$ 1.350,00",
    format: "150 cm × 100 cm",
    printType: "Fine art em papel algodão 300g",
  },
  {
    id: "festa-documental",
    title: "Festa da Tradição",
    location: "Passo Fundo, RS",
    year: 2023,
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1400&q=85",
    thumb: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=75",
    description:
      "A riqueza cultural dos festivais — onde a tradição se perpetua com alegria e orgulho, fotografada no instante da sua maior intensidade.",
    category: "Documental",
    price: "R$ 850,00",
    format: "100 cm × 70 cm",
    printType: "Papel fotográfico premium",
  },
  {
    id: "caminhos-colonia",
    title: "Caminhos da Colônia",
    location: "Bento Gonçalves, RS",
    year: 2023,
    src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=85",
    thumb: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=75",
    description:
      "Vilas coloniais italianas encasteladas nas encostas — a memória de gerações convertida em arquitetura e paisagem viva.",
    category: "Documental",
    price: "R$ 920,00",
    format: "100 cm × 70 cm",
    printType: "Fine art em papel algodão 300g",
  },
  {
    id: "retrato-artistico",
    title: "Retrato Poético",
    location: "Santana do Livramento, RS",
    year: 2024,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=85",
    thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75",
    description:
      "O olhar forte e sereno de quem carrega raízes profundas — um retrato que é também um arquivo da alma.",
    category: "Artístico & Conceitual",
    price: "R$ 980,00",
    format: "80 cm × 100 cm",
    printType: "Fine art em papel algodão 300g",
  },
  {
    id: "aurora-pantanal",
    title: "Aurora no Pantanal",
    location: "Pantanal, MS",
    year: 2022,
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85",
    thumb: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=75",
    description:
      "O raiar do sol sobre as águas do Pantanal — maior planície inundável do mundo acordando em luz dourada e silêncio absoluto.",
    category: "Paisagens",
    price: "R$ 1.400,00",
    format: "150 cm × 100 cm",
    printType: "Fine art em papel algodão 300g",
  },
];
