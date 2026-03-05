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
    contactCta: "",
    contactSubtext: "",
    heroCtaWhatsApp: "",
    heroCtaPortfolio: "",
    heroScrollLabel: "",
    aboutSectionLabel: "",
    aboutYears: "",
    aboutYearsLabel: "",
    aboutCtaContact: "",
    aboutCtaPortfolio: "",
    sectionFotoUnicaBadge: "",
    sectionFotoUnicaTitle: "",
    sectionFotoUnicaDesc: "",
    sectionFotoUnicaDesc2: "",
    sectionFotoUnicaCta: "",
    sectionFotoUnicaSubtext: "",
    sectionSeriesBadge: "",
    sectionSeriesTitle: "",
    sectionSeriesDesc: "",
    sectionSeriesModalLabel: "",
    sectionSeriesVerSerie: "",
    sectionSeriesClique: "",
    sectionEnsaiosBadge: "",
    sectionEnsaiosTitle: "",
    sectionEnsaiosDesc: "",
    sectionEnsaiosCta: "",
    sectionEnsaiosCtaSubtext: "",
  });

  useEffect(() => {
    if (!tenant) return;
    const t = tenant as Record<string, unknown>;
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
      contactCta: (t.contactCta as string) ?? "",
      contactSubtext: (t.contactSubtext as string) ?? "",
      heroCtaWhatsApp: (t.heroCtaWhatsApp as string) ?? "",
      heroCtaPortfolio: (t.heroCtaPortfolio as string) ?? "",
      heroScrollLabel: (t.heroScrollLabel as string) ?? "",
      aboutSectionLabel: (t.aboutSectionLabel as string) ?? "",
      aboutYears: (t.aboutYears as string) ?? "",
      aboutYearsLabel: (t.aboutYearsLabel as string) ?? "",
      aboutCtaContact: (t.aboutCtaContact as string) ?? "",
      aboutCtaPortfolio: (t.aboutCtaPortfolio as string) ?? "",
      sectionFotoUnicaBadge: (t.sectionFotoUnicaBadge as string) ?? "",
      sectionFotoUnicaTitle: (t.sectionFotoUnicaTitle as string) ?? "",
      sectionFotoUnicaDesc: (t.sectionFotoUnicaDesc as string) ?? "",
      sectionFotoUnicaDesc2: (t.sectionFotoUnicaDesc2 as string) ?? "",
      sectionFotoUnicaCta: (t.sectionFotoUnicaCta as string) ?? "",
      sectionFotoUnicaSubtext: (t.sectionFotoUnicaSubtext as string) ?? "",
      sectionSeriesBadge: (t.sectionSeriesBadge as string) ?? "",
      sectionSeriesTitle: (t.sectionSeriesTitle as string) ?? "",
      sectionSeriesDesc: (t.sectionSeriesDesc as string) ?? "",
      sectionSeriesModalLabel: (t.sectionSeriesModalLabel as string) ?? "",
      sectionSeriesVerSerie: (t.sectionSeriesVerSerie as string) ?? "",
      sectionSeriesClique: (t.sectionSeriesClique as string) ?? "",
      sectionEnsaiosBadge: (t.sectionEnsaiosBadge as string) ?? "",
      sectionEnsaiosTitle: (t.sectionEnsaiosTitle as string) ?? "",
      sectionEnsaiosDesc: (t.sectionEnsaiosDesc as string) ?? "",
      sectionEnsaiosCta: (t.sectionEnsaiosCta as string) ?? "",
      sectionEnsaiosCtaSubtext: (t.sectionEnsaiosCtaSubtext as string) ?? "",
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
      contactCta: form.contactCta || null,
      contactSubtext: form.contactSubtext || null,
      heroCtaWhatsApp: form.heroCtaWhatsApp || null,
      heroCtaPortfolio: form.heroCtaPortfolio || null,
      heroScrollLabel: form.heroScrollLabel || null,
      aboutSectionLabel: form.aboutSectionLabel || null,
      aboutYears: form.aboutYears || null,
      aboutYearsLabel: form.aboutYearsLabel || null,
      aboutCtaContact: form.aboutCtaContact || null,
      aboutCtaPortfolio: form.aboutCtaPortfolio || null,
      sectionFotoUnicaBadge: form.sectionFotoUnicaBadge || null,
      sectionFotoUnicaTitle: form.sectionFotoUnicaTitle || null,
      sectionFotoUnicaDesc: form.sectionFotoUnicaDesc || null,
      sectionFotoUnicaDesc2: form.sectionFotoUnicaDesc2 || null,
      sectionFotoUnicaCta: form.sectionFotoUnicaCta || null,
      sectionFotoUnicaSubtext: form.sectionFotoUnicaSubtext || null,
      sectionSeriesBadge: form.sectionSeriesBadge || null,
      sectionSeriesTitle: form.sectionSeriesTitle || null,
      sectionSeriesDesc: form.sectionSeriesDesc || null,
      sectionSeriesModalLabel: form.sectionSeriesModalLabel || null,
      sectionSeriesVerSerie: form.sectionSeriesVerSerie || null,
      sectionSeriesClique: form.sectionSeriesClique || null,
      sectionEnsaiosBadge: form.sectionEnsaiosBadge || null,
      sectionEnsaiosTitle: form.sectionEnsaiosTitle || null,
      sectionEnsaiosDesc: form.sectionEnsaiosDesc || null,
      sectionEnsaiosCta: form.sectionEnsaiosCta || null,
      sectionEnsaiosCtaSubtext: form.sectionEnsaiosCtaSubtext || null,
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
            <FieldRow label="Botão CTA">
              <input
                type="text"
                value={form.contactCta}
                onChange={(e) =>
                  setForm({ ...form, contactCta: e.target.value })
                }
                className={inputClass}
                placeholder="SOLICITAR ORÇAMENTO"
              />
            </FieldRow>
            <FieldRow label="Texto bajo botón">
              <input
                type="text"
                value={form.contactSubtext}
                onChange={(e) =>
                  setForm({ ...form, contactSubtext: e.target.value })
                }
                className={inputClass}
                placeholder="Valores e formas de pagamento..."
              />
            </FieldRow>
          </Section>

          <Section title="Textos das seções" icon={FileText}>
            <FieldRow label="Hero: Botón WhatsApp">
              <input
                type="text"
                value={form.heroCtaWhatsApp}
                onChange={(e) =>
                  setForm({ ...form, heroCtaWhatsApp: e.target.value })
                }
                className={inputClass}
                placeholder="Fale pelo WhatsApp"
              />
            </FieldRow>
            <FieldRow label="Hero: Botón Portfólio">
              <input
                type="text"
                value={form.heroCtaPortfolio}
                onChange={(e) =>
                  setForm({ ...form, heroCtaPortfolio: e.target.value })
                }
                className={inputClass}
                placeholder="Ver Portfólio"
              />
            </FieldRow>
            <FieldRow label="Hero: Indicador scroll">
              <input
                type="text"
                value={form.heroScrollLabel}
                onChange={(e) =>
                  setForm({ ...form, heroScrollLabel: e.target.value })
                }
                className={inputClass}
                placeholder="Rolar"
              />
            </FieldRow>
            <FieldRow label="Sobre: Etiqueta sección">
              <input
                type="text"
                value={form.aboutSectionLabel}
                onChange={(e) =>
                  setForm({ ...form, aboutSectionLabel: e.target.value })
                }
                className={inputClass}
                placeholder="Sobre o Fotógrafo"
              />
            </FieldRow>
            <FieldRow label="Sobre: Años (ej. 15+)">
              <input
                type="text"
                value={form.aboutYears}
                onChange={(e) =>
                  setForm({ ...form, aboutYears: e.target.value })
                }
                className={inputClass}
                placeholder="15+"
              />
            </FieldRow>
            <FieldRow label="Sobre: Label años">
              <input
                type="text"
                value={form.aboutYearsLabel}
                onChange={(e) =>
                  setForm({ ...form, aboutYearsLabel: e.target.value })
                }
                className={inputClass}
                placeholder="Anos fotografando"
              />
            </FieldRow>
            <FieldRow label="Sobre: Botón Contacto">
              <input
                type="text"
                value={form.aboutCtaContact}
                onChange={(e) =>
                  setForm({ ...form, aboutCtaContact: e.target.value })
                }
                className={inputClass}
                placeholder="Entrar em Contato"
              />
            </FieldRow>
            <FieldRow label="Sobre: Botón Portfólio">
              <input
                type="text"
                value={form.aboutCtaPortfolio}
                onChange={(e) =>
                  setForm({ ...form, aboutCtaPortfolio: e.target.value })
                }
                className={inputClass}
                placeholder="Ver Portfólio"
              />
            </FieldRow>
            <FieldRow label="Foto Única: Badge">
              <input
                type="text"
                value={form.sectionFotoUnicaBadge}
                onChange={(e) =>
                  setForm({ ...form, sectionFotoUnicaBadge: e.target.value })
                }
                className={inputClass}
                placeholder="Portfólio"
              />
            </FieldRow>
            <FieldRow label="Foto Única: Título">
              <input
                type="text"
                value={form.sectionFotoUnicaTitle}
                onChange={(e) =>
                  setForm({ ...form, sectionFotoUnicaTitle: e.target.value })
                }
                className={inputClass}
                placeholder="Foto Única"
              />
            </FieldRow>
            <FieldRow label="Foto Única: Descripción">
              <textarea
                value={form.sectionFotoUnicaDesc}
                onChange={(e) =>
                  setForm({ ...form, sectionFotoUnicaDesc: e.target.value })
                }
                className={inputClass}
                rows={3}
                placeholder="Cada imagem carrega um instante decisivo..."
              />
            </FieldRow>
            <FieldRow label="Foto Única: Descripción 2">
              <textarea
                value={form.sectionFotoUnicaDesc2}
                onChange={(e) =>
                  setForm({ ...form, sectionFotoUnicaDesc2: e.target.value })
                }
                className={inputClass}
                rows={2}
                placeholder="Disponíveis em diferentes formatos..."
              />
            </FieldRow>
            <FieldRow label="Foto Única: Botón CTA">
              <input
                type="text"
                value={form.sectionFotoUnicaCta}
                onChange={(e) =>
                  setForm({ ...form, sectionFotoUnicaCta: e.target.value })
                }
                className={inputClass}
                placeholder="Consultar Valores"
              />
            </FieldRow>
            <FieldRow label="Foto Única: Subtexto">
              <input
                type="text"
                value={form.sectionFotoUnicaSubtext}
                onChange={(e) =>
                  setForm({ ...form, sectionFotoUnicaSubtext: e.target.value })
                }
                className={inputClass}
                placeholder="Valores e formatos combinados..."
              />
            </FieldRow>
            <FieldRow label="Séries: Badge">
              <input
                type="text"
                value={form.sectionSeriesBadge}
                onChange={(e) =>
                  setForm({ ...form, sectionSeriesBadge: e.target.value })
                }
                className={inputClass}
                placeholder="Séries"
              />
            </FieldRow>
            <FieldRow label="Séries: Título">
              <input
                type="text"
                value={form.sectionSeriesTitle}
                onChange={(e) =>
                  setForm({ ...form, sectionSeriesTitle: e.target.value })
                }
                className={inputClass}
                placeholder="Séries Fotográficas"
              />
            </FieldRow>
            <FieldRow label="Séries: Descripción">
              <textarea
                value={form.sectionSeriesDesc}
                onChange={(e) =>
                  setForm({ ...form, sectionSeriesDesc: e.target.value })
                }
                className={inputClass}
                rows={3}
                placeholder="Conjuntos de imagens que exploram..."
              />
            </FieldRow>
            <FieldRow label="Séries: Modal label">
              <input
                type="text"
                value={form.sectionSeriesModalLabel}
                onChange={(e) =>
                  setForm({ ...form, sectionSeriesModalLabel: e.target.value })
                }
                className={inputClass}
                placeholder="Série Fotográfica"
              />
            </FieldRow>
            <FieldRow label="Séries: Ver série">
              <input
                type="text"
                value={form.sectionSeriesVerSerie}
                onChange={(e) =>
                  setForm({ ...form, sectionSeriesVerSerie: e.target.value })
                }
                className={inputClass}
                placeholder="Ver série"
              />
            </FieldRow>
            <FieldRow label="Séries: Clique para explorar">
              <input
                type="text"
                value={form.sectionSeriesClique}
                onChange={(e) =>
                  setForm({ ...form, sectionSeriesClique: e.target.value })
                }
                className={inputClass}
                placeholder="Clique para explorar"
              />
            </FieldRow>
            <FieldRow label="Ensaios: Badge">
              <input
                type="text"
                value={form.sectionEnsaiosBadge}
                onChange={(e) =>
                  setForm({ ...form, sectionEnsaiosBadge: e.target.value })
                }
                className={inputClass}
                placeholder="Ensaios"
              />
            </FieldRow>
            <FieldRow label="Ensaios: Título">
              <input
                type="text"
                value={form.sectionEnsaiosTitle}
                onChange={(e) =>
                  setForm({ ...form, sectionEnsaiosTitle: e.target.value })
                }
                className={inputClass}
                placeholder="Ensaios Fotográficos"
              />
            </FieldRow>
            <FieldRow label="Ensaios: Descripción">
              <textarea
                value={form.sectionEnsaiosDesc}
                onChange={(e) =>
                  setForm({ ...form, sectionEnsaiosDesc: e.target.value })
                }
                className={inputClass}
                rows={3}
                placeholder="Imagens que nascem do encontro..."
              />
            </FieldRow>
            <FieldRow label="Ensaios: Botón CTA">
              <input
                type="text"
                value={form.sectionEnsaiosCta}
                onChange={(e) =>
                  setForm({ ...form, sectionEnsaiosCta: e.target.value })
                }
                className={inputClass}
                placeholder="Agendar Ensaio via WhatsApp"
              />
            </FieldRow>
            <FieldRow label="Ensaios: Subtexto CTA">
              <input
                type="text"
                value={form.sectionEnsaiosCtaSubtext}
                onChange={(e) =>
                  setForm({ ...form, sectionEnsaiosCtaSubtext: e.target.value })
                }
                className={inputClass}
                placeholder="Cada ensaio é único..."
              />
            </FieldRow>
          </Section>
        </div>
      </div>
    </div>
  );
}
