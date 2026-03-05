"use client";

import { usePanelContext } from "./layout";
import {
  Image,
  Layers,
  BookOpen,
  ExternalLink,
  Camera,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

function SkeletonDash() {
  return (
    <div className="space-y-6 p-6">
      <div className="h-8 w-48 animate-pulse rounded bg-stone-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl border border-stone-200 bg-white"
          />
        ))}
      </div>
    </div>
  );
}

export default function PanelDashboard() {
  const { tenant, userName, loading } = usePanelContext();

  if (loading || !tenant) return <SkeletonDash />;

  const photoCount = tenant.photos?.length ?? 0;
  const maxPhotos = tenant.maxPhotos;
  const photoPercent = Math.round((photoCount / maxPhotos) * 100);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-900">
            Olá, {userName || tenant.name}
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Bem-vindo ao painel de gerenciamento do seu site
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-stone-500">
              <Image className="h-4 w-4" />
              <span className="text-sm font-medium">Fotos</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-stone-900">
              {photoCount}
              <span className="text-sm font-normal text-stone-400">
                /{maxPhotos}
              </span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-100">
              <div
                className={`h-full rounded-full transition-all ${
                  photoPercent >= 90
                    ? "bg-amber-500"
                    : photoPercent >= 70
                    ? "bg-amber-400"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min(photoPercent, 100)}%` }}
              />
            </div>
          </div>

          <Link
            href="/panel/series"
            className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-stone-500">
              <Layers className="h-4 w-4" />
              <span className="text-sm font-medium">Séries</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-stone-900">—</p>
          </Link>

          <Link
            href="/panel/ensaios"
            className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-stone-500">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Ensaios</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-stone-900">—</p>
          </Link>

          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-stone-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Status</span>
            </div>
            <p
              className={`mt-2 text-lg font-bold ${
                tenant.active ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {tenant.active ? "Ativo" : "Inativo"}
            </p>
          </div>
        </div>

        {/* Quick links */}
        <h2 className="mb-4 text-lg font-semibold text-stone-900">
          Acesso rápido
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/panel/perfil"
            className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100">
              <Camera className="h-5 w-5 text-stone-600" />
            </div>
            <div>
              <p className="font-medium text-stone-900">Editar Perfil</p>
              <p className="text-sm text-stone-500">
                Nome, contato, redes sociais
              </p>
            </div>
          </Link>

          <Link
            href="/panel/fotos"
            className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100">
              <Image className="h-5 w-5 text-stone-600" />
            </div>
            <div>
              <p className="font-medium text-stone-900">Gerenciar Fotos</p>
              <p className="text-sm text-stone-500">
                Adicionar, editar e organizar
              </p>
            </div>
          </Link>

          {tenant.domain && (
            <a
              href={`https://${tenant.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100">
                <ExternalLink className="h-5 w-5 text-stone-600" />
              </div>
              <div>
                <p className="font-medium text-stone-900">Ver meu site</p>
                <p className="text-sm text-stone-500">{tenant.domain}</p>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
