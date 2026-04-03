import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { revalidateTenantPublic } from "@/lib/revalidate-public";

export async function GET() {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      domain: true,
      name: true,
      active: true,
      createdAt: true,
      maxPhotos: true,
      _count: { select: { photos: true, series: true, ensaios: true, users: true } },
    },
  });

  return NextResponse.json({ tenants });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const data = await req.json();

    const tenant = await prisma.tenant.create({
      data: {
        slug: data.slug,
        domain: data.domain || null,
        name: data.name,
        subtitle: data.subtitle || "Fotografia",
        whatsappNumber: data.whatsappNumber,
        email: data.email || null,
        colorPrimary: data.colorPrimary || "#8B1E1E",
        colorAccent: data.colorAccent || "#B76E4B",
        colorCta: data.colorCta || "#25D366",
        heroTitle: data.heroTitle || "Um olhar poético sobre o mundo",
        heroSubtitle:
          data.heroSubtitle ||
          "Imagens que atravessam culturas, paisagens e emoções.",
        heroImage: data.heroImage || "",
        heroBadge: data.heroBadge || "Fotógrafo Profissional",
        categories: data.categories || "Todas,Paisagens,Natureza",
        contactTitle: data.contactTitle,
        contactText: data.contactText,
        instagramUrl: data.instagramUrl || null,
        facebookUrl: data.facebookUrl || null,
      },
    });

    revalidateTenantPublic();
    return NextResponse.json({ tenant }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao criar tenant";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
