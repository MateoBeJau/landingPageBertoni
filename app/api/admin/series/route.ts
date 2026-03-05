import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const data = await req.json();

    const series = await prisma.series.create({
      data: {
        tenantId: data.tenantId,
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        description: data.description,
        cover: data.cover,
        order: data.order || 0,
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

    return NextResponse.json({ series }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao criar série";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
