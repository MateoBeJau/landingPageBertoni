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

    const ensaio = await prisma.ensaio.create({
      data: {
        tenantId: data.tenantId,
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        description: data.description,
        cover: data.cover,
        priceInfo: data.priceInfo || "Sob consulta",
        order: data.order || 0,
      },
    });

    revalidateTenantPublic();
    return NextResponse.json({ ensaio }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao criar ensaio";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
