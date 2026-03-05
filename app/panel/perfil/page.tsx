"use client";

import { useEffect, useState } from "react";
import { usePanelContext } from "../layout";
import {
  Settings,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Search,
  Globe,
  Save,
} from "lucide-react";

const inputClass =
  "w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-shadow";

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
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-stone-200 bg-stone-50 px-5 py-4">
        <Icon className="h-4 w-4 shrink-0 text-stone-600" />
        <h2 className="text-sm font-semibold text-stone-800">{title}</h2>
      </div>
      <div className="divide-y divide-stone-100">{children}</div>
    </div>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 py-4">
      <label className="mb-2 block text-sm font-medium text-stone-700">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function PanelPerfilPage() {
  const { tenant, loading, handleSave, showToast } = usePanelContext();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    subtitle: "",
    whatsappNumber: "",
    email: "",
    instagramUrl: "",
    facebookUrl: "",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    if (!tenant) return;
    setForm({
      name: tenant.name,
      subtitle: tenant.subtitle,
      whatsappNumber: tenant.whatsappNumber,
      email: tenant.email ?? "",
      instagramUrl: tenant.instagramUrl ?? "",
      facebookUrl: tenant.facebookUrl ?? "",
      metaTitle: tenant.metaTitle ?? "",
      metaDescription: tenant.metaDescription ?? "",
    });
  }, [tenant]);

  async function onSave() {
    setSaving(true);
    await handleSave({
      name: form.name,
      subtitle: form.subtitle,
      whatsappNumber: form.whatsappNumber,
      email: form.email || null,
      instagramUrl: form.instagramUrl || null,
      facebookUrl: form.facebookUrl || null,
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
    });
    setSaving(false);
  }

  if (loading || !tenant) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-xl border border-stone-200 bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-900">Perfil</h1>
            <p className="text-sm text-stone-500">
              Dados básicos e redes sociais
            </p>
          </div>
          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:bg-stone-800 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>

        <div className="space-y-6">
          <Section title="Dados do Perfil" icon={Settings}>
            <FieldRow label="Nome">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </FieldRow>
            <FieldRow label="Subtítulo">
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) =>
                  setForm({ ...form, subtitle: e.target.value })
                }
                className={inputClass}
              />
            </FieldRow>
            <FieldRow label="WhatsApp">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-stone-400" />
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) =>
                    setForm({ ...form, whatsappNumber: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
            </FieldRow>
            <FieldRow label="Email">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-stone-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </FieldRow>
          </Section>

          <Section title="Social & SEO" icon={Globe}>
            <FieldRow label="Instagram URL">
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4 shrink-0 text-stone-400" />
                <input
                  type="url"
                  value={form.instagramUrl}
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
                <Facebook className="h-4 w-4 shrink-0 text-stone-400" />
                <input
                  type="url"
                  value={form.facebookUrl}
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
                <Search className="h-4 w-4 shrink-0 text-stone-400" />
                <input
                  type="text"
                  value={form.metaTitle}
                  onChange={(e) =>
                    setForm({ ...form, metaTitle: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
            </FieldRow>
            <FieldRow label="Meta Description">
              <textarea
                value={form.metaDescription}
                onChange={(e) =>
                  setForm({ ...form, metaDescription: e.target.value })
                }
                className={inputClass}
                rows={3}
              />
            </FieldRow>
          </Section>
        </div>
      </div>
    </div>
  );
}
