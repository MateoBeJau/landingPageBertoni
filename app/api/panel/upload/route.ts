import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getPanelSession } from "@/lib/auth";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 3; // Límite para ahorrar almacenamiento y bandwidth

export async function POST(req: NextRequest) {
  const session = await getPanelSession();
  if (!session)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de arquivo não permitido. Use JPEG, PNG, WebP ou GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: `Arquivo muito grande. Máximo ${MAX_SIZE_MB} MB.` },
        { status: 400 }
      );
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100) || "image";
    const folder = `tenants/${session.tenantId}`;
    const blob = await put(`${folder}/${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro ao enviar arquivo";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
