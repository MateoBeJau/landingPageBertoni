"use client";

import { useState } from "react";
import { usePanelContext } from "../layout";
import { Key, Eye, EyeOff, Save } from "lucide-react";

const inputClass =
  "w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-shadow";

export default function PanelSenhaPage() {
  const { showToast, loading } = usePanelContext();
  const [saving, setSaving] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  async function onSubmit() {
    if (!form.currentPassword || !form.newPassword) {
      showToast("error", "Preencha todos os campos");
      return;
    }
    if (form.newPassword.length < 6) {
      showToast("error", "A nova senha deve ter pelo menos 6 caracteres");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      showToast("error", "As senhas não coincidem");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/panel/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast("error", data.error || "Erro ao alterar senha");
        return;
      }
      showToast("success", "Senha alterada com sucesso!");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      showToast("error", "Erro de conexão");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-md">
          <div className="h-72 animate-pulse rounded-xl border border-stone-200 bg-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-stone-900">Alterar Senha</h1>
          <p className="text-sm text-stone-500">
            Atualize a senha da sua conta
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-200 bg-stone-50 px-5 py-4">
            <Key className="h-4 w-4 text-stone-600" />
            <h2 className="text-sm font-semibold text-stone-800">Senha</h2>
          </div>
          <div className="space-y-4 p-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">
                Senha atual
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={form.currentPassword}
                  onChange={(e) =>
                    setForm({ ...form, currentPassword: e.target.value })
                  }
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showCurrent ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">
                Nova senha
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={form.newPassword}
                  onChange={(e) =>
                    setForm({ ...form, newPassword: e.target.value })
                  }
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showNew ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-stone-400">Mínimo 6 caracteres</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">
                Confirmar nova senha
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <button
              onClick={onSubmit}
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Alterando..." : "Alterar Senha"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
