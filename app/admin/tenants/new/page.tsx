"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Globe,
  Phone,
  Mail,
  Image,
  Palette,
  ArrowRight,
  Plus,
  Upload,
  Loader2,
  AlertCircle,
  Key,
} from "lucide-react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ColorPickerCard({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="h-20 w-20 shrink-0 rounded-full border-2 border-stone-200 shadow-inner ring-2 ring-stone-100 transition-shadow hover:shadow-md"
        style={{ backgroundColor: value }}
      />
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full cursor-pointer rounded-lg border border-stone-300 p-1 sm:w-14"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

export default function NewTenantPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [domain, setDomain] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [colorPrimary, setColorPrimary] = useState("#8B1E1E");
  const [colorAccent, setColorAccent] = useState("#B76E4B");
  const [colorCta, setColorCta] = useState("#25D366");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const updateSlugFromName = useCallback((value: string) => {
    setName(value);
    setSlug(slugify(value));
  }, []);

  useEffect(() => {
    async function init() {
      const authRes = await fetch("/api/admin/auth");
      if (!authRes.ok) {
        window.location.href = "/admin/login";
        return;
      }
      setAuthChecked(true);
    }
    init();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("folder", "hero");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao enviar arquivo");
      }

      const data = await res.json();
      setHeroImage(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar arquivo");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug,
          domain: domain || null,
          whatsappNumber,
          email: email || null,
          heroImage: heroImage || "",
          colorPrimary,
          colorAccent,
          colorCta,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Erro ao criar tenant");
      }

      const tenantId = data.tenant.id;

      if (userEmail && userPassword && userName) {
        const userRes = await fetch("/api/admin/tenant-users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tenantId,
            name: userName,
            email: userEmail,
            password: userPassword,
          }),
        });
        const userData = await userRes.json().catch(() => ({}));
        if (!userRes.ok) {
          throw new Error(userData.error || "Erro ao criar usuário. Tenant criado, crie o usuário manualmente na aba Usuários.");
        }
      }

      window.location.href = `/admin/tenants/${tenantId}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar tenant");
      setLoading(false);
    }
  }

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-stone-400" />
          <span className="text-sm text-stone-500">Verificando autenticação...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Nav bar */}
      <header className="sticky top-0 z-20 border-b border-stone-800 bg-stone-900 shadow-lg">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-sm text-stone-300 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Link>
              <h1 className="text-lg font-semibold text-white">Novo Tenant</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-stone-500">
          <Link href="/admin" className="transition-colors hover:text-stone-700">
            Admin
          </Link>
          <span>/</span>
          <Link href="/admin" className="transition-colors hover:text-stone-700">
            Tenants
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-medium">Novo</span>
        </nav>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Informações do fotógrafo */}
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-white">
                1
              </span>
              <h2 className="text-base font-semibold text-stone-900">
                Informações do fotógrafo
              </h2>
            </div>
            <div className="space-y-5 p-6">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-stone-700">
                  <User className="h-4 w-4 text-stone-500" />
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => updateSlugFromName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200"
                  placeholder="Ex: Álvaro Bertoni"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-700">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="w-full rounded-lg border border-stone-300 px-3 py-2.5 font-mono text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200"
                  placeholder="alvaro-bertoni"
                />
                <p className="mt-1 text-xs text-stone-500">
                  Gerado automaticamente a partir do nome. Usado na URL.
                </p>
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-stone-700">
                  <Globe className="h-4 w-4 text-stone-500" />
                  Domínio
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200"
                  placeholder="Ex: alvarosanguinetti.com"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-stone-700">
                  <Phone className="h-4 w-4 text-stone-500" />
                  WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  required
                  className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200"
                  placeholder="Ex: +5491112345678"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-stone-700">
                  <Mail className="h-4 w-4 text-stone-500" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200"
                  placeholder="contato@exemplo.com"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Imagem principal */}
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-white">
                2
              </span>
              <h2 className="text-base font-semibold text-stone-900">
                Imagem principal
              </h2>
            </div>
            <div className="space-y-5 p-6">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-stone-700">
                  <Image className="h-4 w-4 text-stone-500" />
                  URL da imagem
                </label>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                  <input
                    type="url"
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    className="flex-1 rounded-lg border border-stone-300 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200"
                    placeholder="https://..."
                  />
                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      disabled={uploading}
                      className="sr-only"
                    />
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    {uploading ? "Enviando..." : "Upload"}
                  </label>
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-stone-700">Preview</p>
                <div className="overflow-hidden rounded-2xl border-2 border-stone-200 bg-stone-100 shadow-inner">
                  {heroImage ? (
                    <img
                      src={heroImage}
                      alt="Preview"
                      className="aspect-video w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex aspect-video w-full items-center justify-center">
                      <div className="flex flex-col items-center gap-2 text-stone-400">
                        <Image className="h-12 w-12" />
                        <span className="text-sm">Nenhuma imagem selecionada</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Paleta de cores */}
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-white">
                3
              </span>
              <h2 className="flex items-center gap-2 text-base font-semibold text-stone-900">
                <Palette className="h-4 w-4 text-stone-500" />
                Paleta de cores
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-stretch gap-8 sm:flex-row sm:justify-between sm:gap-6">
                <div className="flex-1">
                  <ColorPickerCard
                    label="Cor primária"
                    value={colorPrimary}
                    onChange={setColorPrimary}
                  />
                </div>
                <div className="flex-1">
                  <ColorPickerCard
                    label="Cor de destaque"
                    value={colorAccent}
                    onChange={setColorAccent}
                  />
                </div>
                <div className="flex-1">
                  <ColorPickerCard
                    label="Cor do CTA"
                    value={colorCta}
                    onChange={setColorCta}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Usuário do fotógrafo */}
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-white">
                4
              </span>
              <h2 className="flex items-center gap-2 text-base font-semibold text-stone-900">
                <Key className="h-4 w-4 text-stone-500" />
                Acesso do fotógrafo
              </h2>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                Recomendado
              </span>
            </div>
            <div className="space-y-5 p-6">
              <p className="text-sm text-stone-500">
                Crie um login para que o fotógrafo acesse o painel e edite seu site em <code className="rounded bg-stone-100 px-1.5 py-0.5 text-xs font-mono text-stone-700">/panel</code>. Ele poderá alterar a senha depois.
              </p>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-stone-700">
                  <User className="h-4 w-4 text-stone-500" />
                  Nome do usuário
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200"
                  placeholder="Ex: Álvaro Bertoni"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-stone-700">
                  <Mail className="h-4 w-4 text-stone-500" />
                  Email de acesso
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200"
                  placeholder="fotografo@email.com"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-stone-700">
                  <Key className="h-4 w-4 text-stone-500" />
                  Senha inicial
                </label>
                <input
                  type="text"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200"
                  placeholder="Ex: 123456"
                />
                <p className="mt-1.5 text-xs text-stone-500">
                  Passe esta senha ao fotógrafo. Ele poderá alterar depois em /panel/senha
                </p>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-stone-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Criar Tenant
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
