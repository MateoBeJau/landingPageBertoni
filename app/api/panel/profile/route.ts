import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPanelSession } from "@/lib/auth";
import { revalidateTenantPublic } from "@/lib/revalidate-public";

export async function GET() {
  const session = await getPanelSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.tenantId },
    include: {
      photos: { orderBy: { order: "asc" } },
      series: {
        orderBy: { order: "asc" },
        include: { photos: { orderBy: { order: "asc" } } },
      },
      ensaios: { orderBy: { order: "asc" } },
    },
  });

  if (!tenant)
    return NextResponse.json({ error: "Tenant não encontrado" }, { status: 404 });

  return NextResponse.json({ tenant });
}

export async function PUT(req: NextRequest) {
  const session = await getPanelSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const data = await req.json();

    const tenant = await prisma.tenant.update({
      where: { id: session.tenantId },
      data: {
        name: data.name,
        subtitle: data.subtitle,
        whatsappNumber: data.whatsappNumber,
        email: data.email || null,
        colorPrimary: data.colorPrimary,
        colorAccent: data.colorAccent,
        colorCta: data.colorCta,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroImage: data.heroImage,
        heroBadge: data.heroBadge,
        aboutTitle: data.aboutTitle || null,
        aboutText1: data.aboutText1 || null,
        aboutText2: data.aboutText2 || null,
        aboutText3: data.aboutText3 || null,
        aboutImage: data.aboutImage || null,
        contactTitle: data.contactTitle,
        contactText: data.contactText,
        stat1Value: data.stat1Value,
        stat1Label: data.stat1Label,
        stat2Value: data.stat2Value,
        stat2Label: data.stat2Label,
        stat3Value: data.stat3Value,
        stat3Label: data.stat3Label,
        stat4Value: data.stat4Value,
        stat4Label: data.stat4Label,
        // categories: only admin can update; panel cannot change categories
        instagramUrl: data.instagramUrl || null,
        facebookUrl: data.facebookUrl || null,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        sectionFotoUnicaBadge: data.sectionFotoUnicaBadge || null,
        sectionFotoUnicaTitle: data.sectionFotoUnicaTitle || null,
        sectionFotoUnicaDesc: data.sectionFotoUnicaDesc || null,
        sectionFotoUnicaDesc2: data.sectionFotoUnicaDesc2 || null,
        sectionFotoUnicaCta: data.sectionFotoUnicaCta || null,
        sectionFotoUnicaSubtext: data.sectionFotoUnicaSubtext || null,
        sectionSeriesBadge: data.sectionSeriesBadge || null,
        sectionSeriesTitle: data.sectionSeriesTitle || null,
        sectionSeriesDesc: data.sectionSeriesDesc || null,
        sectionSeriesModalLabel: data.sectionSeriesModalLabel || null,
        sectionSeriesVerSerie: data.sectionSeriesVerSerie || null,
        sectionSeriesClique: data.sectionSeriesClique || null,
        sectionEnsaiosBadge: data.sectionEnsaiosBadge || null,
        sectionEnsaiosTitle: data.sectionEnsaiosTitle || null,
        sectionEnsaiosDesc: data.sectionEnsaiosDesc || null,
        sectionEnsaiosCta: data.sectionEnsaiosCta || null,
        sectionEnsaiosCtaSubtext: data.sectionEnsaiosCtaSubtext || null,
        heroCtaWhatsApp: data.heroCtaWhatsApp || null,
        heroCtaPortfolio: data.heroCtaPortfolio || null,
        heroScrollLabel: data.heroScrollLabel || null,
        contactCta: data.contactCta || null,
        contactSubtext: data.contactSubtext || null,
        aboutSectionLabel: data.aboutSectionLabel || null,
        aboutYears: data.aboutYears || null,
        aboutYearsLabel: data.aboutYearsLabel || null,
        aboutCtaContact: data.aboutCtaContact || null,
        aboutCtaPortfolio: data.aboutCtaPortfolio || null,
      },
    });

    revalidateTenantPublic();
    return NextResponse.json({ tenant });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao atualizar perfil";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
