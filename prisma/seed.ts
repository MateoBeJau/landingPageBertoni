import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin user ──
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@fotografia.com" },
    update: {},
    create: {
      email: "admin@fotografia.com",
      password: adminPassword,
      name: "Administrador",
    },
  });
  console.log(`✅ Admin: ${admin.email}`);

  // ── Tenant: Álvaro Sanguinetti ──
  const tenant = await prisma.tenant.upsert({
    where: { slug: "alvaro-sanguinetti" },
    update: {},
    create: {
      slug: "alvaro-sanguinetti",
      domain: "localhost",
      name: "Álvaro Sanguinetti",
      subtitle: "Fotografia",
      whatsappNumber: "5551958888939",
      email: "contato@alvarosanguinetti.com.br",
      colorPrimary: "#8B1E1E",
      colorAccent: "#B76E4B",
      colorCta: "#25D366",
      heroTitle: "Um olhar poético sobre o mundo",
      heroSubtitle:
        "Imagens que atravessam culturas, paisagens e emoções. Fotografia autoral para quem busca beleza e originalidade na decoração.",
      heroImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=85",
      heroBadge: "Fotógrafo Profissional · RS & Brasil",
      aboutTitle: "Sobre o Fotógrafo",
      aboutText1:
        "Nascido e criado no Rio Grande do Sul, desenvolvi desde cedo uma profunda conexão com a paisagem, a cultura e o povo gaúcho. A fotografia tornou-se a minha forma de preservar e compartilhar essa identidade única com o mundo.",
      aboutText2:
        "Ao longo de mais de 15 anos de trabalho, percorri os campos do pampa, as encostas da Serra Gaúcha, o litoral e as fronteiras do estado, além de expedições pelo Brasil — do cerrado ao pantanal, das chapadas ao litoral nordestino.",
      aboutText3:
        "Cada imagem que produzo nasce de uma escuta atenta ao lugar e ao momento. Acredito que a fotografia de qualidade deve emocionar, contar uma história e resistir ao tempo — por isso todas as impressões são feitas com materiais de alto padrão para durar décadas.",
      aboutImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85",
      contactTitle: "Interessado em alguma imagem?",
      contactText:
        "Entre em contato pelo WhatsApp para consultar valores, formatos de impressão disponíveis e condições exclusivas. Atendimento personalizado para colecionadores, decoradores e amantes da fotografia.",
      stat1Value: "—",
      stat1Label: "Foto Única",
      stat2Value: "—",
      stat2Label: "Série",
      stat3Value: "—",
      stat3Label: "Ensaios",
      stat4Value: "—",
      stat4Label: "Exposições",
      categories:
        "Todas,Paisagens,Natureza,Abstrato & Experimental,Documental,Artístico & Conceitual",
      instagramUrl: "https://instagram.com/alvarosanguinetti",
      facebookUrl: "https://facebook.com/alvarosanguinetti",
    },
  });
  console.log(`✅ Tenant: ${tenant.name} (${tenant.slug})`);

  // ── Photos ──
  const photos = [
    {
      title: "Entardecer no Pampa",
      slug: "entardecer-no-pampa",
      location: "Alegrete, RS",
      year: 2024,
      description:
        "A luz dourada do fim de tarde sobre as planícies do pampa, onde o horizonte se funde com o céu numa paleta de infinitos ocres e carmesins.",
      category: "Paisagens",
      imageSrc:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85",
      imageThumb:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75",
      price: "R$ 1.200,00",
      format: "120 cm × 80 cm",
      printType: "Fine art em papel algodão 300g",
    },
    {
      title: "Liberdade no Campo",
      slug: "liberdade-no-campo",
      location: "Quaraí, RS",
      year: 2024,
      description:
        "Cavalos galopando livres pelas coxilhas — uma cena que condensa movimento, força e a amplidão do campo aberto.",
      category: "Natureza",
      imageSrc:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=85",
      imageThumb:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=75",
      price: "R$ 980,00",
      format: "100 cm × 70 cm",
      printType: "Fine art em papel algodão 300g",
    },
    {
      title: "Litoral Gaúcho",
      slug: "litoral-gaucho",
      location: "Torres, RS",
      year: 2023,
      description:
        "As praias selvagens do litoral norte gaúcho, com suas falésias basálticas e mar revolto em tons de cobalto e espuma.",
      category: "Paisagens",
      imageSrc:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=85",
      imageThumb:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75",
      price: "R$ 1.100,00",
      format: "120 cm × 80 cm",
      printType: "Canvas",
    },
    {
      title: "Campo Nativo",
      slug: "campo-nativo",
      location: "Bagé, RS",
      year: 2024,
      description:
        "A imensidão verde do campo nativo — uma meditação visual sobre a quietude e o tempo que escorre devagar no interior.",
      category: "Paisagens",
      imageSrc:
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=85",
      imageThumb:
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=75",
      price: "R$ 950,00",
      format: "100 cm × 70 cm",
      printType: "Fine art em papel algodão 300g",
    },
    {
      title: "Neblina na Floresta",
      slug: "neblina-na-floresta",
      location: "Serra Gaúcha, RS",
      year: 2023,
      description:
        "A neblina envolve os pinheiros criando uma atmosfera mística — a floresta como portal entre o real e o onírico.",
      category: "Natureza",
      imageSrc:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&q=85",
      imageThumb:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=75",
      price: "R$ 1.050,00",
      format: "80 cm × 120 cm",
      printType: "Fine art em papel algodão 300g",
    },
    {
      title: "Reflexo no Lago",
      slug: "reflexo-no-lago",
      location: "Lago dos Quadros, RS",
      year: 2023,
      description:
        "O espelho d'água reflete as cores do amanhecer — natureza como artista, duplicando o mundo em silêncio.",
      category: "Abstrato & Experimental",
      imageSrc:
        "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1400&q=85",
      imageThumb:
        "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=75",
      price: "R$ 890,00",
      format: "80 cm × 80 cm",
      printType: "Fine art em papel algodão 300g",
    },
    {
      title: "Cerrado Brasileiro",
      slug: "cerrado-brasileiro",
      location: "Chapada dos Veadeiros, GO",
      year: 2022,
      description:
        "A vida exuberante do cerrado brasileiro — árvores retorcidas, cores vibrantes e uma biodiversidade que desafia a lógica.",
      category: "Natureza",
      imageSrc:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=85",
      imageThumb:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=75",
      price: "R$ 1.200,00",
      format: "120 cm × 80 cm",
      printType: "Canvas",
    },
    {
      title: "Vale do Rio Pelotas",
      slug: "vale-do-rio-pelotas",
      location: "Rio Pelotas, RS",
      year: 2024,
      description:
        "O cânion do Rio Pelotas — fronteira natural entre estados, abismo de beleza esculpido em milhões de anos.",
      category: "Paisagens",
      imageSrc:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1400&q=85",
      imageThumb:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=75",
      price: "R$ 1.350,00",
      format: "150 cm × 100 cm",
      printType: "Fine art em papel algodão 300g",
    },
    {
      title: "Festa da Tradição",
      slug: "festa-da-tradicao",
      location: "Passo Fundo, RS",
      year: 2023,
      description:
        "A riqueza cultural dos festivais — onde a tradição se perpetua com alegria e orgulho.",
      category: "Documental",
      imageSrc:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1400&q=85",
      imageThumb:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=75",
      price: "R$ 850,00",
      format: "100 cm × 70 cm",
      printType: "Papel fotográfico premium",
    },
    {
      title: "Caminhos da Colônia",
      slug: "caminhos-da-colonia",
      location: "Bento Gonçalves, RS",
      year: 2023,
      description:
        "Vilas coloniais italianas encasteladas nas encostas — a memória de gerações convertida em arquitetura.",
      category: "Documental",
      imageSrc:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=85",
      imageThumb:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=75",
      price: "R$ 920,00",
      format: "100 cm × 70 cm",
      printType: "Fine art em papel algodão 300g",
    },
    {
      title: "Retrato Poético",
      slug: "retrato-poetico",
      location: "Santana do Livramento, RS",
      year: 2024,
      description:
        "O olhar forte e sereno de quem carrega raízes profundas — um retrato que é também um arquivo da alma.",
      category: "Artístico & Conceitual",
      imageSrc:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=85",
      imageThumb:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75",
      price: "R$ 980,00",
      format: "80 cm × 100 cm",
      printType: "Fine art em papel algodão 300g",
    },
    {
      title: "Aurora no Pantanal",
      slug: "aurora-no-pantanal",
      location: "Pantanal, MS",
      year: 2022,
      description:
        "O raiar do sol sobre as águas do Pantanal — maior planície inundável do mundo acordando em luz dourada.",
      category: "Paisagens",
      imageSrc:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85",
      imageThumb:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=75",
      price: "R$ 1.400,00",
      format: "150 cm × 100 cm",
      printType: "Fine art em papel algodão 300g",
    },
  ];

  for (let i = 0; i < photos.length; i++) {
    await prisma.photo.upsert({
      where: {
        tenantId_slug: { tenantId: tenant.id, slug: photos[i].slug },
      },
      update: {},
      create: { ...photos[i], tenantId: tenant.id, order: i },
    });
  }
  console.log(`✅ ${photos.length} photos seeded`);

  // ── Series ──
  const seriesData = [
    {
      title: "Caminhos do Pampa",
      slug: "caminhos-do-pampa",
      subtitle: "Uma jornada pela alma gaúcha",
      cover:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
      description:
        "Uma série que celebra a vastidão e a poesia do pampa gaúcho. Campos infinitos, cavalos crioulos e o silêncio profundo das coxilhas.",
      photos: [
        { title: "Coxilha ao Amanhecer", location: "Alegrete, RS", year: 2024, imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85", imageThumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75" },
        { title: "Cavalos Crioulos", location: "Quaraí, RS", year: 2024, imageSrc: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&q=85", imageThumb: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=75" },
        { title: "Horizonte Infinito", location: "Dom Pedrito, RS", year: 2024, imageSrc: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=85", imageThumb: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=75" },
      ],
    },
    {
      title: "Retratos da Colônia",
      slug: "retratos-da-colonia",
      subtitle: "Tradição e identidade na Serra Gaúcha",
      cover:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      description:
        "A Serra Gaúcha guarda em suas vilas e rostos a memória viva dos imigrantes italianos e alemães.",
      photos: [
        { title: "Vila Colonial", location: "Bento Gonçalves, RS", year: 2023, imageSrc: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=85", imageThumb: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=75" },
        { title: "Neblina na Serra", location: "Gramado, RS", year: 2023, imageSrc: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&q=85", imageThumb: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=75" },
      ],
    },
  ];

  for (let i = 0; i < seriesData.length; i++) {
    const { photos: seriesPhotos, ...seriesInfo } = seriesData[i];
    const existing = await prisma.series.findUnique({
      where: {
        tenantId_slug: { tenantId: tenant.id, slug: seriesInfo.slug },
      },
    });
    if (!existing) {
      await prisma.series.create({
        data: {
          ...seriesInfo,
          tenantId: tenant.id,
          order: i,
          photos: {
            create: seriesPhotos.map((p, j) => ({ ...p, order: j })),
          },
        },
      });
    }
  }
  console.log(`✅ ${seriesData.length} series seeded`);

  // ── Ensaios ──
  const ensaiosData = [
    {
      title: "Retratos",
      slug: "retratos",
      subtitle: "A alma revelada pelo olhar",
      description:
        "Sessões de retrato que capturam a essência genuína de cada pessoa.",
      cover:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85",
      priceInfo: "Sob consulta",
    },
    {
      title: "Celebrações",
      slug: "celebracoes",
      subtitle: "Momentos que merecem eternidade",
      description:
        "Casamentos, formaturas, aniversários e eventos especiais documentados com sensibilidade artística.",
      cover:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85",
      priceInfo: "Sob consulta",
    },
    {
      title: "Corporativo & Editorial",
      slug: "corporativo-editorial",
      subtitle: "Identidade visual com profundidade",
      description:
        "Imagens editoriais e corporativas que transcendem o convencional.",
      cover:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85",
      priceInfo: "Sob consulta",
    },
  ];

  for (let i = 0; i < ensaiosData.length; i++) {
    const existing = await prisma.ensaio.findUnique({
      where: {
        tenantId_slug: {
          tenantId: tenant.id,
          slug: ensaiosData[i].slug,
        },
      },
    });
    if (!existing) {
      await prisma.ensaio.create({
        data: { ...ensaiosData[i], tenantId: tenant.id, order: i },
      });
    }
  }
  console.log(`✅ ${ensaiosData.length} ensaios seeded`);

  console.log("\n🎉 Seed completed!");
  console.log("   Admin login: admin@fotografia.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
