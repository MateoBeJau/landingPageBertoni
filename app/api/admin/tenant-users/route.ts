import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, hashPassword } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const tenantId = req.nextUrl.searchParams.get("tenantId");

  const where = tenantId ? { tenantId } : {};
  const users = await prisma.tenantUser.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      tenantId: true,
      createdAt: true,
      tenant: { select: { name: true } },
    },
  });

  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const data = await req.json();

    if (!data.email || !data.password || !data.name || !data.tenantId) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.tenantUser.create({
      data: {
        tenantId: data.tenantId,
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        tenantId: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao criar usuário";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
