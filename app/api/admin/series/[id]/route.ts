import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { revalidateTenantPublic } from "@/lib/revalidate-public";
import { slugify } from "@/lib/slugify";

async function ensurePhotoForSeries(
  tenantId: string,
  seriesTitle: string,
  p: { title: string; location: string; year: number; imageSrc: string; imageThumb: string; category?: string; price?: string; format?: string; printType?: string },
  index: number
): Promise<string | null> {
  if (!p.imageSrc && !p.imageThumb) return null;
  const img = p.imageSrc || p.imageThumb;

  const existing = await prisma.photo.findFirst({
    where: {
      tenantId,
      OR: [{ imageSrc: img }, { imageThumb: img }],
    },
  });
  if (existing) {
    if (p.category !== undefined || p.price !== undefined || p.format !== undefined || p.printType !== undefined) {
      await prisma.photo.update({
        where: { id: existing.id },
        data: {
          ...(p.category !== undefined && { category: p.category || null }),
          ...(p.price !== undefined && { price: p.price || null }),
          ...(p.format !== undefined && { format: p.format || null }),
          ...(p.printType !== undefined && { printType: p.printType || null }),
        },
      });
    }
    return existing.id;
  }

  let slug = slugify(p.title || "foto");
  let suffix = 0;
  while (true) {
    const candidate = suffix ? `${slug}-${suffix}` : slug;
    const taken = await prisma.photo.findUnique({
      where: { tenantId_slug: { tenantId, slug: candidate } },
    });
    if (!taken) {
      slug = candidate;
      break;
    }
    suffix++;
  }

  const photo = await prisma.photo.create({
    data: {
      tenantId,
      title: p.title || "Foto",
      slug,
      location: p.location || "",
      year: p.year || new Date().getFullYear(),
      imageSrc: p.imageSrc || p.imageThumb,
      imageThumb: p.imageThumb || p.imageSrc,
      category: p.category || seriesTitle,
      order: 1000 + index,
      price: p.price || null,
      format: p.format || null,
      printType: p.printType || null,
    },
  });
  return photo.id;
}

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
    const seriesRow = await prisma.series.findUnique({
      where: { id },
      select: { tenantId: true, title: true },
    });
    if (!seriesRow) {
      return NextResponse.json({ error: "Série não encontrada" }, { status: 404 });
    }

    const photoIds: (string | null)[] = [];
    if (data.photos?.length) {
      for (let i = 0; i < data.photos.length; i++) {
        const pid = await ensurePhotoForSeries(
          seriesRow.tenantId,
          data.title || seriesRow.title,
          data.photos[i],
          i
        );
        photoIds.push(pid);
      }
    }

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
                  photoId: photoIds[i] ?? undefined,
                })
              ),
            }
          : undefined,
      },
      include: {
        photos: {
          orderBy: { order: "asc" },
          include: { photo: true },
        },
      },
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
  revalidateTenantPublic();
  return NextResponse.json({ success: true });
}
