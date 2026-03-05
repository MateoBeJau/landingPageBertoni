"use client";

import { useEffect, useState } from "react";
import { usePanelContext } from "../layout";
import { Layers, Plus, Pencil, Trash2, Upload, X } from "lucide-react";

const inputClass =
  "w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-shadow";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Series = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  cover: string;
  order: number;
  active: boolean;
};

export default function PanelSeriesPage() {
  const { loading: ctxLoading, showToast, handleUpload } = usePanelContext();
  const [items, setItems] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    subtitle: "",
    description: "",
    cover: "",
    order: 0,
  });

  async function loadItems() {
    const res = await fetch("/api/panel/series");
    if (res.ok) {
      const data = await res.json();
      setItems(data.series ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!ctxLoading) loadItems();
  }, [ctxLoading]);

  function resetForm() {
    setForm({ title: "", slug: "", subtitle: "", description: "", cover: "", order: items.length });
  }

  function openNew() {
    setEditingId(null);
    resetForm();
    setShowForm(true);
  }

  function openEdit(item: Series) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      slug: item.slug,
      subtitle: item.subtitle,
      description: item.description,
      cover: item.cover,
      order: item.order,
    });
    setShowForm(true);
  }

  function close() {
    setShowForm(false);
    setEditingId(null);
    resetForm();
  }

  async function handleCreate() {
    if (!form.title || !form.slug) {
      showToast("error", "Preencha título e slug");
      return;
    }
    try {
      const res = await fetch("/api/panel/series", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { showToast("error", data.error || "Erro ao criar"); return; }
      showToast("success", "Série criada!");
      close();
      await loadItems();
    } catch { showToast("error", "Erro de conexão"); }
  }

  async function handleUpdate() {
    if (!editingId) return;
    try {
      const res = await fetch(`/api/panel/series/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, active: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { showToast("error", data.error || "Erro ao atualizar"); return; }
      showToast("success", "Série atualizada!");
      close();
      await loadItems();
    } catch { showToast("error", "Erro de conexão"); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir esta série?")) return;
    try {
      const res = await fetch(`/api/panel/series/${id}`, { method: "DELETE" });
      if (!res.ok) { showToast("error", "Erro ao excluir"); return; }
      showToast("success", "Série excluída!");
      await loadItems();
    } catch { showToast("error", "Erro de conexão"); }
  }

  if (loading || ctxLoading) {
    return (
      <div className="p-6">
        <div className="h-96 animate-pulse rounded-xl border border-stone-200 bg-white" />
      </div>
    );
  }

  const panelOpen = showForm || !!editingId;
  const isEditing = !!editingId;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-900">Séries</h1>
            <p className="text-sm text-stone-500">{items.length} séries</p>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:bg-stone-800"
          >
            <Plus className="h-4 w-4" />
            Nova Série
          </button>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
          {items.length === 0 ? (
            <div className="py-16 text-center text-stone-500">
              <Layers className="mx-auto mb-3 h-12 w-12 opacity-50" />
              <p className="text-sm font-medium">Nenhuma série ainda</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-stone-50">
                  {item.cover && (
                    <img src={item.cover} alt="" className="h-14 w-14 shrink-0 rounded-lg border border-stone-200 object-cover" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-stone-900">{item.title}</p>
                    <p className="truncate text-sm text-stone-500">{item.subtitle}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button onClick={() => openEdit(item)} className="rounded-lg p-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-700">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {panelOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={close} />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-4">
              <h3 className="text-lg font-semibold text-stone-900">
                {isEditing ? "Editar Série" : "Nova Série"}
              </h3>
              <button onClick={close} className="rounded-lg p-2 text-stone-600 hover:bg-stone-200">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Título</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={`${inputClass} font-mono`} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Subtítulo</label>
                <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Descrição</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass} rows={3} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Capa</label>
                <div className="flex gap-2">
                  <input value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} className={inputClass} placeholder="URL da imagem" />
                  <label className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg bg-stone-200 px-3 py-2 text-xs font-medium hover:bg-stone-300">
                    <Upload className="h-3.5 w-3.5" />
                    Upload
                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const url = await handleUpload(f);
                      if (url) setForm({ ...form, cover: url });
                      e.target.value = "";
                    }} />
                  </label>
                </div>
                {form.cover && (
                  <div className="mt-2 h-24 w-24 overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
                    <img src={form.cover} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Ordem</label>
                <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className={`${inputClass} w-24`} />
              </div>
            </div>
            <div className="flex gap-3 border-t border-stone-200 bg-stone-50 p-5">
              <button onClick={isEditing ? handleUpdate : handleCreate} className="flex-1 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800">
                {isEditing ? "Salvar alterações" : "Criar série"}
              </button>
              <button onClick={close} className="rounded-lg bg-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-300">
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
