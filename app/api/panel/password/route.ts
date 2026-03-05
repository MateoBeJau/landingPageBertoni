import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPanelSession, hashPassword, verifyPassword } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  const session = await getPanelSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Preencha a senha atual e a nova senha" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "A nova senha deve ter pelo menos 6 caracteres" },
        { status: 400 }
      );
    }

    const user = await prisma.tenantUser.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const valid = await verifyPassword(currentPassword, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Senha atual incorreta" },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(newPassword);
    await prisma.tenantUser.update({
      where: { id: session.userId },
      data: { password: hashed },
    });

    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao alterar senha";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
