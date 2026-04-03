import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { revalidateTenantPublic } from "@/lib/revalidate-public";

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
    const ensaio = await prisma.ensaio.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        description: data.description,
        cover: data.cover,
        priceInfo: data.priceInfo,
        order: data.order,
        active: data.active,
      },
    });
    revalidateTenantPublic();
    return NextResponse.json({ ensaio });
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Erro ao atualizar ensaio";
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
  await prisma.ensaio.delete({ where: { id } });
  revalidateTenantPublic();
  return NextResponse.json({ success: true });
}
