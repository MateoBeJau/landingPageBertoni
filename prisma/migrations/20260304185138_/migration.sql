-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "domain" TEXT,
    "name" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL DEFAULT 'Fotografia',
    "whatsappNumber" TEXT NOT NULL,
    "email" TEXT,
    "colorPrimary" TEXT NOT NULL DEFAULT '#8B1E1E',
    "colorAccent" TEXT NOT NULL DEFAULT '#B76E4B',
    "colorCta" TEXT NOT NULL DEFAULT '#25D366',
    "heroTitle" TEXT NOT NULL DEFAULT 'Um olhar poético sobre o mundo',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Imagens que atravessam culturas, paisagens e emoções.',
    "heroImage" TEXT NOT NULL,
    "heroBadge" TEXT NOT NULL DEFAULT 'Fotógrafo Profissional',
    "aboutTitle" TEXT,
    "aboutText1" TEXT,
    "aboutText2" TEXT,
    "aboutText3" TEXT,
    "aboutImage" TEXT,
    "contactTitle" TEXT NOT NULL DEFAULT 'Interessado em alguma imagem?',
    "contactText" TEXT NOT NULL DEFAULT 'Entre em contato pelo WhatsApp para consultar valores, formatos de impressão disponíveis e condições exclusivas.',
    "stat1Value" TEXT NOT NULL DEFAULT '—',
    "stat1Label" TEXT NOT NULL DEFAULT 'Foto Única',
    "stat2Value" TEXT NOT NULL DEFAULT '—',
    "stat2Label" TEXT NOT NULL DEFAULT 'Série',
    "stat3Value" TEXT NOT NULL DEFAULT '—',
    "stat3Label" TEXT NOT NULL DEFAULT 'Ensaios',
    "stat4Value" TEXT NOT NULL DEFAULT '—',
    "stat4Label" TEXT NOT NULL DEFAULT 'Exposições',
    "instagramUrl" TEXT,
    "facebookUrl" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "categories" TEXT NOT NULL DEFAULT 'Todas,Paisagens,Natureza,Urbano & Arquitetura,Abstrato & Experimental,Documental,Artístico & Conceitual',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "imageSrc" TEXT NOT NULL,
    "imageThumb" TEXT NOT NULL,
    "price" TEXT,
    "format" TEXT,
    "printType" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeriesPhoto" (
    "id" TEXT NOT NULL,
    "seriesId" TEXT NOT NULL,
    "photoId" TEXT,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "imageThumb" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SeriesPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ensaio" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "priceInfo" TEXT NOT NULL DEFAULT 'Sob consulta',
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ensaio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_slug_key" ON "Tenant"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_domain_key" ON "Tenant"("domain");

-- CreateIndex
CREATE INDEX "Photo_tenantId_active_order_idx" ON "Photo"("tenantId", "active", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_tenantId_slug_key" ON "Photo"("tenantId", "slug");

-- CreateIndex
CREATE INDEX "Series_tenantId_active_order_idx" ON "Series"("tenantId", "active", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Series_tenantId_slug_key" ON "Series"("tenantId", "slug");

-- CreateIndex
CREATE INDEX "SeriesPhoto_seriesId_order_idx" ON "SeriesPhoto"("seriesId", "order");

-- CreateIndex
CREATE INDEX "Ensaio_tenantId_active_order_idx" ON "Ensaio"("tenantId", "active", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Ensaio_tenantId_slug_key" ON "Ensaio"("tenantId", "slug");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesPhoto" ADD CONSTRAINT "SeriesPhoto_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesPhoto" ADD CONSTRAINT "SeriesPhoto_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ensaio" ADD CONSTRAINT "Ensaio_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
