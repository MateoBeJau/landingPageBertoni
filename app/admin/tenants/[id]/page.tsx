"use client";

import { use, useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import CategoryTags from "@/components/CategoryTags";
import {
  Settings,
  Palette,
  FileText,
  Image,
  Plus,
  Pencil,
  Trash2,
  Upload,
  CheckCircle,
  XCircle,
  X,
  Globe,
  Phone,
  Mail,
  Instagram,
  Facebook,
  BarChart3,
  Tag,
  Search,
  ChevronLeft,
  Users,
  UserPlus,
  ImageIcon,
  Layers,
  BookOpen,
  ExternalLink,
} from "lucide-react";

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

type TenantUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

type Tenant = {
  id: string;
  slug: string;
  domain: string | null;
  name: string;
  subtitle: string;
  whatsappNumber: string;
  email: string | null;
  maxPhotos: number;
  colorPrimary: string;
  colorAccent: string;
  colorCta: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImage: string;
  aboutTitle: string | null;
  aboutText1: string | null;
  aboutText2: string | null;
  aboutText3: string | null;
  aboutImage: string | null;
  contactTitle: string;
  contactText: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
  categories: string;
  instagramUrl: string | null;
  facebookUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  active: boolean;
  photos: Photo[];
  users: TenantUser[];
};

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

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 bg-stone-50 border-b border-stone-200">
        <Icon className="w-4 h-4 text-stone-600 shrink-0" />
        <h2 className="text-sm font-semibold text-stone-800">{title}</h2>
      </div>
      <div className="divide-y divide-stone-100">
        {children}
      </div>
    </div>
  );
}

function FieldRow({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-5 py-4 ${className}`}>
      <label className="block text-sm font-medium text-stone-700 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const hex = value || "#000000";
  return (
    <div className="px-5 py-4">
      <label className="block text-sm font-medium text-stone-700 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <div className="relative w-20 h-20 rounded-xl border-2 border-stone-200 overflow-hidden shadow-inner shrink-0 group">
          <input
            type="color"
            value={hex}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
          />
          <div
            className="w-full h-full"
            style={{ backgroundColor: hex }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-mono text-white font-medium drop-shadow">
              {hex}
            </span>
          </div>
        </div>
        <input
          type="text"
          value={hex}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} flex-1 max-w-[140px] font-mono text-sm`}
        />
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="h-14 bg-stone-900 animate-pulse" />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-stone-200 p-6 animate-pulse"
            >
              <div className="h-4 bg-stone-200 rounded w-1/4 mb-4" />
              <div className="space-y-3">
                <div className="h-10 bg-stone-100 rounded-lg" />
                <div className="h-10 bg-stone-100 rounded-lg" />
                <div className="h-10 bg-stone-100 rounded-lg w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function ToastWithProgress({
  type,
  message,
  onDismiss,
  duration = 4000,
}: {
  type: "success" | "error";
  message: string;
  onDismiss: () => void;
  duration?: number;
}) {
  const [progress, setProgress] = useState(100);
  const Icon = type === "success" ? CheckCircle : XCircle;

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onDismiss();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [duration, onDismiss]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-start gap-3 min-w-[320px] max-w-md p-4 rounded-xl shadow-xl border ${
        type === "success"
          ? "bg-white border-emerald-200"
          : "bg-white border-red-200"
      }`}
    >
      <Icon
        className={`w-6 h-6 shrink-0 ${
          type === "success" ? "text-emerald-600" : "text-red-600"
        }`}
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            type === "success" ? "text-emerald-900" : "text-red-900"
          }`}
        >
          {message}
        </p>
        <div className="mt-2 h-1 bg-stone-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-75 ${
              type === "success" ? "bg-emerald-500" : "bg-red-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition-colors"
        aria-label="Fechar"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function TenantEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [form, setForm] = useState<Partial<Tenant>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"geral" | "aparencia" | "conteudo" | "fotos" | "series" | "ensaios" | "usuarios">("geral");
  const [showUserForm, setShowUserForm] = useState(false);
  const [userForm, setUserForm] = useState({ name: "", email: "", password: "" });
  const [photoForm, setPhotoForm] = useState<Partial<Photo> & { tenantId: string }>({
    tenantId: "",
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

  const showToast = useCallback((type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const loadTenant = useCallback(async () => {
    if (!id) return;
    const res = await fetch(`/api/admin/tenants/${id}`);
    if (!res.ok) return;
    const data = await res.json();
    const t = data.tenant as Tenant;
    setTenant(t);
    setForm({
      slug: t.slug,
      domain: t.domain ?? "",
      name: t.name,
      subtitle: t.subtitle,
      whatsappNumber: t.whatsappNumber,
      email: t.email ?? "",
      active: t.active,
      colorPrimary: t.colorPrimary,
      colorAccent: t.colorAccent,
      colorCta: t.colorCta,
      heroTitle: t.heroTitle,
      heroSubtitle: t.heroSubtitle,
      heroBadge: t.heroBadge,
      heroImage: t.heroImage,
      aboutTitle: t.aboutTitle ?? "",
      aboutText1: t.aboutText1 ?? "",
      aboutText2: t.aboutText2 ?? "",
      aboutText3: t.aboutText3 ?? "",
      aboutImage: t.aboutImage ?? "",
      contactTitle: t.contactTitle,
      contactText: t.contactText,
      stat1Value: t.stat1Value,
      stat1Label: t.stat1Label,
      stat2Value: t.stat2Value,
      stat2Label: t.stat2Label,
      stat3Value: t.stat3Value,
      stat3Label: t.stat3Label,
      stat4Value: t.stat4Value,
      stat4Label: t.stat4Label,
      categories: t.categories,
      instagramUrl: t.instagramUrl ?? "",
      facebookUrl: t.facebookUrl ?? "",
      metaTitle: t.metaTitle ?? "",
      metaDescription: t.metaDescription ?? "",
    });
  }, [id]);

  const hasUnsavedChanges = useMemo(() => {
    if (!tenant) return false;
    const t = tenant;
    return (
      form.slug !== t.slug ||
      (form.domain ?? "") !== (t.domain ?? "") ||
      form.name !== t.name ||
      form.subtitle !== t.subtitle ||
      form.whatsappNumber !== t.whatsappNumber ||
      (form.email ?? "") !== (t.email ?? "") ||
      form.active !== t.active ||
      form.colorPrimary !== t.colorPrimary ||
      form.colorAccent !== t.colorAccent ||
      form.colorCta !== t.colorCta ||
      form.heroTitle !== t.heroTitle ||
      form.heroSubtitle !== t.heroSubtitle ||
      form.heroBadge !== t.heroBadge ||
      form.heroImage !== t.heroImage ||
      (form.aboutTitle ?? "") !== (t.aboutTitle ?? "") ||
      (form.aboutText1 ?? "") !== (t.aboutText1 ?? "") ||
      (form.aboutText2 ?? "") !== (t.aboutText2 ?? "") ||
      (form.aboutText3 ?? "") !== (t.aboutText3 ?? "") ||
      (form.aboutImage ?? "") !== (t.aboutImage ?? "") ||
      form.contactTitle !== t.contactTitle ||
      form.contactText !== t.contactText ||
      form.stat1Value !== t.stat1Value ||
      form.stat1Label !== t.stat1Label ||
      form.stat2Value !== t.stat2Value ||
      form.stat2Label !== t.stat2Label ||
      form.stat3Value !== t.stat3Value ||
      form.stat3Label !== t.stat3Label ||
      form.stat4Value !== t.stat4Value ||
      form.stat4Label !== t.stat4Label ||
      form.categories !== t.categories ||
      (form.instagramUrl ?? "") !== (t.instagramUrl ?? "") ||
      (form.facebookUrl ?? "") !== (t.facebookUrl ?? "") ||
      (form.metaTitle ?? "") !== (t.metaTitle ?? "") ||
      (form.metaDescription ?? "") !== (t.metaDescription ?? "")
    );
  }, [tenant, form]);

  useEffect(() => {
    async function init() {
      if (!id) return;
      const authRes = await fetch("/api/admin/auth");
      if (!authRes.ok) {
        window.location.href = "/admin/login";
        return;
      }
      setAuthChecked(true);

      const res = await fetch(`/api/admin/tenants/${id}`);
      if (!res.ok) {
        setError("Tenant não encontrado");
        setLoading(false);
        return;
      }
      const data = await res.json();
      const t = data.tenant as Tenant;
      setTenant(t);
      setForm({
        slug: t.slug,
        domain: t.domain ?? "",
        name: t.name,
        subtitle: t.subtitle,
        whatsappNumber: t.whatsappNumber,
        email: t.email ?? "",
        active: t.active,
        colorPrimary: t.colorPrimary,
        colorAccent: t.colorAccent,
        colorCta: t.colorCta,
        heroTitle: t.heroTitle,
        heroSubtitle: t.heroSubtitle,
        heroBadge: t.heroBadge,
        heroImage: t.heroImage,
        aboutTitle: t.aboutTitle ?? "",
        aboutText1: t.aboutText1 ?? "",
        aboutText2: t.aboutText2 ?? "",
        aboutText3: t.aboutText3 ?? "",
        aboutImage: t.aboutImage ?? "",
        contactTitle: t.contactTitle,
        contactText: t.contactText,
        stat1Value: t.stat1Value,
        stat1Label: t.stat1Label,
        stat2Value: t.stat2Value,
        stat2Label: t.stat2Label,
        stat3Value: t.stat3Value,
        stat3Label: t.stat3Label,
        stat4Value: t.stat4Value,
        stat4Label: t.stat4Label,
        categories: t.categories,
        instagramUrl: t.instagramUrl ?? "",
        facebookUrl: t.facebookUrl ?? "",
        metaTitle: t.metaTitle ?? "",
        metaDescription: t.metaDescription ?? "",
      });
      setLoading(false);
    }
    init();
  }, [id]);

  async function handleUpload(
    file: File,
    folder: string
  ): Promise<string | null> {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: fd,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url ?? null;
  }

  async function handleSave() {
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/tenants/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: form.slug,
          domain: form.domain || null,
          name: form.name,
          subtitle: form.subtitle,
          whatsappNumber: form.whatsappNumber,
          email: form.email || null,
          active: form.active,
          colorPrimary: form.colorPrimary,
          colorAccent: form.colorAccent,
          colorCta: form.colorCta,
          heroTitle: form.heroTitle,
          heroSubtitle: form.heroSubtitle,
          heroBadge: form.heroBadge,
          heroImage: form.heroImage,
          aboutTitle: form.aboutTitle || null,
          aboutText1: form.aboutText1 || null,
          aboutText2: form.aboutText2 || null,
          aboutText3: form.aboutText3 || null,
          aboutImage: form.aboutImage || null,
          contactTitle: form.contactTitle,
          contactText: form.contactText,
          stat1Value: form.stat1Value,
          stat1Label: form.stat1Label,
          stat2Value: form.stat2Value,
          stat2Label: form.stat2Label,
          stat3Value: form.stat3Value,
          stat3Label: form.stat3Label,
          stat4Value: form.stat4Value,
          stat4Label: form.stat4Label,
          categories: form.categories,
          instagramUrl: form.instagramUrl || null,
          facebookUrl: form.facebookUrl || null,
          metaTitle: form.metaTitle || null,
          metaDescription: form.metaDescription || null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast("error", data.error || "Erro ao salvar");
        return;
      }
      showToast("success", "Tenant salvo com sucesso!");
      setTenant(data.tenant);
    } catch {
      showToast("error", "Erro de conexão");
    } finally {
      setSaving(false);
    }
  }

  async function handleCreatePhoto() {
    if (!id || !tenant) return;
    if (!photoForm.title || !photoForm.slug || !photoForm.imageSrc) {
      showToast("error", "Preencha título, slug e imagem");
      return;
    }
    try {
      const res = await fetch("/api/admin/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantId: id,
          title: photoForm.title,
          slug: photoForm.slug,
          location: photoForm.location || "",
          year: photoForm.year ?? new Date().getFullYear(),
          description: photoForm.description || null,
          category: photoForm.category || null,
          imageSrc: photoForm.imageSrc,
          imageThumb: photoForm.imageThumb,
          price: photoForm.price || null,
          format: photoForm.format || null,
          printType: photoForm.printType || null,
          order: photoForm.order ?? 0,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast("error", data.error || "Erro ao criar foto");
        return;
      }
      showToast("success", "Foto criada!");
      setShowPhotoForm(false);
      setPhotoForm({
        tenantId: id,
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
        order: (tenant.photos?.length ?? 0),
      });
      await loadTenant();
    } catch {
      showToast("error", "Erro de conexão");
    }
  }

  async function handleUpdatePhoto(photoId: string) {
    const photo = tenant?.photos?.find((p) => p.id === photoId);
    if (!photo) return;
    try {
      const res = await fetch(`/api/admin/photos/${photoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: photoForm.title ?? photo.title,
          slug: photoForm.slug ?? photo.slug,
          location: photoForm.location ?? photo.location,
          year: photoForm.year ?? photo.year,
          description: photoForm.description ?? photo.description,
          category: photoForm.category ?? photo.category,
          imageSrc: photoForm.imageSrc ?? photo.imageSrc,
          imageThumb: photoForm.imageThumb ?? photo.imageThumb,
          price: photoForm.price ?? photo.price,
          format: photoForm.format ?? photo.format,
          printType: photoForm.printType ?? photo.printType,
          order: photoForm.order ?? photo.order,
          active: true,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast("error", data.error || "Erro ao atualizar foto");
        return;
      }
      showToast("success", "Foto atualizada!");
      setEditingPhotoId(null);
      setShowPhotoForm(false);
      setPhotoForm({
        tenantId: id!,
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
      await loadTenant();
    } catch {
      showToast("error", "Erro de conexão");
    }
  }

  async function handleDeletePhoto(photoId: string) {
    if (!confirm("Excluir esta foto?")) return;
    try {
      const res = await fetch(`/api/admin/photos/${photoId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        showToast("error", "Erro ao excluir foto");
        return;
      }
      showToast("success", "Foto excluída!");
      await loadTenant();
    } catch {
      showToast("error", "Erro de conexão");
    }
  }

  function openEditPhoto(photo: Photo) {
    setEditingPhotoId(photo.id);
    setPhotoForm({
      tenantId: id!,
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
    setShowPhotoForm(true);
  }

  function closePhotoPanel() {
    setShowPhotoForm(false);
    setEditingPhotoId(null);
    setPhotoForm({
      tenantId: id!,
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

  const categoriesFromTenant = (form.categories || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const categoriesFromPhotos = (tenant?.photos ?? [])
    .map((p) => p.category)
    .filter((c): c is string => !!c?.trim());
  const categoriesList = [...new Set([...categoriesFromTenant, ...categoriesFromPhotos])].sort();

  type SeriesItem = { id: string; title: string; slug: string; subtitle: string; description: string; cover: string; order: number; active: boolean; photos?: Array<{ title: string; location: string; year: number; imageSrc: string; imageThumb: string; order: number }> };
  type EnsaioItem = { id: string; title: string; slug: string; subtitle: string; description: string; cover: string; priceInfo: string; order: number; active: boolean };
  const [seriesList, setSeriesList] = useState<SeriesItem[]>([]);
  const [ensaiosList, setEnsaiosList] = useState<EnsaioItem[]>([]);
  const [showSeriesForm, setShowSeriesForm] = useState(false);
  const [editingSeriesId, setEditingSeriesId] = useState<string | null>(null);
  const [seriesForm, setSeriesForm] = useState({ title: "", slug: "", subtitle: "", description: "", cover: "", order: 0, active: true });
  const [seriesPhotos, setSeriesPhotos] = useState<Array<{ title: string; location: string; year: number; imageSrc: string; imageThumb: string }>>([]);
  const [showEnsaioForm, setShowEnsaioForm] = useState(false);
  const [editingEnsaioId, setEditingEnsaioId] = useState<string | null>(null);
  const [ensaioForm, setEnsaioForm] = useState({ title: "", slug: "", subtitle: "", description: "", cover: "", priceInfo: "Sob consulta", order: 0, active: true });

  const loadSeriesAndEnsaios = useCallback(async () => {
    if (!id) return;
    const r = await fetch(`/api/admin/tenants/${id}`);
    if (!r.ok) return;
    const d = await r.json();
    if (d.tenant?.series) setSeriesList(d.tenant.series);
    if (d.tenant?.ensaios) setEnsaiosList(d.tenant.ensaios);
  }, [id]);

  useEffect(() => {
    if (!id || !tenant) return;
    loadSeriesAndEnsaios();
  }, [id, tenant, loadSeriesAndEnsaios]);

  function openNewSeries() {
    setEditingSeriesId(null);
    setSeriesForm({ title: "", slug: "", subtitle: "", description: "", cover: "", order: seriesList.length, active: true });
    setSeriesPhotos([]);
    setShowSeriesForm(true);
  }
  function openEditSeries(s: SeriesItem) {
    setEditingSeriesId(s.id);
    setSeriesForm({ title: s.title, slug: s.slug, subtitle: s.subtitle, description: s.description, cover: s.cover, order: s.order, active: s.active });
    setSeriesPhotos((s.photos ?? []).map((p) => ({ title: p.title, location: p.location, year: p.year, imageSrc: p.imageSrc, imageThumb: p.imageThumb })));
    setShowSeriesForm(true);
  }
  function closeSeriesPanel() {
    setShowSeriesForm(false);
    setEditingSeriesId(null);
    setSeriesPhotos([]);
  }
  async function handleCreateSeries() {
    if (!seriesForm.title || !seriesForm.slug) { showToast("error", "Preencha título e slug"); return; }
    const photos = seriesPhotos.filter((p) => p.imageSrc || p.imageThumb).map((p) => ({ title: p.title || "Foto", location: p.location || "", year: p.year || new Date().getFullYear(), imageSrc: p.imageSrc || p.imageThumb, imageThumb: p.imageThumb || p.imageSrc }));
    try {
      const res = await fetch("/api/admin/series", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantId: id, ...seriesForm, photos }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { showToast("error", data.error || "Erro ao criar série"); return; }
      showToast("success", "Série criada!");
      closeSeriesPanel();
      await loadSeriesAndEnsaios();
    } catch { showToast("error", "Erro de conexão"); }
  }
  async function handleUpdateSeries() {
    if (!editingSeriesId) return;
    const photos = seriesPhotos.filter((p) => p.imageSrc || p.imageThumb).map((p) => ({ title: p.title || "Foto", location: p.location || "", year: p.year || new Date().getFullYear(), imageSrc: p.imageSrc || p.imageThumb, imageThumb: p.imageThumb || p.imageSrc }));
    try {
      const res = await fetch(`/api/admin/series/${editingSeriesId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...seriesForm, photos }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { showToast("error", data.error || "Erro ao atualizar série"); return; }
      showToast("success", "Série atualizada!");
      closeSeriesPanel();
      await loadSeriesAndEnsaios();
    } catch { showToast("error", "Erro de conexão"); }
  }
  async function handleDeleteSeries(seriesId: string) {
    if (!confirm("Excluir esta série?")) return;
    try {
      const res = await fetch(`/api/admin/series/${seriesId}`, { method: "DELETE" });
      if (!res.ok) { showToast("error", "Erro ao excluir série"); return; }
      showToast("success", "Série excluída!");
      await loadSeriesAndEnsaios();
    } catch { showToast("error", "Erro de conexão"); }
  }

  function openNewEnsaio() {
    setEditingEnsaioId(null);
    setEnsaioForm({ title: "", slug: "", subtitle: "", description: "", cover: "", priceInfo: "Sob consulta", order: ensaiosList.length, active: true });
    setShowEnsaioForm(true);
  }
  function openEditEnsaio(e: EnsaioItem) {
    setEditingEnsaioId(e.id);
    setEnsaioForm({ title: e.title, slug: e.slug, subtitle: e.subtitle, description: e.description, cover: e.cover, priceInfo: e.priceInfo, order: e.order, active: e.active });
    setShowEnsaioForm(true);
  }
  function closeEnsaioPanel() {
    setShowEnsaioForm(false);
    setEditingEnsaioId(null);
  }
  async function handleCreateEnsaio() {
    if (!ensaioForm.title || !ensaioForm.slug) { showToast("error", "Preencha título e slug"); return; }
    try {
      const res = await fetch("/api/admin/ensaios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantId: id, ...ensaioForm }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { showToast("error", data.error || "Erro ao criar ensaio"); return; }
      showToast("success", "Ensaio criado!");
      closeEnsaioPanel();
      await loadSeriesAndEnsaios();
    } catch { showToast("error", "Erro de conexão"); }
  }
  async function handleUpdateEnsaio() {
    if (!editingEnsaioId) return;
    try {
      const res = await fetch(`/api/admin/ensaios/${editingEnsaioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ensaioForm),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { showToast("error", data.error || "Erro ao atualizar ensaio"); return; }
      showToast("success", "Ensaio atualizado!");
      closeEnsaioPanel();
      await loadSeriesAndEnsaios();
    } catch { showToast("error", "Erro de conexão"); }
  }
  async function handleDeleteEnsaio(ensaioId: string) {
    if (!confirm("Excluir este ensaio?")) return;
    try {
      const res = await fetch(`/api/admin/ensaios/${ensaioId}`, { method: "DELETE" });
      if (!res.ok) { showToast("error", "Erro ao excluir ensaio"); return; }
      showToast("success", "Ensaio excluído!");
      await loadSeriesAndEnsaios();
    } catch { showToast("error", "Erro de conexão"); }
  }

  const tabs = [
    { id: "geral" as const, label: "Geral", icon: Settings },
    { id: "aparencia" as const, label: "Aparência", icon: Palette },
    { id: "conteudo" as const, label: "Conteúdo", icon: FileText },
    { id: "fotos" as const, label: "Fotos", icon: Image },
    { id: "series" as const, label: "Séries", icon: Layers },
    { id: "ensaios" as const, label: "Ensaios", icon: BookOpen },
    { id: "usuarios" as const, label: "Usuários", icon: Users },
  ];

  async function handleCreateUser() {
    if (!userForm.name || !userForm.email || !userForm.password) {
      showToast("error", "Preencha todos os campos do usuário");
      return;
    }
    try {
      const res = await fetch("/api/admin/tenant-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantId: id,
          name: userForm.name,
          email: userForm.email,
          password: userForm.password,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast("error", data.error || "Erro ao criar usuário");
        return;
      }
      showToast("success", "Usuário criado!");
      setShowUserForm(false);
      setUserForm({ name: "", email: "", password: "" });
      await loadTenant();
    } catch {
      showToast("error", "Erro de conexão");
    }
  }

  async function handleDeleteUser(userId: string) {
    if (!confirm("Excluir este usuário?")) return;
    try {
      const res = await fetch(`/api/admin/tenant-users/${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        showToast("error", "Erro ao excluir usuário");
        return;
      }
      showToast("success", "Usuário excluído!");
      await loadTenant();
    } catch {
      showToast("error", "Erro de conexão");
    }
  }

  async function handleUpdateMaxPhotos(newMax: number) {
    try {
      const res = await fetch(`/api/admin/tenants/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, maxPhotos: newMax }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast("error", data.error || "Erro ao atualizar limite");
        return;
      }
      showToast("success", `Limite de fotos atualizado para ${newMax}`);
      setTenant(data.tenant);
    } catch {
      showToast("error", "Erro de conexão");
    }
  }

  if (!authChecked && loading) {
    return <SkeletonLoader />;
  }

  if (error || (loading === false && !tenant)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-stone-100">
        <p className="text-stone-600">{error || "Tenant não encontrado"}</p>
        <Link
          href="/admin"
          className="text-stone-600 hover:text-stone-900 underline text-sm"
        >
          Voltar ao Admin
        </Link>
      </div>
    );
  }

  if (loading || !tenant) {
    return <SkeletonLoader />;
  }

  const photoPanelOpen = showPhotoForm || !!editingPhotoId;
  const isEditingPhoto = !!editingPhotoId;

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Nav bar */}
      <header className="sticky top-0 z-30 bg-stone-900 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-stone-300 hover:text-white text-sm font-medium transition-colors shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
                Dashboard
              </Link>
              <span className="text-stone-400">/</span>
              <h1 className="text-base font-semibold truncate">
                {tenant.name}
              </h1>
              {hasUnsavedChanges && (
                <span className="shrink-0 px-2 py-0.5 text-xs font-medium bg-amber-500/90 text-stone-900 rounded-md">
                  Alterações não salvas
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <a
                href={tenant.domain ? `https://${tenant.domain}` : `/?tenant=${tenant.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-stone-300 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                title={tenant.domain ? `Ver site em ${tenant.domain}` : `Ver site (preview: ?tenant=${tenant.slug})`}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Ver site</span>
              </a>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="shrink-0 px-4 py-2 bg-white text-stone-900 text-sm font-semibold rounded-lg hover:bg-stone-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <div className="sticky top-14 z-20 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === id
                    ? "border-stone-900 text-stone-900"
                    : "border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-6"
        >
          {/* Tab: Geral */}
          {activeTab === "geral" && (
            <>
              <Section title="Dados Básicos" icon={Settings}>
                <FieldRow label="Slug">
                  <input
                    type="text"
                    value={form.slug ?? ""}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className={inputClass}
                  />
                </FieldRow>
                <FieldRow label="Domínio">
                  <input
                    type="text"
                    value={form.domain ?? ""}
                    onChange={(e) => setForm({ ...form, domain: e.target.value })}
                    className={inputClass}
                    placeholder="exemplo.com"
                  />
                </FieldRow>
                <FieldRow label="Nome">
                  <input
                    type="text"
                    value={form.name ?? ""}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                </FieldRow>
                <FieldRow label="Subtítulo">
                  <input
                    type="text"
                    value={form.subtitle ?? ""}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    className={inputClass}
                  />
                </FieldRow>
                <FieldRow label="WhatsApp">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                    <input
                      type="text"
                      value={form.whatsappNumber ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, whatsappNumber: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                </FieldRow>
                <FieldRow label="Email">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                    <input
                      type="email"
                      value={form.email ?? ""}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </FieldRow>
                <FieldRow label="">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="active"
                      checked={form.active ?? true}
                      onChange={(e) => setForm({ ...form, active: e.target.checked })}
                      className="rounded border-stone-300 text-stone-900 focus:ring-stone-500"
                    />
                    <label htmlFor="active" className="text-sm font-medium text-stone-700">
                      Tenant ativo
                    </label>
                  </div>
                </FieldRow>
              </Section>

              <Section title="Social & SEO" icon={Globe}>
                <FieldRow label="Instagram URL">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-stone-400 shrink-0" />
                    <input
                      type="url"
                      value={form.instagramUrl ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, instagramUrl: e.target.value })
                      }
                      className={inputClass}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                </FieldRow>
                <FieldRow label="Facebook URL">
                  <div className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-stone-400 shrink-0" />
                    <input
                      type="url"
                      value={form.facebookUrl ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, facebookUrl: e.target.value })
                      }
                      className={inputClass}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                </FieldRow>
                <FieldRow label="Meta Title">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-stone-400 shrink-0" />
                    <input
                      type="text"
                      value={form.metaTitle ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, metaTitle: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                </FieldRow>
                <FieldRow label="Meta Description">
                  <textarea
                    value={form.metaDescription ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, metaDescription: e.target.value })
                    }
                    className={inputClass}
                    rows={3}
                  />
                </FieldRow>
              </Section>
            </>
          )}

          {/* Tab: Aparência */}
          {activeTab === "aparencia" && (
            <>
              <Section title="Cores" icon={Palette}>
                <ColorInput
                  label="Primary"
                  value={form.colorPrimary ?? "#8B1E1E"}
                  onChange={(v) => setForm({ ...form, colorPrimary: v })}
                />
                <ColorInput
                  label="Accent"
                  value={form.colorAccent ?? "#B76E4B"}
                  onChange={(v) => setForm({ ...form, colorAccent: v })}
                />
                <ColorInput
                  label="CTA"
                  value={form.colorCta ?? "#25D366"}
                  onChange={(v) => setForm({ ...form, colorCta: v })}
                />
              </Section>

              <Section title="Stats" icon={BarChart3}>
                <div className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { v: "stat1Value", l: "stat1Label", n: 1 },
                      { v: "stat2Value", l: "stat2Label", n: 2 },
                      { v: "stat3Value", l: "stat3Label", n: 3 },
                      { v: "stat4Value", l: "stat4Label", n: 4 },
                    ].map(({ v, l, n }) => (
                      <div key={v} className="space-y-2 p-4 bg-stone-50 rounded-lg border border-stone-100">
                        <p className="text-xs font-medium text-stone-500">Stat {n}</p>
                        <div>
                          <label className="block text-xs font-medium text-stone-600 mb-1">Valor</label>
                          <input
                            type="text"
                            value={(form as Record<string, string>)[v] ?? ""}
                            onChange={(e) => setForm({ ...form, [v]: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-stone-600 mb-1">Label</label>
                          <input
                            type="text"
                            value={(form as Record<string, string>)[l] ?? ""}
                            onChange={(e) => setForm({ ...form, [l]: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>

              <Section title="Categorias" icon={Tag}>
                <FieldRow label="Categorias das fotos (adicione, edite ou remova)">
                  <CategoryTags
                    value={form.categories ?? ""}
                    onChange={(v) => setForm({ ...form, categories: v })}
                    placeholder="Ex: Paisagens, Urbano, ..."
                  />
                </FieldRow>
              </Section>
            </>
          )}

          {/* Tab: Conteúdo */}
          {activeTab === "conteudo" && (
            <>
              <Section title="Hero" icon={Image}>
                <FieldRow label="Título">
                  <input
                    type="text"
                    value={form.heroTitle ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, heroTitle: e.target.value })
                    }
                    className={inputClass}
                  />
                </FieldRow>
                <FieldRow label="Subtítulo">
                  <input
                    type="text"
                    value={form.heroSubtitle ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, heroSubtitle: e.target.value })
                    }
                    className={inputClass}
                  />
                </FieldRow>
                <FieldRow label="Badge">
                  <input
                    type="text"
                    value={form.heroBadge ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, heroBadge: e.target.value })
                    }
                    className={inputClass}
                  />
                </FieldRow>
                <FieldRow label="Imagem Hero (URL)">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.heroImage ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, heroImage: e.target.value })
                      }
                      className={inputClass}
                      placeholder="https://..."
                    />
                    <label className="shrink-0 flex items-center gap-2 px-4 py-2 bg-stone-200 hover:bg-stone-300 rounded-lg text-sm font-medium cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (!f || !form.slug) return;
                          const url = await handleUpload(f, form.slug);
                          if (url) setForm({ ...form, heroImage: url });
                          e.target.value = "";
                        }}
                      />
                    </label>
                  </div>
                </FieldRow>
              </Section>

              <Section title="Sobre" icon={FileText}>
                <FieldRow label="Título">
                  <input
                    type="text"
                    value={form.aboutTitle ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, aboutTitle: e.target.value })
                    }
                    className={inputClass}
                  />
                </FieldRow>
                <FieldRow label="Texto 1">
                  <textarea
                    value={form.aboutText1 ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, aboutText1: e.target.value })
                    }
                    className={inputClass}
                    rows={4}
                  />
                </FieldRow>
                <FieldRow label="Texto 2">
                  <textarea
                    value={form.aboutText2 ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, aboutText2: e.target.value })
                    }
                    className={inputClass}
                    rows={4}
                  />
                </FieldRow>
                <FieldRow label="Texto 3">
                  <textarea
                    value={form.aboutText3 ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, aboutText3: e.target.value })
                    }
                    className={inputClass}
                    rows={4}
                  />
                </FieldRow>
                <FieldRow label="Imagem Sobre (URL)">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.aboutImage ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, aboutImage: e.target.value })
                      }
                      className={inputClass}
                      placeholder="https://..."
                    />
                    <label className="shrink-0 flex items-center gap-2 px-4 py-2 bg-stone-200 hover:bg-stone-300 rounded-lg text-sm font-medium cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (!f || !form.slug) return;
                          const url = await handleUpload(f, form.slug);
                          if (url) setForm({ ...form, aboutImage: url });
                          e.target.value = "";
                        }}
                      />
                    </label>
                  </div>
                </FieldRow>
              </Section>

              <Section title="Contato" icon={Mail}>
                <FieldRow label="Título">
                  <input
                    type="text"
                    value={form.contactTitle ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, contactTitle: e.target.value })
                    }
                    className={inputClass}
                  />
                </FieldRow>
                <FieldRow label="Texto">
                  <textarea
                    value={form.contactText ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, contactText: e.target.value })
                    }
                    className={inputClass}
                    rows={4}
                  />
                </FieldRow>
              </Section>
            </>
          )}

          {/* Tab: Fotos */}
          {activeTab === "fotos" && (
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-stone-50 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Image className="w-4 h-4 text-stone-600 shrink-0" />
                  <h2 className="text-sm font-semibold text-stone-800">Fotos</h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowPhotoForm(true);
                    setEditingPhotoId(null);
                    setPhotoForm({
                      tenantId: id!,
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
                      order: tenant.photos?.length ?? 0,
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Foto
                </button>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {tenant.photos?.map((photo) => (
                    <div
                      key={photo.id}
                      className="group relative bg-stone-50 rounded-xl border border-stone-200 overflow-hidden hover:border-stone-300 transition-colors"
                    >
                      <div className="aspect-square bg-stone-200 relative">
                        <img
                          src={photo.imageThumb || photo.imageSrc || "/placeholder.svg"}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => openEditPhoto(photo)}
                            className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow-sm text-stone-600 hover:text-stone-900 transition-colors"
                            aria-label="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="p-1.5 bg-white/90 hover:bg-red-50 rounded-lg shadow-sm text-red-600 hover:text-red-700 transition-colors"
                            aria-label="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-stone-900 text-sm truncate">
                          {photo.title}
                        </p>
                        <p className="text-xs text-stone-500 truncate">
                          {photo.category || "—"} · R$ {photo.price || "—"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {(!tenant.photos || tenant.photos.length === 0) && (
                  <div className="text-center py-12 text-stone-500">
                    <Image className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-medium">Nenhuma foto ainda</p>
                    <p className="text-xs mt-1">Clique em &quot;Adicionar Foto&quot; para começar</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Tab: Séries */}
          {activeTab === "series" && (
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-stone-50 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-stone-600 shrink-0" />
                  <h2 className="text-sm font-semibold text-stone-800">Séries</h2>
                  <span className="text-xs text-stone-500">({seriesList.length})</span>
                </div>
                <button
                  type="button"
                  onClick={openNewSeries}
                  className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Série
                </button>
              </div>
              {seriesList.length === 0 ? (
                <div className="text-center py-12 text-stone-500">
                  <Layers className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">Nenhuma série</p>
                  <p className="text-xs mt-1">Clique em &quot;Adicionar Série&quot; para começar</p>
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {seriesList.map((s) => (
                    <div key={s.id} className="flex items-center gap-4 px-5 py-4 hover:bg-stone-50 group">
                      {s.cover && <img src={s.cover} alt="" className="w-14 h-14 rounded-lg border border-stone-200 object-cover shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-stone-900 truncate">{s.title}</p>
                        <p className="text-sm text-stone-500 truncate">{s.subtitle}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${s.active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{s.active ? "Ativo" : "Inativo"}</span>
                      <div className="flex shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button type="button" onClick={() => openEditSeries(s)} className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-700" aria-label="Editar">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => handleDeleteSeries(s.id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700" aria-label="Excluir">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Ensaios */}
          {activeTab === "ensaios" && (
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-stone-50 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-stone-600 shrink-0" />
                  <h2 className="text-sm font-semibold text-stone-800">Ensaios</h2>
                  <span className="text-xs text-stone-500">({ensaiosList.length})</span>
                </div>
                <button
                  type="button"
                  onClick={openNewEnsaio}
                  className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Ensaio
                </button>
              </div>
              {ensaiosList.length === 0 ? (
                <div className="text-center py-12 text-stone-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">Nenhum ensaio</p>
                  <p className="text-xs mt-1">Clique em &quot;Adicionar Ensaio&quot; para começar</p>
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {ensaiosList.map((e) => (
                    <div key={e.id} className="flex items-center gap-4 px-5 py-4 hover:bg-stone-50 group">
                      {e.cover && <img src={e.cover} alt="" className="w-14 h-14 rounded-lg border border-stone-200 object-cover shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-stone-900 truncate">{e.title}</p>
                        <p className="text-sm text-stone-500 truncate">{e.subtitle}</p>
                        <p className="text-xs text-stone-400">{e.priceInfo}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${e.active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{e.active ? "Ativo" : "Inativo"}</span>
                      <div className="flex shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button type="button" onClick={() => openEditEnsaio(e)} className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-700" aria-label="Editar">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => handleDeleteEnsaio(e.id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700" aria-label="Excluir">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Usuários */}
          {activeTab === "usuarios" && (
            <div className="space-y-6">
              {/* Photo limit control */}
              <Section title="Limite de Fotos" icon={ImageIcon}>
                <div className="px-5 py-4">
                  <p className="text-sm text-stone-600 mb-3">
                    Fotos atuais: <strong>{tenant.photos?.length ?? 0}</strong> / Limite: <strong>{tenant.maxPhotos}</strong>
                  </p>
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-stone-700">Máximo de fotos:</label>
                    <input
                      type="number"
                      min={1}
                      value={tenant.maxPhotos}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 10;
                        setTenant({ ...tenant, maxPhotos: val });
                      }}
                      className={`${inputClass} w-24`}
                    />
                    <button
                      type="button"
                      onClick={() => handleUpdateMaxPhotos(tenant.maxPhotos)}
                      className="px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
                    >
                      Atualizar
                    </button>
                  </div>
                </div>
              </Section>

              {/* User list */}
              <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 bg-stone-50 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-stone-600 shrink-0" />
                    <h2 className="text-sm font-semibold text-stone-800">
                      Usuários do Tenant
                    </h2>
                    <span className="text-xs text-stone-500">
                      ({tenant.users?.length ?? 0})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowUserForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Criar Usuário
                  </button>
                </div>

                {showUserForm && (
                  <div className="px-5 py-4 bg-amber-50/50 border-b-2 border-amber-200">
                    <h3 className="text-sm font-semibold text-stone-800 mb-4">
                      Novo Usuário
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Nome *</label>
                        <input
                          type="text"
                          value={userForm.name}
                          onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                          className={inputClass}
                          placeholder="Nome do fotógrafo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
                        <input
                          type="email"
                          value={userForm.email}
                          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                          className={inputClass}
                          placeholder="email@exemplo.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Senha inicial *</label>
                        <input
                          type="text"
                          value={userForm.password}
                          onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                          className={inputClass}
                          placeholder="Ex: 123456 (o fotógrafo pode alterar depois)"
                        />
                        <p className="text-xs text-stone-500 mt-1">O fotógrafo poderá alterar a senha no painel em /panel/senha</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        type="button"
                        onClick={handleCreateUser}
                        className="px-5 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors"
                      >
                        Criar Usuário
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowUserForm(false);
                          setUserForm({ name: "", email: "", password: "" });
                        }}
                        className="px-4 py-2.5 bg-stone-200 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-300 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                <div className="divide-y divide-stone-100">
                  {tenant.users?.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between px-5 py-3 hover:bg-stone-50 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-stone-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-stone-500">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-400">
                          {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {(!tenant.users || tenant.users.length === 0) && (
                    <div className="text-center py-12 text-stone-500">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm font-medium">Nenhum usuário ainda</p>
                      <p className="text-xs mt-1">
                        Crie um usuário para que o fotógrafo acesse o painel em{" "}
                        <code className="px-1 py-0.5 bg-stone-100 rounded text-stone-600">/panel</code>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </main>

      {/* Photo slide-over panel */}
      {photoPanelOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity"
            onClick={closePhotoPanel}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-stone-50">
              <h3 className="text-lg font-semibold text-stone-900">
                {isEditingPhoto ? "Editar Foto" : "Nova Foto"}
              </h3>
              <button
                type="button"
                onClick={closePhotoPanel}
                className="p-2 rounded-lg hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Título</label>
                <input
                  value={photoForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                    setPhotoForm({ ...photoForm, title, slug });
                  }}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Slug</label>
                <input
                  value={photoForm.slug}
                  onChange={(e) => setPhotoForm({ ...photoForm, slug: e.target.value })}
                  className={`${inputClass} font-mono text-sm`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Local</label>
                  <input
                    value={photoForm.location ?? ""}
                    onChange={(e) => setPhotoForm({ ...photoForm, location: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Ano</label>
                  <input
                    type="number"
                    value={photoForm.year}
                    onChange={(e) =>
                      setPhotoForm({ ...photoForm, year: parseInt(e.target.value) || 0 })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Descrição</label>
                <textarea
                  value={photoForm.description ?? ""}
                  onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                  className={inputClass}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Categoria</label>
                  <select
                    value={photoForm.category ?? ""}
                    onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">—</option>
                    {categoriesList.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Ordem</label>
                  <input
                    type="number"
                    value={photoForm.order}
                    onChange={(e) =>
                      setPhotoForm({ ...photoForm, order: parseInt(e.target.value) || 0 })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Imagem</label>
                <div className="flex gap-2">
                  <input
                    value={photoForm.imageSrc ?? ""}
                    onChange={(e) => setPhotoForm({ ...photoForm, imageSrc: e.target.value, imageThumb: e.target.value })}
                    className={inputClass}
                    placeholder="URL da imagem ou faça upload"
                  />
                  <label className="shrink-0 flex items-center gap-1 px-3 py-2 bg-stone-200 hover:bg-stone-300 rounded-lg text-xs font-medium cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f || !form.slug) return;
                        const url = await handleUpload(f, form.slug);
                        if (url) setPhotoForm({ ...photoForm, imageSrc: url, imageThumb: url });
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
                {photoForm.imageSrc && (
                  <div className="mt-2 w-24 h-24 rounded-lg border border-stone-200 overflow-hidden bg-stone-100">
                    <img src={photoForm.imageSrc} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Preço</label>
                  <input
                    value={photoForm.price ?? ""}
                    onChange={(e) => setPhotoForm({ ...photoForm, price: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Formato</label>
                  <input
                    value={photoForm.format ?? ""}
                    onChange={(e) => setPhotoForm({ ...photoForm, format: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Tipo impressão</label>
                  <input
                    value={photoForm.printType ?? ""}
                    onChange={(e) => setPhotoForm({ ...photoForm, printType: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-stone-200 bg-stone-50">
              {isEditingPhoto ? (
                <button
                  type="button"
                  onClick={() => editingPhotoId && handleUpdatePhoto(editingPhotoId)}
                  className="flex-1 px-4 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Salvar alterações
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCreatePhoto}
                  className="flex-1 px-4 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Criar foto
                </button>
              )}
              <button
                type="button"
                onClick={closePhotoPanel}
                className="px-4 py-2.5 bg-stone-200 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}

      {/* Series form panel */}
      {showSeriesForm && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={closeSeriesPanel} />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-4">
              <h3 className="text-lg font-semibold text-stone-900">
                {editingSeriesId ? "Editar Série" : "Nova Série"}
              </h3>
              <button onClick={closeSeriesPanel} className="rounded-lg p-2 text-stone-600 hover:bg-stone-200">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Título</label>
                <input
                  value={seriesForm.title}
                  onChange={(e) => setSeriesForm({ ...seriesForm, title: e.target.value, slug: slugify(e.target.value) })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Slug</label>
                <input value={seriesForm.slug} onChange={(e) => setSeriesForm({ ...seriesForm, slug: e.target.value })} className={`${inputClass} font-mono`} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Subtítulo</label>
                <input value={seriesForm.subtitle} onChange={(e) => setSeriesForm({ ...seriesForm, subtitle: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Descrição</label>
                <textarea value={seriesForm.description} onChange={(e) => setSeriesForm({ ...seriesForm, description: e.target.value })} className={inputClass} rows={3} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Capa</label>
                <div className="flex gap-2">
                  <input value={seriesForm.cover} onChange={(e) => setSeriesForm({ ...seriesForm, cover: e.target.value })} className={inputClass} placeholder="URL da imagem" />
                  <label className="shrink-0 flex items-center gap-1 px-3 py-2 bg-stone-200 hover:bg-stone-300 rounded-lg text-xs font-medium cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f || !form.slug) return;
                        const url = await handleUpload(f, form.slug);
                        if (url) setSeriesForm({ ...seriesForm, cover: url });
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
                {seriesForm.cover && (
                  <div className="mt-2 h-24 w-24 overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
                    <img src={seriesForm.cover} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Fotos da série (até 3)</label>
                {seriesPhotos.map((photo, idx) => (
                  <div key={idx} className="mb-4 rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-500">Foto {idx + 1}</span>
                      <button type="button" onClick={() => setSeriesPhotos(seriesPhotos.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 text-xs">
                        Remover
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input value={photo.title} onChange={(e) => setSeriesPhotos(seriesPhotos.map((p, i) => i === idx ? { ...p, title: e.target.value } : p))} className={inputClass} placeholder="Título" />
                      <input value={photo.location} onChange={(e) => setSeriesPhotos(seriesPhotos.map((p, i) => i === idx ? { ...p, location: e.target.value } : p))} className={inputClass} placeholder="Local" />
                      <input type="number" value={photo.year || ""} onChange={(e) => setSeriesPhotos(seriesPhotos.map((p, i) => i === idx ? { ...p, year: parseInt(e.target.value) || new Date().getFullYear() } : p))} className={inputClass} placeholder="Ano" />
                    </div>
                    <div className="flex gap-2">
                      <input value={photo.imageSrc} onChange={(e) => setSeriesPhotos(seriesPhotos.map((p, i) => i === idx ? { ...p, imageSrc: e.target.value, imageThumb: e.target.value } : p))} className={inputClass} placeholder="URL da imagem" />
                      <label className="shrink-0 flex items-center gap-1 px-3 py-2 bg-stone-200 hover:bg-stone-300 rounded-lg text-xs font-medium cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        Upload
                        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (!f || !form.slug) return;
                          const url = await handleUpload(f, form.slug);
                          if (url) setSeriesPhotos(seriesPhotos.map((p, i) => i === idx ? { ...p, imageSrc: url, imageThumb: url } : p));
                          e.target.value = "";
                        }} />
                      </label>
                    </div>
                    {photo.imageSrc && <div className="mt-2 h-16 w-16 overflow-hidden rounded border border-stone-200"><img src={photo.imageSrc} alt="" className="h-full w-full object-cover" /></div>}
                  </div>
                ))}
                {seriesPhotos.length < 3 && (
                  <button type="button" onClick={() => setSeriesPhotos([...seriesPhotos, { title: "", location: "", year: new Date().getFullYear(), imageSrc: "", imageThumb: "" }])} className="flex items-center gap-1.5 rounded-lg border border-dashed border-stone-300 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50">
                    <Plus className="w-4 h-4" />
                    Adicionar foto
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700">Ordem</label>
                  <input type="number" value={seriesForm.order} onChange={(e) => setSeriesForm({ ...seriesForm, order: parseInt(e.target.value) || 0 })} className={`${inputClass} w-24`} />
                </div>
                <label className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={seriesForm.active} onChange={(e) => setSeriesForm({ ...seriesForm, active: e.target.checked })} className="rounded border-stone-300" />
                  <span className="text-sm text-stone-700">Ativo</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 border-t border-stone-200 bg-stone-50 p-5">
              <button onClick={editingSeriesId ? handleUpdateSeries : handleCreateSeries} className="flex-1 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800">
                {editingSeriesId ? "Salvar alterações" : "Criar série"}
              </button>
              <button onClick={closeSeriesPanel} className="rounded-lg bg-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-300">
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}

      {/* Ensaio form panel */}
      {showEnsaioForm && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={closeEnsaioPanel} />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-4">
              <h3 className="text-lg font-semibold text-stone-900">
                {editingEnsaioId ? "Editar Ensaio" : "Novo Ensaio"}
              </h3>
              <button onClick={closeEnsaioPanel} className="rounded-lg p-2 text-stone-600 hover:bg-stone-200">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Título</label>
                <input
                  value={ensaioForm.title}
                  onChange={(e) => setEnsaioForm({ ...ensaioForm, title: e.target.value, slug: slugify(e.target.value) })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Slug</label>
                <input value={ensaioForm.slug} onChange={(e) => setEnsaioForm({ ...ensaioForm, slug: e.target.value })} className={`${inputClass} font-mono`} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Subtítulo</label>
                <input value={ensaioForm.subtitle} onChange={(e) => setEnsaioForm({ ...ensaioForm, subtitle: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Descrição</label>
                <textarea value={ensaioForm.description} onChange={(e) => setEnsaioForm({ ...ensaioForm, description: e.target.value })} className={inputClass} rows={3} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Capa</label>
                <div className="flex gap-2">
                  <input value={ensaioForm.cover} onChange={(e) => setEnsaioForm({ ...ensaioForm, cover: e.target.value })} className={inputClass} placeholder="URL da imagem" />
                  <label className="shrink-0 flex items-center gap-1 px-3 py-2 bg-stone-200 hover:bg-stone-300 rounded-lg text-xs font-medium cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f || !form.slug) return;
                        const url = await handleUpload(f, form.slug);
                        if (url) setEnsaioForm({ ...ensaioForm, cover: url });
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
                {ensaioForm.cover && (
                  <div className="mt-2 h-24 w-24 overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
                    <img src={ensaioForm.cover} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Preço / Info</label>
                <input value={ensaioForm.priceInfo} onChange={(e) => setEnsaioForm({ ...ensaioForm, priceInfo: e.target.value })} className={inputClass} />
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700">Ordem</label>
                  <input type="number" value={ensaioForm.order} onChange={(e) => setEnsaioForm({ ...ensaioForm, order: parseInt(e.target.value) || 0 })} className={`${inputClass} w-24`} />
                </div>
                <label className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={ensaioForm.active} onChange={(e) => setEnsaioForm({ ...ensaioForm, active: e.target.checked })} className="rounded border-stone-300" />
                  <span className="text-sm text-stone-700">Ativo</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 border-t border-stone-200 bg-stone-50 p-5">
              <button onClick={editingEnsaioId ? handleUpdateEnsaio : handleCreateEnsaio} className="flex-1 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800">
                {editingEnsaioId ? "Salvar alterações" : "Criar ensaio"}
              </button>
              <button onClick={closeEnsaioPanel} className="rounded-lg bg-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-300">
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}

      {/* Toast */}
      {toast && (
        <ToastWithProgress
          type={toast.type}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
