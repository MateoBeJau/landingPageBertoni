import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPanelSession } from "@/lib/auth";
import { revalidateTenantPublic } from "@/lib/revalidate-public";

export async function GET() {
  const session = await getPanelSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const photos = await prisma.photo.findMany({
    where: { tenantId: session.tenantId },
    orderBy: { order: "asc" },
  });

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.tenantId },
    select: { maxPhotos: true },
  });

  return NextResponse.json({
    photos,
    maxPhotos: tenant?.maxPhotos ?? 10,
    currentCount: photos.length,
  });
}

export async function POST(req: NextRequest) {
  const session = await getPanelSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.tenantId },
    select: { maxPhotos: true },
  });

  const currentCount = await prisma.photo.count({
    where: { tenantId: session.tenantId },
  });

  if (currentCount >= (tenant?.maxPhotos ?? 10)) {
    return NextResponse.json(
      {
        error: `Limite de ${tenant?.maxPhotos ?? 10} fotos atingido. Entre em contato com o administrador para aumentar o limite.`,
      },
      { status: 403 }
    );
  }

  try {
    const data = await req.json();

    const photo = await prisma.photo.create({
      data: {
        tenantId: session.tenantId,
        title: data.title,
        slug: data.slug,
        location: data.location,
        year: data.year,
        description: data.description || null,
        category: data.category || null,
        imageSrc: data.imageSrc,
        imageThumb: data.imageThumb,
        price: data.price || null,
        format: data.format || null,
        printType: data.printType || null,
        order: data.order || 0,
      },
    });

    revalidateTenantPublic();
    return NextResponse.json({ photo }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao criar foto";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
