import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  verifyPassword,
  createToken,
  getTokenCookieOptions,
  getAdminSession,
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

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !(await verifyPassword(password, admin.password))) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    const token = await createToken({ adminId: admin.id, email: admin.email });
    const cookieOptions = getTokenCookieOptions();

    const response = NextResponse.json({
      success: true,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });

    response.cookies.set(cookieOptions.name, token, cookieOptions);
    return response;
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const admin = await prisma.admin.findUnique({
    where: { id: session.adminId },
    select: { id: true, name: true, email: true },
  });

  return NextResponse.json({ admin });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_token");
  return response;
}
