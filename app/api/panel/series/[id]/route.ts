import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPanelSession } from "@/lib/auth";
import { revalidateTenantPublic } from "@/lib/revalidate-public";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getPanelSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { id } = await params;

  const existing = await prisma.series.findFirst({
    where: { id, tenantId: session.tenantId },
  });
  if (!existing)
    return NextResponse.json({ error: "Série não encontrada" }, { status: 404 });

  try {
    const data = await req.json();
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
      },
    });
    revalidateTenantPublic();
    return NextResponse.json({ series });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao atualizar série";
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

  const existing = await prisma.series.findFirst({
    where: { id, tenantId: session.tenantId },
  });
  if (!existing)
    return NextResponse.json({ error: "Série não encontrada" }, { status: 404 });

  await prisma.series.delete({ where: { id } });
  revalidateTenantPublic();
  return NextResponse.json({ success: true });
}
