"use client";

import { useEffect, useState } from "react";
import { usePanelContext } from "../layout";
import CategoryTags from "@/components/CategoryTags";
import { Palette, BarChart3, Tag, Save } from "lucide-react";

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
      <label className="mb-2 block text-sm font-medium text-stone-700">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <div className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-stone-200 shadow-inner">
          <input
            type="color"
            value={hex}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <div className="h-full w-full" style={{ backgroundColor: hex }} />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="font-mono text-[10px] font-medium text-white drop-shadow">
              {hex}
            </span>
          </div>
        </div>
        <input
          type="text"
          value={hex}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} max-w-[140px] font-mono text-sm`}
        />
      </div>
    </div>
  );
}

export default function PanelAparenciaPage() {
  const { tenant, loading, handleSave } = usePanelContext();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    colorPrimary: "#8B1E1E",
    colorAccent: "#B76E4B",
    colorCta: "#25D366",
    stat1Value: "",
    stat1Label: "",
    stat2Value: "",
    stat2Label: "",
    stat3Value: "",
    stat3Label: "",
    stat4Value: "",
    stat4Label: "",
    categories: "",
  });

  useEffect(() => {
    if (!tenant) return;
    setForm({
      colorPrimary: tenant.colorPrimary,
      colorAccent: tenant.colorAccent,
      colorCta: tenant.colorCta,
      stat1Value: tenant.stat1Value,
      stat1Label: tenant.stat1Label,
      stat2Value: tenant.stat2Value,
      stat2Label: tenant.stat2Label,
      stat3Value: tenant.stat3Value,
      stat3Label: tenant.stat3Label,
      stat4Value: tenant.stat4Value,
      stat4Label: tenant.stat4Label,
      categories: tenant.categories,
    });
  }, [tenant]);

  async function onSave() {
    setSaving(true);
    await handleSave(form);
    setSaving(false);
  }

  if (loading || !tenant) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl border border-stone-200 bg-white"
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
            <h1 className="text-xl font-bold text-stone-900">Aparência</h1>
            <p className="text-sm text-stone-500">
              Cores, estatísticas e categorias
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
          <Section title="Cores" icon={Palette}>
            <ColorInput
              label="Primary"
              value={form.colorPrimary}
              onChange={(v) => setForm({ ...form, colorPrimary: v })}
            />
            <ColorInput
              label="Accent"
              value={form.colorAccent}
              onChange={(v) => setForm({ ...form, colorAccent: v })}
            />
            <ColorInput
              label="CTA"
              value={form.colorCta}
              onChange={(v) => setForm({ ...form, colorCta: v })}
            />
          </Section>

          <Section title="Stats" icon={BarChart3}>
            <div className="p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { v: "stat1Value", l: "stat1Label", n: 1 },
                  { v: "stat2Value", l: "stat2Label", n: 2 },
                  { v: "stat3Value", l: "stat3Label", n: 3 },
                  { v: "stat4Value", l: "stat4Label", n: 4 },
                ].map(({ v, l, n }) => (
                  <div
                    key={v}
                    className="space-y-2 rounded-lg border border-stone-100 bg-stone-50 p-4"
                  >
                    <p className="text-xs font-medium text-stone-500">
                      Stat {n}
                    </p>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-stone-600">
                        Valor
                      </label>
                      <input
                        type="text"
                        value={(form as Record<string, string>)[v] ?? ""}
                        onChange={(e) =>
                          setForm({ ...form, [v]: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-stone-600">
                        Label
                      </label>
                      <input
                        type="text"
                        value={(form as Record<string, string>)[l] ?? ""}
                        onChange={(e) =>
                          setForm({ ...form, [l]: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Categorias" icon={Tag}>
            <div className="px-5 py-4">
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Categorias das fotos (definidas pelo admin)
              </label>
              <CategoryTags
                value={form.categories}
                onChange={() => {}}
                placeholder="Ex: Paisagens, Urbano, ..."
                disabled
              />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
