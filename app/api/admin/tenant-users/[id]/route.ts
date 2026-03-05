import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, hashPassword } from "@/lib/auth";

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

    const updateData: Record<string, unknown> = {
      name: data.name,
      email: data.email,
    };

    if (data.password) {
      updateData.password = await hashPassword(data.password);
    }

    const user = await prisma.tenantUser.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, name: true, tenantId: true },
    });

    return NextResponse.json({ user });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao atualizar usuário";
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
  await prisma.tenantUser.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
