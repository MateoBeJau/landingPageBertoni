import { Photo } from "./photos";

export interface PhotoSeries {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  description: string;
  photos: Photo[];
}

export const series: PhotoSeries[] = [
  {
    slug: "caminhos-do-pampa",
    title: "Caminhos do Pampa",
    subtitle: "Uma jornada pela alma gaúcha",
    cover: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    description:
      "Uma série que celebra a vastidão e a poesia do pampa gaúcho. Campos infinitos, cavalos crioulos, gado chimarrão e o silêncio profundo das coxilhas — fotografias que capturam a essência de uma cultura única no mundo.",
    photos: [
      {
        id: "pampa-s1",
        title: "Coxilha ao Amanhecer",
        location: "Alegrete, RS",
        year: 2024,
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75",
      },
      {
        id: "pampa-s2",
        title: "Cavalos Crioulos",
        location: "Quaraí, RS",
        year: 2024,
        src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=75",
      },
      {
        id: "pampa-s3",
        title: "Horizonte Infinito",
        location: "Dom Pedrito, RS",
        year: 2024,
        src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=75",
      },
      {
        id: "pampa-s4",
        title: "Noite no Campo",
        location: "Bagé, RS",
        year: 2023,
        src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=75",
      },
      {
        id: "pampa-s5",
        title: "Galpão e Estrelas",
        location: "Rosário do Sul, RS",
        year: 2023,
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=75",
      },
      {
        id: "pampa-s6",
        title: "Arroio do Meio",
        location: "Uruguaiana, RS",
        year: 2024,
        src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=75",
      },
    ],
  },
  {
    slug: "retratos-da-colonia",
    title: "Retratos da Colônia",
    subtitle: "Tradição e identidade na Serra Gaúcha",
    cover: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    description:
      "A Serra Gaúcha guarda em suas vilas e rostos a memória viva dos imigrantes italianos e alemães. Esta série retrata a arquitetura colonial, a produção do vinho, as festas religiosas e o cotidiano das famílias que fazem da tradição um modo de vida.",
    photos: [
      {
        id: "colonia-s1",
        title: "Vila Colonial",
        location: "Bento Gonçalves, RS",
        year: 2023,
        src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=75",
      },
      {
        id: "colonia-s2",
        title: "Neblina na Serra",
        location: "Gramado, RS",
        year: 2023,
        src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=75",
      },
      {
        id: "colonia-s3",
        title: "Festa da Tradição",
        location: "Caxias do Sul, RS",
        year: 2023,
        src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=75",
      },
      {
        id: "colonia-s4",
        title: "Retrato do Colono",
        location: "Garibaldi, RS",
        year: 2022,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75",
      },
    ],
  },
  {
    slug: "belezas-do-litoral",
    title: "Belezas do Litoral Gaúcho",
    subtitle: "Mar, vento e vida nas praias do Sul",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    description:
      "Do litoral norte às lagoas do sul, as praias gaúchas têm personalidade própria. Ventos fortes, dunas monumentais, pescadores artesanais e pores do sol que incendeiam o horizonte compõem esta série sobre o litoral único do Rio Grande do Sul.",
    photos: [
      {
        id: "litoral-s1",
        title: "Praias de Torres",
        location: "Torres, RS",
        year: 2023,
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75",
      },
      {
        id: "litoral-s2",
        title: "Reflexo na Lagoa",
        location: "Lago dos Quadros, RS",
        year: 2023,
        src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=75",
      },
      {
        id: "litoral-s3",
        title: "Dunas ao Entardecer",
        location: "Cidreira, RS",
        year: 2024,
        src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=75",
      },
      {
        id: "litoral-s4",
        title: "Pesca Artesanal",
        location: "Tramandaí, RS",
        year: 2022,
        src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=75",
      },
      {
        id: "litoral-s5",
        title: "Farol das Pedras",
        location: "Torres, RS",
        year: 2023,
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75",
      },
    ],
  },
  {
    slug: "brasil-central",
    title: "Brasil Central",
    subtitle: "A grandeza do coração do Brasil",
    cover: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    description:
      "Uma expedição pelo coração do Brasil: o cerrado ancestral, as chapadas vertiginosas, as cachoeiras cristalinas e os habitantes que guardam a memória de um Brasil profundo e genuíno. Imagens que revelam a imensidão e a beleza do planalto central.",
    photos: [
      {
        id: "brasil-s1",
        title: "Chapada dos Veadeiros",
        location: "Alto Paraíso, GO",
        year: 2022,
        src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=75",
      },
      {
        id: "brasil-s2",
        title: "Cerrado em Flor",
        location: "Brasília, DF",
        year: 2022,
        src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=75",
      },
      {
        id: "brasil-s3",
        title: "Cânion de Cristal",
        location: "Chapada dos Guimarães, MT",
        year: 2022,
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=75",
      },
      {
        id: "brasil-s4",
        title: "Aurora no Pantanal",
        location: "Corumbá, MS",
        year: 2022,
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85",
        thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75",
      },
    ],
  },
];
