"use client";

import { useEffect, useState } from "react";
import { usePanelContext } from "../layout";
import { Image, FileText, Mail, Upload, Save } from "lucide-react";

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

export default function PanelConteudoPage() {
  const { tenant, loading, handleSave, handleUpload } = usePanelContext();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroBadge: "",
    heroImage: "",
    aboutTitle: "",
    aboutText1: "",
    aboutText2: "",
    aboutText3: "",
    aboutImage: "",
    contactTitle: "",
    contactText: "",
  });

  useEffect(() => {
    if (!tenant) return;
    setForm({
      heroTitle: tenant.heroTitle,
      heroSubtitle: tenant.heroSubtitle,
      heroBadge: tenant.heroBadge,
      heroImage: tenant.heroImage,
      aboutTitle: tenant.aboutTitle ?? "",
      aboutText1: tenant.aboutText1 ?? "",
      aboutText2: tenant.aboutText2 ?? "",
      aboutText3: tenant.aboutText3 ?? "",
      aboutImage: tenant.aboutImage ?? "",
      contactTitle: tenant.contactTitle,
      contactText: tenant.contactText,
    });
  }, [tenant]);

  async function onSave() {
    setSaving(true);
    await handleSave({
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
    });
    setSaving(false);
  }

  if (loading || !tenant) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {[1, 2, 3].map((i) => (
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
            <h1 className="text-xl font-bold text-stone-900">Conteúdo</h1>
            <p className="text-sm text-stone-500">
              Hero, sobre e informações de contato
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
          <Section title="Hero" icon={Image}>
            <FieldRow label="Título">
              <input
                type="text"
                value={form.heroTitle}
                onChange={(e) =>
                  setForm({ ...form, heroTitle: e.target.value })
                }
                className={inputClass}
              />
            </FieldRow>
            <FieldRow label="Subtítulo">
              <input
                type="text"
                value={form.heroSubtitle}
                onChange={(e) =>
                  setForm({ ...form, heroSubtitle: e.target.value })
                }
                className={inputClass}
              />
            </FieldRow>
            <FieldRow label="Badge">
              <input
                type="text"
                value={form.heroBadge}
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
                  value={form.heroImage}
                  onChange={(e) =>
                    setForm({ ...form, heroImage: e.target.value })
                  }
                  className={inputClass}
                  placeholder="https://..."
                />
                <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-stone-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-300">
                  <Upload className="h-4 w-4" />
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const url = await handleUpload(f);
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
                value={form.aboutTitle}
                onChange={(e) =>
                  setForm({ ...form, aboutTitle: e.target.value })
                }
                className={inputClass}
              />
            </FieldRow>
            <FieldRow label="Texto 1">
              <textarea
                value={form.aboutText1}
                onChange={(e) =>
                  setForm({ ...form, aboutText1: e.target.value })
                }
                className={inputClass}
                rows={4}
              />
            </FieldRow>
            <FieldRow label="Texto 2">
              <textarea
                value={form.aboutText2}
                onChange={(e) =>
                  setForm({ ...form, aboutText2: e.target.value })
                }
                className={inputClass}
                rows={4}
              />
            </FieldRow>
            <FieldRow label="Texto 3">
              <textarea
                value={form.aboutText3}
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
                  value={form.aboutImage}
                  onChange={(e) =>
                    setForm({ ...form, aboutImage: e.target.value })
                  }
                  className={inputClass}
                  placeholder="https://..."
                />
                <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-stone-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-300">
                  <Upload className="h-4 w-4" />
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const url = await handleUpload(f);
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
                value={form.contactTitle}
                onChange={(e) =>
                  setForm({ ...form, contactTitle: e.target.value })
                }
                className={inputClass}
              />
            </FieldRow>
            <FieldRow label="Texto">
              <textarea
                value={form.contactText}
                onChange={(e) =>
                  setForm({ ...form, contactText: e.target.value })
                }
                className={inputClass}
                rows={4}
              />
            </FieldRow>
          </Section>
        </div>
      </div>
    </div>
  );
}
