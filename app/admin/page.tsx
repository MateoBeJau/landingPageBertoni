"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Globe,
  Image,
  Layers,
  Users,
  Activity,
  Search,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  Trash2,
  UserCheck,
} from "lucide-react";

type Tenant = {
  id: string;
  slug: string;
  domain: string | null;
  name: string;
  active: boolean;
  maxPhotos: number;
  createdAt: string;
  _count: { photos: number; series: number; ensaios: number; users: number };
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatCard({
  icon: Icon,
  label,
  value,
  color = "text-stone-900",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-stone-500">
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className={`mt-2 text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="h-4 w-20 animate-pulse rounded bg-stone-200" />
      <div className="mt-2 h-8 w-16 animate-pulse rounded bg-stone-200" />
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-200 bg-stone-50 px-4 py-3">
        <div className="h-4 w-32 animate-pulse rounded bg-stone-200" />
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b border-stone-100 px-4 py-4 last:border-0"
        >
          <div className="h-3 w-3 shrink-0 animate-pulse rounded-full bg-stone-200" />
          <div className="h-4 flex-1 animate-pulse rounded bg-stone-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-stone-200" />
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function init() {
      const authRes = await fetch("/api/admin/auth");
      if (!authRes.ok) {
        window.location.href = "/admin/login";
        return;
      }
      setAuthChecked(true);

      const tenantsRes = await fetch("/api/admin/tenants");
      if (!tenantsRes.ok) {
        setLoading(false);
        return;
      }
      const data = await tenantsRes.json();
      setTenants(data.tenants ?? []);
      setLoading(false);
    }
    init();
  }, []);

  async function handleToggleActive(tenant: Tenant) {
    const res = await fetch(`/api/admin/tenants/${tenant.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !tenant.active }),
    });
    if (res.ok) {
      setTenants((prev) =>
        prev.map((t) =>
          t.id === tenant.id ? { ...t, active: !t.active } : t
        )
      );
    }
  }

  async function handleDelete(tenant: Tenant) {
    if (
      !confirm(
        `Excluir "${tenant.name}"? Esta ação é irreversível e removerá todas as fotos, séries e ensaios.`
      )
    )
      return;
    const res = await fetch(`/api/admin/tenants/${tenant.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTenants((prev) => prev.filter((t) => t.id !== tenant.id));
    }
  }

  const totalAtivos = tenants.filter((t) => t.active).length;
  const totalInativos = tenants.filter((t) => !t.active).length;
  const totalFotos = tenants.reduce((acc, t) => acc + t._count.photos, 0);
  const totalUsers = tenants.reduce((acc, t) => acc + t._count.users, 0);

  const filtered = tenants.filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q) ||
      (t.domain && t.domain.toLowerCase().includes(q))
    );
  });

  if (!authChecked && loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
          <span className="text-sm text-stone-500">
            Verificando autenticação...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
              <p className="mt-1 text-sm text-stone-500">
                Gerencie todos os tenants da plataforma
              </p>
            </div>
            <Link
              href="/admin/tenants/new"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-stone-800"
            >
              <Plus className="h-4 w-4" />
              Novo Tenant
            </Link>
          </div>

          {loading ? (
            <>
              <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StatCardSkeleton key={i} />
                ))}
              </div>
              <TableSkeleton />
            </>
          ) : (
            <>
              <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <StatCard
                  icon={Users}
                  label="Total Tenants"
                  value={tenants.length}
                />
                <StatCard
                  icon={Activity}
                  label="Ativos"
                  value={totalAtivos}
                  color="text-emerald-600"
                />
                <StatCard
                  icon={Activity}
                  label="Inativos"
                  value={totalInativos}
                  color="text-red-500"
                />
                <StatCard
                  icon={Image}
                  label="Total Fotos"
                  value={totalFotos}
                />
                <StatCard
                  icon={UserCheck}
                  label="Total Usuários"
                  value={totalUsers}
                />
              </div>

              {tenants.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-stone-200 bg-white py-20 shadow-sm">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-100">
                    <Users className="h-10 w-10 text-stone-400" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-stone-900">
                    Nenhum tenant cadastrado
                  </h3>
                  <p className="mt-2 max-w-sm text-center text-sm text-stone-500">
                    Comece criando seu primeiro tenant para gerenciar fotos,
                    séries e ensaios.
                  </p>
                  <Link
                    href="/admin/tenants/new"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-stone-800"
                  >
                    <Plus className="h-4 w-4" />
                    Novo Tenant
                  </Link>
                </div>
              ) : (
                <>
                  {/* Search bar */}
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-stone-900">
                      Tenants
                    </h2>
                    <div className="relative w-full max-w-xs">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Buscar por nome, slug ou domínio..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-stone-300 py-2.5 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-stone-500"
                      />
                    </div>
                  </div>

                  {/* Desktop table */}
                  <div className="hidden overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm md:block">
                    <table className="w-full min-w-[800px]">
                      <thead>
                        <tr className="border-b border-stone-200 bg-stone-50">
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                            Nome
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                            Slug
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                            Domínio
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                            Fotos
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                            Séries
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                            Ensaios
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                            Usuários
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                            Criado em
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-stone-500">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((tenant) => (
                          <tr
                            key={tenant.id}
                            className="border-b border-stone-100 transition-colors last:border-0 hover:bg-stone-50"
                          >
                            <td className="px-4 py-4">
                              <span
                                className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${
                                  tenant.active
                                    ? "bg-emerald-500"
                                    : "bg-red-500"
                                }`}
                                title={tenant.active ? "Ativo" : "Inativo"}
                              />
                            </td>
                            <td className="px-4 py-4">
                              <Link
                                href={`/admin/tenants/${tenant.id}`}
                                className="font-medium text-stone-900 hover:underline"
                              >
                                {tenant.name}
                              </Link>
                            </td>
                            <td className="px-4 py-4">
                              <span className="font-mono text-sm text-stone-600">
                                /{tenant.slug}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className="flex items-center gap-1.5 text-sm text-stone-600">
                                <Globe className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                                {tenant.domain || "—"}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className="flex items-center gap-1.5 text-sm text-stone-600">
                                <Image className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                                {tenant._count.photos}/{tenant.maxPhotos}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className="flex items-center gap-1.5 text-sm text-stone-600">
                                <Layers className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                                {tenant._count.series}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className="flex items-center gap-1.5 text-sm text-stone-600">
                                <Layers className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                                {tenant._count.ensaios}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className="flex items-center gap-1.5 text-sm text-stone-600">
                                <Users className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                                {tenant._count.users}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-stone-500">
                              {formatDate(tenant.createdAt)}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center justify-end gap-1">
                                <Link
                                  href={`/admin/tenants/${tenant.id}`}
                                  className="rounded-lg p-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-700"
                                  title="Editar"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleActive(tenant);
                                  }}
                                  className={`rounded-lg p-1.5 transition-colors ${
                                    tenant.active
                                      ? "text-emerald-600 hover:bg-emerald-50"
                                      : "text-stone-400 hover:bg-stone-100"
                                  }`}
                                  title={
                                    tenant.active ? "Desativar" : "Ativar"
                                  }
                                >
                                  {tenant.active ? (
                                    <ToggleRight className="h-4 w-4" />
                                  ) : (
                                    <ToggleLeft className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(tenant);
                                  }}
                                  className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700"
                                  title="Excluir"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filtered.length === 0 && (
                          <tr>
                            <td
                              colSpan={10}
                              className="px-4 py-12 text-center text-sm text-stone-500"
                            >
                              Nenhum tenant encontrado para &ldquo;
                              {searchQuery}&rdquo;
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards */}
                  <div className="space-y-3 md:hidden">
                    {filtered.map((tenant) => (
                      <div
                        key={tenant.id}
                        className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${
                                  tenant.active
                                    ? "bg-emerald-500"
                                    : "bg-red-500"
                                }`}
                              />
                              <Link
                                href={`/admin/tenants/${tenant.id}`}
                                className="font-semibold text-stone-900 hover:underline"
                              >
                                {tenant.name}
                              </Link>
                            </div>
                            <p className="mt-0.5 font-mono text-xs text-stone-500">
                              /{tenant.slug}
                            </p>
                            {tenant.domain && (
                              <p className="mt-0.5 flex items-center gap-1 text-xs text-stone-500">
                                <Globe className="h-3 w-3" />
                                {tenant.domain}
                              </p>
                            )}
                          </div>
                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              onClick={() => handleToggleActive(tenant)}
                              className={`rounded-lg p-1.5 ${
                                tenant.active
                                  ? "text-emerald-600"
                                  : "text-stone-400"
                              }`}
                            >
                              {tenant.active ? (
                                <ToggleRight className="h-4 w-4" />
                              ) : (
                                <ToggleLeft className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(tenant)}
                              className="rounded-lg p-1.5 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-3 text-xs text-stone-500">
                          <span className="flex items-center gap-1">
                            <Image className="h-3 w-3" />
                            {tenant._count.photos}/{tenant.maxPhotos}
                          </span>
                          <span className="flex items-center gap-1">
                            <Layers className="h-3 w-3" />
                            {tenant._count.series} séries
                          </span>
                          <span className="flex items-center gap-1">
                            <Layers className="h-3 w-3" />
                            {tenant._count.ensaios} ensaios
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {tenant._count.users}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3">
                          <span className="text-xs text-stone-400">
                            {formatDate(tenant.createdAt)}
                          </span>
                          <Link
                            href={`/admin/tenants/${tenant.id}`}
                            className="flex items-center gap-1 text-xs font-medium text-stone-700 hover:text-stone-900"
                          >
                            Editar
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                    {filtered.length === 0 && (
                      <div className="py-12 text-center text-sm text-stone-500">
                        Nenhum tenant encontrado
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
