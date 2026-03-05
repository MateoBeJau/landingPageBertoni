import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPanelSession } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getPanelSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { id } = await params;

  const existing = await prisma.photo.findUnique({ where: { id } });
  if (!existing || existing.tenantId !== session.tenantId) {
    return NextResponse.json({ error: "Foto não encontrada" }, { status: 404 });
  }

  try {
    const data = await req.json();
    const photo = await prisma.photo.update({
      where: { id },
      data: {
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
        order: data.order,
        active: data.active,
      },
    });
    return NextResponse.json({ photo });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao atualizar foto";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getPanelSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { id } = await params;

  const existing = await prisma.photo.findUnique({ where: { id } });
  if (!existing || existing.tenantId !== session.tenantId) {
    return NextResponse.json({ error: "Foto não encontrada" }, { status: 404 });
  }

  await prisma.photo.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
