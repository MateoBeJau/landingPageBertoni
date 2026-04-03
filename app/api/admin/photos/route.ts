import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { revalidateTenantPublic } from "@/lib/revalidate-public";

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const data = await req.json();

    const tenant = await prisma.tenant.findUnique({
      where: { id: data.tenantId },
      select: { maxPhotos: true },
    });
    const currentCount = await prisma.photo.count({
      where: { tenantId: data.tenantId },
    });
    if (tenant && currentCount >= tenant.maxPhotos) {
      return NextResponse.json(
        { error: `Limite de ${tenant.maxPhotos} fotos atingido para este tenant.` },
        { status: 403 }
      );
    }

    const photo = await prisma.photo.create({
      data: {
        tenantId: data.tenantId,
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
