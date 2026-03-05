import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, hashPassword } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  return NextResponse.json({ admins });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres" },
        { status: 400 }
      );
    }

    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Já existe um admin com este email" },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);
    const admin = await prisma.admin.create({
      data: { name, email, password: hashed },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return NextResponse.json({ admin }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao criar admin";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
