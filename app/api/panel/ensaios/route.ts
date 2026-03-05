import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPanelSession } from "@/lib/auth";

export async function GET() {
  const session = await getPanelSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const ensaios = await prisma.ensaio.findMany({
    where: { tenantId: session.tenantId },
    orderBy: { order: "asc" },
  });

  return NextResponse.json({ ensaios });
}

export async function POST(req: NextRequest) {
  const session = await getPanelSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const data = await req.json();

    const ensaio = await prisma.ensaio.create({
      data: {
        tenantId: session.tenantId,
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        description: data.description,
        cover: data.cover,
        priceInfo: data.priceInfo || "Sob consulta",
        order: data.order || 0,
      },
    });

    return NextResponse.json({ ensaio }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao criar ensaio";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
