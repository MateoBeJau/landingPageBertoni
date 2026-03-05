"use client";

import { useState } from "react";
import { usePanelContext } from "../layout";
import {
  Image,
  Plus,
  Pencil,
  Trash2,
  Upload,
  X,
  AlertTriangle,
} from "lucide-react";

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

type Photo = {
  id: string;
  title: string;
  slug: string;
  location: string;
  year: number;
  description: string | null;
  category: string | null;
  imageSrc: string;
  imageThumb: string;
  price: string | null;
  format: string | null;
  printType: string | null;
  order: number;
};

export default function PanelFotosPage() {
  const { tenant, loading, reload, showToast, handleUpload } =
    usePanelContext();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [photoForm, setPhotoForm] = useState({
    title: "",
    slug: "",
    location: "",
    year: new Date().getFullYear(),
    description: "",
    category: "",
    imageSrc: "",
    imageThumb: "",
    price: "",
    format: "",
    printType: "",
    order: 0,
  });

  if (loading || !tenant) {
    return (
      <div className="p-6">
        <div className="h-96 animate-pulse rounded-xl border border-stone-200 bg-white" />
      </div>
    );
  }

  const photoCount = tenant.photos?.length ?? 0;
  const maxPhotos = tenant.maxPhotos;
  const isAtLimit = photoCount >= maxPhotos;
  const categoriesFromTenant = (tenant.categories || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const categoriesFromPhotos = (tenant?.photos ?? [])
    .map((p) => p.category)
    .filter((c): c is string => !!c?.trim());
  const categoriesList = [...new Set([...categoriesFromTenant, ...categoriesFromPhotos])].sort();

  function resetForm() {
    setPhotoForm({
      title: "",
      slug: "",
      location: "",
      year: new Date().getFullYear(),
      description: "",
      category: "",
      imageSrc: "",
      imageThumb: "",
      price: "",
      format: "",
      printType: "",
      order: tenant?.photos?.length ?? 0,
    });
  }

  function openNew() {
    setEditingId(null);
    resetForm();
    setShowForm(true);
  }

  function openEdit(photo: Photo) {
    setEditingId(photo.id);
    setPhotoForm({
      title: photo.title,
      slug: photo.slug,
      location: photo.location,
      year: photo.year,
      description: photo.description ?? "",
      category: photo.category ?? "",
      imageSrc: photo.imageSrc,
      imageThumb: photo.imageThumb,
      price: photo.price ?? "",
      format: photo.format ?? "",
      printType: photo.printType ?? "",
      order: photo.order,
    });
    setShowForm(true);
  }

  function close() {
    setShowForm(false);
    setEditingId(null);
    resetForm();
  }

  async function handleCreate() {
    if (!photoForm.title || !photoForm.slug || !photoForm.imageSrc) {
      showToast("error", "Preencha título, slug e imagem");
      return;
    }
    try {
      const res = await fetch("/api/panel/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...photoForm,
          description: photoForm.description || null,
          category: photoForm.category || null,
          price: photoForm.price || null,
          format: photoForm.format || null,
          printType: photoForm.printType || null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast("error", data.error || "Erro ao criar foto");
        return;
      }
      showToast("success", "Foto criada!");
      close();
      await reload();
    } catch {
      showToast("error", "Erro de conexão");
    }
  }

  async function handleUpdate() {
    if (!editingId) return;
    try {
      const res = await fetch(`/api/panel/photos/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...photoForm,
          description: photoForm.description || null,
          category: photoForm.category || null,
          price: photoForm.price || null,
          format: photoForm.format || null,
          printType: photoForm.printType || null,
          active: true,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast("error", data.error || "Erro ao atualizar foto");
        return;
      }
      showToast("success", "Foto atualizada!");
      close();
      await reload();
    } catch {
      showToast("error", "Erro de conexão");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir esta foto?")) return;
    try {
      const res = await fetch(`/api/panel/photos/${id}`, { method: "DELETE" });
      if (!res.ok) {
        showToast("error", "Erro ao excluir foto");
        return;
      }
      showToast("success", "Foto excluída!");
      await reload();
    } catch {
      showToast("error", "Erro de conexão");
    }
  }

  const panelOpen = showForm || !!editingId;
  const isEditing = !!editingId;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-900">Fotos</h1>
            <p className="text-sm text-stone-500">
              {photoCount}/{maxPhotos} fotos
            </p>
          </div>
          <button
            onClick={openNew}
            disabled={isAtLimit}
            className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Adicionar Foto
          </button>
        </div>

        {isAtLimit && (
          <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-medium text-amber-900">
                Limite de fotos atingido ({photoCount}/{maxPhotos})
              </p>
              <p className="mt-0.5 text-sm text-amber-700">
                Entre em contato com o administrador para aumentar seu limite.
              </p>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {tenant.photos?.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative overflow-hidden rounded-xl border border-stone-200 bg-stone-50 transition-colors hover:border-stone-300"
                >
                  <div className="relative aspect-square bg-stone-200">
                    <img
                      src={photo.imageThumb || photo.imageSrc || "/placeholder.svg"}
                      alt={photo.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => openEdit(photo)}
                        className="rounded-lg bg-white/90 p-1.5 text-stone-600 shadow-sm transition-colors hover:bg-white hover:text-stone-900"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(photo.id)}
                        className="rounded-lg bg-white/90 p-1.5 text-red-600 shadow-sm transition-colors hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-medium text-stone-900">
                      {photo.title}
                    </p>
                    <p className="truncate text-xs text-stone-500">
                      {photo.category || "—"} · R$ {photo.price || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {(!tenant.photos || tenant.photos.length === 0) && (
              <div className="py-12 text-center text-stone-500">
                <Image className="mx-auto mb-3 h-12 w-12 opacity-50" />
                <p className="text-sm font-medium">Nenhuma foto ainda</p>
                <p className="mt-1 text-xs">
                  Clique em &quot;Adicionar Foto&quot; para começar
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo slide-over panel */}
      {panelOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={close}
          />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-4">
              <h3 className="text-lg font-semibold text-stone-900">
                {isEditing ? "Editar Foto" : "Nova Foto"}
              </h3>
              <button
                onClick={close}
                className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Título
                </label>
                <input
                  value={photoForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setPhotoForm({
                      ...photoForm,
                      title,
                      slug: slugify(title),
                    });
                  }}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Slug
                </label>
                <input
                  value={photoForm.slug}
                  onChange={(e) =>
                    setPhotoForm({ ...photoForm, slug: e.target.value })
                  }
                  className={`${inputClass} font-mono text-sm`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700">
                    Local
                  </label>
                  <input
                    value={photoForm.location}
                    onChange={(e) =>
                      setPhotoForm({ ...photoForm, location: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700">
                    Ano
                  </label>
                  <input
                    type="number"
                    value={photoForm.year}
                    onChange={(e) =>
                      setPhotoForm({
                        ...photoForm,
                        year: parseInt(e.target.value) || 0,
                      })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Descrição
                </label>
                <textarea
                  value={photoForm.description ?? ""}
                  onChange={(e) =>
                    setPhotoForm({ ...photoForm, description: e.target.value })
                  }
                  className={inputClass}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700">
                    Categoria
                  </label>
                  <select
                    value={photoForm.category}
                    onChange={(e) =>
                      setPhotoForm({ ...photoForm, category: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">—</option>
                    {categoriesList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700">
                    Ordem
                  </label>
                  <input
                    type="number"
                    value={photoForm.order}
                    onChange={(e) =>
                      setPhotoForm({
                        ...photoForm,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Imagem
                </label>
                <div className="flex gap-2">
                  <input
                    value={photoForm.imageSrc}
                    onChange={(e) =>
                      setPhotoForm({
                        ...photoForm,
                        imageSrc: e.target.value,
                        imageThumb: e.target.value,
                      })
                    }
                    className={inputClass}
                    placeholder="URL da imagem ou faça upload"
                  />
                  <label className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg bg-stone-200 px-3 py-2 text-xs font-medium hover:bg-stone-300">
                    <Upload className="h-3.5 w-3.5" />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        const url = await handleUpload(f);
                        if (url)
                          setPhotoForm({
                            ...photoForm,
                            imageSrc: url,
                            imageThumb: url,
                          });
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
                {photoForm.imageSrc && (
                  <div className="mt-2 h-24 w-24 overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
                    <img
                      src={photoForm.imageSrc}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700">
                    Preço
                  </label>
                  <input
                    value={photoForm.price}
                    onChange={(e) =>
                      setPhotoForm({ ...photoForm, price: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700">
                    Formato
                  </label>
                  <input
                    value={photoForm.format}
                    onChange={(e) =>
                      setPhotoForm({ ...photoForm, format: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700">
                    Tipo impressão
                  </label>
                  <input
                    value={photoForm.printType}
                    onChange={(e) =>
                      setPhotoForm({ ...photoForm, printType: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 border-t border-stone-200 bg-stone-50 p-5">
              <button
                onClick={isEditing ? handleUpdate : handleCreate}
                className="flex-1 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
              >
                {isEditing ? "Salvar alterações" : "Criar foto"}
              </button>
              <button
                onClick={close}
                className="rounded-lg bg-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
