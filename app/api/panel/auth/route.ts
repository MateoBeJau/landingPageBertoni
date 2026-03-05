import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  verifyPassword,
  createPanelToken,
  getPanelCookieOptions,
  getPanelSession,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha obrigatórios" },
        { status: 400 }
      );
    }

    const user = await prisma.tenantUser.findUnique({
      where: { email },
      include: { tenant: { select: { id: true, name: true, slug: true, active: true } } },
    });

    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    if (!user.tenant.active) {
      return NextResponse.json(
        { error: "Conta desativada. Entre em contato com o administrador." },
        { status: 403 }
      );
    }

    const token = await createPanelToken({
      userId: user.id,
      tenantId: user.tenantId,
      email: user.email,
    });
    const cookieOptions = getPanelCookieOptions();

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tenantId: user.tenantId,
        tenantName: user.tenant.name,
      },
    });

    response.cookies.set(cookieOptions.name, token, cookieOptions);
    return response;
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getPanelSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const user = await prisma.tenantUser.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      tenantId: true,
      tenant: { select: { name: true, slug: true, maxPhotos: true } },
    },
  });

  return NextResponse.json({ user });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("panel_token");
  return response;
}
