import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { id } = await params;

  try {
    const data = await req.json();

    // Delete existing series photos and recreate
    await prisma.seriesPhoto.deleteMany({ where: { seriesId: id } });

    const series = await prisma.series.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        description: data.description,
        cover: data.cover,
        order: data.order,
        active: data.active,
        photos: data.photos?.length
          ? {
              create: data.photos.map(
                (
                  p: {
                    title: string;
                    location: string;
                    year: number;
                    imageSrc: string;
                    imageThumb: string;
                  },
                  i: number
                ) => ({
                  title: p.title,
                  location: p.location,
                  year: p.year,
                  imageSrc: p.imageSrc,
                  imageThumb: p.imageThumb,
                  order: i,
                })
              ),
            }
          : undefined,
      },
      include: { photos: { orderBy: { order: "asc" } } },
    });

    return NextResponse.json({ series });
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Erro ao atualizar série";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { id } = await params;
  await prisma.series.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
